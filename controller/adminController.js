const User = require('../model/userSchema');

module.exports = {
    /*  
        Route: GET /admin/dashboard
        Purpose: Render the dasboard for admin
    */
    renderDashboardPage : (req, res) => {
        res.render('admin/dasboard', {layout: 'layouts/adminLayout',title : "Dasboard", user: req.session.user})
    },
    /*  
        Route: GET /admin/users
        Purpose: renderUserPage
    */
    renderUserdPage : async (req, res, next) => {
        try {
            let users = [];
            if(req.query.query){
                const searchQuery = req.query.query
                users = await User.find({ $and : [
                    {_id : {$ne : req.session.user._id}},
                    { $or : [
                        { username: { $regex: searchQuery, $options: 'i' } },
                        { email: { $regex: searchQuery, $options: 'i' } }
                    ]
                    }
                ]});
            }
            else {
                users = await User.find({_id : {$ne : req.session.user._id}});
            }
            res.render('admin/users', { layout: 'layouts/adminLayout', title: "Dashboard | Users", users: users });
        } catch (error) {
            console.error("Error fetching users:", error);
            next(err);
        }
    },
    /*  
        Route: GET admin/user/add
        Purpose: show user add page for admin
    */
        renderUserAddPage : async (req, res) => {
        res.render('admin/userAdd', {layout: 'layouts/adminLayout',title : "Dasboard | User | Add"})
    },
    /*  
        Route: GET admin/user/edit
        Purpose: show user edit page for admin
    */
    renderUserUpdatePage : async (req, res, next) => {
        try{
            const user = await User.findById(req.params.userid).select('-createdAt -updatedAt');
            res.render('admin/userUpdate', {layout: 'layouts/adminLayout',title : "Dasboard | User | Edit", user})
        }catch(err){
            console.error("Error user update page:", err);
            next(err);
        }
    },
}