const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("./bugtacker.json");
const { promisify } = require("util");
const sgMail = require("@sendgrid/mail");
require("dotenv/config");
/* Configurações */

const worksheetIndex = 0;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.render("home");
});
app.post("/", async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet(
      "1EHesTlhriuD9ZYEZEbC2xGxIduf0cNJVKRB73UD6ta4"
    );
    await promisify(doc.useServiceAccountAuth)(credentials);
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[worksheetIndex];
    await promisify(worksheet.addRow)({
      name: req.body.name,
      email: req.body.email,
      issueType: req.body.issueType,
      howToReproduce: req.body.howToReproduce,
      expectedOutput: req.body.expectedOutput,
      receivedOutput: req.body.receivedOutput,
      userAgent: req.body.userAgent,
      userDate: req.body.userDate,
      source: req.query.source || "padrão"
    });

    if (req.body.issueType === "CRITICO") {
      sgMail.setApiKey(
        "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"
      );
      const msg = {
        to: "joaofirmino872@gmail.com",
        from: "joaofirmino872@gmail.com",
        subject: "BUG Critico reportado",
        text: `O usuário ${req.body.name} reportou um problema.`,
        html: `O usuário ${req.body.name} reportou um problema.`
      };
      await sgMail.send(msg);
    }

    res.render("sucess");
  } catch (erro) {
    res.render("erro");
    console.log(erro);
  }
});

app.listen(3000, err =>
  err
    ? console.log("aconteceu um erro", erro)
    : console.log("bugtracker rodando na porta http://localhost:3000")
);
