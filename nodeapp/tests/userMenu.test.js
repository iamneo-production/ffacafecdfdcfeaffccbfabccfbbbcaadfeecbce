const request = require("supertest");
require('../index')

describe("User module menu API testing", () => {
  test("Week9_Day3_Get_all_menu_items", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/getAllMenu"
    );
    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty("name");
    expect(response.body.data[0]).toHaveProperty("category");
    expect(response.body.data[0]).toHaveProperty("status");
    expect(response.body.data[0]).toHaveProperty("price");
    expect(response.body).toHaveProperty("data"); // Ensure the response has a property called 'items'
  });
});
