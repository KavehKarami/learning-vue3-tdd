import { render, screen } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { rest } from "msw";
import UserList from "./UserList.vue";

const server = setupServer(
  rest.get("/api/1.0/users", async (req, res, ctx) => {
    let page = +req.url.searchParams.get("page") || 0;
    let size = +req.url.searchParams.get("size") || 3;
    return res(ctx.status(200), ctx.json(getUsers(page, size)));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(async () => await server.close);

const getUsers = (page, size) => {
  const start = page * size;
  const end = start + size;
  const totalPages = Math.ceil(users.length / size);
  return {
    content: users.slice(start, end),
    page,
    size,
    totalPages,
  };
};

const users = [
  { id: 1, username: "user1", email: "user1@mail.com", image: null },
  { id: 2, username: "user2", email: "user2@mail.com", image: null },
  { id: 3, username: "user3", email: "user3@mail.com", image: null },
  { id: 4, username: "user4", email: "user4@mail.com", image: null },
  { id: 5, username: "user5", email: "user5@mail.com", image: null },
  { id: 6, username: "user6", email: "user6@mail.com", image: null },
  { id: 7, username: "user7", email: "user7@mail.com", image: null },
];

describe("User List", () => {
  it("displays theree users in list", async () => {
    render(UserList);

    const users = await screen.findAllByText(/user/);

    expect(users.length).toBe(3);
  });
});
