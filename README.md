# JuegoIronhack

Click [aquí](https://github.com/ESTHERRODRIGUEZGARCIA/JuegoIronhack.github.io.git) para ver el enlace del repositorio.

Trabajo hecho por:
1. [Esther Rodríguez García](https://github.com/ESTHERRODRIGUEZGARCIA)





El código proporciona una experiencia de juego dinámica al utilizar el algoritmo de Recursive Backtracking para generar laberintos únicos en cada partida. Se incorporan imágenes para representar al jugador y la meta, y se aplican ajustes de brillo para mejorar la estética visual del juego. El manejo de eventos del DOM es esencial: detecta las teclas presionadas para permitir que el jugador se mueva, y también implementa eventos de deslizamiento en dispositivos táctiles para una experiencia móvil fluida. El uso de Promesas asegura que las imágenes estén completamente cargadas antes de iniciar el juego, evitando problemas de carga asíncrona. La clase `DrawMaze` gestiona la representación gráfica del laberinto, y se presenta una lógica para ajustar dinámicamente el tamaño del laberinto al cambiar el tamaño de la ventana del navegador. Cuando el jugador alcanza la meta, se muestra un mensaje de felicitaciones y, tras un breve intervalo, se reinicia el juego con un nuevo laberinto. En términos de generación de laberintos, el algoritmo inicia en una celda aleatoria, avanzando en direcciones aleatorias y marcando las paredes entre celdas visitadas, asegurando así la creación de un laberinto sin bucles y conectado. El código demuestra un enfoque integral para una experiencia interactiva, adaptándose a diferentes dispositivos y proporcionando un juego cautivador con elementos visuales mejorados.





