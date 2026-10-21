# Simple XOR Hash

A simple educational Cryptography and Network Security mini-project that implements a 32-bit XOR-based hash function using Python, Flask, and React.

The application allows users to enter a message, generate its hash value, view message statistics, and copy the generated hash.

## Features

- **Hash Generation:** Generate a 32-bit hash using repeated XOR operations on message blocks.
- **Hexadecimal Output:** Display the generated hash as an eight-digit hexadecimal value.
- **Message Statistics:** Display the message length in bytes and the number of processed blocks.
- **Copy Hash:** Copy the generated hash to the clipboard.
- **Responsive Interface:** Simple, modern interface built with React and CSS.
- **Backend Integration:** Process hash-generation requests through a Flask REST API.

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Implements the XOR hash algorithm |
| Flask | Provides the backend API |
| Flask-CORS | Allows communication between the frontend and backend |
| React.js | Builds the user interface |
| Vite | Runs the React development server |
| CSS | Styles the application |

## Project Structure

```text
simple-hash-project/
│
├── backend/
│   ├── app.py
│   ├── hash_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## Requirements

Make sure the following software is installed:

- Python 3
- Node.js
- npm
- A web browser

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/simple-xor-hash.git
```

Navigate into the project directory:

```bash
cd simple-xor-hash
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Set Up the Backend

Open a terminal in the project root directory.

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
```

Then activate the environment again:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required dependencies:

```bash
pip install -r backend/requirements.txt
```

Start the Flask backend:

```bash
python backend/app.py
```

The backend API will run at:

http://127.0.0.1:5000

Keep this terminal open while using the application.

### 3. Set Up the Frontend

Open a second terminal in the project root directory.

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Vite will display a local URL, usually:

http://localhost:5173

Open that URL in your browser to use the application.

**Note:** Both the Flask backend and React frontend must be running simultaneously.

## How the Algorithm Works

The application implements a simple 32-bit XOR-based hash function.

### Algorithm Steps

1. Convert the input message into UTF-8 bytes.
2. Divide the message into blocks of four bytes each.
3. Pad the final block with zero bytes if it contains fewer than four bytes.
4. Convert each block into a 32-bit integer.
5. Initialize the hash value to zero.
6. XOR each block value with the current hash value.
7. Display the final hash as an eight-digit hexadecimal value.

### Example

**Input message:**

```text
ABCD
```

The UTF-8 hexadecimal representation is:

```text
41 42 43 44
```

Since the message contains exactly four bytes, it forms one block.

The block value is:

```text
41424344
```

The initial hash value is:

```text
00000000
```

Performing the XOR operation:

```text
00000000
XOR 41424344
-----------
41424344
```

**Expected output:**

```text
Hash: 41424344
Message bytes: 4
Blocks: 1
```

## Testing

The following test cases can be used to verify the implementation.

| Test Case | Input Message | Expected Hash | Message Bytes | Blocks |
|---|---|---|---:|---:|
| 1 | `ABCD` | `41424344` | 4 | 1 |
| 2 | `abcd` | `61626364` | 4 | 1 |
| 3 | `Hello` | `27556C6C` | 5 | 2 |
| 4 | `A` | `41000000` | 1 | 1 |
| 5 | `ABC` | `41424300` | 3 | 1 |
| 6 | `ABCDEFGH` | `0404040C` | 8 | 2 |
| 7 | Empty message | `00000000` | 0 | 0 |

These expected outputs correspond to the implemented four-byte block XOR algorithm with zero-padding.

## API Endpoint

The Flask backend exposes an endpoint for generating hash values.

### Generate Hash

**Endpoint:**

```http
POST /api/hash
```

**Base URL:**

```text
http://127.0.0.1:5000
```

**Request body:**

```json
{
  "message": "ABCD"
}
```

**Example response:**

```json
{
  "success": true,
  "hash": "41424344",
  "message_length": 4,
  "block_count": 1
}
```

## Limitations

- The algorithm produces a fixed-size 32-bit hash.
- Different messages can produce the same hash value.
- The algorithm does not provide strong collision resistance.
- The result depends on XOR operations over fixed-size blocks.
- It is intended only for educational demonstration.

## Security Note

This is a simple educational XOR-based hash function. It is **not cryptographically secure** and must not be used for password storage, digital signatures, data integrity protection, or other security-critical applications.

## Conclusion

This project demonstrates the implementation of a simple hash function using repeated XOR operations on message blocks. It combines a Python-based hashing algorithm, a Flask backend, and a React frontend to provide an interactive demonstration of basic hashing concepts.

The project helps illustrate block processing, bitwise XOR operations, hexadecimal hash representation, and the limitations of a simple hash function.