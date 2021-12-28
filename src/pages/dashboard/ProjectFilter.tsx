const filterList = ["All", "Assigned to Me", "Development", "Design", "Marketing", "Sales"];

type Props = {
  currentFilter: string;
  changeFilter: (filter: string) => void;
};

export default function ProjectFilter({ currentFilter, changeFilter }: Props) {
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
