import { render, screen } from "@testing-library/vue";
import i18n from "./locales/i18n";
import router from "./routes/router";
import App from "./App.vue";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/1.0/users", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: 1,
            username: "user-in-list",
            email: "user-in-list@mail.com",
            image: null,
          },
        ],
        page: 0,
        size: 0,
        totalPages: 0,
      })
    );
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(async () => await server.close());

const setup = async (path) => {
  render(App, { global: { plugins: [i18n, router] } });
  router.replace(path);
  await router.isReady();
};

describe("Routing", () => {
  it.each`
    path               | pageTestId
    ${"/"}             | ${"home-page"}
    ${"/signup"}       | ${"signup-page"}
    ${"/login"}        | ${"login-page"}
    ${"/user/1"}       | ${"user-page"}
    ${"/activate/123"} | ${"activation-page"}
    ${"/activate/321"} | ${"activation-page"}
  `("displays $pageTestId at $path", async ({ path, pageTestId }) => {
    await setup(path);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });

  it.each`
    path               | pageTestId
    ${"/"}             | ${"signup-page"}
    ${"/"}             | ${"login-page"}
    ${"/"}             | ${"user-page"}
    ${"/"}             | ${"activation-page"}
    ${"/login"}        | ${"home-page"}
    ${"/login"}        | ${"signup-page"}
    ${"/login"}        | ${"user-page"}
    ${"/login"}        | ${"activation-page"}
    ${"/signup"}       | ${"login-page"}
    ${"/signup"}       | ${"home-page"}
    ${"/signup"}       | ${"user-page"}
    ${"/signup"}       | ${"activation-page"}
    ${"/user/1"}       | ${"signup-page"}
    ${"/user/1"}       | ${"login-page"}
    ${"/user/1"}       | ${"home-page"}
    ${"/user/1"}       | ${"activation-page"}
    ${"/activate/123"} | ${"home-page"}
    ${"/activate/123"} | ${"signup-page"}
    ${"/activate/123"} | ${"login-page"}
    ${"/activate/123"} | ${"user-page"}
  `("not displays $pageTestId when at $path", async ({ path, pageTestId }) => {
    await setup(path);

    const page = screen.queryByTestId(pageTestId);
    expect(page).not.toBeInTheDocument();
  });

  it("display home page when clicking brand logo", async () => {
    await setup("/login");
    const brandLogo = screen.queryByTestId("brand-logo");
    await userEvent.click(brandLogo);
    const page = screen.queryByTestId("home-page");
    expect(page).toBeInTheDocument();
  });

  it("navigates to user page when clicking the username on user list", async () => {
    await setup("/");
    const user = await screen.findByText("user-in-list");
    await userEvent.click(user);

    const page = screen.queryByTestId("user-page");
    expect(page).toBeInTheDocument();
  });
});

describe.each`
  href         | targetPageLink         | pageTestId
  ${"/signup"} | ${"homepage-nav-link"} | ${"home-page"}
  ${"/"}       | ${"signup-nav-link"}   | ${"signup-page"}
  ${"/"}       | ${"login-nav-link"}    | ${"login-page"}
`("Navbar", ({ href, targetPageLink, pageTestId }) => {
  it(`has link to ${targetPageLink} on Navbar`, async () => {
    await setup("/");
    const link = await screen.findByTestId(targetPageLink);
    expect(link).toBeInTheDocument();
  });

  it(`display ${pageTestId}  after clicking ${targetPageLink} link`, async () => {
    await setup(href);
    const link = screen.queryByTestId(targetPageLink);
    await userEvent.click(link);

    const page = await screen.findByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });
});
