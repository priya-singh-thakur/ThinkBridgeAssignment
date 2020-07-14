import express from 'express';
import models from '../models'
var router =  express.Router()


//@path /item/additem
//@desc to add item post to database

router.post("/additem", async(req, res) => {
    try {
        const { name, description, price, imageUrl} = req.body;
        console.log('data', name, description, price, imageUrl )
        const user = await models.User.create({
            name,
            description,
            price,
            imageUrl
        });

        res.send({
            success: true,
            data: user
        });
    } catch(ex) {
        res.send({
            success: false,
            message: ex.message
        });
    } 
});

//@path /item/getallpost
//@desc for getting all posts

    router.get('/listitem', async(req, res) => {
        try{
         const user = await models.User.findAll()
            console.log('data', user)
            res.json({
                success:true,
                data: user
            })
        }
        catch(ex) {
            res.send({
                success:false,
                message:ex.message
            })
        }
    })

//@path /item/deleteitem/:id
//@desc for deleting item

router.delete('/deleteitem/:id', async(req, res) => {
    try{
        const id = req.params.id
        console.log("idddddd", id)
       const user = await models.User.destroy({
            where: {
                id: req.params.id
            }
            });
        res.send({
            success:true,
            message: "Item deleted"
        })
    }
    catch(ex){
        res.send({
            success:false,
            message:ex.message
        })
    }
})

module.exports = router;

