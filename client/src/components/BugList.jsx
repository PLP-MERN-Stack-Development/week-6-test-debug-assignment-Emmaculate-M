import React from "react";
import BugItem from "./BugItem";

const BugList = ({ bugs, onUpdateStatus, onDelete }) => {
  return (
    <div className="mt-6">
      {bugs.length === 0 ? (
        <p className="text-gray-500 text-center">No bugs reported.</p>
      ) : (
        bugs.map((bug) => (
          <BugItem
            key={bug.id}
            bug={bug}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
        />

        ))
      )}
    </div>
  );
};

export default BugList;
