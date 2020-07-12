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

STEP7
Create model
In root create folder models -> new file Transaction.js. Uppercase naming for models.
Create a schema and export it
Bring in model to transactionController.js, use async await with try-catch. Add success and error responses.
Test result in POSTMAN with GET request to 'http://localhost:5000/api/v1/transactions'

STEP8
When we send data from the client its going to come in 'req.body.something' and in order to use req.body we need to use body parser middleware to our server.js
app.use(express.json())
Add try-catch with responses in transactionController.js. You can test catch error by console.log(err) and in POSTMAN make POST request with adding raw json params.
{
"text": "Payment",
"amount":500
}

check with GET request is the data there.
Add validation errors and map them to let user know whats happening

Handle deleteTransaction.
add server responses and deleteById
By now backend should be done.

STEP9
Start working on client side
Use concurrently to run both React and Node servers at the same time
To shorter http requests to api endpoints we use proxy to shorten http://localhost:5000/api/v1
To do that add  
"proxy": "http://localhost:5000"
to client/package.json
Then add some scripts to root package.json
to run the client add to "scripts":
"client": "npm start --prefix client" // use --prefix to run it in the client folder
add script concurrently to run both servers at the same time
"dev": "concurrently \"npm run server\" \"npm run client\""
to run both servers: npm run dev

STEP10
INTEGRATE FRONT + BACK
Install Axios to make requests from frontend to backend
cd client
npm i axios
Make requests through actions in client/src/context/GlobalState.js
Create new action to fetch transactions from the backend. Use axios.get
Dispatch result to reducer.
Create new case in AppReducer.js for getTransaction and for errors create 'TRANSACTION_ERROR' case
In ADD_TRANSACCTIONS case, because were dealing with fetching from API, transactions takes in current state first and then we add action.payload to it.
Now it should be okay in AppReducer.
In GlobalState.js we have getTransaction() action and we need to pass it in to GlobalContext.Provider.
In Provider pass in also rest of the state, so we can access these in any of the components :
error = state.error // use state, because they come from the state
loading = state.loading
