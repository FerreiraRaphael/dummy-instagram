# Dummy Instagram
A dummy instagram clone, where users can register with a username and password, and upload public or private photos, with captions, and everybody got to see the public photos uploaded.

### Features
- Anonymous users and registered users can see all public images.
- Everyone can create a new account with a unique username and password.
- Users can manage their photos, uploading, deleting and editing.
- The main screen should update all photos in real time.

### Technologies

- Client
  - React
  - Apollo Client
- Server
  - Apollo Server (Graphql)
  - Express
  - nedb
  - JWT for Authentication

### Development

Setup Environment:

- Install dev dependencies for the environment, at the project root, this will setup the pre commit hook for auto format code when committing.
```
npm install
```

Running the server:

- Install Server dependencies
`cd server && npm install`
- Seed Database
`npm run db seed test`
- Start the graphql server
`npm run watch`

Running the client:

- Install Client dependencies
`cd client && npm install`
- Start the development client's server
`npm start`


# Test cases.

> As asked in the instructions for the project, I wrote some test cases to show how I tested the application while developing it. Sadly I didn't had time to wrote end to end tests to the web client and integration tests for the graphql server, neither unit tests.

## Setup

Run both server and client.

Running the server:

- Install Server dependencies
  `cd server && npm install`
- Seed Database
  `npm run seed test`
- Start the graphql server
  `npm start`

Running the client:

- Install Client dependencies
  `cd ../client && npm install`
- Start the development client's server
  `npm start`
- Open the client in a browser at
  `http://localhost:3000`

### Use case 01: The user must be able to upload an image along with a brief caption for that image.

Steps to reproduce:

- Create a account at visiting: `/register`
- Fill the register form with a username and password, submit it and be redirect to `/`.
- Visit `/upload/`
- Fill the upload form with a image and a caption, submit it and be redirect to `/`.
- See the new photo on the all photos list.

### User case 02: Images must either be public or private.

Steps to reproduce:

- Follow steps to register a user and navigate to `/upload`
- Fill the upload form with a image and a caption, choose if the image is going to be public or private with the `Is Private ?` switch, and save it.
- Open a new anonymous tab browser, and see if the user can see only publics images and not private ones.

### User case 03: The user must be able to view all existing images along with their caption. Only public images or private images the user added must be displayed.

Steps to reproduce:

- Follow steps to register a user and navigate to `/upload`
- Fill the upload form with a image and a caption, choose if the image is going to be public or private with the `Is Private ?` switch, and save it.
- Navigate to `/` and see if the user can see only publics and his privates images.

### User case 04: Different users should be able to login to the application.

Steps to reproduce:

- Follow steps to register a user and login in different browser or anonymous tabs.

### User case 05: All data added must be persistent, such that the server and browser can be restarted without any loss of data.

Steps to reproduce:

- Restart the server and client, and the database and local storage should still be persisted.

### User case 06: The images displayed could update in real-time as new images are added.

Steps to reproduce:

- Login two different user in different browsers or anonymous tabs.
- Navigation with user_1 in `/` route to see the changes in the photos lists.
- Upload photos, delete and edit then, with the user_2, and see the updates in real time with user_1.
- Navigate to `user/user_2` with user_1 and see this user photos list.
- With user_2, again upload photos, delete and edit, then see the updates in real time with user_1.
test-cases.md
Exibindo test-cases.md.
