import { render, screen } from "@testing-library/vue";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import UserList from "./UserList.vue";
import router from "../routes/router";

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
  const setup = async () => {
    render(UserList, { global: { plugins: [router] } });
    await router.isReady();
  };
  it("displays theree users in list", async () => {
    await setup();

    const users = await screen.findAllByText(/user/);

    expect(users.length).toBe(3);
  });
  it("displays next page link", async () => {
    await setup();
    await screen.findByText("user1");
    const nextPageLink = await screen.findByText("next >");
    expect(nextPageLink).toBeInTheDocument();
  });
  it("displays next page after clicking next link", async () => {
    await setup();
    await screen.findByText("user1");
    const nextPageLink = await screen.findByText("next >");
    await userEvent.click(nextPageLink);
    const page2 = await screen.findByText("user4");
    expect(page2).toBeInTheDocument();
  });
  it("hides next page link at last page", async () => {
    await setup();
    const nextPageLink = await screen.findByText("next >");
    await userEvent.click(nextPageLink);
    await userEvent.click(nextPageLink);
    await screen.findByText("user7");
    expect(nextPageLink).not.toBeInTheDocument();
  });
  it("does not display the previous page link in the first page", async () => {
    await setup();
    await screen.findByText("user1");
    const previousPageLink = await screen.queryByText("< previous");
    expect(previousPageLink).not.toBeInTheDocument();
  });
  it("displays the previous page link in page 2", async () => {
    await setup();
    const nextPageLink = await screen.findByText("next >");
    await userEvent.click(nextPageLink);
    const previousPageLink = await screen.findByText("< previous");
    expect(previousPageLink).toBeInTheDocument();
  });
  it("displays previous page after clicking the previous page link", async () => {
    await setup();
    const nextPageLink = await screen.findByText("next >");
    await userEvent.click(nextPageLink);
    const previousPageLink = await screen.findByText("< previous");
    await userEvent.click(previousPageLink);
    const page1 = await screen.findByText("user1");
    expect(page1).toBeInTheDocument();
  });
});
