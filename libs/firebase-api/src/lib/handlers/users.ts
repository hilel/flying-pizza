// import admin from 'firebase-admin';
// const db = admin.firestore();
// import { config } from '../util/config';
// const initializeApp =  require('firebase-admin/app').initializeApp;
// initializeApp(config);
import { validateSignupData, validateLoginData, reduceUserDetails } from '../util/validators';
import loremPicsum from 'lorem-picsum';

// // Sign users up
// exports.signup = (req, res) => {
//   const newUser = {
//     email: req.body.email,
//     password: req.body.password,
//     confirmPassword: req.body.confirmPassword,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     birthDate: req.body.birthDate,
//     gender: req.body.gender,
//     bio: req.body.gender
//     // handle: req.body.handle
//   };

//   const { valid, errors } = validateSignupData(newUser);

//   if (!valid) return res.status(400).json(errors);

//   // todo get dynamically app base url
//   const noImgUrl = 'https://proven-gasket-88888888.web.app/en/assets/no-img-'
//     + (newUser.gender === 'male' ? 'male' : 'female')
//     +  '.png';

//   const randomUserPhotoUrl = loremPicsum({
//     width: 100,
//     height: 100,
//     random: true
//   });

//   let token, userId;
//   // db.doc(`/users/${newUser.handle}`) // to check if user name or some other field is taken
//   //   .get()
//   //   .then((doc) => {
//   //     if (doc.exists) {
//   //       return res.status(400).json({ handle: 'this handle is already taken' });
//   //     } else {
//     admin.auth().createUser({
//           // uid:
//           email: newUser.email,
//           password: newUser.password,
//           disabled: false,
//           emailVerified: true,
//           displayName: newUser.firstName + ' ' + newUser.lastName,
//           multiFactor: false,
//           phoneNumber: '+972501' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
//           // providerToLink: // see: https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
//           // providersToUnlink: // see: https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
//           photoURL: noImgUrl
//         })
//     // .createUserWithEmailAndPassword(newUser.email, newUser.password)
//     //   }
//     // })
//     .then((user) => {
//       userId = user.uid;
//       // return user.getIdToken();
//       return userId;
//     })
//     .then(() => { // idToken
//       // token = idToken;
//       const userCredentials = {
//         // handle: newUser.handle,
//         email: newUser.email,
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         birthDate: newUser.birthDate,
//         gender: newUser.gender,
//         bio: newUser.bio,
//         createdAt: new Date().toISOString(),
//         // imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
//         //   config.storageBucket
//         // }/o/${noImgUrl}?alt=media`,
//         imageUrl: noImgUrl,
//         userId
//       };
//       return db.doc(`/users/${newUser.email}`).set(userCredentials);
//     })
//     .then(() => {
//       return res.status(201).json({ }); // token
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.code === 'auth/email-already-in-use') {
//         return res.status(400).json({ email: 'Email is already is use' });
//       } else {
//         return res
//           .status(500)
//           .json({ general: err.message, err: err });
//       }
//     });
// };
// // Log user in
// exports.login = (req, res) => {
//   const user = {
//     email: req.body.email,
//     password: req.body.password
//   };

//   const { valid, errors } = validateLoginData(user);

//   if (!valid) return res.status(400).json(errors);

//   firebase
//     .auth()
//     .signInWithEmailAndPassword(user.email, user.password)
//     .then((data) => {
//       return data.user.getIdToken();
//     })
//     .then((token) => {
//       return res.json({ token });
//     })
//     .catch((err) => {
//       console.error(err);
//       // auth/wrong-password
//       // auth/user-not-user
//       return res
//         .status(403)
//         .json({ general: 'Wrong credentials, please try again' });
//     });
// };

// // Add user details
// exports.addUserDetails = (req, res) => {
//   let userDetails = reduceUserDetails(req.body);

//   db.doc(`/users/${req.user.handle}`)
//     .update(userDetails)
//     .then(() => {
//       return res.json({ message: 'Details added successfully' });
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
// // Get any user's details
// exports.getUserDetails = (req, res) => {
//   let userData = {};
//   db.doc(`/users/${req.params.handle}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         userData.user = doc.data();
//         return db
//           .collection('screams')
//           .where('userHandle', '==', req.params.handle)
//           .orderBy('createdAt', 'desc')
//           .get();
//       } else {
//         return res.status(404).json({ errror: 'User not found' });
//       }
//     })
//     .then((data) => {
//       userData.screams = [];
//       data.forEach((doc) => {
//         userData.screams.push({
//           body: doc.data().body,
//           createdAt: doc.data().createdAt,
//           userHandle: doc.data().userHandle,
//           userImage: doc.data().userImage,
//           likeCount: doc.data().likeCount,
//           commentCount: doc.data().commentCount,
//           screamId: doc.id
//         });
//       });
//       return res.json(userData);
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
// // Get own user details
// exports.getAuthenticatedUser = (req, res) => {
//   let userData = {};
//   db.doc(`/users/${req.user.handle}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         userData.credentials = doc.data();
//         return db
//           .collection('likes')
//           .where('userHandle', '==', req.user.handle)
//           .get();
//       }
//     })
//     .then((data) => {
//       userData.likes = [];
//       data.forEach((doc) => {
//         userData.likes.push(doc.data());
//       });
//       return db
//         .collection('notifications')
//         .where('recipient', '==', req.user.handle)
//         .orderBy('createdAt', 'desc')
//         .limit(10)
//         .get();
//     })
//     .then((data) => {
//       userData.notifications = [];
//       data.forEach((doc) => {
//         userData.notifications.push({
//           recipient: doc.data().recipient,
//           sender: doc.data().sender,
//           createdAt: doc.data().createdAt,
//           screamId: doc.data().screamId,
//           type: doc.data().type,
//           read: doc.data().read,
//           notificationId: doc.id
//         });
//       });
//       return res.json(userData);
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
// // Upload a profile image for user
// exports.uploadImage = (req, res) => {
//   const BusBoy = require('busboy');
//   const path = require('path');
//   const os = require('os');
//   const fs = require('fs');

//   const busboy = new BusBoy({ headers: req.headers });

//   let imageToBeUploaded = {};
//   let imageFileName;

//   busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//     console.log(fieldname, file, filename, encoding, mimetype);
//     if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
//       return res.status(400).json({ error: 'Wrong file type submitted' });
//     }
//     // my.image.png => ['my', 'image', 'png']
//     const imageExtension = filename.split('.')[filename.split('.').length - 1];
//     // 32756238461724837.png
//     imageFileName = `${Math.round(
//       Math.random() * 1000000000000
//     ).toString()}.${imageExtension}`;
//     const filepath = path.join(os.tmpdir(), imageFileName);
//     imageToBeUploaded = { filepath, mimetype };
//     file.pipe(fs.createWriteStream(filepath));
//   });
//   busboy.on('finish', () => {
//     admin
//       .storage()
//       .bucket()
//       .upload(imageToBeUploaded.filepath, {
//         resumable: false,
//         metadata: {
//           metadata: {
//             contentType: imageToBeUploaded.mimetype
//           }
//         }
//       })
//       .then(() => {
//         const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
//           config.storageBucket
//         }/o/${imageFileName}?alt=media`;
//         return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
//       })
//       .then(() => {
//         return res.json({ message: 'image uploaded successfully' });
//       })
//       .catch((err) => {
//         console.error(err);
//         return res.status(500).json({ error: 'something went wrong' });
//       });
//   });
//   busboy.end(req.rawBody);
// };

// exports.markNotificationsRead = (req, res) => {
//   let batch = db.batch();
//   req.body.forEach((notificationId) => {
//     const notification = db.doc(`/notifications/${notificationId}`);
//     batch.update(notification, { read: true });
//   });
//   batch
//     .commit()
//     .then(() => {
//       return res.json({ message: 'Notifications marked read' });
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };