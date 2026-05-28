const TaskCard = ({ task, onDelete, onToggle }) => {
  return (
    <div className="border p-4 rounded shadow mb-3">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-lg">{task.title}</h2>
          <p>{task.description}</p>
          <span>
            Status:
            {task.status}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggle(task)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Toggle
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;