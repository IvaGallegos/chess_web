// Tu configuración de Firebase
  // Obtener referencia a Firebase Storage
  const storage = firebase.storage();




// Función para subir el archivo PGN
document.addEventListener('DOMContentLoaded', function() {
    // Aquí va el código que maneja el evento de cambio en el input
    document.getElementById('pgnFileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];  // Obtiene el archivo seleccionado
        if (file) {
            console.log("Archivo seleccionado: ", file.name);
            console.log(file.name);

            // Crea una referencia en Firebase Storage donde almacenar el archivo
            const storageRef = storage.ref('pgnFiles/' + file.name);
            // Subir el archivo a Firebase Storage
            const uploadTask = storageRef.put(file);

            // Monitorear el progreso de la subida
            uploadTask.on('state_changed', 
                function(snapshot) {
                    // Progreso de la subida (opcional)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Subida: ' + progress + '%');
                }, 
                function(error) {
                    console.error("Error al subir el archivo:", error);
                }, 
                function() {
                    // Finalización de la subida
                    console.log('Archivo subido exitosamente a Firebase Storage.');

                    // Obtener la URL de descarga del archivo subido
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('Archivo disponible en:', downloadURL);
                    });
                }
            );
        } else {
            console.warn("No se seleccionó ningún archivo.");
        }
    });
});
