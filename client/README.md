# Client
This is the front-end of the application that communicates with the REST API from [Server side](../server).  
  
[You can preview the live application from https://gkeranov-memories-app.netlify.app/.](https://gkeranov-memories-app.netlify.app/)

## Table of Contents
- [Technologies Used](#technologies-used)
- [Functionalities](#functionalities)
- [How to Install](#how-to-install)
- [Images](#images)

## Technologies Used
- JavaScript
- React
- Redux Toolkit - used for state managment and less boilerplate code using Redux
- React Router Dom - used for dynamic routing in the app
- Axios - used for easier communication with HTTP
- HTML
- CSS

## Functionalities
1. Everyone can:
- View posts, comments and likes made by other users.
- Search by title or tags for posts.
- View recommended posts on every page based on the currently viewed post.
- View other pages of posts.
- Register as a user and login.
2. Users can:
- View, post, edit or remove their posts which is happening on a single page.
- Like or remove already liked posts.
- Comment on posts or remove their comments from posts.

## How to Install
Before installation make sure that you have installed [Node.JS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).

1. Download the project locally.
2. Open the ```/client``` folder.
3. Copy ```.env.example``` file and paste it in the same directory renaming it as a ```.env```.
4. Open ```.env``` file and type the value for ```REACT_APP_API_URL```. This is the url for the server side API. For example if you run the server side with the default settings you can type this in your ```.env``` file ```REACT_APP_API_URL=http://localhost:5000```
5. Open the ```/client``` folder with the terminal.
6. Type ```npm install``` in the terminal and wait to install all of the packages.
7. Type ```npm start``` in the terminal and wait until it says ```webpack compiled successfully```.
8. You can view the application at ```http://localhost:3000```.

## Images
![gkeranov-memories-app netlify app_](https://user-images.githubusercontent.com/22518317/172440923-214a51fd-eb21-4c1e-8553-75160a99807d.png)  
  
---  
  
![gkeranov-memories-app netlify app_posts_629f7217efcd39552dfc4351](https://user-images.githubusercontent.com/22518317/172440986-2b0b31a8-194b-4b3e-8b04-ca59037e7213.png)  
  
---  
  
![gkeranov-memories-app netlify app_posts_629f7217efcd39552dfc4351 (1)](https://user-images.githubusercontent.com/22518317/172441005-ff4a0121-d5d3-4760-bea3-5277afbf13d5.png)  
  
---  
  
![gkeranov-memories-app netlify app_posts_629f7217efcd39552dfc4351 (2)](https://user-images.githubusercontent.com/22518317/172441053-5a039b8b-d53f-470e-bfe1-7c594f3c8226.png)  
