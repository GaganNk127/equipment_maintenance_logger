const express = require('express');
const router = express.Router();
const { createMaintenanceLog, getMaintenanceLogs } = require('../controllers/maintenanceController');

router.post('/', createMaintenanceLog);
router.get('/:equipmentId', getMaintenanceLogs);

module.exports = router;
