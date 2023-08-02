const router = require("express").Router();
const mongoose = require("mongoose");

const Message = require("../models/Message.model");

// Create a new message
router.post("/messages", (req, res, next) => {
  const { name, email, message } = req.body;

  Message.create({
    name,
    email,
    message
  })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

router.get("/messages", (req, res, next) => {
  Message.find()
    .then((allMessages) => {
      res.json(allMessages);
    })
    .catch((error) => res.json(error));
});

router.get("/messages/:messageId", (req, res, next) => {
  const { messageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Message.findById(messageId)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => res.json(err));
});

// router.put("/messages/:messageId", (req, res, next) => {
//   const { messageId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(messageId)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Message.findByIdAndUpdate(messageId, req.body, { new: true })
//     .then((updatedMessage) => {
//       res.json(updatedMessage);
//     })
//     .catch((err) => res.json(err));
// });

router.delete("/messages/:messageId", (req, res, next) => {
  const { messageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Message.findByIdAndRemove(messageId)
    .then(() =>
      res.json({
        message: `Message with ${messageId} has been removed sucessfully`
      })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
