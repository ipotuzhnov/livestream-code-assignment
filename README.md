# Directors API with Node.js
A simple API that allows to register and list all the movie directors having an
account on Livestream.

This project is written in TypeScript so first of all you need to install it:
npm install -g typescript

# Directors
**Show Directors**
----
  Returns json data about all directors.

* **URL**
  /directors

* **Method:**
  `GET`

* **URL Params**

  **Optional:**
  
  `page=[Number]` default 0
  
  `limit=[Number]` default 10, max 100
  
* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content-Type:** application/json <br />
    **Content:**
    
```javascript
{
  [
    ...
    {
      "livestream_id": "6488818",
      "full_name": "Steven Speilberg",
      "dob": "2012-06-26T06:07:15.000Z",
      "favorite_camera": "Sony F65",
      "favorite_movies": [
        "Catch Me If You Can",
        "The Terminal"
      ],
      "links": {
        "self": "/directors/6488818"
      }
    }
    ...
  ],
  "links": {
    "prev": "/directors?page=2",
    "next": "/directors?page=4"
  }
}
```
    
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    
**Add new Director**
----
  Returns json data about new director.
  
* **URL**
  /directors
  
* **Method:**
  `POST`
  
* **URL Parans**

  None
  
* **Data Params**
  * **Content-Type:** application/json <br />
    **Content:**

```javascript
{
  // Required {String}
  "livestream_id": "6488818",
  // Optional {String}
  "favorite_camera": "Sony F65",
  // Optional {Array} of {String}
  "favorite_movies": [ 
    "Catch Me If You Can",
    "The Terminal"
  ]
}
```
      
* **Success Response:**

  * **Code:** 201 Created <br />
    **Content-Type:** application/json <br />
    **Content:**
    
```javascript
{
  "livestream_id": "6488818",
  "full_name": "Steven Speilberg",
  "dob": "2012-06-26T06:07:15.000Z",
  "favorite_camera": "Sony F65",
  "favorite_movies": [
    "Catch Me If You Can",
    "The Terminal"
  ],
  "links": {
    "self": "/directors/6488818"
  }
}
```
    
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    
    **Content:**`Field {{field name}} does not match data from livestream.com`
    
  * **Code:** 404 Not Found <br />
    
    **Content:**`Accout with livestream_id: 6488818 does not exist on livestream.com`
    
  * **Code:** 409 Conflict <br />
    
    **Content:**`Director with livestream_id: 6488818 already exists`
    
  * **Code:** 500 Internal Server Error <br />     
     