import sys
import os

# Ensure we are running inside the agent folder
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.getcwd())

from google.adk.cli import main

if __name__ == '__main__':
    port = os.environ.get("PORT", "8000")
    sys.argv = ["adk", "api_server", "portfolio_agent", "--host", "0.0.0.0", "--port", port]
    sys.exit(main())
