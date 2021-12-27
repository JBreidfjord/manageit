import "./Project.css";

import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";
import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  const { document: project, error } = useDocument("projects", id);

  return (
    <div>
      {error ? (
        <div className="error">{error}</div>
      ) : project ? (
        <div className="project-details">
          <ProjectSummary project={project} />
          <ProjectComments project={project} />
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}
