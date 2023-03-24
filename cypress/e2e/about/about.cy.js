/// <reference types="cypress" />

describe("About view", () => {
  beforeEach(() => {
    cy.visit("/#/about");
  });

  it("should display the about page", () => {
    cy.get("#about-view");
  });

  it("the home button should leave this view", () => {
    cy.get("#home-btn").click();
    cy.get("#about-view").should("not.exist");
  });

  describe("home button tests", () => {
    it("the home button should be visible", () => {
      cy.get("#home-btn").should("be.visible");
    });

    it("the home button should have rounded ends", () => {
      cy.get("#home-btn").should("have.class", "v-btn--rounded");
    });
  });

  describe("links tests", () => {
    it("there should be 6 links", () => {
      cy.get("[data-cy^=link1-]").should("have.length", 6);
    });

    it("the links should have rounded ends", () => {
      cy.get("[data-cy=link1-1]").scrollIntoView().should("be.visible");
      cy.get("[data-cy=link1-1]").should("have.class", "rounded-pill");
    });

    it("the links should have a grey background", () => {
      cy.get("[data-cy=link1-4]").scrollIntoView().should("be.visible");
      cy.get("[data-cy=link1-4]").should("have.css", "background-color");
    });
  });
});
