const request = require("supertest");
require('../index')

describe("User module menu API testing", () => {
  test("Week9_Day1_Get_all_menu_items", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/getAllMenu"
    );

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty("name");
    expect(response.body.data[0]).toHaveProperty("category");
    expect(response.body.data[0]).toHaveProperty("status");
    expect(response.body.data[0]).toHaveProperty("price");
    expect(response.body).toHaveProperty("data");
  });

  test("Week9_Day1_Add_menu_items_to_cart", async () => {
    const response = await request("http://localhost:8080")
      .post("/user/cart")
      .send({
        menuItems: ["650bdbe69fc8efdad23da4b6", "650bdc179fc8efdad23da4b8"],
        customerId: "650aa662aafc84ac296a3a90",
        customerName: "satyam",
        description: "fourth cart",
        totalPrice: 170,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe("cart has been added successfully");
  });
});
