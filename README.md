## Deployment

Deployed Link - https://toddle-zjps.onrender.com/api-docs

## Setup the project

 - Download this template from github and open it in your favourite text editor.
 - Go inside the folder path and execute the following command.
    
        npm install
        npm start
    
 - In the root directory creater a `.env` file and add the follwing env variables
    
        CLOUD_NAME=<client name of Cloudinary>
        API_KEY = <api key of cloudinary>
        API_SECRET = <api secret of cloudinary>
        JWT_SECRET = <jwt secret string>
        SendEmail = <email id from which notification will be sent>
        Sendpassword = <oauth password>
        host = <host name of DB>
        database = <database name>
        dbuser = <database user name>
        dbpassword = <database user's password>
        dbport = <database port number>


- Add the necessary env variables in the `.env` file

Go to `http://localhost:3000/` to view the website

## Tech Stack

Server: NodeJS, ExpressJS, RestAPIs, MySQL
Middleares/libraries : Multer, Node emailer,JWT,bcrypt

## API Reference

API DOCS - https://toddle-zjps.onrender.com/api-docs/

### Authentication APIs

#### Register User

http
  POST /user/signup
  Body: username,password,email and type of user is taken as input and registered through the bcrypt module.

#### Login User

http
  POST /user/login
  Body: email, password
  The password is hashed so as to maintain integrity and a token is generated as well which is used further in the apis for authentication thorugh auth middlewares.

### User Feed APIs

#### Get User Feed - Protected

http
    Headers: Bearer token. 
    GET /feed/studentfeed
    Gets all the journals published for that student. 

    GET /feed/teacherfeed
    Gets all the journals published by that particular teacher.

Fetch the feed for the user which is logged in. Detects the role of the user by Auth Token and presents the feed accordingly.

### CRUD Journal APIs

#### Create Journal - Protected

http
  POST /journal/createjournals
  Headers: Bearer token - Authenticates the user through the token
  Body : File,name,description,list of student ids
  File is optional and the list of student_ids that are allowed have also been checked, errors have been handled. 

  File is uploaded to cloudinary and then is stored as alink in the Journal Database.

#### Update Existing Journal - Protected

http
    PATCH /journals/updateJournal
    Headers: Bearer token - Authenticates the user through the token
    Body : journal_id(required),name,description these can be optional as well
    Through the token we get the user id we verify that it is that user who intends to update it after that the values are updated in the journals through mysql.
#### Delete a Journal Entry - Protected

http
    DELETE /journals/deletejournal
    Headers: Bearer token - Authenticates the user through the token
    Body : Journal_id.

#### Publish Journal - Protected

http
      POST /journals/publishJournals
        Headers: Bearer token - Authenticates the user through the token
        Body : Journal_id,published_at.
        This api triggers the student feed and also notifies the student via email via the node emailer.
