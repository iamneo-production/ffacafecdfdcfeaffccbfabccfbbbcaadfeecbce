const request = require("supertest");
require('../index')

describe("GET /restaurant/viewOrder", () => {
  test("Week8_Day2_Get_all_orders", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/viewOrder"
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("error");
    expect(response.body?.data[0]).toHaveProperty("_id");
    expect(response.body?.data[0]).toHaveProperty("menuItems");
    expect(response.body?.data[0]).toHaveProperty("customerId");
    expect(response.body?.data[0]).toHaveProperty("description");
    expect(response.body?.data[0]).toHaveProperty("totalPrice");
    expect(response.body?.data[0]).toHaveProperty("tableNo");
    expect(response.body?.data[0]).toHaveProperty("status");
  });
});

