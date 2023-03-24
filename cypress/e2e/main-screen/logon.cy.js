/// <reference types="cypress" />

context("Log on view", () => {
  beforeEach(() => {
    cy.visit("/#");
  });

  it("log on panel should be visible if there's no token", () => {
    cy.get("[data-cy=view-login]").should("be.visible");
  });
});
