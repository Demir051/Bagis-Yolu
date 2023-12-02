const User = require("../models/user");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const {
    Op
} = require('sequelize');

exports.register_get = async (req, res) => {
    try {

        return res.render("auth/register");

    } catch (err) {

        console.log(err);

    }
}

exports.register_post = async (req, res) => {

    const {
        username,
        email,
        password,
        confirmPassword
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    try {

        if (!(username && email && password)) {
            return res.render("auth/register", {
                message: "Lütfen tüm alanları doldurun",
                alert: "danger"
            })
        }

        if (password !== confirmPassword) {
            return res.render("auth/register", {
                message: "Şifreler eşleşmiyor",
                alert: "danger"
            })
        }

        const match = await User.findAll({
            where: {
                [Op.or]: [{
                        email: email
                    },
                    {
                        username: username
                    }
                ]
            }
        });


        if (match.length == 0) {

            const newUser = await User.create({
                username: username,
                email: email,
                password: hashPassword,
            });

            req.session.emailMessage = {
                message: "Başarıyla kaydoldunuz",
                alert: "success",
            };

            return res.redirect("/user/login");

        }

        return res.render("auth/register", {

            message: "Bu kullanıcı zaten var",
            alert: "danger"

        })

    } catch (err) {

        console.log(err);

    }
}

exports.login_get = async (req, res) => {

    const emailMessage = req.session.emailMessage ? req.session.emailMessage : "";
    delete req.session.emailMessage;

    try {
        return res.render("auth/login", {

            message: emailMessage.message,
            alert: emailMessage.alert

        })

    } catch (err) {

        console.log(err);

    }
}

exports.login_post = async (req, res) => {

    const {username,password} = req.body;

    try {

        if (!(username && password)) {

            return res.render("auth/login", {

                message: "Lütfen tüm alanları doldurun",
                alert: "danger"

            })

        }

        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if (!user) {
            return res.render("auth/login", {

                message: "Kullanıcı adı hatalı",
                alert: "danger"
            });
        }


        const match = await bcrypt.compare(password, user.password);


        if (match) {
            req.session.isAuth = true;
            req.session.fullName = user.username;
            req.session.email = user.email;
            const url = req.query.returnUrl || "/";
            return res.redirect(url);
        }

        return res.render("auth/login", {
            message: "Şifre hatalı",
            alert: "danger"
        })


    } catch (err) {
        console.log(err);
    }
}

exports.logout_get = async (req, res) => {

    try {

        req.session.destroy(() => {
            res.redirect("/");
        });

    } catch (err) {

        console.log(err);

    }
}