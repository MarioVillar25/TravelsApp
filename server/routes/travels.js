const multerMulti = require("../middleware/multerMulti")
const router = require("express").Router();
const travelsControllers= require("../controllers/travelsControllers");


//localhost:3000/travels/createTravel
router.post("/createTravel", multerMulti("travels"), travelsControllers.createTravel)

router.get("/travelsOneUser/:user_id", travelsControllers.travelsOneUser)

router.get("/getPicsOneTravel/:travel_id", travelsControllers.getPicsOneTravel)

router.put("/editTravel", travelsControllers.editTravel)

router.put("/delTravel", travelsControllers.delTravel)

router.put("/delPic", travelsControllers.delPic)

router.post("/addPictures/:id", multerMulti("travels"), travelsControllers.addPictures)






module.exports = router;