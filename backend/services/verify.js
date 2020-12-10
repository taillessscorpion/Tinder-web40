
router.post('/confirmation', (req, res) => {
    // Find a matching token
    Token.findOne({ token: req.body.token }, (err, token) => {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
});

router.post('/resend', (req, res) => {
 
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
});
loginPost = function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    // Check for validation erro
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (!isMatch) return res.status(401).send({ msg: 'Invalid email or password' });

            // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 

            // Login successful, write token, and send back user
            res.send({ token: generateToken(user), user: user.toJSON() });
        });
    });
};
router.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await AuthService.signup(email, password);
        res.json(user.toJSON());
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

// Create a verification token for this user
const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
   
// Save the verification token
token.save(err => {
    if (err) {return res.status(500).send(err.message)}

    // Send the email
    const transporter =nodemailer.createTransport({
        pool: true,
        host: "http://192.168.16.106:3000",
        port: 465,
        secure: true,
        auth: {
          user: "username",
        }
      });
    const mailOptions = { from: 'no-reply@Tinder.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, err => {
        try {
            res.status(200).send('A verification email has been sent to ' + user.email);
        } catch {
            res.status(500).send(err.message)}
    });
});




signupPost = (req, res) => {
      // Make sure this account doesn't already exist
    User.findOne({ email: req.body.email }, function (err, user) {
   
      // Make sure user doesn't already exist
      if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
   
      // Create and save the user
      user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
      user.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
   
          // Create a verification token for this user
          const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
   
          // Save the verification token
          token.save(err => {
              if (err) {return res.status(500).send(err.message)}
   
              // Send the email
              const transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
              const mailOptions = { from: 'no-reply@Tinder.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
              transporter.sendMail(mailOptions, err => {
                  if (err) { return res.status(500).send(err.message)}
                  res.status(200).send('A verification email has been sent to ' + user.email);
              });
          });
      });
    });
  };