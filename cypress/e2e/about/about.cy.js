/// <reference types="cypress" />

describe("About view", () => {
  beforeEach(() => {
    cy.visit("#/");
    cy.get("#nav-bar-icon").click();
    cy.get("#id-about").click();
  });

  it("should display the about page", () => {
    cy.get("#about-view");
  });

  describe("home button tests", () => {
    it("the home button should be visible"),
      () => {
        cy.get("#home-btn").should("be.visible");
      };

    it("the home button should have rounded ends"),
      () => {
        cy.get("#home-btn").should("have.class", "v-btn--rounded");
      };
  });

  describe("links tests", () => {
    it("there should be 6 links", () => {
      cy.get(".v-list .v-list-item").should("have.length", 6);
    });

    it("the links should have rounded ends", () => {
      cy.get("#link1").should("have.class", "rounded-pill");
    });

    it("the links should have a grey background", () => {
      cy.get("#link4").should("have.attr", "background-color");
    });
  });

  it("the home button should leave this view", () => {
    cy.get("#home-btn").click();
    cy.get("#about-view").should("not.exist");
  });
});
