const dbSetting = require("../db-setting");
const db = dbSetting.db;

exports.initialize = (app) => {
  app.post("/addBooking", addBooking);
  app.get("/getAllBookingMember/:id", getAllBookingMember);
};

//create
const addBooking = async (req, res) => {
    try{
      // console.log(req.body)
        let addBookings = await db.collection('bookings').doc()
          .create({
            userId:req.body.userId,
            lockerId: req.body.lockerId,
            type:req.body.type,
            start:req.body.start,
            end:req.body.end,
            price:req.body.price,
            minTotal:req.body.minTotal
          });

          let lockerId = req.body.lockerId;
          const locker = db.collection('lockers').doc(lockerId.toString());
          await locker.update({
              lockerStatus: 1
          });

          return res.status(200).json({ success: true,  obj: null });

    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });

    }
};

const getAllBookingMember = async (req, res) => {
  try {
    console.log(req.params.id)
    let query = db.collection('bookings');
    let response = [];
    await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          if(doc.data().userId === req.params.id){
            const selectedItem = {
              id: doc.id,
              userId:doc.data().userId,
              lockerId: doc.data().lockerId,
              type:doc.data().type,
              start:doc.data().start,
              end:doc.data().end,
              price:doc.data().price,
              minTotal:doc.data().minTotal
            };
            response.push(selectedItem);
          }
        }
        return;
    });
    return res.status(200).json({ success: true,  obj: response });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
  }
};