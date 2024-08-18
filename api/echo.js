const querystring = require("querystring");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const queryParams = querystring.parse(url.searchParams.toString());
    const content = queryParams.content || "";

    if (content) {
      res.setHeader("Content-Length", content.length);
      res.status(200).send(content);
    } else {
      res.status(400).send("Bad Request: Missing 'content' parameter");
    }
  } else {
    res.status(404).send("404 Not Found");
  }
};
