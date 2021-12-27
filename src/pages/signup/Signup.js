import "./Signup.css";

import { useSignup } from "../../hooks/useSignup";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(displayName, email, password, avatar);
  };

  const handleFileChange = (e) => {
    setAvatar(null);

    let selected = e.target.files[0];

    if (!selected) {
      setAvatarError("Please select a file");
    } else if (!selected.type.includes("image")) {
      setAvatarError("File must be an image");
    } else if (selected.size > 1000000) {
      setAvatarError("File size exceeds 1MB");
    } else {
      setAvatarError(null);
      setAvatar(selected);
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
        <span>Display Name:</span>
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
        {avatarError && <div className="error">{avatarError}</div>}
      </label>
      {!isPending && <button className="btn">Submit</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
