const request = require("supertest");
require('../index')

// done 
describe("GET /restaurant/getAllUsers",(()=>{
  test("Week7_Day4_Admin_module_Get_Allusers_API_testing", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/getAllUsers"
    );
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message");
    expect(response.body.data[0]).toHaveProperty("name");
    expect(response.body.data[0]).toHaveProperty("_id");
    expect(response.body.data[0]).toHaveProperty("email");
    expect(response.body.data[0]).toHaveProperty("phoneNo");
    expect(response.body.data[0]).toHaveProperty("role");
    expect(response.body.data[0]).toHaveProperty("orders");
  });
}))