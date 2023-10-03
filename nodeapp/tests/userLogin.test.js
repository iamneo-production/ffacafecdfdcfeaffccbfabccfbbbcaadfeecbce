const request = require("supertest");
require('../index')

describe("User module login API testing", () => {
  let payload = {
    email: "abhishek.d@testyantra.com",
    password: "abcd1234",
  };
  test("Week7_Day4_User_Login", async () => {
    const response = await request("http://localhost:8080")
      .post("/user/login")
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("error");
    expect(response.body.message).toBe("Login Successfully");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("role");
    expect(payload.email).toBe(response.body.email);
  });

  test("Week7_Day4_Invalid_User_Login", async () => {
    const response = await request("http://localhost:8080")
      .post("/user/login")
      .send({
        email: "Invalid@testyantra.com",
        password: "abcd1234",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // test("OTP verification", async () => {
  //   const response = await request("http://localhost:2800")
  //     .post("/user/verifyotp")
  //     .send({
  //       email: "abhishek.d@testyantra.com",
  //       otp: "123456",
  //     });
  //   expect(response.status).toBe(200);
  //   expect(response.body.data[0]).toHaveProperty("status");
  // });

});
