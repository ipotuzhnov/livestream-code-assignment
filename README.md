# Directors API with Node.js
----
A simple API that allows to register and list all the movie directors having an
account on Livestream.

**Prerequisite packages**
----

This project is written in TypeScript so first of all you need to install it:
```
npm install -g typescript
```

And for TypeScript definitions:
```
npm install -g tsd
```

Automatic build with gulp:
```
npm install -g gulp
```

Automatic tests with mocha:
```
npm install -g mocha
```

**Building**
----
Default gulp task will compile, test and run server for you (be careful database tests use `flushdb`):
```
gulp
```

# Directors Collection
**Get Directors**
----
  Returns Directors collection.

* **URL**
  /directors

* **Method:**
  `GET`

* **URL Params**

  None
  
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
      "livestream_id": 6488818,
      "full_name": "Steven Speilberg",
      "dob": "2012-06-26T06:07:15.000Z",
      "favorite_camera": "Sony F65",
      "favorite_movies": [
        "Catch Me If You Can",
        "The Terminal"
      ]
    }
    ...
  ]
}
```
    
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    
**Add new entry**
----
  Returns added entry.
  
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
  // Required {Number}
  "livestream_id": 6488818,
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
  "livestream_id": 6488818,
  "full_name": "Steven Speilberg",
  "dob": "2012-06-26T06:07:15.000Z",
  "favorite_camera": "Sony F65",
  "favorite_movies": [
    "Catch Me If You Can",
    "The Terminal"
  ]
}
```
    
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    
  * **Code:** 404 Not Found <br />
    
  * **Code:** 500 Internal Server Error <br />

**Get Director Entry**
----
  Returns Directors collection entry for specified id of type {Number}.
* **URL**
  /directors/:id
  
* **Method:**
  `GET`

* **URL Params**

  None
  
* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content-Type:** application/json <br />
    **Content:**
    
```javascript
{
  "livestream_id": 6488818,
  "full_name": "Steven Speilberg",
  "dob": "2012-06-26T06:07:15.000Z",
  "favorite_camera": "Sony F65",
  "favorite_movies": [
    "Catch Me If You Can",
    "The Terminal"
  ]
}
```
      
* **Error Response:**

  * **Code:** 404 Not Found <br />

  * **Code:** 500 Internal Server Error <br />

**Update Directors collection entry**
----
  Returns updated entry for specified id of type {Number}.
  
* **URL**
  /directors/:id
  
* **Method:**
  `PUT`
  
* **URL Parans**

  None
  
* **Data Params**
  * **Content-Type:** application/json <br />
    **Content:**

```javascript
{
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

  * **Code:** 200 OK <br />
    **Content-Type:** application/json <br />
    **Content:**
    
```javascript
{
  "livestream_id": 6488818,
  "full_name": "Steven Speilberg",
  "dob": "2012-06-26T06:07:15.000Z",
  "favorite_camera": "Sony F65",
  "favorite_movies": [
    "Catch Me If You Can",
    "The Terminal"
  ]
}
```
    
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    
  * **Code:** 404 Not Found <br />  
    
  * **Code:** 500 Internal Server Error <br />
