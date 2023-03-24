/// <reference types="cypress" />

context.only("Main view", () => {
  const localStorageUserToken = "lisTrelloHash";
  const token = "dummy";

  beforeEach(() => {
    localStorage.setItem(localStorageUserToken, token);
    cy.visit("/#");
  });

  it("log on panel should be visible if there's no token", () => {
    cy.get("[data-cy=view-login]").should("be.visible");
  });
});
