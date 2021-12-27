const filterList = ["All", "Assigned to Me", "Development", "Design", "Marketing", "Sales"];

export default function ProjectFilter({ currentFilter, changeFilter }) {
  return (
    <div className="project-filter">
      <nav>
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => changeFilter(filter)}
            className={currentFilter === filter ? "active" : null}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}
