import { render, screen } from "@testing-library/react";
import Create from "../createItem";

//testing
test("testing display function", () => {
  render(<Create />);
  const Element = screen.getByLabelText(/Product_id/i);
  expect(Element).toBeInTheDocument();
});
