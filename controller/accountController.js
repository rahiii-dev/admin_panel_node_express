const User = require("../model/userSchema");
const bcrypt = require('bcrypt');

module.exports = {
  /*  
        Route: GET /login
        Purpose: Render the login page
    */
  renderLoginPage: (req, res) => {
    res.render("accounts/login", { title: "App | Login" });
  },

  /*  
        Route: POST /login
        Purpose: Authenticate user
    */
  authenticateUser: async (req, res) => {
    const { username, password } = req.body;
    try {
        const errors = {};

        if (!username) {
            errors.usernameError = "Please enter Username";
        }

        if (!password) {
            errors.passError = "Please enter Password";
        }

        if (Object.keys(errors).length > 0) {
            return res.render("accounts/login", {title: "App | Login", errors: errors, username : username });
        }

        const user = await User.authenticate(username, password);
        req.session.isAuthenticated = true;
        req.session.user = user;
        res.redirect("/");
    } catch (err) {
        res.render("accounts/login", {title: "App | Login", errors: err, username : username});
    }
  },

  /*  
        Route: GET /register
        Purpose: Render the registration page
    */
  renderRegistrationPage: (req, res) => {
    res.render("accounts/register", { title: "App | Register" });
  },

  /*  
        Route: POST [/register, /admin/user/add]
        Purpose: Create a new user
    */
  createUser: async (req, res, next) => {
        const {username, email, password, Cpassword} = req.body
        let role = 'user';
        
        const isAdmin = (req.session.user?.role === 'admin');

        if(isAdmin){
            role = req.body.role;   
        }

        const errors = {};

        try {
            if (!username) {
                errors.usernameError = "Please enter Username";
            }
            if (!email) {
                errors.emailError = "Please enter an email";
            }
            if (!password) {
                errors.passError = "Please enter Password";
            }
            if(!Cpassword){
                errors.CpassError = "Please enter Password";
            }
            if(password !== Cpassword){
                errors.CpassError = "Password doesnt match";
            }
            const usernameExist = await User.findOne({username});
            if (usernameExist) {
                errors.usernameError = "Username already exist";
            }
            const emailExist = await User.findOne({email});
            if (emailExist) {
                errors.emailError = "Email already exist";
            }

            if (Object.keys(errors).length > 0) {
                if(isAdmin){
                    return res.render('admin/userAdd', {layout: 'layouts/adminLayout',title : "Dasboard | User | Add", errors, username, email})
                }

                return res.render("accounts/register", {title: "App | Register", errors, username, email });
            }

            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = new User({username, email, password : hashedPass, role});
            await newUser.save();
            
            if(isAdmin){
                return res.render('admin/userAdd', {layout: 'layouts/adminLayout',title : "Dasboard | User | Add", succesMessage: 'User added succesfully.'})
            }
            
            req.session.isAuthenticated = true;
            req.session.user = newUser;
            return res.redirect("/");

        }catch(err){
            if(err.name === 'ValidationError'){
                const errors = {}

                for (field in err.errors) {
                    console.log(err.errors[field])
                    if(field === 'username'){
                        errors.usernameError = err.errors[field].message;
                    }

                    if(field === 'email'){
                        errors.emailError = err.errors[field].message;
                    }
                }

                if(isAdmin){
                    return res.render('admin/userAdd', {layout: 'layouts/adminLayout',title : "Dasboard | User | Add", errors: errors, username:username, email : email})
                }

                return res.render("accounts/register", {title: "App | Register", errors: errors, username:username, email : email});
            } else {
                console.error("Error creating user:", err);
                next(err);
            }
        }
  },
  /*  
        Route: PUT /admin/user/edit
        Purpose: Update a user
    */
    updateUser : async (req, res, next) => {
        const {username, email, role,  _id : userId} = req.body
    
        const errors = {};

        try {
            if (!username) {
                errors.usernameError = "Please enter Username";
            }
            if (!email) {
                errors.emailError = "Please enter an email";
            }
            
            const usernameExist = await User.findOne({ username, _id: { $ne: userId } });
            if (usernameExist) {
                errors.usernameError = "Username already exist";
            }
            const emailExist = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExist) {
                errors.emailError = "Email already exist";
            }

            if (Object.keys(errors).length > 0) {
                return res.render('admin/userUpdate', {layout: 'layouts/adminLayout',title : "Dasboard | User | Edit", errors, user : req.body});
            }

            await User.findByIdAndUpdate(userId, {username, email, role});
            const updatedUser = await User.findById(userId).select('-createdAt -updatedAt');
            return res.render('admin/userUpdate', {layout: 'layouts/adminLayout',title : "Dasboard | User | Edit", succesMessage: 'User updated succesfully.', user: updatedUser});

        }catch(err){
            if(err.name === 'ValidationError'){
                const errors = {}

                for (field in err.errors) {
                    console.log(err.errors[field])
                    if(field === 'username'){
                        errors.usernameError = err.errors[field].message;
                    }

                    if(field === 'email'){
                        errors.emailError = err.errors[field].message;
                    }
                }

                return res.render('admin/userUpdate', {layout: 'layouts/adminLayout',title : "Dasboard | User | Edit", errors, user : req.body});

            } else {
                console.error("Error updating user:", err);
                next(err);
            }
        }
   },
  /*  
        Route: delete /admin/user/:userid/delete
        Purpose: Deletes a user
    */
   deleteUser : async (req, res, next) => {
        try{
            await User.findOneAndDelete({_id : req.params.userid})
            res.redirect('/admin/users');
        } catch(err) {
            console.error('Error deleting user:', err);
            next(err);
        }
   },

  /*  
        Route: GET /logout
        Purpose: Logout a user
    */
   logoutUser : (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            next(err)
        }
        
        res.redirect('/login');
    });
   },
};
