const db = require("../models");

exports.createComment = (req, res) => {
    console.log(req.userId)
    // db.User.findOne({
    //     attributes: ["id", "username", "email"],
    //     where: { id: req.userId },
    // })
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(401).json({ error: "Utilisateur inconnu !" });
    //         }

    //         db.Post.findOne({
    //             where: { id: req.params.id },
    //         })
    //             .then((post) => {
    //                 if (!post) {
    //                     return res.status(401).json({ error: "Post inconnu !" });
    //                 }

    //                 db.Comment.create({
    //                     content: req.body.content,
    //                     PostId: req.params.id,
    //                     UserId: user.id,
    //                 })
    //                     .then((comment) => {
    //                         return res
    //                             .status(201)
    //                             .json({ comment, message: "Commentaire créé !" });
    //                     })
    //                     .catch((error) => {
    //                         console.log("0", error);
    //                         return res.status(400).json({ error: "Pas de création" });
    //                     });
    //             })
    //             .catch((error) => {
    //                 res.status(400).json({ error: "Problème de création du commentaire !" });
    //             });
    //     })
    //     .catch((error) => {
    //         res.status(500).json({ error: "Création impossible !" });
    //     });
};

exports.deleteComment = (req, res) => {
    db.Comment.findOne({
        where: { id: req.params.id },
    })
        .then((commentFound) => {
            if (commentFound) {
                db.User.findOne({
                    attributes: ["isAdmin"],
                    where: { id: req.userId },
                })
                    .then((userIsAdmin) => {
                        // Si l'utilisateur est le créateur OU admin dans la db, on supprime le commentaire
                        if (
                            req.userId == commentFound.UserId ||
                            userIsAdmin.dataValues.isAdmin == true
                        ) {
                            db.Comment.destroy({
                                where: { id: req.params.id },
                            })
                                .then(() =>
                                    res.status(201).json({ message: "Commentaire supprimé" })
                                )
                                .catch((error) => res.status(404).json({ error }));
                        } else {
                            // Si l'utilisateur n'est pas le créateur ni admin
                            // Status 403 : non autorisé
                            res.status(403).json({
                                error: "Vous n'êtes pas autorisé à supprimer le commentaire",
                            });
                        }
                    })
                    .catch((error) =>
                        res.status(500).json({
                            error: "Impossible de communiquer avec la base de données",
                        })
                    );
            } else {
                res.status(404).json({ error: "Commentaire non trouvé" });
            }
        })
        .catch((error) =>
            res.status(500).json({ error: "Impossible de supprimer le commentaire" })
        );
};