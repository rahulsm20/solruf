import request from "supertest";
import app from "./index";

describe("User endpoints",()=>{
  describe("POST /users/signin", () => {
    const userData = {
      email: "user1@gmail.com",
      password: "password123",
    };
    
    test("should respond with a 200 status code if the credentials are correct", async () => {
      const response = await request(app).post("/users/signin").send(userData);
    expect(response.statusCode).toBe(200);
  });
  
  test("should return a token if the credentials are correct", async () => {
    const response = await request(app).post("/users/signin").send(userData);
    expect(response.body.token).toBeDefined();
  });
  
  test("should respond with a 404 status code if the email is not found", async () => {
    const response = await request(app)
    .post("/users/signin")
    .send({ email: "nonexistentuser@gmail.com", password: "password123" });
    expect(response.statusCode).toBe(404);
  });
  
  test("should respond with a 404 status code if the password is incorrect", async () => {
    const response = await request(app)
    .post("/users/signin")
    .send({ email: userData.email, password: "wrongpassword" });
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /users/signup", () => {
  test("should respond with a 200 status code and a success message when a user is successfully signed up", async () => {
    const response = await request(app)
    .post("/users/signup")
    .send({ email: "user0@gmail.com", password: "password123" });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "New user added" });
  });
  
  test("should respond with a 400 status code and an error message when a user is not signed up due to an error", async () => {
    const response = await request(app)
    .post("/users/signup")
    .send({ email: "user@gmail.com" }); // missing password field
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("No password");
  });
});
})

describe('Asset endpoints', () => {
  let token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2ODM0NTgxMDAsImV4cCI6MTY4MzQ2MTcwMH0.1msgsbEOQ4UMvo-BHN-ap_BYZSx9gtXBLG0xuVZZtpU"

  // login before each test
  beforeEach(async () => {
    const response = await request(app)
      .post('/users/signin')
      .send({
        email: 'user1@gmail.com',
        password: 'password123'
      })
    token = response.body.token
  })

  describe('GET /assets/', () => {
    test('should respond with 401 status code if no token is provided', async () => {
      const response = await request(app)
        .get('/assets/')
      expect(response.statusCode).toBe(401)
    })

    test('should respond with 202 status code if token is provided', async () => {
      const response = await request(app)
        .get('/assets')
        .set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(202)
    })
  })

  describe('POST /assets/add', () => {
    test('should respond with 401 status code if no token is provided', async () => {
      const response = await request(app)
        .post('/assets/add')
        .send({
          category: 'Real Estate',
          amount: 500000
        })
      expect(response.statusCode).toBe(401)
    })

    test('should respond with 202 status code if token is provided', async () => {
      const response = await request(app)
        .post('/assets/add')
        .set('Authorization', `Bearer ${token}`)
        .send({
          category: 'Real Estate',
          amount: 500000
        })
      expect(response.statusCode).toBe(202)
    })
  })

  describe('PUT /assets/:category', () => {
    test('should respond with 401 status code if no token is provided', async () => {
      const response = await request(app)
        .put('/assets/update')
        .send({
          category:"Real Estate",
          amount: 700000
        })
      expect(response.statusCode).toBe(401)
    })

    test('should respond with 202 status code if token is provided', async () => {
      const response = await request(app)
        .put('/assets/update')
        .set('Authorization', `${token}`)
        .send({
          category:"Real Estate",
          amount: 700000
        })
      expect(response.statusCode).toBe(202)
    })
  })

  describe('DELETE /assets', () => {
    test('should respond with 404 status code if no token is provided', async () => {
      const response = await request(app)
        .delete('/assets/delete?category=Real Estate')
      expect(response.statusCode).toBe(401)
    })

    test('should respond with 202 status code if token is provided', async () => {
      const response = await request(app)
        .delete('/assets/delete?category=Real Estate')
        .set('Authorization', `${token}`)
      expect(response.statusCode).toBe(202)
    })
  })
})