import sys
import os
import traceback
from fastapi import Request
from fastapi.responses import JSONResponse

# Ensure we are running inside the agent folder
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.getcwd())

from google.adk.cli import main
from google.adk.cli import adk_web_server

# Monkey-patch adk_web_server to return detailed 500 errors
original_create_app = adk_web_server.AdkWebServer.create_app

def create_app_with_debug(self, *args, **kwargs):
    app = original_create_app(self, *args, **kwargs)
    
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        tb = traceback.format_exc()
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error", "error": str(exc), "traceback": tb}
        )
        
    return app

adk_web_server.AdkWebServer.create_app = create_app_with_debug

if __name__ == '__main__':
    port = os.environ.get("PORT", "8000")
    sys.argv = ["adk", "api_server", "portfolio_agent", "--host", "0.0.0.0", "--port", port]
    sys.exit(main())
