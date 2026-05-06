const router = require("express").Router();
const Ride = require("../Ride");
const auth = require("../../authMiddleware");

// Request Ride (User)
router.post("/request", auth, async (req, res) => {
  const { pickup, drop, distance } = req.body;

  const fare = distance * 10;

  const ride = new Ride({
    userId: req.user.id,
    pickup,
    drop,
    distance,
    fare
  });

  await ride.save();
  res.json(ride);
});

// Get Pending Rides (Driver)
router.get("/pending", auth, async (req, res) => {
  const rides = await Ride.find({ status: "pending" });
  res.json(rides);
});

// Accept Ride (Driver)
router.post("/accept/:id", auth, async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (!ride) return res.send("Ride not found");

  ride.driverId = req.user.id;
  ride.status = "accepted";

  await ride.save();
  res.send("Ride accepted");
});

// Complete Ride
router.post("/complete/:id", auth, async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (!ride) return res.send("Ride not found");

  ride.status = "completed";

  await ride.save();
  res.send("Ride completed");
});

// My Rides
router.get("/my", auth, async (req, res) => {
  const rides = await Ride.find({
    $or: [
      { userId: req.user.id },
      { driverId: req.user.id }
    ]
  });

  res.json(rides);
});

module.exports = router;