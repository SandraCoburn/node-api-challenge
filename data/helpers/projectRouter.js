const express = require("express");
const router = express.Router();
const Projects = require("./projectModel.js");
const Actions = require("./actionModel");

router.use(express.json());

//Create new project
router.post("/", (req, res) => {
  const newProject = req.body;
  console.log(newProject);
  Projects.insert(newProject)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error adding new project" });
    });
});

//Get all projects from database
router.get("/", (req, res) => {
  console.log("request", req.body);
  Projects.get(req.query)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error retrieving projects" });
    });
});

//Get one project by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error retrieving project" });
    });
});

//Update a project
router.put("/:id", (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(req.body);
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch(err => {
      console.log(er);
      res.status(500).json({ message: "Error in the server" });
    });
});

//delete project by id
router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "projec has been removed" });
      } else {
        res.status(400).json({ message: "project could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error deleting project" });
    });
});

//Retrieve a list of actions by project
router.get("/:id/posts", (req, res) => {
  Projects.get(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error with the server" });
    });
});

module.exports = router;
