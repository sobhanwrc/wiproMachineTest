# Project details and set up information
Hi,
  I have created a simple CRUD application with Node Js, MongoDB as database and JWT for authorization. Also used RBAC(Role-based access control) for role based access by user. 
  
  I have used 3 static role here. 
  1. basic - only read and update self record
  2. supervisor - read any one record and inherit basic property also
  3. admin - read and delete any record . Also inherit supervisor and basic role property also.
  
 API-
 1. Sign Up
 2. Login
 3. View profile info
 4. Update profile info
 5. View list of user (Only supervisor or admin can access)
 6. Update any user profile info (Only admin can access)
 7. Delete any user record (Only admin can access)
 
 API docs URL - https://documenter.getpostman.com/view/12923340/TVRd8WHj#f6da7397-6ada-4a12-9b2b-5d73fc623a03
 
 
 #Setup
 1. Clone the repo
 2. After download go to project folder and run this command- npm install and after that npm start
 
 #Mongo db
 1. Install mongo DB community Server - https://www.mongodb.com/try/download/community
 2. Install mongo DB tool - https://www.mongodb.com/try/download/database-tools
 3. Go to mongo db server folder - "C:\Program Files\MongoDB\Server\4.0\bin" (4.0 it's vary on downloaded version)
 4. Cut the "dump" folder from project repo and paste it in this location "C:\Program Files\MongoDB\Server\4.2\bin\"
 5. Open CMD as Administrator and run the command for upload db dump - "mongorestore --host localhost --port 27017 --db wipro_machine_test  dump/wipro_machine_test"
 
 
