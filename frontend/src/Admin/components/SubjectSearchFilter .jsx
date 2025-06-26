import React, { useEffect } from "react";

const SubjectSearchFilter = ({ search, setSearch, filterClass, setFilterClass, classList }) => {
  useEffect(() => {
    setFilterClass(classList[0]._id)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by Subject Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border bg-white outline-0 border-gray-200 rounded-md w-full sm:w-1/2 text-sm"
      />
      <select
        value={filterClass}
        onChange={(e) => setFilterClass(e.target.value)}
        className="px-4 py-2 border rounded-md outline-0 bg-white border-gray-200 w-full sm:w-1/2 text-sm"
      >
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
