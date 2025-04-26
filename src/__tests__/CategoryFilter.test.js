import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "../components/CategoryFilter";
import App from "../components/App";
import { CATEGORIES } from "../data";

test("displays a button for each category", () => {
  render(<CategoryFilter categories={CATEGORIES} onCategorySelect={() => {}} />);
  
  // Check that each category button is rendered
  CATEGORIES.forEach(category => {
    expect(screen.queryByText(category)).toBeInTheDocument();
  });
});

test("clicking the category button adds a class of 'selected' to the button", () => {
  render(<App />);

  // Get the buttons for the categories
  const codeButton = screen.queryByRole("button", { name: "Code" });
  const allButton = screen.queryByRole("button", { name: "All" });

  // Simulate clicking on the "Code" category
  fireEvent.click(codeButton);

  // Check that the "Code" button now has the 'selected' class
  expect(codeButton.classList).toContain("selected");
  // Ensure that the "All" button does not have the 'selected' class
  expect(allButton.classList).not.toContain("selected");
});

test("clicking the category button filters the task list", () => {
  render(<App />);

  // Get the "Code" category button
  const codeButton = screen.queryByRole("button", { name: "Code" });

  // Simulate clicking on the "Code" category
  fireEvent.click(codeButton);

  // Check that tasks related to the "Code" category are displayed
  expect(screen.queryByText("Build a todo app")).toBeInTheDocument();
  // Ensure that tasks from other categories (like "Buy rice") are not shown
  expect(screen.queryByText("Buy rice")).not.toBeInTheDocument();
});

test("displays all tasks when the 'All' button is clicked", () => {
  render(<App />);

  // Get the "All" category button
  const allButton = screen.queryByRole("button", { name: "All" });

  // Simulate clicking on the "All" category
  fireEvent.click(allButton);

  // Ensure that all tasks are displayed
  expect(screen.queryByText("Build a todo app")).toBeInTheDocument();
  expect(screen.queryByText("Buy rice")).toBeInTheDocument();
});
