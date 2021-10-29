const bcrypt = require('bcrypt'); // Hachage du mot de passe
const jwt = require('jsonwebtoken'); // Création et vérification des tokens d'authentification
const db = require("../models");


// Inscription de l'utilisateur

exports.register = (req, res) => {
    db.User.findOne({
        where: { email: req.body.email },
    })
        .then((userFound) => {
            if (!userFound) {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    db.User.create({
                        email: req.body.email,
                        username: req.body.username,
                        avatar: "http://localhost:3000/images/avatar.png",
                        bio: "Merci de compléter votre bio",
                        password: hash,
                        isAdmin: 0,
                    })
                        .then((user) => {
                            res.status(201).json({
                                id: user.id,
                            });
                        })
                        .catch((error) => res.status(400).json({ error }));
                });
            } else {
                res.status(409).json({
                    error: "Cet utilisateur existe déjà",
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

// Identification de l'utilisateur

exports.login = (req, res) => {
    db.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // Si le mail est trouvé, comparaison du cryptage du mot de passe saisi avec celui enregistré
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        username: user.username,
                        token: jwt.sign(
                            { userId: user._id }, // Id utilisateur
                            process.env.TOKEN, // Token secret
                            { expiresIn: '24h' } // Durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Profil de l'utilisateur

exports.getProfile = (req, res) => {
    db.User.findOne({
        attributes: ["username", "email", "bio", "avatar", "isAdmin", "id"],
        where: { id: req.params.id },
    })
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Impossible de voir le profil" });
        });
};

// Profil des utilisateurs

exports.getProfileList = (req, res) => {
    db.User.findAll()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json({ error }));
};


// Mise à jour des infos utilisateur 

exports.updateProfile = (req, res) => {
    const id = req.params.id;
    const data = req.file
        ? {
            // Si image
            bio: req.body.bio,
            avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                }`,
        }
        : {
            // Sans image
            bio: req.body.bio,
        };

    db.User.findByPk(id).then((user) => {
        const filename = user.avatar
            ? {
                name: user.avatar.split("3000/")[1],
            }
            : {
                name: user.avatar,
            };
        fs.unlink(`images/${filename.name}`, () => {
            db.User.update(data, {
                where: { id: id },
            })
                .then((num) => {
                    if ((num = 1)) {
                        res.send({
                            message: "Votre profil a été mis à jour.",
                        });
                    } else {
                        res.send({
                            message: "Votre profil ne peut pas être mis à jour.",
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Impossible de mettre à jour votre profil.",
                    });
                });
        });
    });
};

exports.deleteProfile = (req, res) => {
    db.User.findOne({
        where: { id: req.params.id },
    })
        .then((userFound) => {
            console.log(User)
            // if (userFound) {
            //     db.User.findOne({
            //         attributes: ["isAdmin"],
            //         where: { id: req.userId },
            //     })
            //         .then((userIsAdmin) => {
            //             // Si c'est le profil de l'utilisateur ou l'admin, on supprime le commentaire
            //             if (
            //                 req.userId == userFound.id ||
            //                 userIsAdmin.dataValues.isAdmin == true
            //             ) {
            //                 db.User.destroy({
            //                     where: { id: req.params.id },
            //                 })
            //                     .then(() =>
            //                         res.status(201).json({ message: "Le compte a été supprimé" })
            //                     )
            //                     .catch((error) => res.status(404).json({ error }));
            //             } else {
            //                 // Si ce n'est pas le profil de l'utilisateur ni l'admin qui demande la suppression
            //                 // Status 403 : non autorisé
            //                 res.status(403).json({
            //                     error: "Vous n'êtes pas autorisé à supprimer ce compte",
            //                 });
            //             }
            //         })
            //         .catch((error) => res.status(404).json({ error: error }));
            // } else {
            //     res.status(404).json({ error: "Profil non trouvé" });
            // }
        })
        .catch((error) =>
            res.status(500).json({ error: "Impossible de supprimer le compte" })
        );
};