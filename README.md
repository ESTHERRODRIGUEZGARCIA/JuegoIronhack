# JuegoIronhack

Click [aquí](https://github.com/ESTHERRODRIGUEZGARCIA/JuegoIronhack.github.io.git) para ver el enlace del repositorio.

Trabajo hecho por:
1. [Esther Rodríguez García](https://github.com/ESTHERRODRIGUEZGARCIA)


El algoritmo comienza en una celda aleatoria y avanza en una dirección aleatoria hasta que no puede avanzar más. En ese punto, retrocede a la celda anterior y repite el proceso. Este proceso continúa hasta que todas las celdas han sido visitadas, creando así un laberinto conectado.

En el proceso, se van marcando las paredes entre celdas que ya han sido visitadas, creando así un conjunto de pasillos y paredes que forman el laberinto. Este método de generación garantiza un laberinto sin bucles y conectado.

Las teclas de flecha izquierda, arriba, derecha y abajo tienen códigos 37, 38, 39 y 40, respectivamente.

Según la tecla presionada, se verifica si la dirección correspondiente (norte, sur, este, oeste) está permitida (no hay una pared en esa dirección). Si es permitido, se actualiza la posición del jugador y se vuelve a dibujar en la nueva posición.
Antes de mover al jugador en una dirección específica, se verifica si el movimiento es válido. Esto se hace comprobando si hay una pared en la dirección correspondiente (cell.w, cell.n, cell.e, cell.s). Si el movimiento es válido, se actualiza la posición del jugador (cellCoords) y se vuelve a dibujar en la nueva posición.

Se utilizan varios eventos del DOM para gestionar la interactividad de la página web. Primero, se emplea el evento window.onload para ejecutar la función mensajeBienvenida una vez que todos los recursos de la página, como imágenes y estilos, han terminado de cargarse. Luego, el evento window.onresize se emplea para ajustar dinámicamente el tamaño del laberinto y redibujarlo cuando el usuario cambia el tamaño de la ventana del navegador.

Además, se utiliza el evento window.addEventListener("keydown", check, false) para detectar cuando el usuario presiona una tecla del teclado, permitiendo al jugador moverse por el laberinto. Asimismo, se implementa un evento de deslizamiento en dispositivos táctiles mediante $("#view").swipe({/* ... */}), que captura gestos de deslizamiento para facilitar la interacción en dispositivos móviles.

Estos eventos del DOM son fundamentales para crear una experiencia interactiva en la página web, ya que permiten responder a las acciones del usuario, como cargar contenido al inicio, ajustar la interfaz al cambiar el tamaño de la ventana, y facilitar la navegación mediante teclado y gestos táctiles.





