import { render, screen } from "@testing-library/vue";
import BaseInput from "./BaseInput.vue";

describe("BaseInput", () => {
  it("has is-invalid class for input when help is set", () => {
    render(BaseInput, {
      props: {
        title: "username",
        help: "This is a validation message",
        id: "testInput",
      },
      attrs: {
        "data-testid": "input-testid",
      },
    });
    const input = screen.queryByTestId("input-testid");
    expect(input).toHaveClass("is-invalid");
  });
  it("has not is-invalid class for input when help is not set", () => {
    render(BaseInput, {
      props: {
        title: "username",
        id: "testInput",
      },
      attrs: {
        "data-testid": "input-testid",
      },
    });
    const input = screen.queryByTestId("input-testid");
    expect(input).not.toHaveClass("is-invalid");
  });

  it("has invalid-feedback class for validation message tag when help is set", () => {
    const { container } = render(BaseInput, {
      props: {
        title: "username",
        help: "This is a validation message",
        id: "testInput",
      },
      attrs: {
        "data-testid": "input-testid",
      },
    });
    expect(container.querySelector("span")).toHaveClass("invalid-feedback");
  });
});
