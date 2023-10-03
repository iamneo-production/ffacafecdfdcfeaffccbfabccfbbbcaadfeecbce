const request = require("supertest");
require('../index')

describe("User module registration API testing", () => {
  test("Week9_Day4_Registering_the_user ", async () => {
    const response = await request("http://localhost:8080")
      .post("/user/register")
      .send({
        name: "abhishek",
        email: "abhishek.d@testyantra.com",
        phoneNo: "1234567890",
        password: "abcd1234",
        role: "user",
      });
    expect(response.body.message).toBe("email already exits");
    expect(response.status).toBe(400);

  });

  test("Week9_Day4_Edit_user_detail ", async () => {
    let id = "650fee10b4f21fc49bf09ac2"
    const response = await request("http://localhost:8080")
      .put(`/user/editUser/${id}`)
      .send({
        name: "abhishek",
        email: "abhishek.d@testyantra.com",
        phoneNo: "1234567890",
        password: "abcd1234",
        role: "user",
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User Profile has been updated successfully");
  });

  test("Week9_Day5_Get_user_profile_by_id", async () => {
    let id = "650fee10b4f21fc49bf09ac2"

    const response = await request("http://localhost:8080").get(
      `/user/getUser/${id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("name");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("orders");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("phoneNo");
    expect(response.body.data).toHaveProperty("role");
  });
});
