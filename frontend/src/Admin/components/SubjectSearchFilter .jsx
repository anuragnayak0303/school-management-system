import React from "react";

const SubjectSearchFilter = ({ search, setSearch, filterClass, setFilterClass, classList }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by Subject Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border rounded-md w-full sm:w-1/2 text-sm"
      />
      <select
        value={filterClass}
        onChange={(e) => setFilterClass(e.target.value)}
        className="px-4 py-2 border rounded-md w-full sm:w-1/2 text-sm"
      >
        <option value="">All Classes</option>
        {classList.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.Classname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectSearchFilter;
