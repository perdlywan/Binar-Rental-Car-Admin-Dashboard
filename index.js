const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = 8888;
const carsController = require("./controller/cars.controller");

app.use(expressLayouts);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", carsController.getAllCars);

// Controller cars
// Render view
app.get("/cars", carsController.getAllCars);
app.get("/cars/size/:ukuran", carsController.getCarsByUkuran);
app.get("/cars/add", carsController.renderCreateCarForm);
app.get("/cars/update/:id", carsController.renderUpdateCarForm);

// Endpoint logic
app.post("/cars", carsController.createNewCar);
app.post("/cars/:id", carsController.updateCar);
app.get("/cars/:id", carsController.deleteCar);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
