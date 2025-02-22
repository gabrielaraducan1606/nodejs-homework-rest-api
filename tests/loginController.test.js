// const request = require("supertest");
// const app = require("../app"); // Importă aplicația Express
// const { loginUser } = require("../service/index"); // Importă funcția de login din service
// // Mocking pentru middleware-ul auth
// jest.mock("../middleware/auth", () => ({
//     auth: (req, res, next) => next(), // Simulează middleware-ul auth
// }));

// // Mocking pentru funcția loginUser
// jest.mock("../service/index", () => ({
//     loginUser: jest.fn(),
// }));

// describe("POST /account/login", () => {
//     it("should return status 200, a token, and user object with email and subscription", async () => {
//         // Mock data pentru loginUser
//         const mockUser = {
//             email: "test@example.com",
//             subscription: "starter",
//             token: "mockToken123",
//         };

//         // Simulează comportamentul funcției loginUser
//         loginUser.mockResolvedValue(mockUser);

//         // Request body pentru login
//         const loginData = {
//             email: "test@example.com",
//             password: "password123",
//         };

//         // Trimite request-ul POST către endpoint-ul de login
//         const response = await request(app)
//             .post("/account/login")
//             .send(loginData);

//         // Verifică status code
//         expect(response.status).toBe(200);

//         // Verifică prezența token-ului în răspuns
//         expect(response.body.token).toBeDefined();
//         expect(response.body.token).toBe("mockToken123");

//         // Verifică prezența obiectului user în răspuns
//         expect(response.body.user).toBeDefined();
//         expect(response.body.user.email).toBe("test@example.com");
//         expect(response.body.user.subscription).toBe("starter");
//     });

//     it("should return status 401 if email or password is invalid", async () => {
//         // Simulează cazul în care loginUser returnează null (email sau parolă invalidă)
//         loginUser.mockResolvedValue(null);

//         // Request body pentru login
//         const loginData = {
//             email: "invalid@example.com",
//             password: "wrongpassword",
//         };

//         // Trimite request-ul POST către endpoint-ul de login
//         const response = await request(app)
//             .post("/account/login")
//             .send(loginData);

//         // Verifică status code
//         expect(response.status).toBe(401);

//         // Verifică mesajul de eroare
//         expect(response.body.message).toBe("Invalid email or password");
//     });

//     it("should return status 500 if an error occurs", async () => {
//         // Simulează o eroare în loginUser
//         loginUser.mockRejectedValue(new Error("Database error"));

//         // Request body pentru login
//         const loginData = {
//             email: "test@example.com",
//             password: "password123",
//         };

//         // Trimite request-ul POST către endpoint-ul de login
//         const response = await request(app)
//             .post("/account/login")
//             .send(loginData);

//         // Verifică status code
//         expect(response.status).toBe(500);

//         // Verifică mesajul de eroare
//         expect(response.body.message).toBe("Database error");
//     });
// });