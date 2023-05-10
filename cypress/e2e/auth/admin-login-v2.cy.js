// import {  accessPage  } from './pre-condition-auth.cy'

describe('Login with email', () => {
    beforeEach(() => {
        cy.visit('/login');
    })

    describe('Success: Login with valid credentials', () => {
        it('01-Admin login with valid email and valid password (valid credentials)', () => {
            const email = 'root@root.com'
            const password = 'password'

            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get(':nth-child(3) > .rounded-md').click()
            cy.get('main > .mx-auto > div').contains('Dashboard')
        })
    })

    describe('Failure:Login with invalid credentials ', () => {
        it('02-Admin login with empty email and valid password', () => {
            // const email= '';
            const password = 'password'
            const errorMessage = 'Please fill out this field.'

            // cy.get('#email').type(email, {force: true})
            cy.get('#password').type(password)
            cy.get(':nth-child(3) > .rounded-md').click()

            cy.get('#email:invalid')
                .invoke('prop', 'validationMessage')
                .should('equal', errorMessage)
        })

        it('03-Admin login with invalid email format and valid password', () => {
            const email = 'admin@'
            const password = 'password123@'
            const errorMessage =
                "Please enter a part following '@'. 'admin@' is incomplete."

            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get(':nth-child(3) > .rounded-md').click()

            cy.get('#email:invalid').invoke('prop', 'validationMessage').should('equal', errorMessage)
        })

        it('04-Admin login with unregistered email and valid password', () => {
            const email = 'test@gmail.com'
            const password = 'password'
            const errorMessage =
                'User not found'

            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get(':nth-child(3) > .rounded-md').click()

            cy.get('.text-red-600').should('equal', errorMessage)
        })

        it('05-Admin login with valid email and empty password', () => {
            const email = 'root@root.com'
            const errorMessage = 'Please fill out this field.'

            cy.get('#email').type(email)
            cy.get(':nth-child(3) > .rounded-md').click()

            cy.get('#password:invalid').invoke('prop', 'validationMessage').should('equal', errorMessage)
        })


        it('06-Admin login with valid email and incorrect password', () => {
            const email = 'root@root.com'
            const password = '123password'
            const errorMessage = 'Wrong Password'

            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get(':nth-child(3) > .rounded-md').click()

            cy.get('.text-red-600').should('equal', errorMessage)
        })

        it('07-Admin login with unregistered email and incorrect password', () => {
            const email = 'admin@root.com'
            const password = 'password'
            const errorMessage = 'User is not found'

            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get(':nth-child(3) > .rounded-md').click()

            cy.get('.text-red-600').should('equal', errorMessage)
        })

        it('08-Admin login with empty email and empty password', () => {
            const errorMessage = 'Please fill out this field.'

            cy.get(':nth-child(3) > .rounded-md').click()

            cy.get('#email:invalid').invoke('prop', 'validationMessage').should('equal', errorMessage)
        })


        it('09-showing only one error message when the field is cleared', () => {
            const email = 'test@gmail.com'
            const password = 'passsss'
            const errorMessage =
                'Please fill out this field.'

            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get(':nth-child(3) > .rounded-md').click()
            cy.get('#email').clear()

            cy.get('#email:invalid').invoke('prop', 'validationMessage').should('equal', errorMessage)
            cy.get('.text-red-600').should('not.be.visible')
        })
    })
})