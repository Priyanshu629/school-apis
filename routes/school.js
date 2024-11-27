const router = require("express").Router()
const {addSchool,getSchools}=require("../controllers/school")

router.route("/addSchool").post(addSchool)
router.route("/listSchools").get(getSchools)




module.exports=router