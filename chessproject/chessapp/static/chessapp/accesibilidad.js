// Al cargar la página, restablecer las preferencias
window.onload = function() {
    const userId = "user_id"; // Cambia esto por el ID del usuario actual
    db.collection("configuraciones").doc(userId).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data.tamanoFuente) {
                document.body.style.fontSize = data.tamanoFuente;
            }

            if (data.colorTema) {
                if (data.colorTema === 'oscuro') {
                    cambiarColorTema(); // Cambia el tema a oscuro
                }
            }
        }
    });
};

function cambiarTamanoFuente(accion) {
    const cuerpo = document.body;
    let tamanoActual = parseFloat(window.getComputedStyle(cuerpo).fontSize);
    
    if (accion === 'aumentar') {
        cuerpo.style.fontSize = (tamanoActual + 2) + 'px';
    } else if (accion === 'disminuir') {
        cuerpo.style.fontSize = (tamanoActual - 2) + 'px';
    }

    // Guardar el tamaño de fuente en Firestore
    const userId = "user_id"; // Cambia esto por el ID del usuario actual
    db.collection("configuraciones").doc(userId).set({
        tamanoFuente: cuerpo.style.fontSize
    }, { merge: true });
}

function cambiarColorTema() {
    const cuerpo = document.body;
    if (cuerpo.style.backgroundColor === 'black') {
        cuerpo.style.backgroundColor = 'white';
        cuerpo.style.color = 'black';

        // Guardar la preferencia de color claro en Firestore
        const userId = "user_id"; // Cambia esto por el ID del usuario actual
        db.collection("configuraciones").doc(userId).set({
            colorTema: 'claro'
        }, { merge: true });
    } else {
        cuerpo.style.backgroundColor = 'black';
        cuerpo.style.color = 'white';

        // Guardar la preferencia de color oscuro en Firestore
        const userId = "user_id"; // Cambia esto por el ID del usuario actual
        db.collection("configuraciones").doc(userId).set({
            colorTema: 'oscuro'
        }, { merge: true });
    }
}