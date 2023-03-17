// import votersRoutes from "../routes/votersRoutes";
// import express, { Express } from "express";
// import config from "../config/config";
// import app from "../app";
// import request from "supertest";

// const mock = {
//   name: "oreoluwa",
//   phone: "+2349022345628",
//   email: "me@oreoluwa.tech",
//   password: "oreoluwa",
// };

// const apiVersion = config.API_VERSION;
// const apiPrefix = config.API_PREFIX;
// const apiRoute = `${apiPrefix}/${apiVersion}`;

// describe(`POST ${apiRoute}/voters`, () => {
//   it("responds with 201", async () => {
//     const res = await request(app).post(`${apiRoute}/voters`).send(mock);
//     expect(res.body.status).toBe("success");
//     expect(res.body).toHaveProperty("username");
//     expect(res.body).toHaveProperty("token");
//   });
// });
