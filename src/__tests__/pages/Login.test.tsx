import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../pages/Login";
import { describe, test, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import authReducer from "../../features/auth/authSlice"; // adjust if needed

// Utility to render with Redux + Router
const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("Login Component", () => {
  test("shows validation error when invalid email is entered", async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Invalid email format");
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error when email is empty", async () => {
    renderWithProviders(<Login />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error when password is empty", async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Password must be at least 6 characters");
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error when password is less than 6 characters", async () => {
    renderWithProviders(<Login />);

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

  test("calls onSubmit with valid inputs", async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(submitButton);

    // Check the button is disabled to confirm form is submitting
    expect(submitButton).toBeDisabled();
  });
});
