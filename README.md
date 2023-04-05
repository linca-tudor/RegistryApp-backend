[![Github All Releases](https://img.shields.io/badge/Status-In%20development-orange)]()
# RegistryApp Backend

## _This is the backend for the [RegistryApp] React-native application._

## Features

- CRUD Operations Support
- Uses Firebase Functions

## Frameworks and libraries

### This server app uses the following:

- [FirebaseFunctions] - "Cloud Functions for Firebase is a serverless framework that lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests."
- [ExpressValidator] - "express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions."
- [TypeScript] - "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale."


## Installing the app

RegistryApp requires [Node.js](https://nodejs.org/) v16+ and [React.js](https://reactnative.dev/docs/0.68/environment-setup) v68.2 to run.

Clone this repository

```sh
gh repo clone https://github.com/linca-tudor/RegistryApp-backend.git
```

Navigate to the folder where the repository has been cloned and install the dependencies and devDependencies

```sh
cd RegistryApp-backend/functions
npm i
```

## Setting up Firebase

To successfully build and use the app, Firebase SDKs must be initialised and included in the project. To do so, please follow the steps shown in the [Firebase Configuration Guide](FIREBASE-CONFIG.md).

# Setting up Firebase

To integrate Firebase with the app, you first have to go to the [Firebase Console](https://console.firebase.google.com/), and login if prompted, 
then follow these steps:

## Step 1. Create a new FIrebase project

<img width="1535" alt="Create new project" src="https://user-images.githubusercontent.com/37547839/202476627-62d6cfc0-78e4-4269-b585-b26d5c2be5da.png">
<img width="1550" alt="Add new project name" src="https://user-images.githubusercontent.com/37547839/202478992-537b29fe-6d01-4896-b8df-e158ded89664.png">
<img width="1535" alt="Toggle off Google Analitics" src="https://user-images.githubusercontent.com/37547839/202476837-3f04ca84-04dc-4b71-ba13-3500cc39b527.png">
<img width="1535" alt="New project ready" src="https://user-images.githubusercontent.com/37547839/202476860-a56a5e1e-18dd-4aa1-8d78-0aaa2a5ce7ed.png">

## Step 2. Create a new App within the project

<img width="1550" alt="Project home new app" src="https://user-images.githubusercontent.com/37547839/202479379-6d80ec83-5b5c-4816-8da8-18cbc1f8af21.png">
<img width="1550" alt="Create new app name" src="https://user-images.githubusercontent.com/37547839/202480812-6756818e-d467-4663-bbdf-08fbec5683bb.png">
<img width="1550" alt="Api keys" src="https://user-images.githubusercontent.com/37547839/202482228-051427bd-129a-4a08-904f-f8fd227be885.png">

## Step 3. Activate the Authentication service

<img width="1550" alt="Project home created app" src="https://user-images.githubusercontent.com/37547839/202482717-6b581611-219d-4636-b56f-6c80a37cc324.png">
<img width="1550" alt="All products Auth" src="https://user-images.githubusercontent.com/37547839/202483413-b3c1cb30-6e0c-434a-9ca8-483fb53c732e.png">
<img width="1550" alt="New Auth Service" src="https://user-images.githubusercontent.com/37547839/202483538-a9b77ef6-66ac-472f-af53-1e03a1660836.png">
<img width="1550" alt="Auth Email set-up" src="https://user-images.githubusercontent.com/37547839/202482812-73492e16-faac-4ea6-96da-1054aa2fa5af.png">
<img width="1550" alt="Auth Email enable" src="https://user-images.githubusercontent.com/37547839/202482827-a23ff249-a84e-40a4-b397-e82f5790b9f4.png">

## Step 4. Initialize the Real Time Database

<img width="1550" alt="Project home created app" src="https://user-images.githubusercontent.com/37547839/202484086-af828e1d-784c-4dc1-b774-aebdcdc97b93.png">
<img width="1550" alt="All products Real Time DB" src="https://user-images.githubusercontent.com/37547839/202484121-91be63e9-67c0-4491-be79-5889cc34a5dd.png">
<img width="1550" alt="New real time DB" src="https://user-images.githubusercontent.com/37547839/202484154-974badd2-40e2-4cf7-98d2-9f198f26802e.png">
<img width="1550" alt="Real time DB location" src="https://user-images.githubusercontent.com/37547839/202484174-91bf9054-429f-400f-9ac5-4eed95972508.png">
<img width="1550" alt="Real time DB rules" src="https://user-images.githubusercontent.com/37547839/202484187-820bf539-098c-4269-9439-030c72cd2d58.png">
<img width="1550" alt="Real time DB link" src="https://user-images.githubusercontent.com/37547839/202484236-db513f81-8d53-4068-be69-70a3c25fa77a.png">

## Step 5. Initialize the Storage Bucket

<img width="1792" alt="All products Storage" src="https://user-images.githubusercontent.com/37547839/202484530-60e87827-9b65-4e49-86ff-3a84dba7bca5.png">
<img width="1792" alt="New Storage Bucket" src="https://user-images.githubusercontent.com/37547839/202484552-b37691e0-a137-49fd-b1af-d4e81f785952.png">
<img width="1792" alt="Storage Bucket Location" src="https://user-images.githubusercontent.com/37547839/202484577-8649bd6f-2dd2-48a5-a9fa-0ba75530a8e3.png">
<img width="1792" alt="Storage Bucket Rules" src="https://user-images.githubusercontent.com/37547839/202484596-8437381e-aa5a-4d78-9c39-1369b7408a70.png">
<img width="1792" alt="Storage link" src="https://user-images.githubusercontent.com/37547839/202484622-1c2cf288-6c71-4890-a08d-293491bcf073.png">

## Step 6. Putting it all together

The final step in integrating Firebase in our app is to save all the keys and links into a single file inside the project folder.
Create a new **.env** file at the root of the project folder. This file will contain the following:

```javascript
  FIREBASE_API_KEY:               apiKey              //from Step 2.
  FIREBASE_AUTH_DOMAIN:           authDomain          //from Step 2.
  FIREBASE_PROJECT_ID:            projectId           //from Step 2.
  FIREBASE_MESSAGING_SENDER_ID:   messagingSenderId   //from Step 2.
  FIREBASE_APP_ID:                appId               //from Step 2.
  FIREBASE_DATABASE_URL:          databaseUrl         //from Step 4.
  FIREBASE_STORAGE_BUCKET:        storageBucket       //from Step 5.
```
Quick links: 
- [Step 2](FIREBASE-CONFIG.md#step-2-create-a-new-app-within-the-project) and [Firebase SDK Config location](https://user-images.githubusercontent.com/37547839/202482228-051427bd-129a-4a08-904f-f8fd227be885.png)
- [Step 4](FIREBASE-CONFIG.md#step-4-initialize-the-real-time-database) and [Real Time DB Link location](https://user-images.githubusercontent.com/37547839/202484236-db513f81-8d53-4068-be69-70a3c25fa77a.png)
- [Step 5](FIREBASE-CONFIG.md#step-5-initialize-the-storage-bucket) and [Storage Bucket Link location](https://user-images.githubusercontent.com/37547839/202484622-1c2cf288-6c71-4890-a08d-293491bcf073.png)

The app should now build successfully :D

## Important
### If you forked this project, or you use your own public version history system, make sure to add the **.env** file to the ignored files list. The Firebase security rules configured in the previous steps will allow any person with access to these keys to read and write data on the database until the timeframe expires (this includes sent messages, images and user credentials).

If you wish to return to the Readme file, [click here](README.md#setting-up-firebase).


## Starting the app


The app can be started by running the server with:

```sh
npm expo start
```



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [ExpressValidator]: <https://express-validator.github.io/docs/>
   [FirebaseFunctions]: <https://firebase.google.com/docs/functions>
   [TypeScript]: <https://www.typescriptlang.org/>
   [RegistryApp]: <https://github.com/linca-tudor/RegistryApp>
