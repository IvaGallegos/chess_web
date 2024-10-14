import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

//Configuración de firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB2_bx_Cik5pDrL5GhS5mSUMve13BLtqV0",
    authDomain: "chess-8911b.firebaseapp.com",
    projectId: "chess-8911b",
    storageBucket: "chess-8911b.appspot.com",
    messagingSenderId: "928989868620",
    appId: "1:928989868620:web:07ff1cc1c2ff08e382fae9",
    measurementId: "G-3LHBN4WTVE"});


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app); // Inicializa Firestore
    const storage = getStorage(app); // Inicializa Cloud Storage


//Funcion para cambiar el tamaño de fuente
export function cambiarTamanoFuente(accion) {
    const cuerpo = document.body;
    let tamanoActual = parseFloat(window.getComputedStyle(cuerpo).fontSize);
    
    if (accion === 'aumentar') {
        cuerpo.style.fontSize = (tamanoActual + 2) + 'px';
    } else if (accion === 'disminuir') {
        cuerpo.style.fontSize = (tamanoActual - 2) + 'px';
    }
}
 // Obtener el usuario autenticado
 firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid; // El ID del usuario actual
        
        // Guardar el tamaño de fuente en Firestore
        db.collection("configuraciones").doc(userId).set({
            tamanoFuente: cuerpo.style.fontSize
        }, { merge: true })
        .then(() => {
            console.log("Configuración de tamaño de fuente guardada correctamente.");
        })
        .catch((error) => {
            console.error("Error al guardar la configuración: ", error);
        });
    } else {
        console.error("No hay un usuario autenticado.");
    }
});
