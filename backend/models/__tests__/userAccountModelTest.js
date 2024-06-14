const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { MongoMemoryServer } = require('mongodb-memory-server')
const UserAccountModel = require('../userAccountModel') // Replace with the correct import path

// Mock the bcrypt.compare method for testing purposes

let mdb = null
let conn = null

describe('userAccountModel', () => {

  // Connect to mock DB and insert test appointments
  beforeAll( async () => {
    mdb = await MongoMemoryServer.create()
    conn = await mongoose.connect(mdb.getUri())
})

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect()
    .then(() => mdb.stop())
  })

  describe('login', () => {
    
    it('should throw an Error if any field is missing', async () => {
      // Arrange
      const user = 'testuser'
      // Act and Assert
      await expect(UserAccountModel.login(user, '')).rejects.toThrow('All fields must be filled')
      await expect(UserAccountModel.login('', 'password')).rejects.toThrow('All fields must be filled')
    })
    
    it('should throw an Error if user is not found', async () => {      
      // Arrange
      const user = 'testuser'
      const password = 'password'
      // Act and Assert
      await expect(UserAccountModel.login(user, password)).rejects.toThrow('Email or password incorrect')
    })
    
    it('should throw an Error if the password does not match', async () => {    
      // Arrange
      const user = 'testuser'
      const password = 'hashedPassword'
      await UserAccountModel.create({ user, password, access: 0 })      
      // Act and Assert
      await expect(UserAccountModel.login(user, 'wrongPassword')).rejects.toThrow('Email or password incorrect')
    })
    
    it('should return the user account if the login is successful', async () => {    
      // Arrange
      const user = 'testuser2'
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash('password', salt)
      const access = 0
      await UserAccountModel.create({ user, password, access})      
      // Act
      const result = await UserAccountModel.login(user, 'password')
      // Assert
      expect(result.user).toBe(user)
    }) 

  })

  describe('signup', () => {

    it('should throw an Error if any field is missing', async () => {
      await expect(UserAccountModel.signup('', 'password', 0)).rejects.toThrow('All fields must be filled')
      await expect(UserAccountModel.signup('user', '', 0)).rejects.toThrow('All fields must be filled')
    })

    it('should throw an Error if the email is invalid', async () => {
      await expect(UserAccountModel.signup('invalidEmail', 'password', 0)).rejects.toThrow('Invalid email address')
    })

    it('should throw an Error if the email is already in use', async () => {
      const existingUser = 'testuser@example.com'
      await UserAccountModel.create({ user: existingUser, password: 'hashedPassword', access: 0 })
      await expect(UserAccountModel.signup(existingUser, 'password', 0)).rejects.toThrow('Email already in use.')
    })

    it('should create a new user with hashed password and return the account when valid data is provided', async () => {      
      const user = 'newuser@example.com'
      const password = 'password'
      const access = 0
      
      await expect(UserAccountModel.signup(user, password, access)).resolves.toHaveProperty('user', user)

      const createdUser = await UserAccountModel.findOne({ user })
      expect(createdUser).not.toBeNull()
      expect(await bcrypt.compare(password, createdUser.password)).toBe(true)      
    })

    // The following test ensures that the bcrypt.hash function is called when signup is invoked. 
    it('should call bcrypt.hash to encrypt the password', async () => {
      const bcryptHashSpy = jest.spyOn(bcrypt, 'hash')
      const user = 'newuser2@example.com'
      const password = 'password'
      const access = 0      

      await UserAccountModel.signup(user, password, access)
      expect(bcryptHashSpy).toHaveBeenCalledWith(password, expect.any(String))
      bcryptHashSpy.mockRestore()
    })

  })
})
