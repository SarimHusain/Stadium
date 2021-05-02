const router = require('express').Router();

const EmployeeRouter = require('./employee');
const EventRouter = require('./event');
const SeatsRouter = require('./seats');
const UserRouter = require('./user');

router.use('/employee', EmployeeRouter);
router.use('/event', EventRouter);
router.use('/seat', SeatsRouter);
router.use('/user', UserRouter);

module.exports = router;