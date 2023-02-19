/// <reference types="cypress" />

context("Menu SlideOut", () => {
  beforeEach(() => {
    cy.visit("/#");
  });

  it("the menu activation should work", () => {
    cy.get("[data-cy=nav-drawer]").should("not.be.visible");
    cy.get("#nav-bar-icon")
      .click()
      .get("[data-cy=nav-drawer]")
      .should("be.visible")
      .get("#nav-bar-icon")
      .click()
      .get("[data-cy=nav-drawer]")
      .should("not.be.visible")
      .get("#nav-bar-icon")
      .click()
      .get("[data-cy=nav-drawer]")
      .should("be.visible")
      .get(".v-navigation-drawer__scrim")
      .click()
      .get("[data-cy=nav-drawer]")
      .should("not.be.visible");
  });

  it("the menu should resize", () => {
    cy.get("#nav-bar-icon")
      .click()
      .get("[data-cy=nav-drawer]")
      .invoke("outerWidth")
      .should("be.eq", 256)
      .get("#id-change-size")
      .click()
      .get("[data-cy=nav-drawer]")
      .invoke("outerWidth")
      .should("be.eq", 60)
      .get("#id-change-size")
      .click()
      .get("[data-cy=nav-drawer]")
      .invoke("outerWidth")
      .should("be.eq", 256);
  });
});
