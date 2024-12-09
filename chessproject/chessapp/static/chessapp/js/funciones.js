//Configuración de firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBdoDmZkjJewp_AtKv7m_ccJZQhoVrQBmA",
    authDomain: "chess-test-674f3.firebaseapp.com",
    projectId: "chess-test-674f3",
    storageBucket: "chess-test-674f3.firebasestorage.app",
    messagingSenderId: "1017550167101",
    appId: "1:1017550167101:web:046446663b4f0af591de54",
    measurementId: "G-981GEB574V"});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


    //Funcion para ingreso de usuario registrado
    function login() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Bienvenido: " + email);
            window.location.href = "/menu/"; // Redirige al menú
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
    }

    //Funcion para cerrar sesión en firebase
    function logout() {
        // Cerrar sesión en Firebase
        firebase.auth().signOut().then(() => {
            alert("Sesión cerrada con éxito.");
            window.location.href = "/"; // Redirige a la página de inicio
        }).catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
        });
    }
 //Funcion para registro en firebase
 function register() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (name === "") {
        alert("Por favor, ingrese su nombre");
        return;
    }

    var emailPattern = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }

    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
    if (!passwordPattern.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        alert("Usuario registrado con éxito: " + user.email);
        window.location.href = "/menu/";
    })
    .catch((error) => {
        var errorMessage = error.message;
        alert("Error: " + errorMessage);
    });
}


