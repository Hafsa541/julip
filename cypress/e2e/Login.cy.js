describe('Julip Login test cases' , () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
       cy.visit('https://qa.myjulip.com/auth/jwt/onboarding/')
       Cypress.on('uncaught:exception', (err, runnable) => {
         return false; // Prevent Cypress from failing the test
       });
 
    });
 
  it.only('should login with valid credentials' , () => {
    for (let i = 0; i < 3; i++) {
    cy.get('button').contains('Login').click(); 
    cy.login('hafsa12@yopmail.com','1234567890');
    cy.wait(5000);
    cy.get('.MuiStack-root.css-1jkfhk6 svg').click(); //click dropdown
    cy.get('.MuiStack-root > :nth-child(4)').click(); //click signout

   }
  })
 
  it('should give error with invalid credentials' , () =>{
    
    cy.get('button').contains('Login').click(); 
    cy.login('hafsa12@yopmail.com','0987654321');
    cy.contains('Incorrect Password or Email');
    
 })
})