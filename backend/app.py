ifrom flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import fitz  # PyMuPDF for PDF text extraction
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

# Serve the favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'backend'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/', methods=['GET'])
def home():
    return "Backend is running!"


# Path to the PDF file in the backend folder
PDF_PATH = os.path.join(os.path.dirname(__file__), 'pdfs', 'assignment1.pdf')

# Global variable to store the entire PDF content
pdf_content = ""

# Function to load and extract text from the PDF at startup
def load_pdf_content():
    global pdf_content
    try:
        with fitz.open(PDF_PATH) as doc:
            text = ""
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                text += page.get_text()
            pdf_content = text
        print("PDF content loaded successfully.")
        print("Preview of PDF content:\n", pdf_content[:1000])  # Larger preview to validate loading
    except Exception as e:
        print(f"Error loading PDF content: {e}")

# Load the PDF content when the server starts
load_pdf_content()

# Chatbot endpoint to answer questions using the entire PDF content as context
@app.route('/ask', methods=['POST'])
def ask():
    global pdf_content
    data = request.json
    question = data.get('question', '')

    if not question:
        return jsonify({'error': 'No question provided'}), 400

    try:
        # Provide the entire PDF content as context without restrictions
        context = f"PDF Content:\n{pdf_content[:10000]}\n"

        # Use OpenAI to answer the question with explicit reference to the PDF content
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "user", 
                "content": f"""
               You are a helpful assistant for a Data Structures class. 
                The following is the content of an assignment PDF. 
                
                1. Answer the user's question by directly referencing the PDF content. 
                2. Provide suggestions and guidance if the user shares C++ code with errors. 
                3. When C++ code is provided, analyze it for syntax or logical errors 
                   and provide suggestions for improvement, but avoid giving full code solutions.
                4. If the user's question is general or related to the assignment, answer fully using the PDF content.
                5. If the user uses curse words, respond with the That kind of language is unhelpful.
                

                --- 
                {context} 
                --- 

                User Question: {question}
                """
            }],
            max_tokens=500,
            n=1,
            temperature=0.5,
        )
        answer = response.choices[0].message['content']
        return jsonify({'answer': answer})
    except Exception as e:
        print("Error during OpenAI API call:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
