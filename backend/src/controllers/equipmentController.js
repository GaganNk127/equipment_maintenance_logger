const Equipment = require('../models/Equipment');
const { calculateStatus } = require('../utils/serviceStatus');


exports.createEquipment = async (req, res) => {
    try {
        const { name, serialNumber, lastServiceDate } = req.body;

        
        const existingEquipment = await Equipment.findOne({ serialNumber });
        if (existingEquipment) {
            return res.status(400).json({ message: 'Equipment with this serial number already exists' });
        }

        const equipment = await Equipment.create({
            name,
            serialNumber,
            lastServiceDate
        });

        res.status(201).json(equipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find().sort({ createdAt: -1 });

        const equipmentWithStatus = equipment.map(item => ({
            ...item._doc,
            status: calculateStatus(item.lastServiceDate)
        }));

        res.status(200).json(equipmentWithStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        const status = calculateStatus(equipment.lastServiceDate);

        res.status(200).json({ ...equipment._doc, status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
