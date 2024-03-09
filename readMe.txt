Building RESTful API in JSON

//Installing the dependencies
[1] import the express : npm i express;
[2] import the data : const users = require('file_name.json);
[3] import the file handling module : It's an Inbuilt so, const fs = require('fs');


Requests
using GET :
            /api/users : List of all users (done and working properly)
            /api/users/1 : get the user having id === 1 (done and working properly)
same for other user 

using POST : 
            /api/users : Create a new user (done)

using PATCH : 
              /api/users/1 : Edit the user details having id === 1 (done and working properly)
same for other users

using DELETE : 
                /api/users/1 : Delete the user having the id === 1 (done)
same for other users



Note to remeber:
1 : Getting the json data from mockaroo website 

2 : using dynamic path parameter
    eg. : GET /api/users/:id
    :id -> This is the dynamic parameter, it can be whatever we want

3 : So to make POST, PATCH, DELETE methods we have to use POSTMAN

Tasks to be done :
[1] POST, DELETE are working porperly , but the data is not updating in the server
    soln : This is done and working properly

[2] In DELETE method, I have delete the user but the user below that user dosen't change their id by --id;
    means, after deletion of user 90, the next user still have id 91, but I want it change to 90

    soln : So basically the id which is given to the user should only accessed by the particular user because if the id changes the sql query might show wrong data.

[3] In POST method, AS I was taking the id of new user as size of array + 1; but it is wrong as if some user is deleted from the server it will cause problem
    So, to overcome this disability I need to work on the delete method perfectly

    soln : So, rather than updating the id we will provide the id which is +1 greater than the last user Id.
           Or let it be the same as coded
