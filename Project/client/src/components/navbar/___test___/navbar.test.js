import { render, screen } from "@testing-library/react";
import navbar from "../navbar";

//testing
test("testing display function", () => {
  render(<navbar navLink="navbar-brand" />);
  const LinkElement = screen.getByRole("link", { name: /home/i });
  expect(LinkElement).toBeInTheDocument();
});
