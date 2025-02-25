from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF for PDF text extraction
import os

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Backend is running!"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question', '')
    if not question:
        return jsonify({"error": "No question provided"}), 400

    return jsonify({"answer": "This is a test response."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)