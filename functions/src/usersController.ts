import { Response } from 'express';
import { db } from './config/firebase';
import { body, validationResult } from 'express-validator';

type UserType = {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  quote: string;
  address: string;
  phoneNumber: string;
  birthDate: Date;
  job: string;
  hobbies: string[];
};

type Request = {
  body: UserType;
  params: { userId: string };
};

const getAllUsers = async (request: Request, response: Response) => {
  try {
    const allUsers: UserType[] = [];
    const querySnapshot = await db.collection('users').get();
    querySnapshot.forEach((doc: any) => allUsers.push(doc.data()));
    return response.status(200).json(allUsers);
  } catch (error: unknown) {
    return response.status(500).json((error as Error).message);
  }
};

const getUser = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    const querySnapshot = await db
      .collection('users')
      .where('id', '==', userId)
      .get();

    if (querySnapshot.docs.length === 0) {
      return response.status(404).send({
        status: 404,
        error: 'User not found.',
      });
    }

    const user: UserType = querySnapshot.docs?.[0].data() as UserType;
    return response.status(200).json(user);
  } catch (error: unknown) {
    return response.status(500).json((error as Error).message);
  }
};

const userValidators = () => {
  return [
    body('avatar')
      .optional()
      .isURL()
      .withMessage('Avatar must be a valid URL.'),
    body('firstName')
      .exists()
      .withMessage('You must provide a first name.')
      .isLength({ min: 3, max: 30 })
      .withMessage('Name must be between 3 and 30 charactes.'),
    body('lastName')
      .optional()
      .isLength({ min: 3, max: 30 })
      .withMessage('Name must be between 3 and 30 charactes.'),
    body('email').optional().isEmail().withMessage('The email must be valid.'),
    body('phoneNumber')
      .optional()
      .isMobilePhone('any')
      .withMessage('The phone number must be a valid number.'),
    body('birthDate')
      .optional()
      .isDate()
      .withMessage('The birth date must be in correct format yyyy-mm-dd'),
    body('hobbies')
      .optional()
      .isArray()
      .withMessage('The hobbies must be an array.'),
    body('hobbies.*')
      .isLength({ min: 3, max: 30 })
      .withMessage('Each hobby must be between 3 and 30 characters.'),
  ];
};

const addUser = async (request: Request, response: Response) => {
  const {
    avatar,
    firstName,
    lastName,
    email,
    gender,
    quote,
    address,
    phoneNumber,
    birthDate,
    job,
    hobbies,
  } = request.body;
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const user = db.collection('users').doc();
    const userOject = {
      id: user.id,
      avatar: avatar ?? null,
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      email: email ?? null,
      gender: gender ?? null,
      quote: quote ?? null,
      address: address ?? null,
      phoneNumber: phoneNumber ?? null,
      birthDate: birthDate ?? null,
      job: job ?? null,
      hobbies: hobbies ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    user.set(userOject);

    return response.status(200).send({
      message: 'User added successfully',
      data: userOject,
    });
  } catch (error: unknown) {
    return response.status(500).json((error as Error).message);
  }
};

const userEditValidators = () => {
  return [
    body('avatar')
      .optional()
      .isURL()
      .withMessage('Avatar must be a valid URL.'),
    body('firstName')
      .optional()
      .isLength({ min: 3, max: 30 })
      .withMessage('Name must be between 3 and 30 charactes.'),
    body('lastName')
      .optional()
      .isLength({ min: 3, max: 30 })
      .withMessage('Name must be between 3 and 30 charactes.'),
    body('email').optional().isEmail().withMessage('The email must be valid.'),
    body('phoneNumber')
      .optional()
      .isMobilePhone('any')
      .withMessage('The phone number must be a valid number.'),
    body('birthDate')
      .optional()
      .isDate()
      .withMessage('The birth date must be in correct format yyyy-mm-dd'),
    body('hobbies')
      .optional()
      .isArray()
      .withMessage('The hobbies must be an array.'),
    body('hobbies.*')
      .isLength({ min: 3, max: 30 })
      .withMessage('Each hobby must be between 3 and 30 characters.'),
  ];
};

// // Update user
// app.put('/users/:userId', async (req, res) => {
//   await db.collection(userCollection).doc(req.params.userId).set(req.body,{merge:true})
//   .then(()=> res.json({id:req.params.userId}))
//   .catch((error)=> res.status(500).send(error))

// });

const updateUser = async (request: Request, response: Response) => {
  const { userId } = request.params;
  // const {
  //   avatar,
  //   firstName,
  //   lastName,
  //   email,
  //   gender,
  //   quote,
  //   address,
  //   phoneNumber,
  //   birthDate,
  //   job,
  //   hobbies,
  // } = request.body;

  try {
    db.collection('users').doc(userId).set(request.body, { merge: true });

    const user = db.collection('users').doc(userId);

    // const currentData = (await user.get()).data() || {};
    // const userObject = {
    //   id: currentData.id,
    //   avatar: avatar || currentData.avatar,
    //   firstName: firstName || currentData.firstName,
    //   lastName: lastName || currentData.lastName,
    //   email: email || currentData.email,
    //   gender: gender || currentData.gender,
    //   quote: quote || currentData.quote,
    //   address: address || currentData.address,
    //   phoneNumber: phoneNumber || currentData.phoneNumber,
    //   birthDate: birthDate || currentData.birthDate,
    //   job: job || currentData.job,
    //   hobbies: hobbies || currentData.hobbies,
    //   createdAt: currentData.createdAt,
    //   updatedAt: new Date(),
    // };

    // await user.set(userObject).catch((error: unknown) => {
    //   return response.status(400).json({
    //     status: 400,
    //     message: (error as Error).message,
    //   });
    // });

    return response.status(200).json({
      message: 'User updated successfuly',
      data: user,
    });
  } catch (error: unknown) {
    return response.status(500).json((error as Error).message);
  }
};

const deleteUser = async (request: Request, response: Response) => {
  const { userId } = request.params;

  try {
    const user = db.collection('users').doc(userId);

    await user.delete().catch((error: unknown) => {
      return response.status(400).json({
        status: 400,
        message: (error as Error).message,
      });
    });

    return response.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error: unknown) {
    return response.status(500).json((error as Error).message);
  }
};

export {
  addUser,
  getAllUsers,
  getUser,
  userValidators,
  userEditValidators,
  updateUser,
  deleteUser,
};
