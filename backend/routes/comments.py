from flask import Blueprint, request, jsonify

comments_bp = Blueprint("comments", __name__)

comments = []  # in-memory list for now
comment_id_counter = 1

# Get all comments
@comments_bp.route("/", methods=["GET"])
def get_comments():
    return jsonify(comments)

# Add comment
@comments_bp.route("/", methods=["POST"])
def add_comment():
    global comment_id_counter
    data = request.json
    new_comment = {
        "id": comment_id_counter,
        "task_id": data.get("task_id"),
        "text": data.get("text", "")
    }
    comments.append(new_comment)
    comment_id_counter += 1
    return jsonify(new_comment), 201

# Update comment
@comments_bp.route("/<int:comment_id>", methods=["PUT"])
def update_comment(comment_id):
    data = request.json
    for comment in comments:
        if comment["id"] == comment_id:
            comment["text"] = data.get("text", comment["text"])
            return jsonify(comment)
    return jsonify({"error": "Comment not found"}), 404

# Delete comment
@comments_bp.route("/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    global comments
    comments = [c for c in comments if c["id"] != comment_id]
    return jsonify({"message": "Deleted"}), 200
