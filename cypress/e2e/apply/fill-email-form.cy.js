describe('Login with email', () => {
    beforeEach(() => {
        cy.visit('/apply')
    })

    describe('Success: Send Email', () => {
        it('01-Input valid email)', () => {
            const email = 'test@gmail.com'

            cy.get('[href="/apply/creators"] > .inline-flex').click()
            cy.get('#email').type(email)
            cy.get('.inline-flex').click()
            cy.contains('Launch a brand new kind of business as a creator. Get more brand deals, make more for every sale and earn for the impact you have')
        })
    })

    describe('Failure', () => {
        const testData = [{
                //empty email
                email: '',
                errorMessage: 'Email is required'
            },
            {
                //invalid email
                email: 'testss@',
                errorMessage: 'Invalid email format'
            },
            {
                //email that has been applied before
                email: 'test@gmail.com',
                errorMessage: 'Email  has been applied'
            }
        ]

        testData.forEach(data => {
            it('Filling email with invalid input ', () => {
                cy.get('[href="/apply/creators"] > .inline-flex').click()
                cy.get('#email').type(data.email)
                cy.get('.inline-flex').click()
                cy.contains(data.errorMessage)
            })
        })
    })
})