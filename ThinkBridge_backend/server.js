//importing packages
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path'
import multer from 'multer';
import model from './models'


// Init app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('Hello World');
});

//STORAGE
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

//@path /item/additem
//@desc to add item post to database
app.post('/item/additem', (req, res) => {
  try{
    upload(req, res, function (err) {
      const { name, description, price } = req.body;
      const imageUrl = req.file.filename
      // console.log('hkjk', req.file)
      const user =  model.User.create({
        name,
        description,
        price,
        imageUrl,
      });
      res.json({
        success: true,
        message: "Item Added Successfully"
      })
    })
  }catch(err){
    res.send({
      success: false,
      message: ex.message
    })
  }
})

//@path /item/getallpost
//@desc for getting all posts
app.get('/item/listitem', async (req, res) => {
  try {
    const user = await model.User.findAll()
    res.json({
      success: true,
      data: user
    })
  }
  catch (ex) {
    res.send({
      success: false,
      message: ex.message
    })
  }
})

//@path /item/deleteitem/:id
//@desc for deleting item

app.delete('/item/deleteitem/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await model.User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send({
      success: true,
      message: "Item deleted"
    })
  }
  catch (ex) {
    res.send({
      success: false,
      message: ex.message
    })
  }
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
