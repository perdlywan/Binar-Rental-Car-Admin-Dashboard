const db = require("../models");
const Car = db.car;

exports.getAllCars = (req, res) => {
  Car.findAll({ order: [["updatedAt", "DESC"]] }).then((result) => {
    res.render("index", {
      data: result,
    });
  });
};

exports.getCarsByUkuran = (req, res) => {
  Car.findAll({
    where: { ukuran: req.params.ukuran },
    order: [["updatedAt", "DESC"]],
  }).then((result) => {
    res.render("index", {
      data: result,
    });
  });
};

exports.renderCreateCarForm = (req, res) => {
  res.render("create");
};

exports.createNewCar = (req, res) => {
  const body = {
    nama: req.body.nama,
    sewa: req.body.sewa,
    ukuran: req.body.ukuran,
    foto: req.body.foto,
  };

  Car.create(body);

  res.redirect("/cars");
};

exports.renderUpdateCarForm = (req, res) => {
  Car.findByPk(req.params.id).then((result) => {
    res.render("update", {
      id: result.id,
      nama: result.nama,
      ukuran: result.ukuran,
      sewa: result.sewa,
      foto: result.foto,
    });
  });
};

exports.updateCar = (req, res) => {
  const updateBody = {
    nama: req.body.nama,
    sewa: req.body.sewa,
    ukuran: req.body.ukuran,
    foto: req.body.foto,
  };

  Car.update(updateBody, { where: { id: req.params.id } });

  res.redirect("/cars");
};

exports.deleteCar = (req, res) => {
  Car.findByPk(req.params.id).then((result) => {
    if (result != null) {
      result.destroy();
      res.redirect("/cars");
    } else {
      res.redirect("/cars");
    }
  });
};
