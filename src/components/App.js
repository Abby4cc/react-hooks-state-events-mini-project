import React, { useState } from 'react';
import TaskList from './TaskList';
import CategoryFilter from './CategoryFilter';
import NewTaskForm from './NewTaskForm';
import { TASKS as INITIAL_TASKS, CATEGORIES } from '../data'; // Import constants with a different name

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS); // Use INITIAL_TASKS to avoid naming conflict
  const [filteredCategory, setFilteredCategory] = useState("All");

  // Handle category selection from the filter
  const handleCategorySelect = (category) => {
    setFilteredCategory(category);
  };

  // Handle form submission to add a new task
  const handleTaskFormSubmit = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
  };

  // Handle task deletion by id
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Filter tasks based on selected category
  const filteredTasks = filteredCategory === "All"
    ? tasks
    : tasks.filter(task => task.category === filteredCategory);

  return (
    <div>
      <CategoryFilter
        categories={CATEGORIES}
        onCategorySelect={handleCategorySelect}
      />
      <NewTaskForm
        categories={CATEGORIES}
        onTaskFormSubmit={handleTaskFormSubmit}
      />
      <TaskList
        tasks={filteredTasks}  
        handleDeleteTask={handleDeleteTask}  
      />
    </div>
  );
}

export default App;

