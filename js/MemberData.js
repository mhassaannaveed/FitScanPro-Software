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
  const db = firebase.firestore();
  // Access Firebase Authentication
  const auth = firebase.auth();

  
const memberDataDiv = document.getElementById('MemberData');


function showMember(memberId) {
  auth.onAuthStateChanged(async function (user) {
    if (user) {
      try {
        const memberRef = db.collection('members')
            .where('id', '==', memberId);

        const querySnapshot = await memberRef.get();

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const memberData = doc.data();
          console.log('Member Data:', memberData);

          memberDataDiv.innerHTML = `
            <p><strong>Name:</strong> ${memberData.name}</p>
            <p><strong>Age:</strong> ${memberData.age}</p>
            <p><strong>Phone:</strong> ${memberData.phoneNumber}</p>
            <p><strong>Email:</strong> ${memberData.email}</p>
            <img src="${memberData.pictureUrl}" alt="Member Picture">
          `;
        } else {
          memberDataDiv.innerHTML = "<p>Member not found.</p>";
        }
      } catch (error) {
        console.error('Error fetching member details:', error);
        memberDataDiv.innerHTML = "<p>Error fetching member details.</p>";
      }
    }
  });
}

const urlParams = new URLSearchParams(window.location.search);
const memberId = urlParams.get('memberId');
showMember(memberId);
