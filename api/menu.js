const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    // Path to menu.json located at the project root
    const filePath = path.join(process.cwd(), "menu.json");

    // Read the file content
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Set headers and send the content
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(data);
    });
  } else {
    res.status(404).send("404 Not Found");
  }
};
