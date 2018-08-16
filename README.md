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
`npm run seed test`
- Start the graphql server
`npm run watch`

Running the client:

- Install Client dependencies
`cd client && npm install`
- Start the development client's server
`npm start`
