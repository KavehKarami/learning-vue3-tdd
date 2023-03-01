import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
// import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";
import SignUpPage from "./SignUpPage.vue";

/**
 * REVIEW:
 * Mocking Api Calls:
 * 1. if app use axios, we can easily mock axios
 * 2. if app use fetch, we need to install `whatwg-fetch` as a development dependency (because node dosnt have fetch as built-in), and mock fetch in this way: `window.fetch = jest.fn()`
 * ***3. it's posible in one project to use another api call library or refactor and change previous api call library, so our test failling :(
 * so it's better to use `msw` library to mock api call, `npm i -D msw`
 */

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

      await userEvent.type(passowrd, "P@$$word4");
      await userEvent.type(passowrdRepeat, "P@$$word4");

      expect(button).not.toBeDisabled();
    });
    it("sends username email and password to backend after clicking the button", async () => {
      let requestBody;
      const server = setupServer(
        rest.post("/api/1.0/users", async (req, res, ctx) => {
          requestBody = await req.json();
          return res(ctx.json({ status_code: 200 }));
        })
      );
      server.listen();

      render(SignUpPage);
      const username = screen.queryByLabelText("Username");
      const email = screen.queryByTestId("emailInput");
      const passowrd = screen.queryByTestId("passwordInput");
      const passowrdRepeat = screen.queryByTestId("passwordRepeatInput");
      const button = screen.queryByTestId("submit");

      await userEvent.type(passowrd, "P@$$word4");
      await userEvent.type(passowrdRepeat, "P@$$word4");
      await userEvent.type(username, "user1");
      await userEvent.type(email, "user1@gmail.com");

      // const mockFn = jest.fn();
      // axios.post = mockFn;

      await userEvent.click(button);

      // const firstCall = mockFn.mock.calls[0];
      // const body = firstCall[1];

      await server.close();

      expect(requestBody).toEqual({
        username: "user1",
        email: "user1@gmail.com",
        password: "P@$$word4",
      });
    });
    it("does not allow clicking to the button when there is an outgoing api call", async () => {
      let counter = 0;
      const server = setupServer(
        rest.post("/api/1.0/users", async (req, res, ctx) => {
          counter += 1;
          return res(ctx.json({ status_code: 200 }));
        })
      );
      server.listen();

      render(SignUpPage);
      const username = screen.queryByLabelText("Username");
      const email = screen.queryByTestId("emailInput");
      const passowrd = screen.queryByTestId("passwordInput");
      const passowrdRepeat = screen.queryByTestId("passwordRepeatInput");
      const button = screen.queryByTestId("submit");

      await userEvent.type(passowrd, "P@$$word4");
      await userEvent.type(passowrdRepeat, "P@$$word4");
      await userEvent.type(username, "user1");
      await userEvent.type(email, "user1@gmail.com");

      userEvent.click(button);
      userEvent.click(button);

      await waitFor(() => {
        expect(counter).toBe(1);
      })
      await server.close();
    });
  });
});
