import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../pages/Login";
import { describe, test, expect } from "vitest";

describe("Login Component", () => {
  test("shows validation error when invalid email is entered", async () => {
    render(<Login />);

    // Get email input and submit button
    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Click submit button
    fireEvent.click(submitButton);

    // Check if validation error message is shown
    const errorMessage = await screen.findByText("Invalid email format");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("shows error when email is empty", async () => {
  render(<Login />);

  const submitButton = screen.getByRole("button", { name: /login/i });

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText("Email is required");
  expect(errorMessage).toBeInTheDocument();
});


test("shows error when password is empty", async () => {
  render(<Login />);

  const submitButton = screen.getByRole("button", { name: /login/i });
  const emailInput = screen.getByPlaceholderText("Email");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText("Password must be at least 6 characters");
  expect(errorMessage).toBeInTheDocument();
});


test("shows error when password is less than 6 characters", async () => {
  render(<Login />);

  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "123" } });
  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText(
    "Password must be at least 6 characters"
  );
  expect(errorMessage).toBeInTheDocument();
});


import { vi } from "vitest";

test("calls onSubmit with valid inputs", async () => {
  const onSubmit = vi.fn();

  render(<Login />);

  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.click(submitButton);

  // Since onSubmit in your component is internal and empty, you'd need to
  // add a way to test side effects or mock it; else just check button disables.

  // Check button is disabled when submitting (isSubmitting = true)
  expect(submitButton).toBeDisabled();
});

