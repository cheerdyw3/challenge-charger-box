const dbSetting = require("../db-setting");
const db = dbSetting.db;
// const admin = require("firebase-admin");
// const serviceAccount = require("../permissions.json");
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://locker2-6442b.firebaseio.com"
//   });
// const db = admin.firestore();

exports.initialize = (app) => {
  app.post("/login", login);
};

const login = async (req, res) => {
  try {
    let query = db.collection('users');
    let response = [];
    await query.get().then(querySnapshot => {
      let docs = querySnapshot.docs;
      docs.forEach(doc => {
        if(doc.data().username === req.body.username && doc.data().password === req.body.password){
            const selectedItem = {
              id: doc.id,
              username: doc.data().username,
              password: doc.data().password,
              type: doc.data().type
            };
            response.push(selectedItem);
        }
      });
      return;
    });

    if(response.length > 0){
      return res.status(200).json({ success: true,  obj: response });
    }else{
      return res.status(200).json({ success: false,  obj: null });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
  }
};

//create
const createPro = async (req, res) => {
    try{
        db.collection('products').doc('/'+req.body.id+'/')
        .create({
            name:req.body.name,
            description: req.body.description,
            price:req.body.price
        });
        return res.status(200).send('success');
    }catch(err){
        console.log(err);
        return res.status(500).send(err);

    }
};