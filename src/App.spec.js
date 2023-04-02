import { render, screen } from "@testing-library/vue";
import i18n from "./locales/i18n";
import router from "./routes/router";
import App from "./App.vue";
import userEvent from "@testing-library/user-event";

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
    path         | pageTestId
    ${"/"}       | ${"signup-page"}
    ${"/"}       | ${"login-page"}
    ${"/"}       | ${"user-page"}
    ${"/login"}  | ${"home-page"}
    ${"/login"}  | ${"signup-page"}
    ${"/login"}  | ${"user-page"}
    ${"/signup"} | ${"login-page"}
    ${"/signup"} | ${"home-page"}
    ${"/signup"} | ${"user-page"}
    ${"/user/1"} | ${"signup-page"}
    ${"/user/1"} | ${"login-page"}
    ${"/user/1"} | ${"home-page"}
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
