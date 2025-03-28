# User Management React App

## Project Overview
This is a simple React application that allows users to dynamically add, delete, and edit user details using a table interface. The application utilizes json-server as a mock backend to store and manage user data.

## Features
- Add new users
- Edit existing user details
- Delete users
- Display user data in a dynamic table
- Uses JSON Server as a backend

## Technologies Used
- React.js (Frontend)
- JSON Server (Mock Backend)
- JavaScript, HTML, CSS

## Prerequisites
Make sure you have the following installed before running the project:
- [Node.js](https://nodejs.org/)
- npm (Node Package Manager)

## Installation & Setup

1. *Clone the repository*
sh
   git clone https://github.com/Archana282004/Dynamic-user-table.git
   


2. *Install dependencies*
sh
   npm install


## Running the Project

### 1. Start JSON Server (Mock Backend)
sh
json-server --watch src/db.json --port 5000


### 2. Start the React App
sh
npm start


## API Endpoints
The JSON Server provides the following RESTful endpoints:

### Get All Users
- *URL:* GET http://localhost:5000/users
- *Description:* Fetches the list of all users.

### Add a New User
- *URL:* POST http://localhost:5000/users
- *Description:* Adds a new user to the database.
- *Request Body:*
  json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 25
  }
  

### Update an Existing User
- *URL:* PUT http://localhost:5000/users/:id
- *Description:* Updates the details of an existing user.
- *Request Body:*
  json
  {
    "id": 1,
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "age": 32
  }
  

### Delete a User
- *URL:* DELETE http://localhost:5000/users/:id
- *Description:* Deletes a user by ID.
- *Example:*
  sh
  DELETE http://localhost:5000/users/1
  
