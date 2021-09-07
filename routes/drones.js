const express = require('express');
const router = express.Router();


// require the Drone model here
const Drone = require("../models/Drone.model")






router.get('/drones', async (req, res) => {
  try{
  const drones = await Drone.find()
  res.render("drones/list", { drones })
} catch(e){
  console.log("Error", e)
}
});

router.get('/drones/create', (req, res) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});

router.post('/drones/create', async (req, res) => {
  // Iteration #3: Add a new drone
  
  const { name, propellers, maxSpeed } = req.body;
  try{
  await Drone.create({name, propellers, maxSpeed});
  res.redirect("/drones");
} catch(e){
  console.log("Error", e)
}
});

router.get("/drones/:id", async (req, res) => {
  try{
  const dronesID = await Drone.findById(req.params.id)
  res.render("drones/details", dronesID)
} catch(e){
  console.log("Error", e)
}
});

router.get('/drones/:id/edit', async (req, res) => {
  // Iteration #4: Update the drone
  try{
  const drones = await Drone.findById(req.params.id)
  res.render("drones/update-form", drones)
} catch(e){
  console.log("Error", e)
}
});

router.post('/drones/:id/edit', async (req, res) => {
  // Iteration #4: Update the drone
 
  const { name, propellers, maxSpeed } = req.body;
  try{
  await Drone.findByIdAndUpdate(req.params.id, {
    name,
    propellers,
    maxSpeed,
  });
  res.redirect("/drones");
} catch(e){
  console.log("Error", e)
}
});

router.post('/drones/:id/delete', async (req, res) => {
  // Iteration #5: Delete the drone
  try {
  await Drone.findByIdAndRemove(req.params.id);
  res.redirect("/drones");
} catch(e){
  console.log("Error", e)
}
});

module.exports = router;
