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



<form name="chessCtrl1" onsubmit="return(false);">


<p style="text-align:center;">[&nbsp;<input id="useAIAsk" name="useAI" type="checkbox" onclick="chess.useAI(this.checked);" checked /> <label for="useAIAsk">Jugar contra la máquina</label> | Promocionar a: <select onchange="chess.setPromotion(this.selectedIndex);" name="selPromo"><option>Dama</option><option>Torre</option><option>Alfil</option><option>Caballo</option></select> | <input type="button" name="strtBtn" value="Nueva Partida" onclick="chess.organize(this.form.plyerClr1[1].checked);" /> (Humano: <input type="radio" name="plyerClr1" id="white1" checked /> <label for="white1">Blancas</label> <input type="radio" name="plyerClr1" id="black1" /> <label for="black1">Negras</label>) | Nivel de juego de la maquina (presiona denuevo para guardar configuracion): <input type="text" name="plyDepthCtrl" value="0" size="2" onkeypress=";if(event.keyCode===13&&chess.setPlyDepth(this.value)){alert('Ply depth setted.' + (Number(this.value) > 2 ? '\nAttention! The game could be very slow.' : ' Good game :)'));}" />&nbsp;]</p>

<div id="chessToolBar"><div id="setViewBtns"><span id="viewBtn2" onclick="chess.setView(2);pressVwBtn(2);" onmousedown="return(false);">3D view</span><span id="viewBtn1" onclick="chess.setView(1);pressVwBtn(1);" onmousedown="return(false);">2D view</span><span id="viewBtn3" onclick="chess.setView(3);pressVwBtn(3);" onmousedown="return(false);">Both</span></div>
<img class="tbBtn" src="{% static 'chessapp/icons/skip-backward.png' %}" title="" onclick="chess.backToStart();" />
<img class="tbBtn" src="{% static 'chessapp/icons/backward.png' %}" title="" onclick="chess.navigate(-10, true);" />
<img class="tbBtn" src="{% static 'chessapp/icons/reverse-play.png' %}" title="" onclick="chess.navigate(-1, true);" />
<img class="tbBtn" src="{% static 'chessapp/icons/stop.png' %}" title="" onclick="chess.stopMotion();" />
<img class="tbBtn" src="{% static 'chessapp/icons/play.png' %}" title="" onclick="chess.navigate(1, true);" />
<img class="tbBtn" src="{% static 'chessapp/icons/forward.png' %}" title="" onclick="chess.navigate(10, true);" />
<img class="tbBtn" src="{% static 'chessapp/icons/skip-forward.png' %}" title="" onclick="chess.returnToEnd();" />
<img class="tbBtn" src="{% static 'chessapp/icons/go-previous.png' %}" title="" onclick="chess.navigate(-1);" />
<img class="tbBtn" src="{% static 'chessapp/icons/go-next.png' %}" title="" onclick="chess.navigate(1);" />
<img class="tbBtn" src="{% static 'chessapp/icons/help-hint.png' %}" title="" onclick="chess.help();" />
</div>
</form>