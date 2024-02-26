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


  // Get reference to the admin login form
const adminLoginForm = document.getElementById('adminLoginForm');

// Add submit event listener to the admin login form
adminLoginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get values from form inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in the admin with Firebase Authentication
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('Admin logged in successfully:', userCredential.user);
      // Optionally redirect to the dashboard or show a success message
      window.location.href = "/html/DashBoard.html"; // Redirect to the admin dashboard page
    })
    .catch((error) => {
      console.error('Error logging in admin:', error.message);
      // Optionally display an error message to the user
      alert('Invalid email or password. Please try again.');
    });
});