import SignUpPage from "./SignUpPage.vue";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Sign Up Page", () => {
  describe("Layout", () => {
    it("has signup header", () => {
      render(SignUpPage);
      const header = screen.queryByRole("heading", { name: "Sign Up Page" });

      expect(header).toBeInTheDocument();
    });

    it("has username input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("Username");
      expect(input).toBeInTheDocument();
    });
    it("has email input", () => {
      render(SignUpPage);
      const input = screen.queryByTestId("emailInput");
      expect(input).toBeInTheDocument();
    });
    it("has password input", () => {
      render(SignUpPage);
      const input = screen.queryByTestId("passwordInput");
      expect(input).toBeInTheDocument();
    });
    it("has passowrd type for passowrd input", () => {
      render(SignUpPage);
      const input = screen.queryByTestId("passwordInput");
      expect(input).toHaveAttribute("type", "password");
    });

    it("has password repeat input", () => {
      render(SignUpPage);
      const input = screen.queryByTestId("passwordRepeatInput");
      expect(input).toBeInTheDocument();
    });
    it("has passowrd type for passowrd repeat input", () => {
      render(SignUpPage);
      const input = screen.queryByTestId("passwordRepeatInput");
      expect(input).toHaveAttribute("type", "password");
    });

    it("has sign up button", () => {
      render(SignUpPage);
      const button = screen.queryByTestId("submit");
      expect(button).toBeInTheDocument();
    });

    it("has disabled button initially", () => {
      render(SignUpPage);
      const button = screen.queryByTestId("submit");
      expect(button).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("enables the sign up button when the password and password repeat fields have same value", async () => {
      render(SignUpPage);
      const passowrd = screen.queryByTestId("passwordInput");
      const passowrdRepeat = screen.queryByTestId("passwordRepeatInput");
      const button = screen.queryByTestId("submit");

      await userEvent.type(passowrd, 'P@$$word4')
      await userEvent.type(passowrdRepeat, 'P@$$word4')
      
      expect(button).not.toBeDisabled()
    });
  });
});
