import React, { useEffect, useState } from "react";
import "./Comments.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/comments/")
      .then((res) => res.json())
      .then(setComments)
      .catch(() => setError("Failed to load comments"));
  }, []);

  // Add or update comment
  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      if (editId) {
        await fetch(`http://127.0.0.1:5000/api/comments/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        setComments((prev) =>
          prev.map((c) => (c.id === editId ? { ...c, text } : c))
        );
        setMessage("✅ Comment updated");
      } else {
        const res = await fetch("http://127.0.0.1:5000/api/comments/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const newComment = await res.json();
        setComments((prev) => [...prev, newComment]);
        setMessage("✅ Comment added");
      }
      setText("");
      setEditId(null);
    } catch {
      setError("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  const handleEdit = (comment) => {
    setText(comment.text);
    setEditId(comment.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/comments/${id}`, {
        method: "DELETE",
      });
      setComments((prev) => prev.filter((c) => c.id !== id));
      setMessage("❌ Comment deleted");
    } catch {
      setError("Failed to delete comment");
    }
  };

  return (
    <div className="comments-app">
      <div className="comments-container">
        <div className="header-section">
          <div className="floating-elements">
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
            <div className="floating-orb orb-3"></div>
          </div>
          <div className="header-content">
            <div className="header-icon-modern">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </div>
            <h2 className="header-title">Comments Hub</h2>
            <p className="header-subtitle">Where conversations come alive</p>
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-number">{comments.length}</span>
                <span className="stat-label">Comments</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">Live</span>
                <span className="stat-label">Status</span>
              </div>
            </div>
          </div>
        </div>

        <div className="input-section">
          <div className="section-title">
            <h3>Create Comment</h3>
            <div className="title-accent"></div>
          </div>
          <div className="input-wrapper">
            <div className="input-glow"></div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Share your thoughts... ✨"
              className="comment-input"
              rows="4"
              maxLength="500"
            />
            <div className="input-footer">
              <div className="input-meta">
                <span className="char-count">
                  <span className={text.length > 400 ? "char-warning" : ""}>{text.length}</span>/500
                </span>
                <div className="input-actions">
                  <button className="emoji-btn" type="button" title="Add emoji">😊</button>
                  <button className="format-btn" type="button" title="Format text">✨</button>
                </div>
              </div>
              <div className="button-group">
                {editId && (
                  <button
                    onClick={() => {
                      setText("");
                      setEditId(null);
                    }}
                    className="btn btn-cancel"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    Cancel
                  </button>
                )}
                
                <button
                  onClick={handleSubmit}
                  disabled={loading || !text.trim()}
                  className={`btn ${editId ? "btn-update" : "btn-add"} btn-primary`}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Processing
                    </>
                  ) : editId ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Update
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                      Add Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="input-hint">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> for quick submit
          </div>
        </div>

        {error && (
          <div className="notification error-notification">
            <span className="notification-icon">⚠️</span>
            {error}
          </div>
        )}
        
        {message && (
          <div className="notification success-notification">
            <span className="notification-icon">✨</span>
            {message}
          </div>
        )}

        <div className="comments-section">
          <div className="section-header">
            <div className="section-title-wrapper">
              <h3>Live Comments</h3>
              <div className="comment-count-badge">{comments.length}</div>
            </div>
            <div className="section-actions">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Recent</button>
            </div>
          </div>
          
          {comments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">
                <div className="empty-circle">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <div className="empty-particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
              </div>
              <h4>Start the Conversation</h4>
              <p>Be the first to share your thoughts and spark engaging discussions!</p>
              <button className="empty-cta" onClick={() => document.querySelector('.comment-input').focus()}>
                Write First Comment
              </button>
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={comment.id} className="comment-item" style={{'--delay': `${index * 0.1}s`}}>
                  <div className="comment-glow"></div>
                  <div className="comment-content">
                    <div className="comment-avatar">
                      <div className="avatar-ring"></div>
                      <span className="avatar-text">{String.fromCharCode(65 + (index % 26))}</span>
                      <div className="avatar-status"></div>
                    </div>
                    <div className="comment-body">
                      <div className="comment-header">
                        <span className="comment-author">User {String.fromCharCode(65 + (index % 26))}</span>
                        <span className="comment-time">now</span>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                      <div className="comment-engagement">
                        <button className="engagement-btn">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span>0</span>
                        </button>
                        <button className="engagement-btn">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 6h-2l-1.27-1.27c-.16-.16-.38-.25-.61-.25-.23 0-.45.09-.61.25L15 6H9l-1.51-1.52c-.16-.16-.38-.25-.61-.25-.23 0-.45.09-.61.25L5 6H3c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h2l1.27 1.27c.16.16.38.25.61.25.23 0 .45-.09.61-.25L9 18h6l1.51 1.52c.16.16.38.25.61.25.23 0 .45-.09.61-.25L19 18h2c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"/>
                          </svg>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="comment-actions">
                    <button
                      onClick={() => handleEdit(comment)}
                      className="btn btn-update btn-icon-only"
                      title="Edit comment"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="btn btn-delete btn-icon-only"
                      title="Delete comment"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;