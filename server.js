const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env"});

//our models
const Post = require("./models/Post");
const User = require("./models/User");
const Comment = require("./models/Comment");

const Project = require("./models/Project")
const StartPost = require("./models/StartPost");

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

const corsOrigin = "http://localhost:3000" || "https://projectseeddev.herokuapp.com/";

const corsOptions = {
    origin: corsOrigin,
    credentials: true

};

app.use(cors(corsOptions));

//set up jwt authentication middleware

app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token !== "null"){
        try{
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        } catch (err) {
            console.error(err)
        }
    }
    next();
});


//create graphiql application 
app.use('/graphiql', graphiqlExpress({ endpointURL: "/graphql" }

))

//connect schemas with graphql
app.use('/graphql', 

bodyParser.json(),

graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
        Post,
        User,
        Comment,
        Project,
        StartPost,
        currentUser

    }
})));

app.use(express.static('public'));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});