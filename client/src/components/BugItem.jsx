import React from 'react';

const BugItem = ({ bug, onUpdateStatus, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow mb-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{bug.title}</h3>
        <span className="text-sm text-gray-600">
          Status:{" "}
          <span className={`font-semibold ${
            bug.status === 'resolved' ? 'text-green-600' :
            bug.status === 'in-progress' ? 'text-blue-600' :
            'text-gray-500'
          }`}>
            {bug.status}
          </span>
        </span>
      </div>
      <p className="text-gray-700">{bug.description}</p>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onUpdateStatus(bug.id, 'in-progress')}
        >
          In Progress
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={() => onUpdateStatus(bug.id, 'resolved')}
        >
          Resolved
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(bug.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BugItem;
