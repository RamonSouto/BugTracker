const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("./bugtacker.json");
const { promisify } = require("util");
require("dotenv/config");

const addRowToSheet = async () => {
  const doc = new GoogleSpreadsheet(process.env.DOCID);
  await promisify(doc.useServiceAccountAuth)(credentials);
  console.log("Planilha aberta");
  const info = await promisify(doc.getInfo)();
  const worksheet = info.worksheets[0];
  promisify(worksheet.addRow)({
    name: req.body.name,
    email: req.body.email,
    issueType: req.body.issueType,
    howToReproduce: req.body.howToReproduce,
    expectedOutput: req.body.expectedOutput,
    receivedOutput: req.body.receivedOutput,
    userAgent: req.body.userAgent,
    userDate: req.body.userDate
  });
};

addRowToSheet();
