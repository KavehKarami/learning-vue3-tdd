import { render, screen, waitFor } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { rest } from "msw";
import UserPage from "./UserPage.vue";

const server = setupServer(
  rest.get("/api/1.0/users/:id", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: "user1",
        email: "user1@gmail.com",
        image: null,
        id: 1,
      })
    );
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

describe("User Page", () => {
  it("displays username on page when user is found", async () => {
    render(UserPage, {
      global: {
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
    });

    await waitFor(() => {
      expect(screen.queryByText("user1")).toBeInTheDocument();
    });
  });
});
