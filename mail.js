import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";


const firebaseConfig = {
apiKey: "AIzaSyDHVqbe02BgbKj4UTJRrImuRO0AB3D6r5s",
authDomain: "student-management-6c41d.firebaseapp.com",
projectId: "student-management-6c41d",
storageBucket: "student-management-6c41d.firebasestorage.app",
messagingSenderId: "38450493030",
appId: "1:38450493030:web:5a29aa86fe9dc480e2dfa7"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function registerUser(event) {
    event.preventDefault();  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const userRole = document.getElementById('user-role').value;
    if (!email || !password || !username || !userRole) {
        alert('Please fill in all fields');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return database.ref('users/' + user.uid).set({
                username: username,
                email: email,
                role: userRole
            });
        })
        .then(() => {
            alert("User registered successfully");
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Error during registration:", error.message);
            alert("Error: " + error.message);
        });
}

function resetPassword() {
    const email = document.getElementById('reset-email').value;

    if (!email) {
        alert('Please enter your email');
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('Password reset email sent!');
        })
        .catch((error) => {
            console.error('Error sending password reset email:', error.message);
            alert(`Error: ${error.message}`);
        });
}

document.getElementById('register-form').addEventListener('submit', registerUser);

export { app, auth, database, registerUser, resetPassword };
