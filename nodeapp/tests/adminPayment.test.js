const request = require("supertest");
require('../index')

//done
describe("GET /restaurant/getAllPayments", () => {
  test("Week8_Day3_get_all_payments", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/getAllPayments"
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("all payment detail");
    expect(response.body).toHaveProperty("data");
    expect(response.body?.data[0]).toHaveProperty("_id");
    expect(response.body?.data[0]).toHaveProperty("paymentMode");
    expect(response.body?.data[0]).toHaveProperty("orderId");
    expect(response.body?.data[0]).toHaveProperty("customerId");
    expect(response.body?.data[0]).toHaveProperty("customerName");
    expect(response.body?.data[0]).toHaveProperty("paymentDesc");
    expect(response.body?.data[0]).toHaveProperty("totalPrice");
    expect(response.body?.data[0]).toHaveProperty("status");
  });
});

