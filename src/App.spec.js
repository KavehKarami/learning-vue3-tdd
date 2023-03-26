import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import i18n from "./locales/i18n";
import App from "./App.vue";

describe("Routing", () => {
  it("displays Home Page at /", () => {
    render(App, { global: { plugins: [i18n] } });

    const page = screen.queryByTestId("home-page");
    expect(page).toBeInTheDocument();
  });
  it("not displays Sign Up Page when at /", () => {
    render(App, { global: { plugins: [i18n] } });

    const page = screen.queryByTestId("signup-page");
    expect(page).not.toBeInTheDocument();
  });
  it("displays Sign Up Page when at /signup", () => {
    window.history.pushState({}, "", "/signup");
    render(App, { global: { plugins: [i18n] } });

    const page = screen.queryByTestId("signup-page");
    expect(page).toBeInTheDocument();
  });
  it("not displays Home Page when at /signup", () => {
    window.history.pushState({}, "", "/signup");
    render(App, { global: { plugins: [i18n] } });

    const page = screen.queryByTestId("home-page");
    expect(page).not.toBeInTheDocument();
  });
});
