const express = require("express");
const Actions = require("./actionModel");
const router = express.Router();

router.use(express.json());

//create new action for a project
router.post("/:id/actions", (req, res) => {
  const { id } = req.params;
  const newAction = { ...req.body, project_id: id };
  console.log(newAction);
  Actions.insert(newAction)
    .then(action => {
      res.statusus(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error sending new action" });
    });
});

//Get actions
router.get("/", (req, res) => {
  Actions.get(req.query).then(actions => {
    res
      .status(200)
      .json(actions)
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "error in the server" });
      });
  });
});

//Get actions by id
router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error in t he server" });
    });
});

//Update action by id
router.put("/:id", (req, res) => {
  const updatedAction = req.body;
  Actions.update(req.params.id, updatedAction)
    .then(action => {
      if (action) {
        res.status(200).json(updatedAction);
      } else {
        res.status(404).json({ message: "The id does not exists" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error in the server" });
    });
});

//Delete action by id
router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "action id does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error in the server" });
    });
});

module.exports = router;
