const { exec } = require("child_process");
const os = require("os");

console.log("Bienvenido al generador de billeteras Ethereum.");
console.log("Selecciona una opción:");
console.log("1. Buscar direcciones con saldo");
console.log("2. Buscar direcciones con saldo (modo multitarea)");
console.log("3. Generar semillas mnemotécnicas");
console.log("4. Salir");

// Función para mostrar el menú y manejar la selección del usuario
function showMenu() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Ingresa el número de la opción deseada: ", (option) => {
    switch (option) {
      case "1":
        console.log("\nIniciando búsqueda de direcciones con saldo...\n");
        exec("npm run search-simple", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el script: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Errores durante la ejecución: ${stderr}`);
            return;
          }
          console.log(stdout);
          showMenu(); // Vuelve al menú después de ejecutar el script
        });
        break;

      case "2":
        console.log("\nIniciando búsqueda de direcciones con saldo (modo multitarea)...");
        const numCPUs = os.cpus().length; // Número de núcleos de la CPU
        readline.question(
          `Número de tareas paralelas (máximo ${numCPUs}): `,
          (numTasks) => {
            numTasks = parseInt(numTasks, 10);
            if (isNaN(numTasks) || numTasks < 1 || numTasks > numCPUs) {
              console.log(`\nNúmero inválido. Usando el máximo (${numCPUs})...\n`);
              numTasks = numCPUs;
            }

            console.log(`\nIniciando ${numTasks} tareas paralelas...\n`);
            for (let i = 0; i < numTasks; i++) {
              exec("npm run search-simple", (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error en tarea #${i + 1}: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.error(`Errores en tarea #${i + 1}: ${stderr}`);
                  return;
                }
                console.log(`Resultado de tarea #${i + 1}:\n${stdout}`);
              });
            }
            readline.close();
            showMenu(); // Vuelve al menú después de iniciar las tareas
          }
        );
        break;

      case "3":
        console.log("\nGenerando semillas mnemotécnicas...\n");
        exec("npm run gen-test", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el script: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Errores durante la ejecución: ${stderr}`);
            return;
          }
          console.log(stdout);
          showMenu(); // Vuelve al menú después de ejecutar el script
        });
        break;

      case "4":
        console.log("\nSaliendo del programa...");
        readline.close();
        break;

      default:
        console.log("\nOpción inválida. Por favor, selecciona una opción válida.\n");
        readline.close();
        showMenu(); // Vuelve al menú si la opción no es válida
        break;
    }
  });
}

// Iniciar el menú
showMenu();