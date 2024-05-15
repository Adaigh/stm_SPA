const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {createToken} = require('../userAccountController');

jest.mock('jsonwebtoken');  // Mock the jwt library

describe('ACCOUNT TESTS', () => {
    describe('createToken', () => {

        // Test 1: Valid ID, Successful Token Creation
        it('should create a valid JWT token for a valid MongoDB ObjectId', () => {
            // Setup
            const validId = new mongoose.Types.ObjectId();
            const mockToken = 'mock_jwt_token';
            jwt.sign.mockReturnValue(mockToken); 
    
            // Execute
            const token = createToken(validId);
    
            // Assert
            expect(jwt.sign).toHaveBeenCalledWith({_id: validId}, process.env.JWT_SECRET, {expiresIn: '1d'});
            expect(token).toBe(mockToken);
        });
    
        // Test 2: Invalid ID, Throws TypeError
        it('should throw a TypeError for an invalid MongoDB ObjectId', () => {
            // Setup
            const invalidId = 'not_an_object_id';
    
            // Execute & Assert
            expect(() => createToken(invalidId)).toThrow(TypeError);
            expect(() => createToken(invalidId)).toThrow('ID invalid for token creation');
        });
    
        // Test 3: JWT_SECRET Not Defined (Optional)
        it('should throw an error if JWT_SECRET is not defined in the environment', () => {
            // Temporarily delete JWT_SECRET from environment
            const originalJwtSecret = process.env.JWT_SECRET;
            delete process.env.JWT_SECRET;
    
            // Execute & Assert
            expect(() => createToken(mongoose.Types.ObjectId())).toThrow(Error);
    
            // Restore JWT_SECRET
            process.env.JWT_SECRET = originalJwtSecret;
        });
    });
})