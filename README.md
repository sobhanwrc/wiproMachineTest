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
 
 
