const admin = require("firebase-admin");

const serviceAccount = require("../secure/etaiiler-firebase-adminsdk-w2lwv-db3f406d29.json");

let notifier = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const notificationTypeFunction = (name,notificationType) => {
    const notificationData = {
        like: {
            title: "Your post has been liked by " + name,
            body: "Hey!"+name + " has liked your post"
        },
        follow: {
            title: name +" started following you",
            body: "Hey!" + name + " started following you"
        },
        comment: {
            title: name +" commented on your post",
            body: "Hey!"+name+ " commented on your post"
        },
        tag: {
            title: name + " tagged you",
            body: "Hey!"+name + " tagged you in a post"
        },
        share: {
            title: name +" shared your post",
            body: "Hey!" + name + " shared your post "
        }
    }
    return notificationData[notificationType]
}

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

let fetchPayload = (token, typeOfNotification, name ) => {
    let updated_token = token
    let message = notificationTypeFunction(name,typeOfNotification)

    let payload = {
        notification: message,
        // apns: {
        //     headers: {
        //         "apns-priority": "5"
        //     },
        //     payload: {
        //         aps: {
        //             category: "CJN"
        //         }
        //     }
        // },
        token: updated_token
    };

    return payload
}

const sendNotification = async (registrationToken, notificationType, name) => {
    console.log("sending notification => ", registrationToken, notificationType)
    let messagePayload = fetchPayload(registrationToken, notificationType, name)

    console.log("Message payload => ", JSON.stringify(messagePayload))

    notifier.messaging().send(messagePayload)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}

module.exports = {
    notify: sendNotification
}