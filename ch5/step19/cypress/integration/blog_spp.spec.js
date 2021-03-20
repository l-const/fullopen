
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        username: 'myusername', password: 'mypassword', name : 'myname'
    }
    
    const otherUser = {
        username: 'otherusername', password: 'othermypassword', name : 'othermyname'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#login-form')
  })


  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('myusername')
      cy.get('#password').type('mypassword')
      cy.get('#login-button').click()
      cy.get('#message').contains('Login successful!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('#message').contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: "myusername", password: "mypassword"})
    })
    it('A blog can be created', function() {
       cy.createBlog({ title: "some title", author: "some author", url: "some url"})
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: "some title", author: "some author", url: "some url"})
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.get("#span-likes").contains("1")
    })

    it('A blog can be deleted', function() {
      cy.createBlog({ title: "some title", author: "some author", url: "some url"})
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.get("#span-likes").contains("1")
      cy.get("#Blog").should("exist")
      cy.get("#remove-btn").click()
      cy.get("#Blog").should("not.exist")
    })



   
  })

})