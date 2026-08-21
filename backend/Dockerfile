FROM python:3.12-slim

WORKDIR /app

# requirements.txt in this repo is saved as UTF-16 (with BOM); convert it to
# UTF-8 before handing it to pip, which expects a plain text file.
COPY requirements.txt ./requirements.txt
RUN python -c "import io; data = io.open('requirements.txt', encoding='utf-16').read(); io.open('requirements.txt', 'w', encoding='utf-8').write(data)" \
    && pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "docker_entrypoint.py"]
