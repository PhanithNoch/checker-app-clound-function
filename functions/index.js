const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.sendNotificationsToMobile = functions.firestore
  .document("sp_users_dev/{user_id}")
  .onCreate(async (snapshot) => {
    // Notification details.
    const data = snapshot.data();
    console.log(data);
    const payload = {
      notification: {
        title: "Test Send Notifications",
        body: "message from Developer",
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
      data: {
        title: "Test Send Notifications",
        body: "message from Developer",
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
    };
    const token =
      "dDpCISHiOkuBqBoQAZqt6o:APA91bF6PQCeV1xl1JPCckX6Q8drf5SJuPkQ9KXQrbAUIr9ISOrN60wI3xdnvNW2Q-tdoiGnZm5npKtu3JiL9BDQD9xwi7YaePnulW8w_s44KT46M5OaJCGMYbn_U4_RQjoaFkYYvrI0";
    // try {
    //   await admin.messaging().sendToDevice(token, payload);
    // } catch (error) {
    //   console.log("message : " + error);
    // }

      // Get the list of device tokens.
      const allTokens = await admin.firestore().collection('fcmTokens').get();
      const tokens = [];
      allTokens.forEach((tokenDoc) => {
          tokens.push(tokenDoc.data().token);
      });

      if (tokens.length > 0) {
          // Send notifications to all tokens.
          await admin.messaging().sendToDevice(tokens, payload);
          console.log('Notifications have been sent and tokens cleaned up.');
      }
  });

// exports.app = functions.https.onRequest(app);
