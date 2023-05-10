describe('Login with email', () => {
    beforeEach(() => {
        //mengungjugi halaman appy dan mengisi email field
        cy.visit('/apply')
        const email = 'test@gmail.com'

        cy.get('[href="/apply/creators"] > .inline-flex').click()
        cy.get('#email').type(email)
        cy.get('.inline-flex').click()
        cy.contains('Launch a brand new kind of business as a creator. Get more brand deals, make more for every sale and earn for the impact you have')
    })
    describe('Apply as creator: Data Driven Testing', () => {
        const validTestData = [{
            name: 'testcanary12',
            primarySocialChannel: 'Twitch',
            linkForPrimarySocialChannel: 'https://www.lipsum.com/',
            currentSocialChannel: 'Tiktok',
            website: 'https://www.lipsum.com/',
            errorMessage: 'Your application has been submitted'
        },
        {
            //primary social channel create by the end user
            name: 'testcanary12',
            primarySocialChannel: 'Slack',
            linkForPrimarySocialChannel: 'https://www.lipsum.com/',
            currentSocialChannel: 'Tiktok',
            website: 'https://www.lipsum.com/',
            errorMessage: 'Your application has been submitted'
        },
        {
            //current social channel create by the end user
            name: 'testcanary12',
            primarySocialChannel: 'Twitch',
            linkForPrimarySocialChannel: 'https://www.lipsum.com/',
            currentSocialChannel: 'Slacks',
            website: 'https://www.lipsum.com/',
            errorMessage: 'Your application has been submitted'
        },
    ]
        const invalidTestData = [{
                //empty name
                name: '',
                primarySocialChannel: 'Twitch',
                linkForPrimarySocialChannel: 'https://www.lipsum.com/',
                currentSocialChannel: 'Tiktok',
                website: 'https://www.lipsum.com/',
                errorMessage: 'Please fill out this field.'
            },
            {
                //name more than 100 char
                name: "Test Adi Mulyanto Budi Santoso Cahyadi Nugroho Darmawan Eko Prasetyo Farid Hidayat Gunawan Handoko Indra Maulana Joko Widodo Kusuma Wardhana Laksamana Putra Muhammad Fauzi Nasution Oka Surya Pratama Qori'ah Khumairoh Rachmawati Sugiyanto Tri Anggono Utomo Vinotheka Aryani Widya Laksita Yono Susanto Zainuddin Nurani",
                primarySocialChannel: 'Twitch',
                linkForPrimarySocialChannel: 'https://www.lipsum.com/',
                currentSocialChannel: 'Tiktok',
                website: 'https://www.lipsum.com/',
                errorMessage: 'The name can not be more than 100 char'
            },
            {
                //empty primary social channel
                name: 'testcanary12',
                primarySocialChannel: '',
                linkForPrimarySocialChannel: 'https://www.lipsum.com/',
                currentSocialChannel: 'Tiktok',
                website: 'https://www.lipsum.com/',
                errorMessage: 'Please fill out this field.'
            },
            {
                //empty link primary social channel
                name: 'testcanary12',
                primarySocialChannel: 'Twitch',
                linkForPrimarySocialChannel: '',
                currentSocialChannel: 'Tiktok',
                website: 'https://www.lipsum.com/',
                errorMessage: 'Please fill out this field.'
            },
            {
                //invalid link  format for primary social channel
                name: 'testcanary12',
                primarySocialChannel: 'Twitch',
                linkForPrimarySocialChannel: 'invalid link',
                currentSocialChannel: 'Tiktok',
                website: 'https://www.lipsum.com/',
                errorMessage: 'Invalid link format'
            },
            {
                //empty current social channel
                name: 'testcanary12',
                primarySocialChannel: 'Twitch',
                linkForPrimarySocialChannel: 'https://www.lipsum.com/',
                currentSocialChannel: '',
                website: 'https://www.lipsum.com/',
                errorMessage: 'Please fill out this field.'
            },
            {
                //invalid link for website field
                name: 'testcanary12',
                primarySocialChannel: 'Twitch',
                linkForPrimarySocialChannel: 'https://www.lipsum.com/',
                currentSocialChannel: 'Tiktok',
                website: 'website',
                errorMessage: 'Invalid link format'
            },
        ]

        describe('Apply as creator', () => {
            validTestData.forEach(data => {
                it('01-Fill the form with valid input', () => {
                    cy.get('#name').type(data.name)
                    cy.xpath('/html/body/div/div/div/form/div/div[2]/div/div/div/div[1]/div[2]').type(`${data.primarySocialChannel}{enter}`)
                    cy.get('#primarySocialLink').type(data.linkForPrimarySocialChannel)
                    cy.xpath('/html/body/div/div/div/form/div/div[4]/div/div/div/div[1]/div[2]').type(`${data.currentSocialChannel}{enter}`)
                    cy.get('#website').type(data.website)
                    cy.get('#termsOfServiceAgreement').click()
                    cy.get('.inline-flex').click()
                    cy.contains(data.errorMessage)
                })
            })
            invalidTestData.forEach(data => {
                it(`showing error message data is invalid`, () => {
                    if (data.name !== undefined && data.name !== '') {
                        if (data.name.length > 100) {
                            cy.get('#name').type(data.name)
                            cy.get('.inline-flex').click()
                            cy.contains(data.errorMessage)
                        }
                        cy.get('#name').type(data.name)
                    } else {
                        cy.get('.inline-flex').click()
                        cy.get('#name:invalid').invoke('prop', 'validationMessage').should('equal', data.errorMessage)
                    }
                    if (data.primarySocialChannel !== undefined && data.primarySocialChannel !== '') {
                        cy.xpath('/html/body/div/div/div/form/div/div[2]/div/div/div/div[1]/div[2]').type(`${data.primarySocialChannel}{enter}`)
                    } else {
                        cy.get('.inline-flex').click()
                        cy.contains(data.errorMessage)
                    }
                    if (data.linkForPrimarySocialChannel !== undefined && data.linkForPrimarySocialChannel !== '') {
                        cy.get('#primarySocialLink').type(data.linkForPrimarySocialChannel)
                    } else {
                        cy.get('.inline-flex').click()
                        cy.get('#primarySocialLink:invalid').invoke('prop', 'validationMessage').should('equal', data.errorMessage)
                    }
                    if (data.linkForPrimarySocialChannel !== undefined && data.linkForPrimarySocialChannel !== '') {
                        const isLink = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(data.linkForPrimarySocialChannel);
                        if (isLink) {
                            cy.get('#primarySocialLink').type(data.linkForPrimarySocialChannel);
                        } else {
                            cy.get('#primarySocialLink').type(data.linkForPrimarySocialChannel);
                            cy.get('.inline-flex').click();
                            cy.contains(data.errorMessage).should('be.visible');
                        }
                    } else {
                        cy.get('.inline-flex').click()
                        cy.get('#primarySocialLink:invalid').invoke('prop', 'validationMessage').should('equal', data.errorMessage)
                    }
                    if (data.currentSocialChannel !== undefined && data.currentSocialChannel !== '') {
                        cy.xpath('/html/body/div/div/div/form/div/div[4]/div/div/div/div[1]/div[2]').type(`${data.currentSocialChannel}{enter}`)
                    } else {
                        cy.get('.inline-flex').click()
                        cy.contains(data.errorMessage)
                    }
                    if (data.website !== undefined && data.website !== '') {
                        const isLink = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(data.website);
                        if (isLink) {
                            cy.get('#website').type(data.website)
                        } else {
                            cy.get('#website').type(data.website);
                            cy.get('.inline-flex').click();
                            cy.get('#termsOfServiceAgreement').click()
                            cy.contains(data.errorMessage).should('be.visible');
                        }

                    } else {
                        cy.get('#termsOfServiceAgreement').click()
                        cy.get('.inline-flex').click()
                        cy.get('#website').invoke('prop', 'validationMessage').should('equal', data.errorMessage)
                    }

                    cy.get('#termsOfServiceAgreement').click()
                    cy.get('.inline-flex').click()

                })
            })
        })
    })
})