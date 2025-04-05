# flask_app/Dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY flask_app.py requirements.txt ./

RUN pip install --no-cache-dir torch==2.1.0 torchvision==0.16.0 && \
    pip install --no-cache-dir -r requirements.txt

# Preload the T5 model & tokenizer
RUN python -c "from transformers import T5Tokenizer, T5ForConditionalGeneration; \
    T5Tokenizer.from_pretrained('t5-small'); \
    T5ForConditionalGeneration.from_pretrained('t5-small')"

EXPOSE 5000

CMD ["python", "flask_app.py"]
