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
    let requestBody;
    let counter = 0;
    const server = setupServer(
      rest.post("/api/1.0/users", async (req, res, ctx) => {
        counter += 1;
        requestBody = await req.json();
        return res(ctx.json({ status_code: 200 }));
      })
    );

    beforeAll(() => server.listen());

    beforeEach(() => {
      counter = 0;
      server.resetHandlers();
    });

    afterAll(async () => await server.close());

    let button, passowrd, passowrdRepeat, username;
    const setup = async () => {
      render(SignUpPage);
      username = screen.queryByTestId("usernameInput");
      const email = screen.queryByTestId("emailInput");
      passowrd = screen.queryByTestId("passwordInput");
      passowrdRepeat = screen.queryByTestId("passwordRepeatInput");
      button = screen.queryByTestId("submit");

      await userEvent.type(passowrd, "P@$$word4");
      await userEvent.type(passowrdRepeat, "P@$$word4");
      await userEvent.type(username, "user1");
      await userEvent.type(email, "user1@gmail.com");
    };

    const generateValidationError = (field, message) => {
      return rest.post("/api/1.0/users", async (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            validationErrors: {
              [field]: message,
            },
          })
        );
      });
    };

    it("enables the sign up button when the password and password repeat fields have same value", async () => {
      await setup();

      expect(button).not.toBeDisabled();
    });
    it("sends username email and password to backend after clicking the button", async () => {
      await setup();

      // const mockFn = jest.fn();
      // axios.post = mockFn;

      await userEvent.click(button);

      // const firstCall = mockFn.mock.calls[0];
      // const body = firstCall[1];

      expect(requestBody).toEqual({
        username: "user1",
        email: "user1@gmail.com",
        password: "P@$$word4",
      });
    });
    it("does not allow clicking to the button when there is an outgoing api call", async () => {
      await setup();

      userEvent.click(button);
      userEvent.click(button);

      await waitFor(() => {
        expect(counter).toBe(1);
      });
    });

    it("displays spinner while the api request in progress", async () => {
      await setup();

      userEvent.click(button);

      await waitFor(() => {
        const spinner = screen.queryByTestId("spinner");
        expect(spinner).toBeInTheDocument();
      });
    });
    it("not displays spinner while the api request not in progress", async () => {
      await setup();

      await userEvent.click(button);
      const spinner = screen.queryByTestId("spinner");

      expect(spinner).not.toBeInTheDocument();
    });

    it("not display spinner when there is no api call", async () => {
      const spinner = screen.queryByTestId("spinner");
      expect(spinner).not.toBeInTheDocument();
    });

    it("displays account activation information after successful sign up request", async () => {
      await setup();

      await userEvent.click(button);

      const accountActivation = await screen.findByTestId("account-activation");
      expect(accountActivation).toBeInTheDocument();
    });
    it("does not displays account activation information before sign up request", async () => {
      const accountActivation = screen.queryByTestId("account-activation");
      expect(accountActivation).not.toBeInTheDocument();
    });
    it("does not displays account activation information after failing sign up request", async () => {
      server.use(
        generateValidationError("username", "username cannot be null")
      );

      await setup();

      await userEvent.click(button);

      const accountActivation = screen.queryByTestId("account-activation");
      expect(accountActivation).not.toBeInTheDocument();
    });
    it("hides sign up form after successful sign up request", async () => {
      await setup();

      await userEvent.click(button);

      const signupForm = await screen.queryByTestId("signup-form");
      expect(signupForm).not.toBeInTheDocument();
    });
    it.each`
      field         | message
      ${"password"} | ${"password error"}
      ${"username"} | ${"username error"}
      ${"email"}    | ${"email error"}
    `("displays $message for $field", async ({ field, message }) => {
      server.use(generateValidationError(field, message));

      await setup();

      await userEvent.click(button);

      const input = await screen.findByTestId(`invalid-${field}`);
      expect(input).toBeInTheDocument();
    });
    it("displays mismatch message for password repeat input", async () => {
      await setup();
      await userEvent.type(passowrd, "P@word4");
      await userEvent.type(passowrdRepeat, "P@$$word4");

      const inputError = await screen.findByTestId("invalid-repeat-password");

      expect(inputError).toBeInTheDocument();
    });

    it.each`
      field         | message
      ${"password"} | ${"password error"}
      ${"username"} | ${"username error"}
      ${"email"}    | ${"email error"}
    `(
      "clears validation error after $field field is updated",
      async ({ field, message }) => {
        server.use(generateValidationError(field, message));
        await setup();
        await userEvent.click(button);
        const inputError = await screen.findByTestId(`invalid-${field}`);

        const input = screen.queryByTestId(`${field}Input`);
        await userEvent.type(input, "updated!");

        expect(inputError).not.toBeInTheDocument();
      }
    );
  });
});
