import sys
import os

# Add the current directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from google.adk.cli import main

if __name__ == '__main__':
    # We simulate running 'adk api_server portfolio_agent --host 0.0.0.0 --port $PORT'
    port = os.environ.get("PORT", "8000")
    sys.argv = ["adk", "api_server", "portfolio_agent", "--host", "0.0.0.0", "--port", port]
    sys.exit(main())
