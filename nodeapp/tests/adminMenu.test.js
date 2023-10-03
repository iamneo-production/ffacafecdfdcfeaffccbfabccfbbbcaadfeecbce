const request = require("supertest");
require('../index')
// done
describe("GET /restaurant/getAllMenu", () => {
  test("Week8_Day1_Get all menu items", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/getAllMenu"
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body?.data[0]).toHaveProperty("_id");
    expect(response.body?.data[0]).toHaveProperty("status");
    expect(response.body?.data[0]).toHaveProperty("category");
    expect(response.body?.data[0]).toHaveProperty("status");
    expect(response.body?.data[0]).toHaveProperty("price");
  });
});

describe("POST /restaurant/addMenu", () => {
  test("Week8_Day1_Add menu items ", async () => {
    const payload = {
      name: "rasgulla",
      imgPath: "hello",
      subCategory: "veg",
      description: "sweet",
      category: "deserts",
      status: "available",
      price: 15,
    };
    const response = await request("http://localhost:8080")
      .post("/restaurant/addMenu")
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe("menu item has been added successfully");
  });

  test("Week8_Day1_Invalid Add menu items", async () => {
    const invalidPayload = {
      imgPath: "hello",
      subCategory: "veg",
      description: "sweet",
      category: "deserts",
      status: "available",
      price: 15,
    };
    const response = await request("http://localhost:8080")
      .post("/restaurant/addMenu")
      .send(invalidPayload);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

// describe("PUT /restaurant/editMenu/:id", () => {
//   test("Edit a menu item", async () => {
//     const itemId = "650eb5d5725e7f6fd38ba06d";
//     const payload = {
//       name: "Carrot Halwa",
//       imgPath: "hello",
//       subCategory: "veg",
//       description: "sweet",
//       category: "deserts",
//       status: "available",
//       price: 15,
//     };

//     const response = await request("http://localhost:2800")
//       .put(`/restaurant/editMenu/${itemId}`)
//       .send(payload);
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe(
//       "menu item has been updated successfully"
//     );
//   });

//   test("Invalid Edit a menu item", async () => {
//     const itemId = "invalid_item_id";
//     const invalidPayload = {
//       name: "idli",
//       category: "starter",
//       status: "available",
//       price: 30,
//     };

//     const response = await request("http://localhost:2800")
//       .put(`/restaurant/editMenu/${itemId}`)
//       .send(invalidPayload);

//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("error");
//   });
// });
