// npm install express dotenv mongoose nodemon jsonwebtoken cors
// npm install graphql express-graphql

//* https://www.youtube.com/watch?v=B7EzJOqpuw8&list=PLR6Dij52PfvOuJ4YGdQJJYeYfHK4PQ3CI&index=1&t=356s&ab_channel=FaztCode
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { connectDB } = require("./db");
const { authtenticate } = require("./middlewares/auth");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const app = express();

app.use(authtenticate);
app.use(cors());

app.use(express.json());


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 3100, () => {
  console.log("Server is running on port " + process.env.PORT);
});