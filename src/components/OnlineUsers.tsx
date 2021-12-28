import "./OnlineUsers.css";

import Avatar from "./Avatar";
import { useCollection } from "../hooks/useCollection";
import { UserCollection } from "../types";

export default function OnlineUsers() {
  const { documents: users, error }: UserCollection = useCollection("users");

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {users &&
        users.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
