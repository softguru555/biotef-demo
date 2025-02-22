const express = require("express");
const cors = require("cors");

const app = express();
const userRoutes = require("./app/routes/userRoutes");
// var corsOptions = {
//   origin: "http://localhost:8080",
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
// app.post("/login", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

app.use("/api/users", userRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
