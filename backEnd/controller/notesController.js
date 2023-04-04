const notesData = require("../models/note");

exports.create = function (req, res) {
  let notes = new notesData({
    title: req.body.title,
    description: req.body.description,
    
  });
  notes.save(function (err) {
    if (err) {
      return console.log(err);
    }
    res.send("New note added successfully");
  });
};

exports.delete = function (req, res) {
  notesData.findByIdAndRemove(req.params.id, function (err) {
    if (err) return console.log(err);
    res.send("Deleted succesfully");
  });
};

exports.update = function (req, res) {
  notesData.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, data) {
      if (err) return console.log(err);
      res.send("notes is updated.");
    }
  );
};

  

exports.get = function (req, res) {
  notesData.findById(req.params.id, function (err, data) {
    if (err) return console.log(err);
    res.send(data);
  });
};
