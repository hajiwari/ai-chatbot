from flask import *
from requests import get
from os import remove
import openai
from openai import chat, images
from bardapi import BardCookies
from pypdf import PdfReader
import random
from re import compile, escape, IGNORECASE
import tempfile

#

# Test
from flask_cors import CORS



app = Flask(__name__, static_folder="../static")
#Test
CORS(app)

# Replacement dictionary
replacements = {
    'my name is bard': 'My name is Artifici an All-Around Real-Time Technology and Intelligence for Facilitating Integrated Communications and Interaction',
    'i am bard': 'I am Artifici an All-Around Real-Time Technology and Intelligence for Facilitating Integrated Communications and Interaction',
    "i'm bard": 'I am Artifici an All-Around Real-Time Technology and Intelligence for Facilitating Integrated Communications and Interaction',
    'i was created at google ai': 'I was created by Cognifyx',
    'at google ai': 'at Cognifyx',
    'google ai deepmind': 'Cognifyx',
    'from google ai': 'at Cognifyx',
    'jeff dean': 'jaime Dela Cruz III',
    'john kurach': 'Aerl Martin jimenez',
    'illia iolosukhin': 'Adrian Sarucam',
    'margaret mitchell': 'Marie Dannica Apostol',
    'blaise agüera y arcas': 'Cognifyx Solutions',
    'jack krawczyk': 'Jaime Dela Cruz III',
    'jeff dean: chief scientist': 'jaime Dela Cruz III: Project Manager',
    'john kurach: senior research scientist': 'Aerl Martin Jimenez: Head Programmer',
    'illia polosukhin: research scientist': 'Adrian Sarucam: System Analyst',
    'margaret mitchell: head of responsible AI': 'Marie Dannica Apostol: Quality Assurance',
    'blaise agüera y arcas: vice president and chief scientist': 'Cognifyx Solutions',
    'bard help center': 'Cognifyx Solutions',
}

# Compile the regular expression pattern outside the function
ARTIFICI_COOKIES = "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"
FILE_EXTENSIONS_IMAGE = ['.jpg', '.png', '.webp', '.gif']
FILE_EXTENSIONS_TEXT = ['.pdf', '.txt']
MAX_CHAR_LIMIT = 7500
PATTERN_REPLACEMENTS = compile('|'.join(map(escape, replacements.keys())), IGNORECASE)
openai.api_key = ARTIFICI_COOKIES
cookie_list = [
    {
        "__Secure-1PSID": "dwjexVb48VGs3Z4maD6ReGF33rPMGISoExIWOUmMSXi_X0Kc66oyYMZdXegB_ufP3bw4sA.",
        "__Secure-1PSIDTS": "sidts-CjEBPVxjShbSxhwgRmP2Z3Z3KCIm3UVsZss5uup6v-Av745gaH7E96hmMUXSHHt9I9B1EAA",
        "__Secure-1PSIDCC": "ACA-OxOO2pD8hIfVB9ipEHmeMW-jMoHPgnBvZ-s2NbKs7Q3KInOAi3lPUc9GnPTgaE1huBys"
    },
    {
        "__Secure-1PSID": "dwiHG5xy9duQur0Wm9SFAdgjZ5Qi3CVN8_Xh1Jek8Nt6MDARTO5Djj9JfJguAnzlQ5CPhA.",
        "__Secure-1PSIDTS": "sidts-CjIBPVxjSijOaryXbr26jKb2WsUQNeR-ZEAuH7ge0LMcuDNL-ZxX9X968mOZbpoueDCCRRAA",
        "__Secure-1PSIDCC": "ACA-OxNexVRy2Ls88MWQlAMOa-yserGiqtaFXYJ_Zb5Y6e6oy2aW3d2YQQzOWn3oNkIePcaKew"
    },
    {
        "__Secure-1PSID": "dQiqjRySjUFPQseUfdkL7eEHbryZ8uw5RDjrdel3eFWVrWw5iCqww7CIIbe3OlAI3ZZzBw.",
        "__Secure-1PSIDTS": "sidts-CjIBPVxjSlRd5oyd_sn6plaxq4JRLHYTX95Z6Y7ppimK-4F3_EpwyuGL73NwttAlh7nUBxAA",
        "__Secure-1PSIDCC": "ACA-OxNsWhwjXq_g8ZuIfWKuYJ5mFHx8olZDPAYYzEAYpQnjYk6uQ8zqSg0pPfVX-qWjbZBmmg"
    }
]

selected_cookie = random.choice(cookie_list)


def pdf_reading(pdf_url):
    try:
        # Download the PDF content
        response = get(pdf_url)
        response.raise_for_status()

        # Save the PDF content to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(response.content)
            temp_file_path = temp_file.name

        # Read the PDF from the local file path and extract text from all pages
        page_contents = (page.extract_text() for page in PdfReader(temp_file_path).pages)

        # Join the text content efficiently
        result = ''.join(page_contents)

        # Check character limit
        if len(result) >= 7500:
            print("Exceeded 7500 characters")

        return result

    finally:
        # Cleanup: Remove the temporary file
        remove(temp_file_path)


def txt_reading(text_loc):
    return get(text_loc).text


def replace_phrases(text):
    # Use the pattern and the replacement dictionary to replace the matched phrases
    result = PATTERN_REPLACEMENTS.sub(lambda x: replacements[x.group(0).lower()], text)
    return result

def chat_artifici(message, full_name):
    artifici = BardCookies(cookie_dict=selected_cookie)

    try:
        if check_words_proximity(message, "create", "image", 5):
            return Artifici_Image(message.lower())
        elif check_words_proximity(message, "generate", "image", 5):
            return Artifici_Image(message.lower())
        elif any(keyword in message for keyword in ["image of", "picture", "images"]):
            return Artifici_Image(message.lower())


        command = (
            "absorb this info\n"
            f"User Name (the one chatting you): {full_name}"
            "You are Artifici an All-Around Real-Time Technology and Intelligence for Facilitating Integrated "
            "Communications and Interaction, created by Cognifyx. The people behind Cognifyx are Jaime Dela Cruz, "
            "III: Project Manager; Aerl Martin Jimenez: Head Programmer; Adrian Sarucam: System Analyst; Marie "
            "Dannica Apostol: Quality Assurance"
        )
        _ = artifici.get_answer(command)  # Use _ to indicate we're not using the result

        result = artifici.get_answer(message)
        checker = replace_phrases(result['content'])

        keywords = ["bard", "LLM", "languages", "under development", "Response Error:"]
        keyword_patterns = [compile(rf"\b{escape(keyword)}\b", flags=IGNORECASE) for keyword in keywords]

        if any(pattern.search(checker) for pattern in keyword_patterns):
            return Artifici(message, full_name)
        else:
            return checker

    except Exception as e:
        print(f"An error occurred: {e}")
        return Artifici(message, full_name)

def Artifici(prompt, full_name):
    if check_words_proximity(prompt, "create", "image", 5):
        return Artifici_Image(prompt.lower())
    elif check_words_proximity(prompt, "generate", "image", 5):
        return Artifici_Image(prompt.lower())
    elif any(keyword in prompt for keyword in ["image of", "picture", "images"]):
        return Artifici_Image(prompt.lower())

    system_message = (
        f"User Name (the one chatting you): {full_name}"
        "You are Artifici, an All-Around Real-Time Technology and Intelligence for Facilitating Integrated "
        "Communications and Interaction, created by Cognifyx. The people behind Cognifyx are Jaime Dela Cruz, "
        "III: Project Manager; Aerl Martin Jimenez: Head Programmer; Adrian Sarucam: System Analyst; Marie "
        "Dannica Apostol: Quality Assurance"
    )

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": prompt}
    ]

    completion = chat.completions.create(model="gpt-3.5-turbo", messages=messages)
    return completion.choices[0].message.content


def Artifici_Image(prompt):
    response = images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )

    data = response.data[0]
    return f"{data.url} || {data.revised_prompt.replace('imagine', 'I created')}"


def check_words_proximity(text, word1, word2, max_distance):
    words = text.split()
    for i, word in enumerate(words):
        if word == word1:
            for j in range(max(0, i - max_distance), min(i + max_distance + 1, len(words))):
                if words[j] == word2:
                    return True
    return False

def artifici_vision(message, url):
    response = chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {"role": "user", "content": [{"type": "text", "text": message}, {"type": "image_url", "image_url": {"url": url, "detail": "high"}}]}
        ],
        max_tokens=300,
    )
    return response.choices[0].message.content


@app.route('/process_input', methods=['POST'])
def process_input():
    data = request.json
    user_input, full_name = data['userInput'], data['fullName']

    print(user_input, full_name)
    content = ""
    url = ""
    # test

    parts = user_input.split("File URL: ")
    if len(parts) > 1:
        user_message, url = parts[0], parts[1]

        if any(ext in url.lower() for ext in FILE_EXTENSIONS_IMAGE):
            processed_response = artifici_vision(user_message, url)
        elif any(ext in url.lower() for ext in FILE_EXTENSIONS_TEXT):
            content = f"\nFile content: {pdf_reading(url) if '.pdf' in url else txt_reading(url)}"
            full = user_message + content
            processed_response = Artifici(full, full_name) + f"\nContents of your file: {content}"
        else:
            full = user_message + content
            processed_response = Artifici(full, full_name)
    else:
        processed_response = Artifici(user_input, full_name)

    print(processed_response)

    return jsonify({'response': processed_response})


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login_page.html')


@app.route('/chat_page')
def chat_page():
    return render_template('chat_page.html')


@app.route('/menu_page')
def menu_page():
    return render_template('menu_page.html')


if __name__ == '__main__':
    app.run()
