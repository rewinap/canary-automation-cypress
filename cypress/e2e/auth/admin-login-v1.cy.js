// import {  accessPage  } from './pre-condition-auth.cy'
describe('Login with email', () => {
    beforeEach(() => {
        cy.visit('/login');
    })

    describe('Success', () => {
        it('Success login with valid credentials    ', () => {
            cy.get('#email').type('root@root.com')
            cy.get('#password').type('password')
            //  cy.get('a > .font-medium')
            cy.get(':nth-child(3) > .rounded-md').click()
            cy.get('main > .mx-auto > div').contains('Dashboard');
        })
    })

    describe('Failure', () => {
        const testData = [{
                //empty email
                email: '',
                password: 'password',
                errorMessage: 'Please fill out this field.'
            },
            {
                //empty password
                email: 'root@root.com',
                password: '',
                errorMessage: 'Please fill out this field.'
            },
            {
                //invalid email
                email: 'root@',
                password: 'Password123@',
                errorMessage: "Invalid email format"
            },
            {
                //unregistered admin
                email: 'test@gmail.com',
                password: 'Password123@',
                errorMessage: 'User not found'
            },
            {
                //wrong password
                email: 'root@root.com',
                password: 'wronggpass',
                errorMessage: 'Invalid email/password'
            }
        ]
        testData.forEach(data => {
            it(`showing error message when ${data.email ? `email is ${data.email}` : 'email is empty'}, and ${data.password ? `password is ${data.password}` : 'password is empty'}`, () => {   
                if (data.email !== undefined && data.email !== '') {
                    cy.get('#email').type(data.email)
                } 
                else {
                    cy.get(':nth-child(3) > .rounded-md').click()
                    cy.get('#email:invalid').invoke('prop', 'validationMessage').should('equal', data.errorMessage)
                }
                if (data.password !== undefined && data.password !== '') {
                    cy.get('#password').type(data.password)
                } 
                else {
                    cy.get(':nth-child(3) > .rounded-md').click()
                    cy.get('#password:invalid').invoke('prop', 'validationMessage').should('equal', data.errorMessage)
                }
                if (data.email!== 'root@root.com' && data.password !== 'password') {
                    cy.get(':nth-child(3) > .rounded-md').click()
                    cy.contains(data.errorMessage).should('exist')
                }
                cy.get(':nth-child(3) > .rounded-md').click()
                cy.contains(data.errorMessage).should('exist')
            })
        })
    })
})