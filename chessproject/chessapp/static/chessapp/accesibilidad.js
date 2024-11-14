   
    
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
        
// Constantes de la colección
const USERS_COLLECTION = 'configuraciones';
const ZOOM_FIELD = 'zoomLevel';
const LAST_UPDATED_FIELD = 'ultimaActualizacion';
  
// Función auxiliar para obtener una referencia a un documento de usuario
function getUserDocRef(userId) {
    return db.collection(USERS_COLLECTION).doc(userId);
}

// Función para guardar el zoom en Firestore
async function guardarZoomEnFirestore(zoomLevel) {
    const user = auth.currentUser;
    if (!user) {
        
    }

    try {
        // Validación del zoom
        const minZoom = 0.5;
        const maxZoom = 2;
        zoomLevel = Math.max(minZoom, Math.min(maxZoom, zoomLevel));

        // Obtener una referencia al documento 
        const userDocRef = getUserDocRef(user.uid);

        // Crear un objeto con los datos a actualizar
        const data = {
            [ZOOM_FIELD]: zoomLevel,
            [LAST_UPDATED_FIELD]: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Actualizar o crear el documento
        await userDocRef.set(data, { merge: true });
    } catch (error) { 
        alert("Ocurrió un error al guardar tus preferencias de zoom. Por favor, inténtalo de nuevo más tarde.");
    }
}

// Función para cambiar el tamaño de zoom
function cambiarTamanoZoom(accion, incremento = 0.1) {
    const cuerpo = document.body;
    let zoomActual = parseFloat(window.getComputedStyle(cuerpo).getPropertyValue('zoom')) || 1;

    if (accion === 'aumentar') {
        zoomActual += incremento;
    } else if (accion === 'disminuir') {
        zoomActual -= incremento;
    }

    cuerpo.style.zoom = zoomActual; // Aplica el nuevo zoom
    guardarZoomEnFirestore(zoomActual); // Guarda el nuevo nivel de zoom en Firestore
    
}

// Función para cargar el zoom guardado en Firestore
async function cargarZoomDesdeFirestore() {
    const user = auth.currentUser;
    if (!user) {
        return;
    }

    try {
        // Obtener una referencia al documento del usuario
        const userDocRef = getUserDocRef(user.uid);
        
        // Obtener el documento del usuario desde Firestore
        const docSnap = await userDocRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            if (data && data[ZOOM_FIELD]) {
                const zoomLevel = data[ZOOM_FIELD];
                // Aplicar el nivel de zoom guardado al cuerpo de la página
                document.body.style.zoom = zoomLevel;
                
            } 
        } 
    } catch (error) {
        console.error("Error al cargar el zoom:", error.message);
    }
}

// Llama a la función para cargar el zoom desde Firestore al iniciar
cargarZoomDesdeFirestore();

// Llama a esta función después de que el usuario inicie sesión
auth.onAuthStateChanged((user) => {
    if (user) {
        // Cargar el zoom guardado al iniciar sesión
        cargarZoomDesdeFirestore();
    }
});



// Función para ocultar el menu de zoom del contenido y modo oscuro

 function toggleAccesibilidad() {
    const accesibilidad = document.getElementById('accesibilidadOptions');
    if (accesibilidad.style.visibility === 'hidden') {
        accesibilidad.style.visibility = 'visible'; // Mostrar
    } else {
        accesibilidad.style.visibility = 'hidden'; // Ocultar
    }
}


// Función para activar/desactivar el alto contraste
function toggleAltoContraste() {
    const html = document.documentElement; 
    const estado = html.classList.toggle("modo-gris"); 
    guardarModoAltoContrasteEnFirestore(estado); // Guarda el estado en Firestore
}

 // Función para guardar el estado del alto contraste en Firestore
 async function guardarModoAltoContrasteEnFirestore(estado) {
    const user = auth.currentUser;
    if (!user) {
        alert("Debes iniciar sesión para guardar tus preferencias de alto contraste.");
        return;
    }

    try {
        const userDocRef = getUserDocRef(user.uid);
        const data = {
            altoContraste: estado, // Guarda el estado en Firestore
            ultimaActualizacion: firebase.firestore.FieldValue.serverTimestamp()
        };

        await userDocRef.set(data, { merge: true });
        
    } catch (error) {
        alert("Ocurrió un error al guardar tus preferencias de alto contraste. Por favor, inténtalo de nuevo más tarde.");
    }
}


// Función para cargar el estado de alto contraste desde Firestore
async function cargarModoAltoContrasteDesdeFirestore() {
    const user = auth.currentUser;
    if (!user) {
        console.log("No hay usuario autenticado.");
        return;
    }

    try {
        const userDocRef = getUserDocRef(user.uid);
        const doc = await userDocRef.get();

        if (doc.exists) {
            const data = doc.data();
            const altoContraste = data.altoContraste; // Carga el estado de alto contraste

            // Verifica que el estado de alto contraste sea booleano antes de aplicar
            if (typeof altoContraste === 'boolean') {
                if (altoContraste) {
                    document.documentElement.classList.add("modo-gris"); // Aplica el modo alto contraste
                    
                } else {
                    document.documentElement.classList.remove("modo-gris");
                    
                }
            } 
        } 
    } catch (error) {
        
    }
}

// Llama a la función para cargar el modo alto contraste desde Firestore cuando el usuario se autentique
auth.onAuthStateChanged((user) => {
    if (user) {
        // El usuario está autenticado, cargar preferencias
        cargarModoAltoContrasteDesdeFirestore();
    } else {
        console.log("No hay usuario autenticado.");
    }
});


 function toggleFormulario() {
    const form = document.getElementById("chessConfigForm");
    // Cambia entre mostrar y ocultar
    form.style.display = form.style.display === "none" ? "block" : "none";
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

// Funcion Valor original del zoom 
const zoomOriginal = 1;  // 1 representa el zoom original (100%)

function restablecerZoom() {
    const cuerpo = document.body;
    cuerpo.style.zoom = zoomOriginal;  // Restablece el zoom al valor original
    guardarZoomEnFirestore(zoomOriginal);  // Guarda el valor original en Firestore
}

