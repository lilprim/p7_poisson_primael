const db = require("../models");

// Ajouter un like
exports.addLike = (req, res) => {
    const like = {
        PostId: req.body.PostId,
        UserId: req.userId,
    };
    db.Like.create(like)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Impossible de liker ce post.",
            });
        });
};

// Récupérer les likes d'un message
// exports.listLikes = (req, res) => {
//     db.Like.findAll({ where: { MessageId: req.params.id } })
//         .then((post) => {
//             res.status(200).json(post);
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

// Ajouter un dislike
exports.deleteLike = (req, res) => {
    console.log("john")
    //res.status(200).json({ message: "like annulé !" }))
    db.Like.findOne({ where: { UserId: req.userId, PostId: req.params.id } })
        .then((like) => {
            like
                .destroy()
                .then(() => res.status(200).json({ message: "like annulé !" }))
                .catch((error) => {
                    console.log("2", error);
                    res.status(404).json({ error });
                });
        })

        .catch((error) => {
            console.log("1", error);
            res.status(500).json({ error });
        });
};