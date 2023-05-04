import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import LoginPage from "./LoginPage.vue";

let requestBody,
  counter = 0;
const server = setupServer(
  rest.post("/api/1.0/auth", async (req, res, ctx) => {
    counter += 1;
    requestBody = await req.json();
    return res(ctx.status(401), ctx.json({ message: "Incorrect credentials" }));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

afterAll(async () => await server.close());

let emailInput, passwordInput, button;
const setup = async () => {
  render(LoginPage);

  emailInput = screen.queryByTestId("emailInput");
  passwordInput = screen.queryByTestId("passwordInput");
  button = screen.queryByTestId("submit");
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
    const setupFilled = async () => {
      await setup();
      await userEvent.type(emailInput, "user@mail.com");
      await userEvent.type(passwordInput, "Aa123456");
    };
    it("enables the button when email and password inputs are filled", async () => {
      await setupFilled();

      expect(button).toBeEnabled();
    });
    it("displays spinner after clicking the button", async () => {
      await setupFilled();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      userEvent.click(button);
      expect(await screen.findByRole("status")).toBeInTheDocument();
    });

    it("hides spinner after api request is finished", async () => {
      await setupFilled();
      await userEvent.click(button);

      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("sends email and password to backend after clicking the submit button", async () => {
      await setupFilled();
      await userEvent.click(button);

      expect(requestBody).toEqual({
        email: "user@mail.com",
        password: "Aa123456",
      });
    });

    it("disable button when there is an api call", async () => {
      await setupFilled();
      userEvent.click(button);
      userEvent.click(button);
      await screen.findByRole("status");
      expect(counter).toBe(1);
    });
    it("display authentication fail message", async () => {
      await setupFilled();
      await userEvent.click(button);
      const failMessage = await screen.findByText("Incorrect credentials");
      expect(failMessage).toBeInTheDocument();
    });
    it("clears authentication fail message when email field is changed", async () => {
      await setupFilled();
      await userEvent.click(button);
      const failMessage = await screen.findByText("Incorrect credentials");
      await userEvent.type(emailInput, "newEmail@mail.com");

      expect(failMessage).not.toBeInTheDocument();
    });

    it("clears authentication fail message when password field is changed", async () => {
      await setupFilled();
      await userEvent.click(button);
      const failMessage = await screen.findByText("Incorrect credentials");
      await userEvent.type(passwordInput, "adsasd123123");
      expect(failMessage).not.toBeInTheDocument();
    });
  });
});
