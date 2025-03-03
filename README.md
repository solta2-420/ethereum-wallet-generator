# Ethereum Wallet Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Node.js](https://img.shields.io/badge/Node.js-v16%2B-green)

El **Ethereum Wallet Generator** es una herramienta diseñada para generar direcciones Ethereum derivadas de semillas mnemotécnicas, buscar direcciones con saldo o transacciones en diferentes redes blockchain, y almacenar los resultados en una base de datos SQLite. Este proyecto utiliza estándares criptográficos como BIP-39 y BIP-44 para la generación de billeteras.


## Tabla de Contenidos

1. [Características](#características)
2. [Requisitos](#requisitos)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Scripts Disponibles](#scripts-disponibles)
6. [Base de Datos](#base-de-datos)
7. [Modo Multitarea](#modo-multitarea)
8. [Contribuciones](#contribuciones)
9. [Licencia](#licencia)

---

## Características

- **Generación de Direcciones Ethereum**: Deriva direcciones Ethereum según el estándar BIP-44.
- **Búsqueda de Saldos**: Verifica si las direcciones generadas tienen saldo o transacciones en redes como Ethereum Mainnet y Binance Smart Chain.
- **Almacenamiento en Base de Datos**: Guarda los resultados en una base de datos SQLite para consultas rápidas.
- **Generación de Semillas Mnemotécnicas**: Genera semillas mnemotécnicas aleatorias y deriva direcciones Ethereum.
- **Interfaz de Menú Interactivo**: Proporciona un menú interactivo para ejecutar diferentes funciones del proyecto.
- **Modo Multitarea**: Permite ejecutar múltiples instancias de búsqueda en paralelo para aprovechar el poder de la CPU.

---

## Requisitos

Para ejecutar este proyecto, necesitarás lo siguiente:

- **Node.js**: Versión 16 o superior. Puedes descargarlo desde [aquí](https://nodejs.org/).
- **npm**: Viene incluido con Node.js.
- **Conexión a Internet**: Necesaria para consultar saldos y transacciones usando RPCs.

---

## Instalación

1. Clona este repositorio en tu máquina local:
	  ```bash
		 git clone https://github.com/tu-usuario/ethereum-wallet-generator.git
		 cd ethereum-wallet-generator
   ```

2. Instala las dependencias necesarias:
	```bash
		npm install
	```

4. Verifica que las dependencias se hayan instalado correctamente:
	```bash
		npm list
	```

---

## Uso
### Iniciar el Programa
Ejecuta el programa principal para acceder al menú interactivo:
```bash
	npm start
```

> El menú te permitirá seleccionar entre las siguientes opciones:

```bash
Bienvenido al generador de billeteras Ethereum.
Selecciona una opción:
1. Buscar direcciones con saldo
2. Buscar direcciones con saldo (modo multitarea)
3. Generar semillas mnemotécnicas
4. Salir
```

**1. Buscar direcciones con saldo:**
   - Genera direcciones Ethereum derivadas de una semilla mnemotécnica.
   - Verifica si las direcciones tienen saldo o transacciones en redes como Ethereum Mainnet y Binance Smart Chain.
   - Almacena los resultados en la base de datos SQLite.

**2. Buscar direcciones con saldo (modo multitarea):**
   - Ejecuta múltiples instancias del script de búsqueda en paralelo.
   - Aprovecha el número de núcleos de tu CPU para acelerar la búsqueda.

**3. Generar semillas mnemotécnicas:**
   - Genera una semilla mnemotécnica aleatoria.
   - Deriva una dirección Ethereum y muestra la clave privada asociada.

**4. Salir del programa:**
   - Termina la ejecución del programa.

---

## Scripts Disponibles
Este proyecto incluye varios scripts que puedes ejecutar directamente usando npm. Aquí tienes una descripción de cada uno:

Comando                  | Descripción
-------------------------|------------------------------------------------------------
npm start               | Inicia el menú interactivo principal.
npm run search-simple   | Busca direcciones Ethereum con saldo o transacciones.
npm run gen-test        | Genera semillas mnemotécnicas y deriva direcciones Ethereum.

## Base de Datos
El proyecto utiliza una base de datos SQLite (wallets.db) para almacenar los resultados de las billeteras generadas. La estructura de la tabla es la siguiente:

Columna       | Tipo         | Descripción
--------------|--------------|---------------------------------------------------------
id           | INTEGER      | Identificador único de la billetera.
address      | TEXT         | Dirección Ethereum.
seed         | TEXT         | Semilla mnemotécnica utilizada.
private_key  | TEXT         | Clave privada asociada a la dirección.
path         | TEXT         | Ruta BIP-44 utilizada para derivar la dirección.
balance      | TEXT         | Saldo de la dirección (en wei).
tx_count     | INTEGER      | Número de transacciones realizadas.
has_balance  | BOOLEAN      | Indica si la dirección tiene saldo (0 = no, 1 = sí).

La base de datos se crea automáticamente la primera vez que ejecutas el programa.

## Modo Multitarea
La opción 1.2 del menú permite ejecutar múltiples instancias del script de búsqueda en paralelo. Esto es útil para aprovechar el poder de los núcleos de tu CPU y acelerar la búsqueda de direcciones con saldo.

### Cómo Funciona
1. Selecciona la opción 2 en el menú.
2. Ingresa el número de tareas paralelas que deseas ejecutar (por ejemplo, 4).
3. El programa iniciará tantas instancias del script ´search-simple.js´ como hayas especificado, distribuyendo el trabajo entre los núcleos de tu CPU.
4. Los resultados de cada tarea se mostrarán en la consola tan pronto como estén disponibles.

### Consideraciones
- **Uso de Recursos**: No sobrecargues tu sistema ejecutando demasiadas tareas en paralelo. Un buen punto de partida es usar un número de tareas igual al número de núcleos de tu CPU.
- **Resultados Concurrentes**: Las salidas de las tareas pueden mezclarse debido a la naturaleza asíncrona de las ejecuciones.

## Limitaciones

- **Probabilidad de Éxito**: Debido al vasto espacio de direcciones Ethereum (2^160), la probabilidad de encontrar una dirección con saldo es extremadamente baja.
- **Uso de Recursos**: Ejecutar múltiples tareas en paralelo puede consumir muchos recursos del sistema. Usa esta función con precaución.

## Ética y Legalidad

Este proyecto tiene fines educativos y de investigación. Buscar activamente direcciones con saldo o intentar acceder a fondos que no te pertenecen puede ser ilegal y poco ético. Asegúrate de usar este software de manera responsable y dentro de los límites legales.

### Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -m "Añade nueva funcionalidad").
4. Sube tus cambios (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request en GitHub.

### Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

#### Autor 
Desarrollado por Fg - User420@Solta2.
Si tienes preguntas o sugerencias, no dudes en contactarme:
📧 [user420@solta2.com]
🔗 [Tu Perfil de GitHub](https://github.com/solta2-420)