import { render, screen } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { rest } from "msw";
import AccountActivationPage from "./AccountActivationPage.vue";

const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(async () => await server.close());

describe("Account Activation Page", () => {
  const setup = (token) => {
    render(AccountActivationPage, {
      global: {
        mocks: {
          $route: {
            params: {
              token,
            },
          },
        },
      },
    });
  };

  let counter;
  beforeEach(() => {
    counter = 0;
    server.use(
      rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
        counter += 1;
        if (req.params.token === "5678")
          return res(
            ctx.status(400),
            ctx.json({ message: "Activation Failure" })
          );
        return res(ctx.status(200));
      })
    );
  });

  it("displays activation success message when token is correct", async () => {
    setup("1234");

    const messageBox = await screen.findByTestId("success-message-box");
    expect(messageBox).toBeInTheDocument();
  });
  it("sends activation request to backend", async () => {
    setup("1234");
    await screen.findByTestId("success-message-box");
    expect(counter).toBe(1);
  });

  it("displays activation failure message when token is incorrect", async () => {
    setup("5678");

    const messageBox = await screen.findByTestId("failure-message-box");
    expect(messageBox).toBeInTheDocument();
  });

  it("displays spinner during activation api call", async () => {
    setup("5678");
    const spinner = await screen.findByRole("status");
    expect(spinner).toBeInTheDocument();

    await screen.findByTestId("failure-message-box");
    expect(spinner).not.toBeInTheDocument();
  });
});
