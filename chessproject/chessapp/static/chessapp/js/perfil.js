
    // Esperar a que el DOM esté completamente cargado antes de ejecutar el script
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar el estado de autenticación del usuario
        auth.onAuthStateChanged(function(user) {
            if (user) {
                // Mostrar en la consola el correo y UID del usuario autenticado
                console.log("Cargando archivos para el mail:", user.email);
                console.log("Cargando archivos para el uid:", user.uid);
                
                const userId = user.uid;
                const userEmail = user.email;
                    // Mostrar el correo del usuario en la página
                    document.getElementById('userEmail').textContent = userEmail;

                // Mostrar la fecha de registro del usuario en formato legible
                const creationTime = user.metadata.creationTime;
                    document.getElementById('registrationDate').textContent = new Date(creationTime).toLocaleDateString();

                // Manejar el evento de envío del formulario para guardar el nombre de usuario en Firestore
                document.getElementById('usernameForm').addEventListener('submit', function(event) {
                        event.preventDefault(); // Prevenir la recarga de la página
                        const username = document.getElementById('usernameInput').value;

                        // Guardar o actualizar el nombre de usuario en la colección 'usuarios'
                        db.collection('usuarios').doc(userId).set({ nombreUsuario: username }, { merge: true })
                            .then(function() {
                                alert('Nombre de usuario actualizado exitosamente.');
                            })
                            .catch(function(error) {
                                // Mostrar errores en la consola
                                console.error('Error al actualizar el nombre de usuario:', error);
                            });
                    });

                // Obtener y mostrar el nombre de usuario desde Firestore
                db.collection('usuarios').doc(userId).get().then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        // Mostrar el nombre de usuario en la página o un mensaje predeterminado
                        document.getElementById('displayName').textContent = userData.nombreUsuario || 'Sin nombre de usuario';
                    } else {
                        console.log('No se encontró el documento de usuario');
                    }
                }).catch((error) => {
                    // Manejar errores al obtener el documento
                    console.error('Error al obtener el nombre de usuario:', error);
                });

                // Obtener y mostrar la cantidad de partidas guardadas del usuario
                db.collection('usuarios').doc(userId).collection('archivosPGN').get()
                        .then(function(querySnapshot) {
                            // Mostrar la cantidad total de partidas
                            document.getElementById('totalGames').textContent = querySnapshot.size;
                            // Mostrar los detalles de la última partida jugada si existen
                            if (!querySnapshot.empty) {
                                const lastDoc = querySnapshot.docs[querySnapshot.size - 1];
                                const lastGameData = lastDoc.data();
                                document.getElementById('lastGame').textContent = lastGameData.nombreArchivo + ' (' + lastGameData.resultado + ')';
                            } else {
                                // Mensaje en caso de que no haya partidas guardadas
                                document.getElementById('lastGame').textContent = 'No se han jugado partidas aún.';
                            }
                        });


                // Obtener y mostrar los archivos de partidas guardadas en un contenedor
                db.collection('usuarios').doc(user.uid).collection('archivosPGN').get()
                    .then(function(querySnapshot) {
                        const container = document.getElementById('misPartidasContainer');
                        container.innerHTML = ''; // Limpiar el contenido previo

                        if (querySnapshot.empty) {
                            // Mensaje cuando no se encuentran archivos
                            container.innerHTML = '<tr><td colspan="4">No se encontraron archivos.</td></tr>';
                        } else {
                            // Iterar sobre cada documento y mostrar sus datos
                            querySnapshot.forEach(function(doc) {
                                const data = doc.data();
                                const fileName = data.nombreArchivo;
                                const fileURL = data.urlArchivo;
                                const resultadoGuardado = data.resultado || 'Sin definir';
                                // Continuar con la lógica de renderizado de las partidas...

                                // Obtener la referencia al archivo en el Storage
                                const storageRef = firebase.storage().ref('pgnFiles/' + user.uid + '/' + fileName);
                                storageRef.getMetadata().then(function(metadata) {
                                    const lastModified = new Date(metadata.updated).toLocaleString();

                                    // Crear una fila de tabla para cada archivo
                                    const row = document.createElement('tr');

                                    // Columna de enlace de descarga
                                    const linkCell = document.createElement('td');
                                    const link = document.createElement('a');
                                    link.href = fileURL;
                                    link.textContent = "Descargar";
                                    link.className = 'btn btn-primary';
                                    link.setAttribute('download', fileName);
                                    linkCell.appendChild(link);
                                    row.appendChild(linkCell);

                                    // Columna de nombre del archivo
                                    const nameCell = document.createElement('td');
                                    nameCell.textContent = fileName;
                                    row.appendChild(nameCell);

                                    

                                    // Columna de fecha de modificación
                                    const dateCell = document.createElement('td');
                                    dateCell.textContent = lastModified;
                                    row.appendChild(dateCell);

                                    // Columna de resultado
                                    const resultCell = document.createElement('td');
                                    const select = document.createElement('select');
                                    select.className = 'form-control';
                                    const options = ['Victoria', 'Derrota', 'Sin definir'];

                                    options.forEach(option => {
                                        const opt = document.createElement('option');
                                        opt.value = option;
                                        opt.textContent = option;
                                        if (option === resultadoGuardado) {
                                            opt.selected = true;
                                        }
                                        select.appendChild(opt);
                                    });

                                    // Guardar el resultado seleccionado en la base de datos
                                    select.addEventListener('change', function() {
                                        const nuevoResultado = select.value;
                                        db.collection('usuarios').doc(user.uid).collection('archivosPGN').doc(doc.id).update({
                                            resultado: nuevoResultado
                                        }).then(() => {
                                            console.log('Resultado actualizado a:', nuevoResultado);
                                        }).catch(error => {
                                            console.error('Error al actualizar el resultado:', error);
                                        });
                                    });

                                    resultCell.appendChild(select);
                                    row.appendChild(resultCell);

                                    // Añadir la fila a la tabla
                                    container.appendChild(row);
                                }).catch(function(error) {
                                    console.error("Error al obtener los metadatos del archivo:", error);
                                });
                            });
                        }
                    })
                    .catch(function(error) {
                        console.error("Error al cargar los archivos:", error);
                    });
            } else {
                console.warn("Usuario no autenticado. Inicia sesión para ver tus archivos.");
            }
        });
    });
