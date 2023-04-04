import { body, validationResult } from "express-validator";
import { Response } from "express";
import { db } from "./config/firebase";

type HobbyType = {
  name: string;
};

type Request = {
  body: HobbyType;
  params: { hobbyId: string };
};

const getAllHobbies = async (request: Request, response: Response) => {
  try {
    const allHobbies: HobbyType[] = [];
    const querySnapshot = await db.collection("hobbies").get();
    querySnapshot.forEach((doc: any) => allHobbies.push(doc.data()));
    return response.status(200).json(allHobbies);
  } catch (error: unknown) {
    return response.status(500).json((error as Error).message);
  }
};

const hobbyValidator = () => {
  return [
    body("name")
      .exists()
      .withMessage("Fiels name is required.")
      .isLength({ min: 3, max: 30 })
      .withMessage("Hobby must have between 3 and 30 characters."),
  ];
};

const addHobby = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const { name } = request.body;
  try {
    const hobby = db.collection("hobbies").doc();
    const hobbyOject = {
      id: hobby.id,
      name,
    };

    hobby.set(hobbyOject);

    return response.status(200).send({
      message: "Hobby added successfully",
      data: hobbyOject,
    });
  } catch (error: unknown) {
    return response.status(500).json((error as Error).message);
  }
};

export { addHobby, hobbyValidator, getAllHobbies };
