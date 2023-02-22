import SignUpPage from "./SignUpPage.vue";
import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";

it("has signup header", () => {
  render(SignUpPage);
  const header = screen.queryByRole("heading", { name: "Sign Up Page" });

  expect(header).toBeInTheDocument();
});
