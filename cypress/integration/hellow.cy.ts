import hellow from "@/components/Hellow";

describe("Hellow testing suite", () => {
  it("Hellow function should return uppercase", () => {
    const msg = "Hello";
    const result = hellow(msg);
    expect(result).to.equal("HELLO");
  });
});