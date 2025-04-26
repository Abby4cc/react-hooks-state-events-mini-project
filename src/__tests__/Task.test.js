import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";
import Task from "../components/Task";

test("is removed from the list when the delete button is clicked", () => {
  render(<App />);

  // Assuming "Buy rice" task exists on the list
  const taskText = screen.queryByText("Buy rice");
  const deleteButton = taskText.closest('div').querySelector('button');

  fireEvent.click(deleteButton);

  expect(screen.queryByText("Buy rice")).not.toBeInTheDocument();
});
