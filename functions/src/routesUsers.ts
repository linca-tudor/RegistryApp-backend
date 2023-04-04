import { Express } from 'express';
import { addUser, deleteUser, getAllUsers, getUser, updateUser, userValidators, userEditValidators } from './usersController';

export const setup = (app: Express) => {
  /**
   * @swagger
   * /users:
   *   get:
   *     description: Returns the list of users
   *     responses:
   *       200:
   *         description: An array with Users
   */
  app.get("/users", getAllUsers);

  /**
   * @swagger
   * /users:
   *   post:
   *     description: Add a new user
   *     requestBody:
   *       description: Parameters for the new user
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              avatar:
   *                type: string
   *                description: Must be a valid URL
   *              firstName:
   *                type: string
   *                description: Between 3 and 30 characters
   *              lastName:
   *                type: string
   *                description: Between 3 and 30 characters
   *              email: 
   *                type: string
   *                description: Must be a valid email
   *              gender:
   *                type: string
   *              quote:
   *                type: string
   *              address:
   *                type: string
   *              phoneNumber:
   *                type: string
   *                description: Must be a valid phone number
   *              birthDate:
   *                type: Date
   *                description: Must be a string in the format yyyy-mm-dd
   *              job:
   *                type: string
   *              hobbies:
   *                description: Must be an array of strings
   *                type: array
   *                items:
   *                  type: string
   *                  description: Must be between 3 and 30 characters
   *            required:
   *              - firstName  
   */
  app.post("/users", ...userValidators(), addUser);

  /**
   * @swagger
   * /users/:userId:
   *   get:
   *     description: Returns the user with the specified id
   *     parameters:
   *       - name: userId
   *         description: The user id
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: The user object
   *       404:
   *         description: Specified id was not found
   */
  app.get("/users/:userId", getUser);

  /**
   * @swagger
   * /users/:userId:
   *   put:
   *     description: Updates details for a user
   */
  app.put("/users/:userId", ...userEditValidators(), updateUser);

  /**
   * /users/:userId:
   *   delete:
   *     description: Deletes a user entry
   */
  app.delete("/users/:userId", deleteUser);
}