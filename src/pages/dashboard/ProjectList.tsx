import "./ProjectList.css";

import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { Project } from "../../types";

type Props = {
  projects: Project[];
};

export default function ProjectList({ projects }: Props) {
  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <p>No Projects</p>
      ) : (
        projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.id}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
