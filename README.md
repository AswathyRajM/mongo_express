# express-mongo-demo

An express server with a mongodb backend database. Use Mongoose object modelling tool to create few database models.

## Installation

After downloading and extracting the file,
Use the package manager [npm](https://www.npmjs.com/get-npm) to install this app.

```bash
npm install 
```

### Usage
```
node server.js
```
### Open Postman and enter the request

Start server with default port 4444

e.g http://localhost:4444/students/   to start

## Inputs

### /create
To create make sure to select "x-www-form-urlencoded" on the postman and add key values 
>name <string>
studentId <string>
phoneNumber <string>
age <number>
mark <number>
subject <string>

### /average
Average age of the students who have scored marks specified by the user in a specific subject.
In postman select "raw" and "JSON" 
...
  {
	subject <string>,
	min_mark <number>,
    max_mark <number>
 }
  ...
  
### /list
list of students who have passed all subjects(marks>40) sorted descending order of marks using mongoose find query