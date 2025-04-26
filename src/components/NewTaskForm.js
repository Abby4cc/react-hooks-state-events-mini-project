import React, { useState } from 'react';

function NewTaskForm({ categories, onTaskFormSubmit }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0] || '');  // Ensures a fallback if no categories

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text && category) {
      onTaskFormSubmit({ text, category });
      setText('');
      setCategory(categories[0] || '');  // Resets category to first available category
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Task Details
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task details"
            required
          />
        </label>
      </div>
      
      <div>
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <button type="submit" disabled={!text || !category}>
          Add Task
        </button>
      </div>
    </form>
  );
}

export default NewTaskForm;
