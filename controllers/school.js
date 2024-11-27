const School = require("../models/school");
const geolib = require("geolib");

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    if (name.trim() === "" || address.trim() === "") {
      return res
        .status(400)
        .json({ message: "Name and address cannot be empty." });
    }

    if (typeof name !== "string" || typeof address !== "string") {
      return res
        .status(400)
        .json({ message: "Name and address must be strings." });
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res
        .status(400)
        .json({ message: "Latitude and longitude must be valid numbers." });
    }

    if (latitude < -90 || latitude > 90) {
      return res
        .status(400)
        .json({ message: "Latitude must be between -90 and 90." });
    }

    if (longitude < -180 || longitude > 180) {
      return res
        .status(400)
        .json({ message: "Longitude must be between -180 and 180." });
    }

    const existingSchool = await School.findOne({
      where: { latitude, longitude },
    });

    if (existingSchool) {
      return res
        .status(400)
        .json({ message: "A school already exists at this location." });
    }

    const newSchool = await School.create({
      name,
      address,
      latitude,
      longitude,
    });

    if (newSchool) {
      return res
        .status(201)
        .json({ message: "School added successfully", newSchool });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate latitude and longitude
  if (isNaN(latitude) || isNaN(longitude)) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude must be valid numbers." });
  }

  if (latitude < -90 || latitude > 90) {
    return res
      .status(400)
      .json({ message: "Latitude must be between -90 and 90." });
  }

  if (longitude < -180 || longitude > 180) {
    return res
      .status(400)
      .json({ message: "Longitude must be between -180 and 180." });
  }

  try {

    const schools = await School.findAll();

    
    const sortedSchools = schools
      .map((school) => {
        const distanceInMeters = geolib.getDistance(
          { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
          { latitude: school.latitude, longitude: school.longitude }
        );

        const distanceInKm = distanceInMeters / 1000;

       
        return {
          ...school.toJSON(),
          distanceInKm, 
        };
      })
      .sort((a, b) => a.distanceInKm - b.distanceInKm) 
      .map((school) => ({
        ...school,
        distance: school.distanceInKm.toFixed(2) + " km", 
      }));

    
    res.status(200).json({ schools: sortedSchools });
  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addSchool, getSchools };
