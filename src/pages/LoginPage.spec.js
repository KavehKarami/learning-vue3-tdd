import { render, screen } from "@testing-library/vue";
import LoginPage from "./LoginPage.vue";
import userEvent from "@testing-library/user-event";

const setup = async () => {
  render(LoginPage);
};

describe("Login Page", () => {
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

  describe("Interactions", () => {
    it("enables the button when email and password inputs are filled", async () => {
      await setup();
      const emailInput = screen.queryByTestId("emailInput");
      const passwordInput = screen.queryByTestId("passwordInput");

      await userEvent.type(emailInput, "user@mail.com");
      await userEvent.type(passwordInput, "Aa123456");

      const submit = screen.queryByTestId("submit");
      expect(submit).toBeEnabled();
    });
  });
});
