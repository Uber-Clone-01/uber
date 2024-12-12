const {Router} = require('express');
const run = require('../models/gemini.model')
const router = Router();

router.post("/bot-res", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await run(prompt);
        res.json({ success: true, response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
module.exports = router;

