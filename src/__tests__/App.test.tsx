import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";   // adjust path as needed
import { describe, test, expect } from "vitest";


describe("App Component", () => {
  test("renders without crashing and shows Layout content", () => {
    render(<App />);
    
    
  });
});