import "./Dashboard.css";

import ProjectList from "./ProjectList";
import { useCollection } from "../../hooks/useCollection";

export default function Dashboard() {
  const { documents: projects, error } = useCollection("projects");

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
