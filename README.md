# servers-
A project that create a basic CRUD operation into a file 


## Problem Description:


Create A basic  CRUD operation (create, read, update, delete) into a file database.json.
first create the route and test that they work properly
note: implement switch case 



- The aplication will perform.
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to your database.json file. If there is no studentdatabase.json on post, I create one dynamically. the time created and lastupdated time is dynamically created by me 
  - `PUT` Request which updates fields of a particular data using the id in database.json

  - `PUT` Request which updates fields of a particular data using the id in the database.json file. If an object with the id, is not found it returns 404, the  lastupdated time can not be changed by client but dynamically created by me when ever there is an update to the current date whenever any field is updated.
  - `DELETE` Request which removes a particular data from your database.json using the id
- Data format example:

```
[
    {
      studentName: "Jane Doe",
      studentId: "1",
      school: "Decagon Institute",
      timecreated: "2020-08-12T19:04:55.455Z",
      lastUpdated: "2020-08-12T19:04:55.455Z",
     
    }
]
```
sample input 

"GET" {

}

"post "{
    studentName: "Jane Doe",
      studentId: "1",
      school: "Decagon Institute",
}
 "put"{
      studentId: "1",
      school: "Amazon Institute",
 }

 "delete"{
     studentId: "1"
 }
 //delete by id 