const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    // Extract query parameters
    const { restaurant, namesOnly } = req.query;

    // Path to menu.json located at the project root
    const filePath = path.join(process.cwd(), "menu.json");

    // Read the file content
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Parse JSON data
      const restaurants = JSON.parse(data);

      if (namesOnly === "true") {
        // Return a list of restaurant names
        const restaurantNames = restaurants.map((entry) => entry.restaurant);
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(restaurantNames));
      } else if (restaurant) {
        // Find the restaurant that matches the query parameter
        const selectedRestaurant = restaurants.find(
          (entry) => entry.restaurant.toLowerCase() === restaurant.toLowerCase()
        );

        if (selectedRestaurant) {
          // Set headers and send the matching restaurant data
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(selectedRestaurant));
        } else {
          // If no matching restaurant is found
          res.status(404).send("Restaurant Not Found");
        }
      } else {
        // If no restaurant query parameter is provided, return the entire JSON
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(restaurants));
      }
    });
  } else {
    res.status(404).send("404 Not Found");
  }
};
