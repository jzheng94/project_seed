const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

require("dotenv").config({ path: "variables.env"});

//our models
const Post = require("./models/Post");
const User = require("./models/User");

//bring in graphql middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

//graphql schema
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

//create schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//this connects to database 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.error(err));

// this initializes our application
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true

};

app.use(cors(corsOptions));


//create graphiql application -not for production
// app.use('/graphiql', graphiqlExpress({ endpointURL: "/graphql" }

// ))

//connect schemas with graphql
app.use('/graphql', 

bodyParser.json(),

graphqlExpress({
    schema,
    context: {
        Post,
        User
    }
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});