const router = require('express').Router();

const controller = require('../controller/adminController');
const accountController = require('../controller/accountController');

// middleware
router.use((req, res, next) => {
    if(req.session.user.role === "user"){
        return res.redirect('/');
    }

    next();
});

router.get('/admin/dashboard', controller.renderDashboardPage);

router.get('/admin/users', controller.renderUserdPage);

router.get('/admin/user/add', controller.renderUserAddPage);
router.post('/admin/user/add', accountController.createUser);

router.get('/admin/user/:userid/edit', controller.renderUserUpdatePage);
router.put('/admin/user/edit', accountController.updateUser);

router.delete('/admin/user/:userid/delete', accountController.deleteUser);

module.exports = router