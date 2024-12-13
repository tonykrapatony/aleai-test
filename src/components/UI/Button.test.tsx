import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders Button with correct text", () => {
  render(<Button type="submit" text="Apply" disabled={false} />);
  const button = screen.getByText("Apply");
  expect(button).toBeInTheDocument();
  expect(button).not.toBeDisabled();
});

test("disables Button when disabled is true", () => {
  render(<Button type="submit" text="Apply" disabled={true} />);
  const button = screen.getByText("Apply");
  expect(button).toBeDisabled();
});
