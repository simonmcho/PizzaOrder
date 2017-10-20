# Pizza Order Form using NodeJs, Express Middleware, and MongoDB.  
  
This repo is to represent a part of simonmcho's portfolio. It is an introduction to NodeJS.  

### This api is an example of an online form to place a pizza order. Its features will include:  
- Ability to place an order with various customer parameters
- Ability to see a list of all orders placed
- Ability to search for an order using a customer's phone number or address in the search query.
  
  
## Project Status: Work In Progress (WIP)  
To do:
- Add pizza items' costs
- Stylize
- Add cool front-end JS functionalities for taste
- Make it good

The project was created using express generator. EJS is the the JavaScript Template that is being used.
  
## Getting started  

## Pre-requisites
- Knowledge of JavaScript
- Knowledge of jQuery
- Knowledge of ES6
- Robo 3T installed (https://robomongo.org/download)
- MongoDB installed (https://www.mongodb.com/download-center#community)

### Run npm install to install dependencies (Due to using express generator to create this project).  
- After installing dependencies, you will need to set up your database using MongoDB:
  
1. Navigate to a directory location where you want to store your database.
2. Here, create a folder with the name of your database. (eg. Database_Test)
3. Navigate to your local computer's directory where MongoDB\Server\3.4\bin resides
4. Run the command line from this directory.
5. Type this in the command line: `mongod.exe --dbpath <your_database_location_here>`
6. If successful, you should see this in the log: `[thread1] waiting for connections on port 27017`
  
- Now we can use Robo 3T as a graphical user interface to easily see database information  
1. Run Robo 3T
2. In the prompt that shows your database (if this is your first time, then you won't see any), click `Create` on the top left hand corner of the prompt window.
3. Type in the name of your database, and ensure `Address:` is at `localhost:27017`.
4. Test this connection by clicking `Test` on the bottom left corner. 
5. If successful, you should see a prompt window showing successful connection to `localhost:27017` and `Access to database is available`. If so, click `save`.
6. Click `Connect` after selecting the database you just created.

- Now go back to your terminal/command line:
1. Type in `npm start`
2. Open up a browser and type in `localhost`. This should navigate you to `localhost:3000`.
3. Place a pizza order. Once successfully placed, you should see the data in the orders list page as well as in the Robo3T's <name_of_your_database> -> Collections
    
    

