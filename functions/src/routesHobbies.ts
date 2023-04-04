import { Express } from 'express';
import { addHobby, getAllHobbies, hobbyValidator } from './hobbiesController';

export const setup = (app: Express) => {
  /**
   * @swagger
   * /hobbies:
   *   get:
   *     description: Returns the list of hobbies
   *     responses:
   *       200:
   *         description: An array with hobbies as strings
   *         schema:
   *           type: array
   *           items:
   *             types: object
   *             properties:
   *               id:
   *                 type: string
   *                 example: bx66Lahb24IFOYMjz9gs
   *               name:
   *                 type: string
   *                 example: Guitar
   */
  app.get("/hobbies", getAllHobbies);

  /**
   * @swagger
   * /hobbies:
   *   post:
   *     description: Adds a new hobby
   *     parameters:
   *       - name: name
   *         description: Hobby's name (between 3-30 characters)
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: The hobby was added successfully
   *       400:
   *         description: Validation errors.
   */
  app.post("/hobbies", ...hobbyValidator(), addHobby);
};