# JuegoIronhack

El algoritmo comienza en una celda aleatoria y avanza en una dirección aleatoria hasta que no puede avanzar más. En ese punto, retrocede a la celda anterior y repite el proceso. Este proceso continúa hasta que todas las celdas han sido visitadas, creando así un laberinto conectado.

En el proceso, se van marcando las paredes entre celdas que ya han sido visitadas, creando así un conjunto de pasillos y paredes que forman el laberinto. Este método de generación garantiza un laberinto sin bucles y conectado.

Las teclas de flecha izquierda, arriba, derecha y abajo tienen códigos 37, 38, 39 y 40, respectivamente.

Según la tecla presionada, se verifica si la dirección correspondiente (norte, sur, este, oeste) está permitida (no hay una pared en esa dirección). Si es permitido, se actualiza la posición del jugador y se vuelve a dibujar en la nueva posición.
Antes de mover al jugador en una dirección específica, se verifica si el movimiento es válido. Esto se hace comprobando si hay una pared en la dirección correspondiente (cell.w, cell.n, cell.e, cell.s). Si el movimiento es válido, se actualiza la posición del jugador (cellCoords) y se vuelve a dibujar en la nueva posición.
