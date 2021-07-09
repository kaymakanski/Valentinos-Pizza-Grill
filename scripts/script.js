/*----- Toggle Menu for small media -----*/

let navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-200px";
}

//Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDxxhfdrUjl5flhB3uO7Ed-U8zNt5rm-Gk",
    authDomain: "valentinos-pizza-grill-abda8.firebaseapp.com",
    databaseURL: "https://valentinos-pizza-grill-abda8-default-rtdb.firebaseio.com",
    projectId: "valentinos-pizza-grill-abda8",
    storageBucket: "valentinos-pizza-grill-abda8.appspot.com",
    messagingSenderId: "83220441039",
    appId: "1:83220441039:web:32ee3d212995cb29c494ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Reference contactInfo collections
let contactInfo = firebase.database().ref("infos")


/*----- Contact Form -----*/

//Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    console.log(123);

    // Get input Values
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;
    console.log(name, email, message);

    saveContactInfo(name, email, message);

    document.querySelector(".contact-form").reset();
}

//Save infos to Firebase
function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message
    });
}





