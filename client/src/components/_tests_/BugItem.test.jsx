import { render, screen, fireEvent } from "@testing-library/react";
import BugItem from "../BugItem";
import React from "react";

describe("BugItem", () => {
  const mockBug = {
    id: 1,
    title: "Test Bug",
    description: "Bug description",
    status: "not started",
  };

  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    render(
      <BugItem
        bug={mockBug}
        onUpdateStatus={mockUpdate}
        onDelete={mockDelete}
      />
    );
  });

  it("renders the bug details", () => {
    expect(screen.getByText("Test Bug")).toBeInTheDocument();
    expect(screen.getByText("Bug description")).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  it("calls onUpdateStatus with 'in-progress'", () => {
    fireEvent.click(screen.getByText("In Progress"));
    expect(mockUpdate).toHaveBeenCalledWith(1, "in-progress");
  });

  it("calls onUpdateStatus with 'resolved'", () => {
    fireEvent.click(screen.getByText("Resolved"));
    expect(mockUpdate).toHaveBeenCalledWith(1, "resolved");
  });

  it("calls onDelete when delete button clicked", () => {
    fireEvent.click(screen.getByText("Delete"));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
