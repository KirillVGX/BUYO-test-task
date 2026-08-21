"""Native (non-Docker) launcher for Windows.

asyncpg is incompatible with Windows' default ProactorEventLoop (connections
fail with ConnectionDoesNotExistError), so the event loop policy is switched
to the selector-based one before uvicorn starts. Also works around
__main__.py's filename colliding with Python's special "__main__" module
name, the same way docker_entrypoint.py does for the container.
"""

import asyncio
import sys

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import importlib.util

import uvicorn

spec = importlib.util.spec_from_file_location("backend_app", "__main__.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

if __name__ == "__main__":
    uvicorn.run(module.app, host="localhost", port=8000)
