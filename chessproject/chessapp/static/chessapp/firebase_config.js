
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore-compat.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth-compat.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage-compat.js";

//Configuración de firebase
    
           // Credenciales de  la aplicación de Firebase
           const firebaseConfig = {
            apiKey: "AIzaSyBdoDmZkjJewp_AtKv7m_ccJZQhoVrQBmA",
            authDomain: "chess-test-674f3.firebaseapp.com",
            projectId: "chess-test-674f3",
            storageBucket: "chess-test-674f3.firebasestorage.app",
            messagingSenderId: "1017550167101",
            appId: "1:1017550167101:web:046446663b4f0af591de54",
            measurementId: "G-981GEB574V"
          };
        // Inicializar la aplicación de Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const auth = firebase.auth();
    
    export { db, auth };