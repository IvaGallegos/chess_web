// Función para cargar el zoom desde Firestore
async function cargarZoomDesdeFirestore() {
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
            const zoomFirestore = data[ZOOM_FIELD]; // Cambiar a 'zoomLevel'
            if (zoomFirestore) {
                document.body.style.zoom = zoomFirestore; // Aplica el zoom desde Firestore
                localStorage.setItem('zoom', zoomFirestore); // También lo guardamos en localStorage
                console.log("Zoom aplicado desde Firestore:", zoomFirestore);
            } else {
                console.log("No se encontró el valor de zoom en Firestore.");
            }
        } else {
            console.log("Documento del usuario no encontrado en Firestore.");
        }
    } catch (error) {
        console.error("Error al cargar el zoom desde Firestore:", error);
    }
}

// Llama a la función para cargar el zoom desde Firestore al iniciar
cargarZoomDesdeFirestore();

