module.exports = {
    /*  
        Route: GET /login
        Purpose: Render the login page
    */
    renderLoginPage: (req, res) => {
        res.render('accounts/login', { title: "App | Login" });
    },

    /*  
        Route: POST /login
        Purpose: Authenticate user
    */
    authenticateUser: (req, res) => {
        res.send("login post");
    },

    /*  
        Route: GET /register
        Purpose: Render the registration page
    */
    renderRegistrationPage: (req, res) => {
        res.render('accounts/register', { title: 'App | Register' });
    },

    /*  
        Route: POST /register
        Purpose: Create a new user
    */
    createUser: (req, res) => {
        res.send("register post");
    },
}
