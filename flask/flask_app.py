from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration
import mlflow.pytorch
import torch

app = Flask(__name__)

# Load the model + tokenizer (make sure this matches the one you trained/logged)
tokenizer = T5Tokenizer.from_pretrained("t5-small")

# model = T5ForConditionalGeneration.from_pretrained("../results/run_02/checkpoint-750")
# model = T5ForConditionalGeneration.from_pretrained("results/run_02/checkpoint-750") # for docker

mlflow.set_tracking_uri("https://dagshub.com/achrafhoteit/AIDE505-final-project.mlflow")
model = mlflow.pytorch.load_model("runs:/d7a51b9ad1154324a9476a47b3875a4d/summarizer_model")

# model = mlflow.pytorch.load_model("../mlruns/403432388898420352/5d30ba2385b44f2887e00ca84247c0fd/artifacts/summarizer_model")

# model = mlflow.pytorch.load_model("mlruns/403432388898420352/5d30ba2385b44f2887e00ca84247c0fd/artifacts/summarizer_model") # for docker

model.eval()

# @app.route("/summarize", methods=["POST"])
# def summarize():
#     data = request.get_json()
#     text = data.get("text")

#     input_text = "summarize: " + text
#     inputs = tokenizer.encode(
#         input_text,
#         return_tensors="pt",
#         truncation=True,
#         max_length=512
#     ).to("cpu")

#     model.to("cpu")
#     model.eval()

#     summary_ids = model.generate(
#         inputs,
#         min_length=30,
#         max_length=60,
#         num_beams=4,
#         length_penalty=1.0,
#         early_stopping=True
#     )

#     summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
#     return jsonify({"summary": summary})

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text")

    input_text = "summarize: " + text
    inputs = tokenizer.encode(
        input_text,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )

    summary_ids = model.generate(
        inputs,
        min_length=30,
        max_length=60,
        num_beams=4,
        length_penalty=1.0,
        early_stopping=True
    )

    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)