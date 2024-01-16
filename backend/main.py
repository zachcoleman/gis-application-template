from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Serve the bundled JavaScript file
app.mount("/static", StaticFiles(directory="./frontend/dist", html=False), name="static")

@app.get("/config.yaml")
def read_config():
    return FileResponse("./config.yaml", media_type="text/yaml")

# Serve the HTML file as the entry point
@app.get("/")
def read_root():
    return FileResponse("./frontend/dist/index.html")
