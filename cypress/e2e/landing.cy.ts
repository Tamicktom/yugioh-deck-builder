describe("Frontpage testing suite", () => {
  it("Frontpage should contain CTA", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("h1").should("contain", "Create your Yu-Gi-Oh deck!");
  });
  it("CTA should redirect to /login", () => {
    cy.visit("/");
    //get the anchor tag with the href of /login
    cy.get("a[href='/login']").click();
    cy.wait(1000);
    cy.url().should("include", "/login");
  });
});