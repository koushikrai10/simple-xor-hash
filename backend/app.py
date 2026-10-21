from flask import Flask, request, jsonify
from flask_cors import CORS
from hash_service import simple_hash

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "Simple XOR Hash API is running"
    })


@app.route("/api/hash", methods=["POST"])
def generate_hash():
    data = request.get_json(silent=True)

    if not isinstance(data, dict) or not isinstance(
        data.get("message"), str
    ):
        return jsonify({
            "error": "Please provide a message as a string."
        }), 400

    message = data["message"]
    result = simple_hash(message)

    return jsonify({
        "success": True,
        "hash": result["hash"],
        "message_length": len(message.encode("utf-8")),
        "block_count": result["block_count"]
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)