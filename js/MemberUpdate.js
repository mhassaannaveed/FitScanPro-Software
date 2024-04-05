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
                updateForm.gender.value = member.gender;
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
    const updateRfid = updateForm.elements.regno.value
    const updatedName = updateForm.elements.name.value;
    const updatedAge = updateForm.elements.age.value;
    const updatedContact = updateForm.elements.contact.value;
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
                    phoneNumber:updatedContact,
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
    } else{
        const doc = querySnapshot.docs[0];
        db.collection('members').doc(doc.id).update({
            name: updatedName,
            age: updatedAge,
            phoneNumber:updatedContact,
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
