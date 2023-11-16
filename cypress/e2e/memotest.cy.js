/// <reference types="Cypress" />

const URL = 'http://192.168.0.2:8080/'

context('Memotest', () => {  
    beforeEach(() => {
        cy.visit(URL)
    })
    describe('Memotest page', () => {
        const boxElements = 12
        it(`should have ${boxElements} boxes`, () => {
            cy.get('.container').find('.box').should('have.length', 12)
        })

        it('should have random boxes', () => {
            cy.get('.box').then((boxes) => {
                let originalClass = [] 
                boxes.each((i,box) => {
                    originalClass.push(box.id)
                })
                
                cy.visit(URL)

                cy.get('.box').then((boxes) => {
                    let newClass = [] 
                    boxes.each((i,box) => {
                        newClass.push(box.id)
                    })
                    cy.wrap(originalClass).should('not.deep.equal', newClass)
                })
            })
        })

        describe('must complete the game', () => {
            it('click', () => {
                cy.get('.box').then(boxes => {
                    const boxesMap = groupBoxesById(boxes)
                    boxesMap.forEach(boxes => {
                        cy.get(boxes[0]).click()
                        cy.get(boxes[1]).click()
                    });
                    boxesMap[0][1].click()
                    boxesMap[1][1].click()
                    boxesMap[2][1].click()
                    boxesMap[3][1].click()
                })
                cy.get('.container').should('exist').should('not.be.hidden')
                cy.get('.win-game').should('be.visible').contains(`Ganaste!, lo lograste en 8 intentos. Felicitaciones`)
            })
        })
    })
})

function groupBoxesById(boxes){
    const $boxesMap = new Map()
    boxes.each((i,box) => {
        if(!$boxesMap.has(box.id)){
            $boxesMap.set(box.id, [box])
        }
        else{                   
            $boxesMap.get(box.id).push(box)
        }
    })
    return Array.from($boxesMap.values())
}