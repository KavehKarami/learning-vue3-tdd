import { render, screen } from "@testing-library/vue";
import LoginPage from "./LoginPage.vue";

describe("Login Page", () => {
  const setup = async () => {
    render(LoginPage);
  };
  describe("Layout", () => {
    it("has login header", async () => {
      await setup();
      const header = screen.queryByRole("heading", { name: "Login" });

      expect(header).toBeInTheDocument();
    });

    it("has email input", async () => {
      await setup();
      const input = screen.queryByTestId("emailInput");
      expect(input).toBeInTheDocument();
    });
    it("has password input", async () => {
      await setup();
      const input = screen.queryByTestId("passwordInput");
      expect(input).toBeInTheDocument();
    });

    it("has Login button", async () => {
      await setup();
      const button = screen.queryByTestId("submit");
      expect(button).toBeInTheDocument();
    });

    it("has disabled button initially", async () => {
      await setup();
      const button = screen.queryByTestId("submit");
      expect(button).toBeDisabled();
    });
  });
});
