import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database"; // Importa lo necesario de Realtime Database

//Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2_bx_Cik5pDrL5GhS5mSUMve13BLtqV0",
    authDomain: "chess-8911b.firebaseapp.com",
    projectId: "chess-8911b",
    storageBucket: "chess-8911b.appspot.com",
    messagingSenderId: "928989868620",
    appId: "1:928989868620:web:07ff1cc1c2ff08e382fae9",
    measurementId: "G-3LHBN4WTVE",
    databaseURL: "https://chess-8911b-default-rtdb.firebaseio.com" // URL de Realtime Database
};

const app = initializeApp(firebaseConfig); // Inicializa Firebase
const storage = getStorage(app); // Inicializa Cloud Storage
const auth = getAuth(app); // Inicializa la autenticación
const database = getDatabase(app); // Inicializa Realtime Database



// Función para cambiar el tamaño de fuente
function cambiarTamanoFuente(accion) {
    const cuerpo = document.body;
    let tamanoActual = parseFloat(window.getComputedStyle(cuerpo).fontSize);

    if (accion === 'aumentar') {
        cuerpo.style.fontSize = (tamanoActual + 2) + 'px';
    } else if (accion === 'disminuir') {
        cuerpo.style.fontSize = (tamanoActual - 2) + 'px';
    }

    // Guarda el nuevo tamaño de fuente en la base de datos
    guardarTamanoFuenteEnDatabase(cuerpo.style.fontSize);
}


// Función para guardar el tamaño de fuente en Realtime Database
async function guardarTamanoFuenteEnDatabase(tamanoFuente) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid; // El ID del usuario actual
            
            // Guardar el tamaño de fuente en Realtime Database
            set(ref(database, 'https://chess-8911b-default-rtdb.firebaseio.com/' + userId), {
                tamanoFuente: tamanoFuente
            })
            .then(() => {
                console.log("Configuración de tamaño de fuente guardada correctamente en Realtime Database.");
            })
            .catch((error) => {
                console.error("Error al guardar la configuración: ", error);
            });
        } else {
            console.error("No hay un usuario autenticado.");
        }
    });
}