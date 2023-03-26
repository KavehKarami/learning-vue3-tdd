import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import i18n from "./locales/i18n";
import App from "./App.vue";

describe("Routing", () => {
  it.each`
    path         | pageTestId
    ${"/"}       | ${"home-page"}
    ${"/signup"} | ${"signup-page"}
  `("displays $pageTestId at $path", ({ path, pageTestId }) => {
    window.history.pushState({}, "", path);
    render(App, { global: { plugins: [i18n] } });

    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });

  it.each`
    path         | pageTestId
    ${"/signup"} | ${"home-page"}
    ${"/"}       | ${"signup-page"}
  `("not displays $pageTestId when at $path", ({ path, pageTestId }) => {
    window.history.pushState({}, "", path);
    render(App, { global: { plugins: [i18n] } });

    const page = screen.queryByTestId(pageTestId);
    expect(page).not.toBeInTheDocument();
  });
});
