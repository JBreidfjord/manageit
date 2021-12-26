import "./Signup.css";

import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    setThumbnail(null);

    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
    } else if (!selected.type.includes("image")) {
      setThumbnailError("File must be an image");
    } else if (selected.size > 1000000) {
      setThumbnailError("File size exceeds 1MB");
    } else {
      setThumbnailError(null);
      setThumbnail(selected);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
      </label>

      <label>
        <span>Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      <label>
        <span>Avatar:</span>
        <input type="file" onChange={handleFileChange} required />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <button className="btn">Submit</button>
    </form>
  );
}
