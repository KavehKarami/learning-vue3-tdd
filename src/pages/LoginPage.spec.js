import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import LoginPage from "./LoginPage.vue";

let requestBody;
const server = setupServer(
  rest.post("/api/1.0/auth", async (req, res, ctx) => {
    requestBody = await req.json();
    return res(ctx.status(401));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
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
  });
});
