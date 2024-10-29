
// Función para cambiar el tamaño de fuente y el zoom del contenido
function cambiarTamanoZoom(accion) {
    const cuerpo = document.body;
    let zoomActual = parseFloat(window.getComputedStyle(cuerpo).getPropertyValue('zoom')) || 1; 

    // Ajusta el zoom global de todo el cuerpo
    if (accion === 'aumentar') {
        cuerpo.style.zoom = (zoomActual + 0.1);  // Aumenta el zoom en 10%
    } else if (accion === 'disminuir') {
        cuerpo.style.zoom = (zoomActual - 0.1);  // Disminuye el zoom en 10%
    }
}

// Función para ocultar el menu de tamaño de fuente y el zoom del contenido

function toggleAccesibilidad() {
    const accesibilidad = document.getElementById('accesibilidadOptions');
    if (accesibilidad.style.visibility === 'hidden') {
        accesibilidad.style.visibility = 'visible'; // Mostrar
    } else {
        accesibilidad.style.visibility = 'hidden'; // Ocultar
    }
}

    