# inverted-index-api
[![Build Status](https://travis-ci.org/EmaEvidence/inverted-index-api.svg?branch=master)](https://travis-ci.org/EmaEvidence/inverted-index-api)
[![Coverage Status](https://coveralls.io/repos/github/EmaEvidence/inverted-index-api/badge.svg?branch=endpoint)](https://coveralls.io/github/EmaEvidence/inverted-index-api?branch=endpoint)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53bcc515421d4cd78bb312ab8d38bdc5)](https://www.codacy.com/app/EmaEvidence/inverted-index-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=EmaEvidence/inverted-index-api&amp;utm_campaign=Badge_Grade)

The Inverted Index is a technique used to implement efficient search functionality for software applications. This Project is an API that has two End points create, which receives a JSON array and creates an index for all words in the JSON Array and the search; which allows search through the created indices.
#### Dependencies
The functionality of this web app being a node.js app depends on the following node modules.
1. [Express.js](https://www.npmjs.com/package/express): A Fast, opinionated, minimalist web framework for node which was used in routing this application.
2. [Multer](https://www.npmjs.com/package/multer): This is the middleware that allows file upload to the API create Endpoint.
3. [BodyParser](https://www.npmjs.com/package/body-parser): This module was used to collect search data sent from the client side to the routing page.
4. [FS](https://www.npmjs.com/package/fs):This allows contents of the uploaded to be read and deleted after an index has being created from it.

The create API endpoint takes a JSON array like the one below;
```
[
  {
    "title":"Men",
    "text":"When we were boys"
  },
  {
    "title":"Women",
    "text":"When we were guys"
  },
  {
    "title":"Women",
    "text":"When we were guys"
  }
]
```
And produces an Index Object like the one below;
```
{
  'book1.json': {
    when: [0, 1, 2],
    we: [0, 1, 2],
    were: [0, 1, 2],
    boys: [0],
    guys: [1, 2]
  }
}
```
The search API endpoint takes in the name of the file to search in (this is optional) and the terms to search for, the terms can be a string or an array of strings. This end point returns the result of the carried out search like the one below;
```
{
 'book1.json': {
   a: '',
   alice: '',
   when: [0, 1, 2],
   we: [0, 1, 2],
   help: '' }
};
```
The numbers in the Array shows on which index in the book array the word exist and an Empty space means the word is not in the book.

##### To install this project to your local machine follow the flowing steps;

1. Click Clone or download button Under the repository name.

2. Click  to copy the clone URL for the repository.

3. Open Git Bash on your system.

4. Change the current working directory to the location where you want the project to be made.

5. Type ```git clone```, and then paste the URL you copied in Step 2.

6. Press Enter. Your local clone will be created.


```npm run-tests``` runs all tests and gives a coverage report based on the tests.
```npm run start``` starts the application.
You need to create a '.env' file like the example in the directory to contain the port you want to use on your local machine.

##### To Test with POSTMAN follow the steps below;

1. Enter this link to the URL of POSTMAN to hit the create index endpoint.  Locally: ```localhost:yoursetPORT/api/v0/create```  Remotely: ```/api/v0/create```
2. Send form-data with book as key and the JSON Array to use.

3. Send the data.

4. Enter this link ```/api/v0/search``` to the URL of POSTMAN to hit the search index endpoint

5. Send the filename using x-www-form-urlencoded using filename as key and the terms to search for using term as key.

This App is hosted on Heroku, click [here]() to access the hosted App.

##### This App can not do the following;
1. Do not persist data. Once the APP is closed all created indices and search result are deleted.
