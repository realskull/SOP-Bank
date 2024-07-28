const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addEssay = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }

    const essayData = {
        userId: context.auth.uid,
        content: data.content,
        tags: data.tags
    };

    const essayRef = await admin.firestore().collection('Essays').add(essayData);
    await admin.firestore().collection('Users').doc(context.auth.uid).update({
        essays: admin.firestore.FieldValue.arrayUnion(essayRef.id)
    });

    return { essayId: essayRef.id };
});
