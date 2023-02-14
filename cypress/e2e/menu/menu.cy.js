/// <reference types="cypress" />

context("Menu SlideOut", () => {
  beforeEach(() => {
    cy.visit("/#");
  });

  it("the menu activation should work", () => {
    cy.get("[data-cy=nav-drawer]").should("not.be.visible");
    cy.get("#nav-bar-icon")
      .click()
      .then(() => {
        cy.get("[data-cy=nav-drawer]").should("be.visible");
      });
    cy.wait(20);
    cy.get("#nav-bar-icon")
      .click()
      .get("[data-cy=nav-drawer]")
      .should("not.be.visible");
    cy.wait(20);
    cy.get("#nav-bar-icon")
      .click()
      .get("[data-cy=nav-drawer]")
      .should("be.visible")
      .get(".v-navigation-drawer__scrim")
      .click()
      //   .wait(20)
      .get("[data-cy=nav-drawer]")
      .should("not.be.visible");
  });
});
