# Directors API with Node.js
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
**Get entries from Directors collection**
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
    
**Add new entry to Directors collection**
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
  // Optional {Array}
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

**Get Director entry from Directors collection**
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
  // Optional, immutable {Number}
  "livestream_id": 6488818,
  // Optional, immutable {String}
  "full_name": "Steven Speilberg",
  // Optional, immutable {String}
  "dob": "2012-06-26T06:07:15.000Z",
  // Optional {String}
  "favorite_camera": "Sony F65",
  // Optional {Array}
  "favorite_movies": [
    "Catch Me If You Can",
    "The Terminal"
  ]
}
```
      
* **Error Response:**

  * **Code:** 404 Not Found <br />

  * **Code:** 500 Internal Server Error <br />

**Update entry in Directors collection**
----
  Returns updated entry for specified id of type {Number}. Requiers authorization: `Bearer md5(full_name)`
  
* **URL**
  /directors/:id
  
* **Method:**
  `PUT`
  
* **URL Parans**

  None
  
* **Data Params**
  * **Content-Type:** application/json <br />
    **Authorization:** Bearer f2455fa1321940cef8ea0d5c0e60d800 <br />
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
    
  * **Code:** 401 Unauthorized <br />
    
  * **Code:** 404 Not Found <br />  
    
  * **Code:** 500 Internal Server Error <br />

**Remove entry from Directors collection**
----
  Removes entry for specified id of type {Number}. Requiers authorization: `Bearer md5(full_name)`

* **URL**
  /directors/:id

* **Method:**
  `DELETE`

* **URL Params**

  None
  
* **Data Params**
  * **Content-Type:** application/json <br />
      **Authorization:** Bearer f2455fa1321940cef8ea0d5c0e60d800 <br />
    
* **Success Response:**

  * **Code:** 200 OK <br />
    
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    
  * **Code:** 404 Not Found <br />  

  * **Code:** 500 Internal Server Error <br />
    