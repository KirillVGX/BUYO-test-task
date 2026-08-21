"""Docker entrypoint.

__main__.py hardcodes uvicorn.run(..., host='localhost', ...), which is
unreachable from outside the container, and its filename collides with
Python's special "__main__" module name (so `uvicorn __main__:app` fails to
import it as a regular module). This loads it under a different module name
and starts uvicorn against the resulting `app` object with host 0.0.0.0.
"""

import importlib.util

import uvicorn

spec = importlib.util.spec_from_file_location("backend_app", "__main__.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

if __name__ == "__main__":
    uvicorn.run(module.app, host="0.0.0.0", port=8000, forwarded_allow_ips="*")
