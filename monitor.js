const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');

let lastModifiedTime;

function restartBot() {
    exec('pm2 restart bot', (error, stdout, stderr) => {
        if (error) {
            console.error('Error al reiniciar el bot:', error);
            return;
        }

        console.log('Bot reiniciado exitosamente:', stdout);
    });
}

function checkFileModification(filePath) {
    const stats = fs.statSync(filePath);
    const currentModifiedTime = stats.mtimeMs;

    if (lastModifiedTime && lastModifiedTime !== currentModifiedTime) {
        console.log('\x1b[33m%s\x1b[0m', `El archivo '${filePath}' ha sido modificado. ¿Desea actualizar el bot? (yes/no)`);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const timeout = setTimeout(() => {
            console.log('\x1b[32m%s\x1b[0m', 'No se recibió respuesta en 5 minutos. Se asumirá "yes".');
            process.stdin.emit('data', 'yes\n');
        }, 300000); // 5 minutos
;
        rl.once('line', (input) => {
            clearTimeout(timeout);
            const answer = input.trim().toLowerCase();
            if (answer === 'yes') {
                console.log('\x1b[32m%s\x1b[0m', 'Actualizando el bot...');
                restartBot();
            } else {
                console.log('\x1b[32m%s\x1b[0m', 'No se realizará ninguna actualización.');
            }
            rl.close();
        });
    }

    lastModifiedTime = currentModifiedTime;
}

module.expoets = checkFileModification