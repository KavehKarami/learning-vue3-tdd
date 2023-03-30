import { render, screen } from "@testing-library/vue";
import i18n from "./locales/i18n";
import App from "./App.vue";
import userEvent from "@testing-library/user-event";

const setup = (path) => {
  window.history.pushState({}, "", path);
  render(App, { global: { plugins: [i18n] } });
};

describe("Routing", () => {
  it.each`
    path         | pageTestId
    ${"/"}       | ${"home-page"}
    ${"/signup"} | ${"signup-page"}
    ${"/login"}  | ${"login-page"}
    ${"/user/1"} | ${"user-page"}
  `("displays $pageTestId at $path", ({ path, pageTestId }) => {
    setup(path);
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
  `("not displays $pageTestId when at $path", ({ path, pageTestId }) => {
    setup(path);

    const page = screen.queryByTestId(pageTestId);
    expect(page).not.toBeInTheDocument();
  });
});

describe.each`
  href         | targetPageLink         | pageTestId
  ${"/signup"} | ${"homepage-nav-link"} | ${"home-page"}
  ${"/"}       | ${"signup-nav-link"}   | ${"signup-page"}
  ${"/"}       | ${"login-nav-link"}    | ${"login-page"}
`("Navbar", ({ href, targetPageLink, pageTestId }) => {
  it(`has link to ${targetPageLink} on Navbar`, () => {
    setup("/");
    const link = screen.queryByTestId(targetPageLink);
    expect(link).toBeInTheDocument();
  });

  it(`display ${pageTestId}  after clicking ${targetPageLink} link`, async () => {
    setup(href);
    const link = screen.queryByTestId(targetPageLink);
    await userEvent.click(link);

    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });
});
