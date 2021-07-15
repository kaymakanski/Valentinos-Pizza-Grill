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
let contactInfo = firebase.database().ref("infos");
let commentInfo = firebase.database().ref("comments");

/*----- Contact Form -----*/

//Listen for a submit

let element1 = document.querySelector(".contact-form");
let element2 = document.querySelector(".submit-comment");
if (element1) {
    element1.addEventListener("submit", submitEmailForm);
}

if (element2) {
    element2.addEventListener("submit", submitCommentForm);
}

function submitEmailForm(e) {
    e.preventDefault();

    // Get input Values
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;

    saveContactInfo(name, email, message);

    document.querySelector(".contact-form").reset();

    sendEmail(name, email, message);
}

function submitCommentForm(e) {
    e.preventDefault();

    let name = document.querySelector(".commentName").value;
    let email = document.querySelector(".commentEmail").value;
    let comment = document.querySelector(".userComment").value;

    saveCommentInfo(name, email, comment);

    document.querySelector(".submit-comment").reset();

    retrieveLastCommentData();
}

//Save data to Firebase
function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message
    });

}

function saveCommentInfo(name, email, comment) {
    let newCommentInfo = commentInfo.push();

    newCommentInfo.set({
        name: name,
        email: email,
        comment: comment
    });
}

//Retrive the comments data from Firebase
function retrieveCommentsData() {
    let ref = firebase.database().ref("comments");
    ref.on("value", gotData);
}

function gotData(data) {

    let allComments = document.getElementsByClassName(".displayComment");
    for (let i = 0; i < allComments.length; i++) {
        allComments[i].remove();
    }

    let info = data.val();
    let keys = Object.keys(info);

    for (let i = 0; i < keys.length; i++) {
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let comment = info[infoData].comment;
        // console.log(name, email, comment);
        let infoResults = document.querySelector(".displayComment");

        infoResults.innerHTML +=
            `<div class="row">
            <div class="displayComment-col">
                <div>
                     <p>${comment}<p>
                     <h3>${name}</h3>
                     <h5>${email}</h5>
                </div>
            </div>
        </div>`;
    }
}

function retrieveLastCommentData() {
    let ref = firebase.database().ref("comments");
    ref.on("value", lastCommentData);
}

function lastCommentData(data) {

    let info = data.val();
    let keys = Object.keys(info);
    let infoData = keys[keys.length - 1];

    let name = info[infoData].name;
    let email = info[infoData].email;
    let comment = info[infoData].comment;

    let infoResults = document.querySelector(".displayComment");

    infoResults.innerHTML =
        `<div class="row">
            <div class="displayComment-col">
                <div>
                     <p>${comment}<p>
                     <h3>${name}</h3>
                     <h5>${email}</h5>
                </div>
            </div>
        </div>`;
}

//Send email info
function sendEmail(name, email, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'valentinos.pizza.grill@gmail.com',
        Password: "mhdxymkbtxawxjdm",
        To: 'valentinos.pizza.grill@gmail.com',
        From: `${email}`,
        Subject: `${name} sent a message`,
        Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`
    }).then((message) => alert("Email sent successfully!"));
}