// Tu configuración de Firebase
// Asegúrate de que también esté inicializado Firestore
//const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
//const db = firebase.firestore();
//const auth = firebase.auth();

// Función para subir el archivo PGN
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log("Usuario autenticado: ", user.uid);

            // Manejar el evento de cambio en el input
            document.getElementById('pgnFileInput').addEventListener('change', function(event) {
                const file = event.target.files[0];  // Obtiene el archivo seleccionado
                if (file) {
                    console.log("Archivo seleccionado: ", file.name);

                    // Crea una referencia en Firebase Storage donde almacenar el archivo
                    const storageRef = storage.ref('pgnFiles/' + user.uid + '/' + file.name);

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

                                // Guardar la información del archivo en Firestore
                                db.collection('usuarios').doc(user.uid).collection('archivosPGN').add({
                                    nombreArchivo: file.name,
                                    urlArchivo: downloadURL,
                                    fechaSubida: firebase.firestore.FieldValue.serverTimestamp()
                                })
                                .then(function() {
                                    console.log('Información del archivo guardada en Firestore.');
                                })
                                .catch(function(error) {
                                    console.error('Error al guardar la información en Firestore:', error);
                                });
                            });
                        }
                    );
                } else {
                    console.warn("No se seleccionó ningún archivo.");
                }
            });
        } else {
            console.warn("Usuario no autenticado. Inicia sesión para subir archivos.");
        }
    });
});
