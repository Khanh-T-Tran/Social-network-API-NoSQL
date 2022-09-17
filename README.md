# Social-network-API-NoSQL
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) 

## Table of Contents
1. [Description](#Description)
2. [User_Story](#User_Story)
3. [Acceptance_Criteria](#Acceptance_Criteria)
4. [Technologies](#Technologies)

## Description
An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## User_Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance_Criteria
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Technologies
```
Mongoose
Express.js
Moment.js

```
## Deployment

View all demo videos at: 

User routes: https://drive.google.com/file/d/1dohfZ6MdQptWlbuujD_aZONqJSO_ymD3/view  
Thought routes: https://drive.google.com/file/d/1edo66dHUwjKzHqQFsOxk-V5GcW4EEcTD/view  
Friends and reactions routes: https://drive.google.com/file/d/1RixEbXg-z7HVg8KmxKaIGPxfpqu1zPZf/view  
