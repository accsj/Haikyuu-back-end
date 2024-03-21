const express = require("express");
const bodyParser = require("body-parser");
const login = require("./routes/auth/Login/login.js");
const register = require("./routes/auth/Register/register.js");
const recovery = require("./routes/auth/Recovery/recovery.js");
const passrecovery = require("./routes/auth/PassRecovery/passrecovery.js");
const cors = require("cors");
const app = express();
const port = 5000


// Configs
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());



// Pages Auth Routes
app.get("/", (req,res) => {
    res.send("Servidor funcionando para fazer requisições!")
})
app.use("/", login)
app.use("/", register)
app.use("/", recovery)
app.use("/", passrecovery)





app.listen(port, ()=> {
    console.log("Servidor rodando na porta", port);
})