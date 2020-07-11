# For the project we install using npm

npm i express dotenv mongoose colors morgan

npm i -D nodemon concurrently // -D installs as dev dependencies

express

dotenv : for our global variables

mongoose

colors - small module to have a color text in the console. visit npmjs.com/package/colors

morgan - logger, tells what methods and what routes are hit in the console

---

nodemon

allow us to constantly run our server without having to restart it

concurrently

allow us to run our backend server on a port :5000 and also our react dev server on another port :3000 at the sime time with one single npm script

Mongoose

Mongoose is an object datamap. Basically its a layer that we can use to interact with our database, we can create a model for our transactions and we can make querys to our database.

---

For our database we use MongoDBAtlas which is a cloud version of MongoDB

---

Step2
In package.json create scripts
"start": "node server", // npm start -> runs node sevrer
"server": "nodemon server" // npm run server -> runs nodemon, which will constantly watch it. Reason we use server in script is because our entrypoint is called server.js

Step3
Setup server.js file
Use POSTMAN to test

Step4
Create routes in a separate folder to maintain scalability.
create route and connect it to server.js using app.use()

Step5
create controllers folder and add methods there and connect them to the routes

STEP6
Create database
mongodb.com -> create account and create a cluster, aws as provider. other settings as is.
In cluster-> collection -> addmyowndata- Database name expensetracker and collection name transactions.
To connect -> clusters -> connect -> connect your application -> copy connection string.
Add connection string to config.env MONGO_URI=connectionstring. Replace password with your own password set up in MongoDB. Replace <dbname>" with database name.
Connect it using mongoose: in config folder create new file db.js and add mongoose connection.
In server.js bring in connectDB from db.js and call it out. Node server should show if connection was successful.
