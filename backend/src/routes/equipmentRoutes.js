const express = require('express');
const router = express.Router();
const { createEquipment, getEquipment, getEquipmentById } = require('../controllers/equipmentController');

router.post('/', createEquipment);
router.get('/', getEquipment);
router.get('/:id', getEquipmentById);

module.exports = router;
