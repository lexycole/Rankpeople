// import { createAPI } from "../createAPI";
// import supertest, { SuperTest, Test } from "supertest";
// import { Server, createServer } from "http";

// describe("Healthcheck Endpoints", () => {
//   let requestWithSupertest: SuperTest<Test>;
//   let app: Server;

//   beforeAll(async () => {
//     const api = await createAPI();
//     app = createServer(api); // Wrap with HTTP server
//     requestWithSupertest = supertest(app);
//   });

//   afterAll(async () => {
//     app.close();
//   });

//   it("GET /api should return Hello World", async () => {
//     const res = await requestWithSupertest.get("/api");
//     expect(res.status).toEqual(200);
//     expect(res.text).toContain("Hello World");
//   });
// });
