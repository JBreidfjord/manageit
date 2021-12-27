import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useState } from "react";

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(project.id, { comments: [...project.comments, commentToAdd] });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>{comment.createdAt.toDate().toDateString()}</p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>New Comment:</span>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            required
          ></textarea>
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
