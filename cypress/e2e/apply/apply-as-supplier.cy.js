describe('Login with email', () => {
    beforeEach(() => {
        cy.visit('/apply')
        const email = 'test@gmail.com'

        cy.get('[href="/apply/suppliers"] > .inline-flex').click()
        cy.get('#email').type(email)
        cy.get('.inline-flex').click()
        cy.contains('Launch a brand new kind of business as a supplier. Get more brand deals, make more for every sale and earn for the impact you have')
    })

    describe('Apply as supplier with Data Driven Testing', () => {
        const validTestData = [{
            name: 'Suppliertest12',
            supplierName: 'Nike Test',
            website: 'https://www.lipsum.com/',
            instagramLink: 'https://www.instagram.com/',
            companyName: 'NIKES',
            primarycategory: 'Beauty',
            validationMessage: 'Your application has been submitted'
        }]
        const TestDataForMultipleBrands = [{
                name: 'Suppliertest12',
                supplierName: 'Nike Test',
                brand1: 'NIKE SHIRT',
                brand2: 'NIKE SHOES',
                website: 'https://www.lipsum.com/',
                instagramLink: 'https://www.instagram.com/',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Your application has been submitted'
            },
            {
                name: 'Suppliertest12',
                supplierName: 'Nike Test',
                // brand1: 'NIKE SHIRT',
                // brand2: 'NIKE SHOES',
                website: 'https://www.lipsum.com/',
                instagramLink: 'https://www.instagram.com/',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Please fill out this field.'
            }
        ]
        const invalidTestData = [{
                //empty name
                name: '',
                supplierName: 'Nike Test',
                website: 'https://www.lipsum.com/',
                instagramLink: 'https://www.instagram.com/',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Please fill out this field.'
            },
            {
                //nama more than 100 char
                name: 'Adi Mulyanto Budi Santoso Cahyadi Nugroho Darmawan Eko Prasetyo Farid Hidayat Gunawan Handoko Indra Maulana Joko Widodo Kusuma Wardhana Laksamana Putra Muhammad Fauzi Nasution Oka Surya Pratama Qori\'ah Khumairoh Rachmawati Sugiyanto Tri Anggono Utomo Vinotheka Aryani Widya Laksita Yono Susanto Zainuddin Nurani',
                supplierName: 'Nike Test',
                website: 'https://www.lipsum.com/',
                instagramLink: 'https://www.lipsum.com/',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'The name can not be more than 100 char'
            },
            {
                //empty supplier name
                name: 'Suppliertest12',
                supplierName: '',
                website: 'https://www.lipsum.com/',
                instagramLink: 'https://www.lipsum.com/',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Please fill out this field.'
            },
            {
                //invalid line for website
                name: 'Suppliertest12',
                supplierName: 'Nike Test',
                website: 'nikess',
                instagramLink: 'https://www.lipsum.com/',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Please enter a valid website URL.'
            },
            {
                //empty website link
                name: 'Suppliertest12',
                supplierName: 'Nike Test',
                website: '',
                instagramLink: 'https://www.lipsum.com/',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Please fill out this field.'
            },
            {
                //empty instagram link
                name: 'Suppliertest12',
                supplierName: 'Nike Test',
                website: 'https://www.lipsum.com/',
                instagramLink: '',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Please fill out this field.'
            },
            {
                //invalid link for instagram
                name: 'Suppliertest12',
                supplierName: 'Nike Test',
                website: 'https://www.lipsum.com/',
                instagramLink: 'instagram',
                companyName: 'NIKES',
                primarycategory: 'Beauty',
                validationMessage: 'Please enter a valid Instagram URL.'
            },
            {
                //empty primary category
                name: 'Suppliertest12',
                supplierName: 'Nike Test',
                website: 'https://www.lipsum.com/',
                instagramLink: 'https://www.lipsum.com/',
                companyName: 'NIKES',
                primarycategory: '',
                validationMessage: 'Please enter a valid Instagram URL.'
            }
        ]

        validTestData.forEach(data => {
            it('01-Fill the form with valid input', () => {
                cy.get('#name').type(data.name)
                cy.get('#supplierName').type(`${data.supplierName}{enter}`)
                cy.get('#website').type(data.website)
                cy.get('#instagramLink').type(`${data.instagramLink}{enter}`)
                cy.get('#companyName').type(data.companyName)
                cy.xpath('/html/body/div/div/div/form/div/div[7]/div/div/div[1]/div[2]').type(`${data.primarycategory}{enter}`)
                cy.get('#termsOfServiceAgreement').click()
                cy.get('.inline-flex').click()
                cy.contains(data.validationMessage)
            })
        })

        TestDataForMultipleBrands.forEach(data => {
            it('02-Fill the form with multiple brands', () => {
                cy.get('#name').type(data.name)
                cy.get('#supplierName').type(`${data.supplierName}{enter}`)
                if (data.brand1 == undefined || data.website == '') {
                    cy.get('.flex-row > input').click().then(() => {
                        cy.get('#brands\\.0:invalid').invoke('prop', 'validationMessage').should('equal', data.validationMessage)
                    })
                } else {
                    cy.get('.flex-row > input').click()
                    cy.get('#brands\\.0').type(data.brand1)
                    cy.get('#brands\\.1').type(data.brand2)
                }
                cy.get('#website').type(data.website)
                cy.get('#instagramLink').type(`${data.instagramLink}{enter}`)
                cy.get('#companyName').type(data.companyName)
                cy.xpath('/html/body/div/div/div/form/div/div[8]/div/div/div[1]/div[2]').type(`${data.primarycategory}{enter}`)
                cy.get('#termsOfServiceAgreement').click()
                cy.get('.inline-flex').click()
            })
        })
        invalidTestData.forEach(data => {
            it(`showing error messagge with invalid input`, () => {
                if (data.name !== undefined && data.name !== '') {
                    if (data.name.length > 100) {
                        cy.get('#name').type(data.name)
                        cy.get('.inline-flex').click()
                        cy.contains(data.validationMessage)
                    }
                    cy.get('#name').type(data.name)
                } else {
                    cy.get('.inline-flex').click()
                    cy.get('#name:invalid').invoke('prop', 'validationMessage').should('equal', data.validationMessage)
                }
                //validate supplierName field
                if (data.supplierName !== undefined && data.supplierName !== '') {
                    if (data.supplierName.length <= 100) {
                        cy.get('#supplierName').type(`${data.supplierName}{enter}`)
                    } else {
                        cy.contains(data.validationMessage)
                    }
                } else {
                    cy.get('.inline-flex').click()
                    cy.get('#supplierName:invalid').invoke('prop', 'validationMessage').should('equal', data.validationMessage)
                }

                //validate website field
                if (data.website !== undefined && data.website !== '') {
                    const isLink = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(data.website);
                    if (isLink) {
                        cy.get('#website').type(data.website)
                    } else {
                        cy.get('#website').type(data.website);
                        cy.get('.inline-flex').click();
                        cy.get('#termsOfServiceAgreement').click()
                        cy.contains(data.validationMessage).should('be.visible');
                    }
                } else {
                    cy.get('#termsOfServiceAgreement').click()
                    cy.get('.inline-flex').click()
                    cy.get('#website').invoke('prop', 'validationMessage').should('equal', data.validationMessage)
                }
                //validate instagram link
                if (data.instagramLink !== undefined && data.instagramLink !== '') {
                    const isLink = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(data.instagramLink);
                    if (isLink) {
                        cy.get('#instagramLink').type(data.instagramLink)
                    } else {
                        cy.get('#instagramLink').type(data.instagramLink);
                        cy.get('.inline-flex').click();
                        cy.get('#termsOfServiceAgreement').click()
                        cy.contains(data.validationMessage).should('be.visible');
                    }
                } else {
                    cy.get('#termsOfServiceAgreement').click()
                    cy.get('.inline-flex').click()
                    cy.get('#instagramLink').invoke('prop', 'validationMessage').should('equal', data.validationMessage)
                }
                //validate primary category
                if (data.primarycategory !== undefined && data.primarycategory !== '') {
                    cy.xpath('/html/body/div/div/div/form/div/div[7]/div/div/div[1]/div[2]').type(data.primarycategory)
                } else {
                    cy.get('.inline-flex').click()
                    cy.get('.css-1whw0ba-Gq:invalid').invoke('prop', 'validationMessage').should('equal', data.validationMessage)
                }
            })
        })
    })
})