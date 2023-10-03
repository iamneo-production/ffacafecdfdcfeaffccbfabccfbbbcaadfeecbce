const request = require("supertest");
require('../index')

describe("GET /restaurant/table", () => {
  test("Week8_Day4_Get_table_status", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/table"
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("error");
    expect(response.body.message).toBe("all table details");

    expect(response.body?.data[0]).toHaveProperty("_id");
    expect(response.body?.data[0]).toHaveProperty("tableNo");
    expect(response.body?.data[0]).toHaveProperty("alloted");
    expect(response.body?.data[0]).toHaveProperty("isAvailable");
    expect(response.body?.data[0]).toHaveProperty("served");
  });
});

describe("POST /restaurant/addTable", () => {
  test("Week8_Day4_Add_table ", async () => {
    let payload = {
      tableNo: [5],
      alloted: true,
      isAvailable: false,
      served: true,
    };
    const response = await request("http://localhost:8080")
      .post("/restaurant/addTable")
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe("table has been added successfully");
  });

  // test("Invalid Add table ", async () => {
  //   let invalidPayload = {
  //     alloted: true,
  //     isAvailable: false,
  //     served: true,
  //   };
  //   const response = await request("http://localhost:2800")
  //     .post("/restaurant/addTable")
  //     .send(invalidPayload);

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty("error");
  // });
});

describe("PUT /restaurant/table/editStatus", () => {
  test("Week8_Day4_Edit_table_status ", async () => {
    let payload = {
      _id: "651128431eed6f152b351299",
      isAvailable: false,
      alloted: true,
      served: false,
    };
    const response = await request("http://localhost:8080")
      .put("/restaurant/table/editStatus")
      .send(payload);
     expect(response.status).toBe(200);
     expect(response.body.error).toBeFalsy();
  });

  test("Week8_Day4_Invalid_Edit_table_status ", async () => {
    let invalidPayload = {
      alloted: true,
      served: false,
    };
    const response = await request("http://localhost:8080")
      .put("/restaurant/table/editStatus")
      .send(invalidPayload);
     expect(response.status).toBe(400);
     expect(response.body.error).toBeTruthy();
  });
});
