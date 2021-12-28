import "./Create.css";

import { useEffect, useState } from "react";

import Select from "react-select";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { CreateProject, User } from "../../types";

interface AssignedUser {
  value: User;
}

interface UserOption {
  value: User;
  label: string;
}

const categories = [
  { value: "Development", label: "Development" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
];

export default function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([] as AssignedUser[]);
  const [formError, setFormError] = useState("");
  const [userOptions, setUserOptions] = useState([] as UserOption[]);

  const navigate = useNavigate();

  const { documents: users } = useCollection<User>("users");
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("projects");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!category) {
      setFormError("Please select a category");
    } else if (assignedUsers.length === 0) {
      setFormError("Please assign at least 1 user");
    } else {
      const assignedUsersList = assignedUsers.map((assignedUser: AssignedUser) => ({
        displayName: assignedUser.value.displayName,
        photoURL: assignedUser.value.photoURL,
        id: assignedUser.value.id,
      }));
      const project: CreateProject = {
        name,
        details,
        category: category,
        dueDate: timestamp.fromDate(new Date(dueDate)),
        assignedUsersList,
        comments: [],
        createdBy: { displayName: user.displayName, photoURL: user.photoURL, id: user.uid },
      };

      addDocument(project);
    }
  };

  useEffect(() => {
    if (users) {
      setUserOptions(users.map((user) => ({ value: user, label: user.displayName })));
    }
  }, [users]);

  useEffect(() => {
    if (response.success) {
      navigate("/");
    }
  }, [response, navigate]);

  return (
    <div>
      <h2 className="page-title">Create a New Project</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          <span>Project Name:</span>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} required />
        </label>

        <label>
          <span>Details:</span>
          <textarea onChange={(e) => setDetails(e.target.value)} value={details} required />
        </label>

        <label>
          <span>Due Date:</span>
          <input
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>

        <label>
          <span>Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option ? option.value : "")}
          />
        </label>

        <label>
          <span>Assign To:</span>
          <Select
            options={userOptions}
            onChange={(option) => setAssignedUsers([...option])}
            isMulti={true}
          />
        </label>
        {formError && <p className="error">{formError}</p>}
        <button className="btn">Add Project</button>
      </form>
    </div>
  );
}
