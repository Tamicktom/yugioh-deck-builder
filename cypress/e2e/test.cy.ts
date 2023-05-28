describe("Frontpage testing suite", () => {
  it("Frontpage should contain 'Hello'", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Yugioh Deck Builder");
  });
});