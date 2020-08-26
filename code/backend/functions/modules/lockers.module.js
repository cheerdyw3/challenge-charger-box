const dbSetting = require("../db-setting");
const db = dbSetting.db;

exports.initialize = (app) => {
  app.get("/locker/:id", getById);
  app.get("/locker", getAll);
  app.post("/changeStatus", changeStatus);
};

const getById = async (req, res) => {
  try {
    const doc = db.collection('lockers').doc(req.params.id);
    let locker = await doc.get();
    let response = locker.data();
    if (response) { 
      return res.status(200).json({ success: true,  obj: response });
    } else {
      return res.status(200).json({ success: false,  obj: null });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
  }
};


const getAll = async (req, res) => {
  try {
    let query = db.collection('lockers').orderBy("number", "asc");
    let response = [];
    await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                number: doc.data().number,
                lockerStatus: doc.data().lockerStatus
            };
            response.push(selectedItem);
        }
        return;
    });
    return res.status(200).json({ success: true,  obj: response });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
  }
};

const changeStatus = async (req, res) => {
  try {
    console.log("req.body")
    console.log(req.body)
    const locker = db.collection('lockers').doc(req.body.id);
    let lockerStatus = null;
    if(req.body.lockerStatus===1){
      lockerStatus = 0;
    }else{
      lockerStatus = 1;
    }
    await locker.update({
      lockerStatus: lockerStatus
    });
    return res.status(200).json({ success: true,  obj: null });
} catch (err) {
  console.log(err)
  return res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
}
};