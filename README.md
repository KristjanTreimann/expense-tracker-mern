##

For the project we install using npm:
npm i express dotenv mongoose colors morgan
npm i -D nodemon concurrently // -D installs as dev dependencies

###

express
dotenv : for our global variables
mongoose
colors - small module to have a color text in the console
morgan - logger, tells what methods and what routes are hit in the console

---

nodemon - allow us to constantly run our server without having to restart it
concurrently - allow us to run our backend server on a port :5000 and also our react dev server on another port :3000 at the sime time with one single npm script

##

Mongoose is an object datamap. Basically its a layer that we can use to interact with our database, we can create a model for our transactions and we can make querys to our database.

##

For our database we use MongoDBAtlas which is a cloud version of MongoDB
