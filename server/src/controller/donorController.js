const DonorService = require("../service/donorService");
const asyncHandler = require("../middleware/asyncHandler");

exports.createDonation = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const donation = await DonorService.createDonation(req.user.id, amount);
    return res.status(201).json({
        success: true,
        donation: donation
    });
});

exports.getAllUserDonations = asyncHandler(async (req, res) => {
    const donations = await DonorService.getAllUserDonations(req.user.id);
    return res.status(200).json({
        success: true,
        donations: donations
    });
});

exports.getTotalDonationsAmmount = asyncHandler(async (req, res) => {
    const totalAmount = await DonorService.getTotalDonationAmmount();
    return res.status(200).json({
        success: true,
        totalAmount: totalAmount
    });
});


