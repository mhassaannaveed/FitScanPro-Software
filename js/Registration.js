const firebaseConfig = {
  apiKey: "AIzaSyAcVcB4nUDTuDuvo3yz1Bzsmo60MfY9-fE",
  authDomain: "final-year-project-6e437.firebaseapp.com",
  databaseURL: "https://final-year-project-6e437-default-rtdb.firebaseio.com",
  projectId: "final-year-project-6e437",
  storageBucket: "final-year-project-6e437.appspot.com",
  messagingSenderId: "606296370149",
  appId: "1:606296370149:web:567cce8e5c9e8c7f791d0c",
  measurementId: "G-CMVRYXQWEX"
};
firebase.initializeApp(firebaseConfig);

// Access Firestore
const firestore = firebase.firestore();
// Access Firebase Authentication
const auth = firebase.auth();
const storage = firebase.storage();


// Get reference to the member registration form
const memberRegistrationForm = document.getElementById('memberRegistrationForm');






// Add submit event listener to the member registration form
memberRegistrationForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  // Get values from form inputs
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;
  const rfid = document.getElementById('rfid').value;
  const pictureFile = document.getElementById('picture').files[0];

  // Upload picture to Firebase Storage
  const pictureRef = storage.ref().child('member-profile-pictures/' + pictureFile.name);
  await pictureRef.put(pictureFile);
  const pictureUrl = await pictureRef.getDownloadURL();

  // Get authenticated admin user
  const user = firebase.auth().currentUser;

  // Get gym ID from the admin user data
  const gymId = user ? user.uid : null;

  if (!gymId) {
    console.error('Admin not authenticated or gym ID not found');
    return;
  }

  const documenttoInsert = firestore.collection('members').doc();
  const documentUuid = documenttoInsert.id;

  console.log(documentUuid, "uuid")

  await documenttoInsert.set({
    id: documentUuid,
    name: name,
    email: email,
    age: age,
    phoneNumber: phoneNumber,
    password: password,
    rfid: rfid,
    pictureUrl: pictureUrl,
    adminId: gymId
  }).then((docRef) => {
    console.log('Member registered successfully');

    alert('Member registered successfully!');
  })
    .catch((error) => {
      console.error('Error registering member:', error.message);
      // Optionally display an error message to the user
      alert('Error registering member. Please try again.');
    });
});