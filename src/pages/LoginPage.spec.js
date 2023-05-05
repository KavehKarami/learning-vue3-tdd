import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import LoginPage from "./LoginPage.vue";
import LanguageSelector from "../components/LanguageSelector.vue";
import i18n from "../locales/i18n";
import en from "../locales/en.json";
import fa from "../locales/fa.json";

let requestBody,
  acceptLanguage,
  counter = 0;
const server = setupServer(
  rest.post("/api/1.0/auth", async (req, res, ctx) => {
    counter += 1;
    requestBody = await req.json();
    acceptLanguage = req.headers.get("Accept-Language");
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
  render(LoginPage, { global: { plugins: [i18n] } });

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

  describe("Internationalization", () => {
    let persianLanguage, passowrdInput, button, emailInput;
    const setupTranslation = () => {
      const app = {
        name: "App",
        components: {
          LoginPage,
          LanguageSelector,
        },
        template: `<login-page /><language-selector />`,
      };
      render(app, { global: { plugins: [i18n] } });

      persianLanguage = screen.queryByTestId("persianLang");
      emailInput = screen.queryByTestId("emailInput");
      passowrdInput = screen.queryByTestId("passwordInput");
      button = screen.queryByTestId("submit");
    };

    it("initially displays all text in english", async () => {
      setupTranslation();
      expect(
        screen.queryByRole("heading", { name: en.login })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: en.login })
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(en.email)).toBeInTheDocument();
      expect(screen.queryByLabelText(en.password)).toBeInTheDocument();
    });
    it("displays all text in persian after changing language", async () => {
      setupTranslation();
      await userEvent.click(persianLanguage);
      expect(
        screen.queryByRole("heading", { name: fa.login })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: fa.login })
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(fa.email)).toBeInTheDocument();
      expect(screen.queryByLabelText(fa.password)).toBeInTheDocument();
    });

    xit("sends accept-language header as fa in login request", async () => {
      setupTranslation();
      await userEvent.click(persianLanguage);
      await userEvent.type(emailInput, "a");
      await userEvent.type(passowrdInput, "asd");
      await userEvent.click(button);
      expect(acceptLanguage).toBe("fa");
    });
  });
}); 
