describe('The Login', () => {
  it('Visits the page login', () => {
    cy.visit('/login')
    cy.contains('Sign in')
  })
})

describe('Login Component', () => {
  beforeEach(() => {
    // Visit the page where the login component is rendered
    cy.visit('/login'); // Adjust the URL as needed
  });

  it('should display the login form', () => {
    // Check if the login card is visible
    cy.get('.card-login').should('be.visible');
    // Check if the card header contains "Sign in"
    cy.get('.card-header').should('contain.text', 'Sign in2');
  });

  it('should display validation errors', () => {
    // Click on the email input and then blur to trigger validation
    cy.get('input[formControlName="email"]').click().blur();
    // Check if the validation message is displayed
    cy.get('.alert-danger').should('contain.text', 'Please enter email');
  });

  it('should enable the login button when the form is valid', () => {
    // Enter a valid email
    cy.get('input[formControlName="email"]').type('test@example.com');
    // Enter a valid password
    cy.get('input[formControlName="password"]').type('password123');
    // Check if the login button is enabled
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should disable the login button when the form is invalid', () => {
    // Enter an invalid email and then clear it to trigger validation
    cy.get('input[formControlName="email"]').type('invalid-email').clear().blur();
    // Check if the login button is disabled
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should log in successfully with valid credentials', () => {
    // Enter a valid email
    cy.get('input[formControlName="email"]').type('test@example.com');
    // Enter a valid password
    cy.get('input[formControlName="password"]').type('password123');
    // Submit the form
    cy.get('button[type="submit"]').click();
    // Add your assertions for successful login, e.g., checking for a redirect or a specific element
    // cy.url().should('include', '/home'); // Adjust as needed
  });
});

