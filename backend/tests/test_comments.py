import json

def test_add_comment(client):
    res = client.post("/api/comments/", json={"task_id": 1, "text": "Test Comment"})
    assert res.status_code == 201
    data = res.get_json()
    assert data["text"] == "Test Comment"

def test_get_comments(client):
    res = client.get("/api/comments/")
    assert res.status_code == 200
    data = res.get_json()
    assert isinstance(data, list)

def test_update_comment(client):
    # First add a comment
    res = client.post("/api/comments/", json={"task_id": 1, "text": "Old"})
    comment_id = res.get_json()["id"]

    # Now update it
    res = client.put(f"/api/comments/{comment_id}", json={"text": "Updated"})
    assert res.status_code == 200
    assert res.get_json()["text"] == "Updated"

def test_delete_comment(client):
    res = client.post("/api/comments/", json={"task_id": 1, "text": "To delete"})
    comment_id = res.get_json()["id"]

    res = client.delete(f"/api/comments/{comment_id}")
    assert res.status_code == 200
    assert res.get_json()["message"] == "Deleted"



# pytest -v