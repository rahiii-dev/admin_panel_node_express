const User = require("../model/userSchema");

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
        Route: POST /register
        Purpose: Create a new user
    */
  createUser: async (req, res) => {
        const {username, email, password, Cpassword} = req.body
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
                return res.render("accounts/register", {title: "App | Register", errors: errors, username : username, email: email });
            }

            const newUser = new User({username, email, password});
            await newUser.save();
            req.session.isAuthenticated = true;
            req.session.user = newUser;

            res.redirect("/");
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

                return res.render("accounts/register", {title: "App | Register", errors: errors, username:username, email : email});
            } else {
                console.error("Error creating user:", err);
                res.status(500).send("Error creating user. Please try again later.");
            }
        }
  },

  /*  
        Route: GET /logout
        Purpose: Logout a user
    */
   logoutUser : (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error logging out. Please try again later.');
        }
        
        res.redirect('/login');
    });
   },
};
