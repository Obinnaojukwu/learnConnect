const Audio = require('../models/audioModel');
const Purchase = require('../models/purchaseModel');

exports.uploadAudioFile = async (req, res) => {
    const { title, price, level } = req.body;
    const filename = req.file.path;
    try {
        const audio = await Audio.create({ title, price, level, filename });
        res.status(201).json(audio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.purchaseAudio = async (req, res) => {
    const { audioId } = req.params;
    try {
        const audio = await Audio.findById(audioId);
        if (!audio) {
            return res.status(404).json({ message: 'Audio not found' });
        }
        const purchase = await Purchase.create({
            amount: audio.price,
            userId: req.user.id,
            audioId: audio._id,
        });
        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};