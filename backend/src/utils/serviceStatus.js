const calculateStatus = (lastServiceDate) => {
    const today = new Date();
    const serviceDate = new Date(lastServiceDate);

    // Calculate difference in days
    const diffTime = Math.abs(today - serviceDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 23) {
        return 'OK'; // Green
    } else if (diffDays >= 24 && diffDays <= 30) {
        return 'Due Soon'; // Yellow
    } else {
        return 'Due for Service'; // Red
    }
};

module.exports = { calculateStatus };
