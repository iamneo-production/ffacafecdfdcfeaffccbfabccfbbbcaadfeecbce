const request = require("supertest");
require('../index')

describe("User module order API testing", () => {
  test("Week7_Day5_review_an_order", async () => {
    let customerId = "6505f53745536b296318b023";
    const response = await request("http://localhost:8080").get(
      `order/review/:${customerId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("menuItems");
    expect(response.body.data).toHaveProperty("customerId");
    expect(response.body.data).toHaveProperty("description");
    expect(response.body.data).toHaveProperty("totalPrice");
    expect(response.body.data).toHaveProperty("tableNo");
    expect(response.body.data).toHaveProperty("status");


    expect(response.body).toHaveProperty("data"); // Ensure the response has a property called 'items'
  });

  test("Week7_Day4_placing_an_order", async () => {
    let menuItems = [
      {
        _id: "6506e30c85c65a1805b5ccec",
        name: "puri",
        type: "veg",
        description: "indian dishes",
        price: 50,
      },
      {
        _id: "6506b4d65a70efae8194894b",
        name: "dosa",
        type: "veg",
        description: "south indian dishes",
        price: 60,
      },
    ];
    let payload = {
      menuItems,
      customerId: "6505f53745536b296318b023",
      description: "third order",
      totalPrice: 300,
      tableNo: 2,
      status: "placed",
    };
    const response = await request("http://localhost:8080")
      .post("/user/order")
      .send(payload);
    expect(response.status).toBe(200);
    // expect(response.body.data[18]).toHaveProperty("status");
  });
});
