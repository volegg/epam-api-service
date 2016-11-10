# Task: RESTful API service

##Requirements:

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [NodeJS](https://nodejs.org/dist/latest-v6.x/docs/api/)
- [NPM](https://docs.npmjs.com/)
- [RESTful API](https://www.crummy.com/writing/RESTful-Web-Services/RESTful_Web_Services.pdf)
- [ExpressJS](http://expressjs.com/)
- [MongooseJS](http://mongoosejs.com/docs/index.html)
- [GIT](https://git-scm.com/doc)
- [MongoDB](https://mongodb.github.io/node-mongodb-native/)
- [github.com account](https://github.com/)

##Goals

- Get basic knowledge about NodeJS (command line, node package manager, events, globals, http, modules)
- Get basic knowledge and understanding about RESTful web services (http headers, http methods, CRUD, http statuses)
- Get skill working with ExpressJS framework and Mongoose ODM (installing, routing, error-, response-, request- handling, middleware, validation, debugging, database integration)  

##Result

Designed RESTful web service, MongoDB storage with validation logic on application layer (validation middleware) and database layer (ODM).
 
#Before start work

Clone repo and create you new branch with name and surename using dash.

> oleg-voskovich

Do commits. Implement one of logic part and do commit to see working process and understand flow.

#Description

##Database model

user collection

- name [String]
> required, length 30

- surename [String]
> required, length 60

- birthday [timestamp]
> required, date of birth

- sex [String]
> required, male/female

- photo [String]
> optional, url to image

- country [String]
> required, []ISO 3166-1 Alpha-3 code](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) 

- passportId [mongodb ID]
> required, ID reference to passport collection

passport collection

- passportNumber [String]
> required, length 10, 2 upper case letters, 8 digits | AB12345678

- identificationNumber [String]
> required, length 9, sex number (2 - female, 3 - male), short birthday date, PB/GB/BI | 2020286GB  

- issueDate [timestamp]
> required, start date of passport using
 
- expiryDate [timestamp]
> required, end date of passport using

- authority [String]
> required, length 100

##API

We should have route and CRUD operations for working with client information:
  - add/remove/edit client information (personal info, passport data)
  - provide users without passport data
  - provide passport data by client name
  
Use JSON for response and POST request.  
