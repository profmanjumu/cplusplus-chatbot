#  Project Setup Guide

Hey! Here’s a simple, no-nonsense walkthrough to get this project running on your Windows machine. I’ll tell you exactly what to install, what to click, and what to type. Let’s go.

---

##  Step 1: Install Python 3.10

- Go to [https://www.python.org/downloads/release/python-3100/](https://www.python.org/downloads/release/python-3100/)
- Download Python 3.10.0 for Windows.
- During installation:
  - ✅ Check the box that says **Add Python to PATH** (super important)
  - ✅ Install for all users if possible.

---

##  Step 2: Install Node.js

- Go to [https://nodejs.org/](https://nodejs.org/)
- Download the **LTS version**.
- During installation:
  - ✅ Make sure it **adds Node.js to your system PATH automatically.** The installer usually does this for you.

- After installation, check:
  ```bash
  node -v
  npm -v

#  Project Setup Guide

##  Step 3: Set VS Code’s Default Terminal to Git Bash

In VS Code, press `Ctrl + ,` to open settings.

Search:
```
terminal integrated default profile windows
```

Find:
```
Terminal > Integrated > Default Profile: Windows
```

Click **Edit in settings.json**

Add this:
```json
"terminal.integrated.defaultProfile.windows": "Git Bash"
```

Make sure Git Bash is installed (it comes with Git for Windows).

---

##  Step 4: Clone the Repo from GitHub

Open Git Bash in the folder where you want to save the project.

Run:
```bash
git clone <repo-url>
```

Example:
```bash
git clone https://github.com/your-username/your-repo-name.git
```

Go into the project folder:
```bash
cd your-repo-name
```

---

##  Step 5: Start Two Integrated Terminals in VS Code

Open the project in VS Code.

Open the terminal using:
```
Ctrl + ~
```

---

###  Terminal 1: Backend Terminal (Git Bash)

Create a Python virtual environment:
```bash
python -m venv venv
```

Activate the virtual environment:
```bash
source venv/Scripts/activate
```

Install the required Python packages:
```bash
pip install -r requirements.txt
```

Start the Flask server:
```bash
flask run
```

---

###  Terminal 2: Frontend Terminal (PowerShell is Fine Here)

Open a new integrated terminal in VS Code. You can split it or open a new tab.

Install Node.js packages:
```bash
npm install
```

Start the React app:
```bash
npm run dev
```

---

##  You’re Done!

- Backend will usually run at:  
  `http://localhost:5000`

- Frontend will usually run at:  
  `http://localhost:5173`

---

##  Quick Workflow Recap

| Task | Command |
|------|---------|
| Backend Setup | `python -m venv venv` → `source venv/Scripts/activate` → `pip install -r requirements.txt` → `flask run` |
| Frontend Setup | `npm install` → `npm run dev` |

---
