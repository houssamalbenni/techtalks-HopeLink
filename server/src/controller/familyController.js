const MissingPersonService = require("../service/familyService");
const asyncHandler = require("../middleware/asyncHandler");

exports.createMissingPerson = asyncHandler(async (req,res) => {

    const missingPerson = await MissingPersonService.createMissingPerson(req.user.id, req.body);
   res.status(201).json({
    success:true, data : missingPerson
   });
});


exports.updateMissingPerson = asyncHandler(async (req,res) => {
    console.log("Request body for update:", req.body);
    const updatedFamilyService = await MissingPersonService.updateMissingPerson(req.params.id, req.user.id, req.body);
    res.status(200).json({
        success: true, data : updatedFamilyService
    });
})

exports.getMissingPersonById = asyncHandler(async (req,res) => {
    
    const familyService = await MissingPersonService.getMissingPersonById(req.params.id);
    res.status(200).json({
        success: true, data : familyService});
    });



exports.getAllMissingPersons = asyncHandler(async (req,res) => {
    
    const allFamilyServices = await MissingPersonService.getAllMissingPersons();
    res.status(200).json({
        success: true, data: allFamilyServices});
    });
