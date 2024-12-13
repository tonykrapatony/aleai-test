import { render, screen } from "@testing-library/react";
import Form from "./Form";

test("renders Form component", () => {
  render(<Form />);
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("Apply")).toBeInTheDocument();
});

