import "./Project.css";

import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";
import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import { ProjectType } from "../../types";

export default function Project() {
  let { id } = useParams();
  if (id === undefined) {
    id = "";
  }
  const { document: project, error } = useDocument<ProjectType>("projects", id);

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
