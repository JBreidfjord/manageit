import "./Dashboard.css";

import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { ProjectType } from "../../types";

export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState("All");
  const { documents: projects, error } = useCollection<ProjectType>("projects");
  const { user } = useAuthContext();

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  const filteredProjects = projects
    ? projects.filter((project) => {
        switch (currentFilter) {
          case "All":
            return true;
          case "Assigned to Me":
            return project.assignedUsersList.some((assignedUser) => assignedUser.id === user.uid);
          case "Development":
          case "Design":
          case "Marketing":
          case "Sales":
            return project.category === currentFilter;
          default:
            return true;
        }
      })
    : [];

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {filteredProjects && (
        <>
          <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />
          <ProjectList projects={filteredProjects} />
        </>
      )}
    </div>
  );
}
