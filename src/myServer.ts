import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";


let database = "studentDatabase.json";


const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    switch (req.method) {
      case "GET":
        studentEntry(req, res);
        break;
      case "POST":
        addStudentData(req, res);
        break;
      case "PUT":
        studentDataUpdate(req, res);
        break;
      case "DELETE":
        deleteStudentEntry(req, res);
        break;
      default:
        invalidStudentRequest(req, res);
    }
  }
);
server.listen(3005, () => console.log("Server is now running on port 3005"));

function studentEntry(req: IncomingMessage, res: ServerResponse) {

  const readStream = fs.createReadStream(database, "utf8");
  readStream.on("error", (err) => {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end(JSON.stringify("No data available."));
  });
  readStream.on("data", (student: string) => {
    // return list of student in database.json
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(student);
  });
  return;
}

function addStudentData(req: IncomingMessage, res: ServerResponse) {
  let input: string[] | any = [];
  req.on("data", (data) => {
    input.push(data);
  });
  req.on("end", () => {
    fs.access(database, fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFileSync(database, "[]");
      }
      let fileData: string[] | any = fs.readFileSync(database, "utf8");
      fileData = JSON.parse(fileData);
      input = JSON.parse(input);
      const timeStamp = new Date();
      let id;
      if (fileData.length > 0){
       id = fileData[fileData.length - 1]["studentId"] + 1;
      }else{
        id = 1;
      }
      input["studentId"] = id;
      input["createdAt"] = timeStamp;
      input["updatedAt"] = timeStamp;
      fileData.push(input);
      const output = JSON.stringify(fileData, null, 2);
      const writeStream = fs.createWriteStream(database, {
        flags: "w",
        encoding: "utf8",
      });
      writeStream.write(output);
      res.end(JSON.stringify("Student Entered."));
    });
  });
  return;
}



function studentDataUpdate(req: IncomingMessage, res: ServerResponse) {
  let input: string[] | any = [];
  req.on("data", (data) => {
    input.push(data);
  });
  req.on("end", () => {
    fs.access(database, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end(JSON.stringify("No data available."));
      }
      let fileData: string[] | any = fs.readFileSync(database, "utf8");
      fileData = JSON.parse(fileData);
      input = JSON.parse(input);
      for (let i = 0; i < fileData.length; i++) {
        if (fileData[i]["studentId"] === input["studentId"]) {
          fileData[i]["studentName"] = input["studentName"];
          fileData[i]["schoolName"] = input["schoolName"];
          fileData[i]["updatedAt"] = new Date();
          const output = JSON.stringify(fileData, null, 2);
          const writeStream = fs.createWriteStream(database, {
            flags: "w",
            encoding: "utf8",
          });
          writeStream.write(output);
          res.writeHead(200, { "Content-type": "text/plain" });
          res.end(JSON.stringify("Customer details updated."));
          return;
        }
      }
      // If no matching id is found, return ID not found error
      res.writeHead(404, { "Content-type": "text/plain" });
      res.end(JSON.stringify("ID not found."));
    });
  });
  return;
}


function deleteStudentEntry(req: IncomingMessage, res: ServerResponse) {
  let input: string[] | any = [];
  req.on("data", (data) => {
    input.push(data);
  });
  req.on("end", () => {
    fs.access(database, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end(JSON.stringify("No data available."));
      }
      let fileData: string[] | any = fs.readFileSync(database, "utf8");
      fileData = JSON.parse(fileData);
      input = JSON.parse(input);
      for (let i = 0; i < fileData.length; i++) {
        if (fileData[i]["studentId"] === input["studentId"]) {
          fileData.splice(i, 1);
          const output = JSON.stringify(fileData, null, 2);
          const writeStream = fs.createWriteStream(database, {
            flags: "w",
            encoding: "utf8",
          });
          writeStream.write(output);
          res.writeHead(404, { "Content-type": "text/plain" });
          res.end(JSON.stringify("Customer deleted."));
          return;
        }
      }
      res.writeHead(404, { "Content-type": "text/plain" });
      res.end(JSON.stringify("ID not found."));
    });
  });
  return;
}

function invalidStudentRequest(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(404, { "Content-type": "text/plain" });
  res.end(JSON.stringify("No data available."));
  return;
}

interface Customer {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;



}

  //create serve
  //create database.json file
  //post data to the dabase
  //put delete and get ]
  //validate the input
  //delete, update, getby id should be from url or _params_
  //import the user control
  //seperate controllers from route