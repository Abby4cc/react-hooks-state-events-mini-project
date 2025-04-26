import Task from "./Task";

function TaskList({ tasks, handleDeleteTask }) {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task.id} // Ensure `task.id` is unique
            text={task.text}
            category={task.category}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default TaskList;
