const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://locker2-6442b.firebaseio.com"
  });
const db = admin.firestore();

exports.db = db;