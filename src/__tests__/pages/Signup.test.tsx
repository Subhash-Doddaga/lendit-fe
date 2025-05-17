import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../../pages/Signup"; // adjust path as needed
import { describe, test, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import { BrowserRouter } from "react-router-dom";

// Helper to render with Redux and Router
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

describe("Signup Component", () => {
  test("shows error when firstname is empty", async () => {
    renderWithProviders(<Signup />);

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    const errorMessage = await screen.findByText("Firstname is Required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error when email is empty", async () => {
    renderWithProviders(<Signup />);

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    const errorMessage = await screen.findByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error when email is invalid", async () => {
    renderWithProviders(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    const errorMessage = await screen.findByText("Invalid email format");
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error when password is empty", async () => {
    renderWithProviders(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    const errorMessage = await screen.findByText(
      "Password must be at least 6 characters"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error when password is less than 6 characters", async () => {
    renderWithProviders(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Firstname"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    const errorMessage = await screen.findByText(
      "Password must be at least 6 characters"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("submit button disables when submitting valid data", async () => {
    renderWithProviders(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Firstname"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });
});
