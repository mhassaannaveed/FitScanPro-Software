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

// Reference to the Firestore database
const db = firebase.firestore();
const storage = firebase.storage();

// Get reference to the update form
const updateForm = document.getElementById('updateForm');

// function populateMemberDetails(memberId) {
//     firebase.auth().onAuthStateChanged(async function (user) {
//       if (user) {
//         const memberRef = db.collection('members').where('adminId', '==', user.uid).where('id', '==', memberId);
//         const querySnapshot = await memberRef.get();
//         if (!querySnapshot.empty) {
//           const doc = querySnapshot.docs[0];
//           const member = doc.data();
//           updateForm.name.value = member.name;
//           updateForm.age.value = member.age;
//           updateForm.regno.value = member.rfid;
//           updateForm.email.value = member.email;
//           updateForm.contact.value = member.phoneNumber;
         
//           updateForm.password.value =  member.password; // Clear password field for security
//           updateForm.image.src = member.pictureUrl;
//           updateForm.image.height = "340";
//           updateForm.image.width = "270";
//         } else {
//           console.error('No such member document found.');
//         }
//       } else {
//         console.log('User not logged in.');
//       }
//     });
//   }
  
//   // Function to reauthenticate the user before updating email or password
//   function reauthenticateUser(user, currentPassword) {
//     const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
//     return user.reauthenticateWithCredential(credential);
//   }
  
//   // Populate form with member details
//   const urlParams = new URLSearchParams(window.location.search);
//   const memberId = urlParams.get('memberId');
//   populateMemberDetails(memberId);
  
//   // Function to handle form submission (update member)
//   updateForm.addEventListener('submit', async function (event) {
//     event.preventDefault(); // Prevent default form submission
//     const currentPassword = updateForm.password.value;
//     const updatedEmail = updateForm.email.value;
//     const updatedPassword = updateForm.password.value;
//     const updatedName = updateForm.name.value;
//     const updatedAge = updateForm.age.value;
//     const updatedImage = updateForm.picture.files[0];
    
//     const user = firebase.auth().currentUser;
//     if (!user) {
//       console.error('User not logged in.');
//       return;
//     }
  
//     // Reauthenticate the user before updating email or password
//     reauthenticateUser(user, currentPassword)
//       .then(() => {
//         if (updatedEmail !== user.email) {
//           return user.updateEmail(updatedEmail);
//         } else {
//           return Promise.resolve(); // Skip email update if not changed
//         }
//       })
//       .then(() => {
//         if (updatedPassword) {
//           return user.updatePassword(updatedPassword);
//         } else {
//           return Promise.resolve(); // Skip password update if not provided
//         }
//       })
//       .then(() => {
//         const memberRef = db.collection('members').where('adminId', '==', user.uid).where('id', '==', memberId);
//         return memberRef.get();
//       })
//       .then((querySnapshot) => {
//         if (!querySnapshot.empty) {
//           const doc = querySnapshot.docs[0];
//           const memberRef = db.collection('members').doc(doc.id);
//           const updatedData = {
//             name: updatedName,
//             age: updatedAge,
//             email: updatedEmail,
//           };
//           if (updatedImage) {
//             const pictureRef = storage.ref().child('member-profile-pictures/' + updatedImage.name);
//             return pictureRef.put(updatedImage)
//               .then(snapshot => snapshot.ref.getDownloadURL())
//               .then(downloadURL => {
//                 updatedData.pictureUrl = downloadURL;
//                 return memberRef.update(updatedData);
//               });
//           } else {
//             return memberRef.update(updatedData);
//           }
//         } else {
//           return Promise.reject('No such member document found.');
//         }
//       })
//       .then(() => {
//         console.log('Member record updated successfully');
//         alert('Member Record Updated');
//         // Optionally, redirect to another page or update UI
//       })
//       .catch((error) => {
//         console.error('Error updating member record:', error);
//         alert('Error updating member record. Please try again.');
//       });
//   });








// Function to fetch and populate member details in the form
function populateMemberDetails(memberId) {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {

            const memberRef = db.collection('members')
                .where('adminId', '==', user?.uid)
                    .where('id', '==', memberId)

            const querySnapshot = await memberRef.get()
            if (!querySnapshot.empty) {

                const doc = querySnapshot.docs[0];
                const member = doc.data();

                updateForm.name.value = member.name;
                updateForm.age.value = member.age;
                updateForm.regno.value = member.rfid;
                updateForm.email.value = member.email;
                updateForm.contact.value = member.phoneNumber;
                updateForm.password.value = member.password;
                updateForm.image.src = member.pictureUrl;

                updateForm.image.height = "340"
                updateForm.image.width = "270"

            }
            else {
                console.error('No such member document found.');
            }
        }
        else {
            console.log('not found anything')
        }
    })
}

// Populate form with member details
// populateMemberDetails(memberId);
// Function to handle form submission (update member)
updateForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get updated values from the form
    const updatedName = updateForm.elements.name.value;
    const updatedAge = updateForm.elements.age.value;
    const updateEmail = updateForm.elements.email.value;
    const updateImage = updateForm.elements.picture.files[0];
    
    const memberRef = db.collection('members')
    .where('adminId', '==', firebase.auth().currentUser.uid)
    .where('id', '==', memberId);
    
    const querySnapshot = await memberRef.get();
    
    if (querySnapshot.empty) return alert("no member to update")
    
    if (updateImage) {
        const pictureRef = storage.ref().child('member-profile-pictures/' + updateImage.name);
        pictureRef.put(updateImage)
        .then(snapshot => snapshot.ref.getDownloadURL()) // Get download URL after upload
        .then(async downloadURL => {
            const doc = querySnapshot.docs[0];
                return db.collection('members').doc(doc.id).update({
                    name: updatedName,
                    age: updatedAge,
                    email: updateEmail,
                    pictureUrl: downloadURL,
                })
            })
            .then(() => {
                console.log('Member record updated successfully');
                alert('Member Record Updated');
                // Optionally, redirect to another page or update UI
            })
            .catch((error) => {
                console.error('Error updating member record:', error);
            });
    } else {
        const doc = querySnapshot.docs[0];
        db.collection('members').doc(doc.id).update({
            name: updatedName,
            age: updatedAge,
            email: updateEmail,
        })
        return alert("updated!")
    }
});

// Get member ID from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const memberId = urlParams.get('memberId');
populateMemberDetails(memberId)


imageCheck = (event) => {
    let image = URL.createObjectURL(event.target.files[0]);
    let imageDiv = document.getElementById('image');
    imageDiv.src = image;
}
