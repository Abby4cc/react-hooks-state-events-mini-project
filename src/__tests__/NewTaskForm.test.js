import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NewTaskForm from "../components/NewTaskForm";
import { CATEGORIES } from "../data";
import App from "../components/App";

test("calls the onTaskFormSubmit callback prop when the form is submitted", () => {
  const onTaskFormSubmit = jest.fn();
  render(
    <NewTaskForm categories={CATEGORIES} onTaskFormSubmit={onTaskFormSubmit} />
  );

  fireEvent.change(screen.getByLabelText(/Details/i), {
    target: { value: "Pass the tests" },
  });

  fireEvent.change(screen.getByLabelText(/Category/i), {
    target: { value: "Code" },
  });

  fireEvent.submit(screen.getByRole('button', { name: /add task/i }));

  expect(onTaskFormSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      text: "Pass the tests",
      category: "Code",
    })
  );
});

test("adds a new item to the list when the form is submitted", () => {
  render(<App />);

  const codeCount = screen.getAllByText(/Code/).length;

  fireEvent.change(screen.getByLabelText(/Details/i), {
    target: { value: "Pass the tests" },
  });

  fireEvent.change(screen.getByLabelText(/Category/i), {
    target: { value: "Code" },
  });

  fireEvent.submit(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByText(/Pass the tests/)).toBeInTheDocument();
  expect(screen.getAllByText(/Code/).length).toBe(codeCount + 1);
});
