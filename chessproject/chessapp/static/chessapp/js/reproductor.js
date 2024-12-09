
        // Reproductor
                // Crear el elemento de audio 
                let music;
        
                // Verificar si ya existe el reproductor de música
                if (!window.localStorage.getItem('musicInitialized')) {
                    music = document.createElement('audio');
                    music.id = 'background-music';
                    music.src = 'MusicaJugarAjedrez.mp3'; 
                    music.loop = true;
        
                    // Configurar volumen inicial y guardarlo
                    music.volume = localStorage.getItem('musicVolume') || 0.5;
                    localStorage.setItem('musicInitialized', true);
                    document.body.appendChild(music);
                } else {
                    // Recuperar el reproductor existente en otras vistas
                    music = document.getElementById('background-music');
                }
        
                // Controles del DOM
                const toggleButton = document.getElementById('toggle-music');
                const volumeControl = document.getElementById('volume-control');
        
                // Estado inicial del botón y volumen
                const isPlaying = localStorage.getItem('musicPlaying') === 'true';
                toggleButton.textContent = isPlaying ? "🎵 Detener Música" : "🎵 Iniciar Música";
                volumeControl.value = music.volume;
        
                // Restaurar reproducción
                if (isPlaying) {
                    music.play();
                }
        
                // Control de reproducción
                toggleButton.addEventListener('click', () => {
                    if (music.paused) {
                        music.play();
                        toggleButton.textContent = "🎵 Detener Música";
                        localStorage.setItem('musicPlaying', true);
                    } else {
                        music.pause();
                        toggleButton.textContent = "🎵 Iniciar Música";
                        localStorage.setItem('musicPlaying', false);
                    }
                });
        
                // Control de volumen
                volumeControl.addEventListener('input', (e) => {
                    music.volume = e.target.value;
                    localStorage.setItem('musicVolume', e.target.value);
                });
        
                // Evita duplicados al cambiar de página
                if (!document.body.contains(music)) {
                    document.body.appendChild(music);
                }
        
