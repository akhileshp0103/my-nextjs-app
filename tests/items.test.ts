npm install --save-dev @types/jest
describe("Items API", () => {
  it("should return 401 when not authenticated", async () => {
    const res = await fetch("http://localhost:3000/api/items");
    expect(res.status).toBe(401);
  });
});
