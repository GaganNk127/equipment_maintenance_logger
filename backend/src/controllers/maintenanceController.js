const MaintenanceLog = require('../models/MaintenanceLog');
const Equipment = require('../models/Equipment');


exports.createMaintenanceLog = async (req, res) => {
    try {
        const { equipmentId, description, serviceDate } = req.body;

        const maintenanceLog = await MaintenanceLog.create({
            equipment: equipmentId,
            description,
            serviceDate: serviceDate || Date.now()
        });

       
        await Equipment.findByIdAndUpdate(equipmentId, {
            lastServiceDate: serviceDate || Date.now()
        });

        res.status(201).json(maintenanceLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getMaintenanceLogs = async (req, res) => {
    try {
        const logs = await MaintenanceLog.find({ equipment: req.params.equipmentId })
            .sort({ serviceDate: -1 });

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
