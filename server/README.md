# Server
This is the REST API of the application created with Node.JS and Express.  
  
[You can preview the live application from here - https://gkeranov-memories-app.netlify.app/.](https://gkeranov-memories-app.netlify.app/)  
  
[You can check the live REST API from this link - https://gkeranov-memories-back-end.herokuapp.com/.](https://gkeranov-memories-back-end.herokuapp.com/posts)

## Table of Contents
- [Functionalities](#functionalities)
- [Technologies Used](#technologies-used)
- [How to Install](#how-to-install)
- [API Documentation](#api-documentation)
	- [Register User](#register-user)
	- [Login User](#login-user)
	- [Get Posts](#get-posts)
	- [Get Recommended Posts](#get-recommended-posts)
	- [Get Post by Id](#get-post-by-id)
	- [Create Post](#create-post)
	- [Comment on Post](#comment-on-post)
	- [Edit Post](#edit-post)
	- [Like Post](#like-post)
	- [Remove Post](#remove-post)
	- [Remove Post Comment](#remove-post-comment)

## Functionalities
- User authentication with hashed password in the database using Bcrypt algorithm
- Create, update or remove post
- Like post
- Create or remove comment on post
- Pagination on posts
- Search posts
- Recommended posts

## Technologies Used
- JavaScript
- Node.JS
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- Bcrypt.js
- Dotenv
- Nodemon

## How to Install
Before installation make sure that you have installed [Node.JS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/) and [MongoDB Server](https://www.mongodb.com/try/download/community).

1. Download the project locally.
2. Open the ```/server``` folder.
3. Copy ```.env.example``` file and paste it in the same directory renaming it as a ```.env```.
4. Open ```.env``` file and type the values for:
	- ```MONGODB_CONNECTION_URL``` - Example - ```MONGODB_CONNECTION_URL=mongodb://localhost:27017/memories-mern-app```
	- ```JWT_SECRET_KEY``` - Example - ```JWT_SECRET_KEY=mysecretkey```
5. Open the ```/server``` folder with the terminal.
6. Type ```npm install``` in the terminal and wait to install all of the packages.
7. Type ```npm run dev``` in the terminal and wait until it says ```Server is running on port: 5000```.
8. You can view the REST API at ```http://localhost:5000```.


# API Documentation

You can test these requests on [https://gkeranov-memories-back-end.herokuapp.com/](https://gkeranov-memories-back-end.herokuapp.com/)

## Register User
URL: `/users/register`  
Method: `POST`  
Required body parameters: `firstName, lastName, email, password`

### Request body:
```JavaScript
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "example123"
}
```

### Response:
```JavaScript
{
    "user": {
        "firstName": "John",
        "lastName": "Doe",
        "_id": "629f1a9b601fa39c2f00f702",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo"
}
```

## Login User
URL: `/users/login`  
Method: `POST`  
Required body parameters: `email, password`

### Request body:
```JavaScript
{
    "email": "john.doe@example.com",
    "password": "example123"
}
```

### Response:
```JavaScript
{
    "user": {
        "firstName": "John",
        "lastName": "Doe",
        "_id": "629f1a9b601fa39c2f00f702",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo"
}
```

## Get Posts
URL: `/posts`  
Method: `GET`  
Optional query parameters: `page, title, tags`

### Request URL:
```
/posts?page=1&title=example&tags=tag1;tag2;tag3;tag4
```

### Response:
```JavaScript
{
    "posts": [
        {
            "_id": "629e12a7eccf903b73136d52",
            "title": "Test 1",
            "message": "Example",
            "author": {
                "_id": "6295f5e80a4c59e30dce770f",
                "firstName": "John",
                "lastName": "Doe",
                "__v": 0
            },
            "tags": [
                "tag1",
                "tag2",
            ],
            "likes": [],
            "comments": [],
            "createdAt": "2022-06-06T14:43:51.406Z",
            "__v": 0
        },
        {
            "_id": "629e1299eccf903b73136d43",
            "title": "Test 2",
            "message": "Example",
            "author": {
                "_id": "6295f5e80a4c59e30dce770f",
                "firstName": "John",
                "lastName": "Doe",
                "__v": 0
            },
            "tags": [
                "tag3",
                "tag4"
            ],
            "likes": [],
            "comments": [],
            "createdAt": "2022-06-06T14:43:37.697Z",
            "__v": 0
        }
    ],
    "currentPage": 1,
    "numberOfPages": 1
}
```


## Get Recommended Posts
URL: `/posts/recommended`  
Method: `GET`  
Optional query parameters: `excludedPostId, tags`

### Request URL:
```
/posts?excludedPostId=755e12a7eccf903b73136d41&tags=tag1;tag2;tag3;tag4
```

### Response:
```JavaScript
[
	{
	    "_id": "629e12a7eccf903b73136d52",
	    "title": "Test 1",
	    "message": "Example",
	    "author": {
	        "_id": "6295f5e80a4c59e30dce770f",
	        "firstName": "John",
	        "lastName": "Doe",
	        "__v": 0
	    },
	    "tags": [
	        "tag1",
	        "tag2",
	    ],
	    "likes": [],
	    "comments": [],
	    "createdAt": "2022-06-06T14:43:51.406Z",
	    "__v": 0
	},
	{
	    "_id": "629e1299eccf903b73136d43",
	    "title": "Test 2",
	    "message": "Example",
	    "author": {
	        "_id": "6295f5e80a4c59e30dce770f",
	        "firstName": "John",
	        "lastName": "Doe",
	        "__v": 0
	    },
	    "tags": [
	        "tag3",
	        "tag4"
	    ],
	    "likes": [],
	    "comments": [],
	    "createdAt": "2022-06-06T14:43:37.697Z",
	    "__v": 0
	}
]
```

## Get Post by Id
URL: `/posts/:id`  
Method: `GET`  
Required query parameter: `id`

### Request URL:
```
/posts/629e12a7eccf903b73136d52
```

### Response:
```JavaScript
{
    "_id": "629e12a7eccf903b73136d52",
    "title": "Test 1",
    "message": "Example",
    "author": {
        "_id": "6295f5e80a4c59e30dce770f",
        "firstName": "John",
        "lastName": "Doe",
        "__v": 0
    },
    "tags": [
        "tag1",
        "tag2",
    ],
    "likes": [],
    "comments": [],
    "createdAt": "2022-06-06T14:43:51.406Z",
    "__v": 0
}
```

## Create Post
URL: `/posts`  
Method: `POST`  
Optional body parameters: `title, messsage, tags, image`  
Required header authorization with token from `/users/register` or `/users/login` response  

### Header Authorization Token Format:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo
```

### Request body:
```JavaScript
{
    "title": "My first post",
    "message": "Hello guys!",
    "tags": "#firsttimer #hello",
    "image": "data:image/png;base64,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"
}
```

### Response:
```JavaScript
{
    "title": "My first post",
    "message": "Hello guys!",
    "author": {
        "_id": "6295f5e80a4c59e30dce770f",
        "firstName": "John",
        "lastName": "Doe",
        "__v": 0
    },
    "tags": [
        "firsttimer",
        "hello"
    ],
    "image": "data:image/png;base64,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",
    "likes": [],
    "_id": "629f23a98462b50843e080e2",
    "comments": [],
    "createdAt": "2022-06-07T10:08:41.732Z",
    "__v": 0
}
```

## Comment on Post
URL: `/posts/:id/comment`  
Method: `POST`  
Required query parameter: `id`  
Required body parameter: `comment`  
Required header authorization with token from `/users/register` or `/users/login` response  

### Request URL:
```
/posts/629e12a7eccf903b73136d52/comment
```

### Header Authorization Token Format:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo
```

### Request body:
```JavaScript
{
    "comment": "Nice post!"
}
```

### Response:
```JavaScript
{
    "_id": "629e12a7eccf903b73136d52",
    "title": "Test 1",
    "message": "Example",
    "author": {
        "_id": "6295f5e80a4c59e30dce770f",
        "firstName": "John",
        "lastName": "Doe",
        "__v": 0
    },
    "tags": [
        "tag1",
        "tag2",
    ],
    "likes": [],
    "comments": [
    	{
            "comment": "Nice post!",
            "author": {
                "_id": "6295f5e80a4c59e30dce770f",
                "firstName": "John",
                "lastName": "Doe",
                "__v": 0
            },
            "_id": "629f24ca8462b50843e080e6",
            "createdAt": "2022-06-07T10:13:30.483Z"
        }
    ],
    "createdAt": "2022-06-06T14:43:51.406Z",
    "__v": 0
}
```

## Edit Post
URL: `/posts/:id`  
Method: `PATCH`  
Required query parameter: `id`  
Optional body parameters: `title, messsage, tags, image`  
Required header authorization with token from `/users/register` or `/users/login` response  

### Request URL:
```
/posts/629e12a7eccf903b73136d52
```

### Header Authorization Token Format:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo
```

### Request body:
```JavaScript
{
    "title": "Test Title!",
    "message": "Example message!!",
    "tags": "#tag1 #tag2 #tag3 #tag4",
    "image": ""
}
```

### Response:
```JavaScript
{
    "_id": "629e12a7eccf903b73136d52",
    "title": "Test Title!",
    "message": "Example message!!",
    "author": {
        "_id": "6295f5e80a4c59e30dce770f",
        "firstName": "John",
        "lastName": "Doe",
        "__v": 0
    },
    "tags": [
        "tag1",
        "tag2",
        "tag3",
        "tag4"
    ],
    "likes": [],
    "comments": [],
    "createdAt": "2022-06-06T14:43:51.406Z",
    "__v": 0
}
```

## Like Post
URL: `/posts/:id/like`  
Method: `PATCH`  
Required query parameter: `id`  
Required header authorization with token from `/users/register` or `/users/login` response  

### Request URL:
```
/posts/629e12a7eccf903b73136d52/like
```

### Header Authorization Token Format:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo
```

### Response:
```JavaScript
{
    "_id": "629e12a7eccf903b73136d52",
    "title": "Test Title!",
    "message": "Example message!!",
    "author": {
        "_id": "6295f5e80a4c59e30dce770f",
        "firstName": "John",
        "lastName": "Doe",
        "__v": 0
    },
    "tags": [
        "tag1",
        "tag2",
        "tag3",
        "tag4"
    ],
    "likes": [
    	"6295f5e80a4c59e30dce770f"
    ],
    "comments": [],
    "createdAt": "2022-06-06T14:43:51.406Z",
    "__v": 0
}
```

--------------------------------------------------

## Remove Post
URL: `/posts/:id`  
Method: `DELETE`  
Required query parameter: `id`  
Required header authorization with token from `/users/register` or `/users/login` response  

### Request URL:
```
/posts/629e12a7eccf903b73136d52
```

### Header Authorization Token Format:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo
```

### Response:
```JavaScript
{
    "_id": "629e12a7eccf903b73136d52",
    "title": "Test Title!",
    "message": "Example message!!",
    "author": {
        "_id": "6295f5e80a4c59e30dce770f",
        "firstName": "John",
        "lastName": "Doe",
        "__v": 0
    },
    "tags": [
        "tag1",
        "tag2",
        "tag3",
        "tag4"
    ],
    "likes": [
    	"6295f5e80a4c59e30dce770f"
    ],
    "comments": [],
    "createdAt": "2022-06-06T14:43:51.406Z",
    "__v": 0
}
```

## Remove Post Comment
URL: `/posts/:id/comment/:commentId`  
Method: `DELETE`  
Required query parameter: `id, commentId`  
Required header authorization with token from `/users/register` or `/users/login` response  

### Request URL:
```
/posts/629e12a7eccf903b73136d52/comment/629f24ca8462b50843e080e6
```

### Header Authorization Token Format:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmMWE5YjYwMWZhMzljMmYwMGY3MDIiLCJpYXQiOjE2NTQ1OTQyMDN9.iQdToSRLO9qZoEh8oY7Kp2IVqrDXkIBO-EzeVXkHEqo
```

### Response:
```JavaScript
{
    "_id": "629e12a7eccf903b73136d52",
    "title": "Test Title!",
    "message": "Example message!!",
    "author": {
        "_id": "6295f5e80a4c59e30dce770f",
        "firstName": "John",
        "lastName": "Doe",
        "__v": 0
    },
    "tags": [
        "tag1",
        "tag2",
        "tag3",
        "tag4"
    ],
    "likes": [
    	"6295f5e80a4c59e30dce770f"
    ],
    "comments": [],
    "createdAt": "2022-06-06T14:43:51.406Z",
    "__v": 0
}
```
