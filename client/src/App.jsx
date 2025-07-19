import React, { useState } from "react";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";

const App = () => {
  const [bugs, setBugs] = useState([]);

  const addBug = (bug) => {
    const newBug = { ...bug, id: Date.now(), status: "not started" };
    setBugs([newBug, ...bugs]);
  };

  const updateStatus = (id, status) => {
    const updated = bugs.map((bug) =>
      bug.id === id ? { ...bug, status } : bug
    );
    setBugs(updated);
  };

  const deleteBug = (id) => {
    const filtered = bugs.filter((bug) => bug.id !== id);
    setBugs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          Bug Tracker
        </h1>      
        <BugForm onAddBug={addBug} />
        <BugList
          bugs={bugs}
          onUpdateStatus={updateStatus}
          onDelete={deleteBug}
        />
      </div>
    </div>
  );
};

export default App;
