module.exports = {
    name: "private", // nombre del comando
    description: "habilita o deshabilita el uso de comandos en chat privado", // descripción del comando
    usage: ["!private on", "!private off"], // como se usa el comando 
    commands: ["private"], // comandos con las que se puede hacer el llamado
    category: 'owner', // define en que categoria o en que lista de comandos se encuentra
    isOwner: true, // solo para administradores
    require: ['status', 'axios'], // dependencias que requiere
    on: true, // si el comando esta habilitado o deshabilitado 
    
    async execute(sock, m, store) {
        sock.sendMessage(m.chat, { text: 'status' })
    }
}

/* 

module.exports = {
    name: "private", // nombre del comando
    description: "habilita o deshabilita el uso de comandos en chat privado", // descripción del comando
    usage: ["!private on", "!private off"], // como se usa el comando 
    commands: ["private"], // comandos con las que se puede hacer el llamado
    category: 'owner', // define en que categoria o en que lista de comandos se encuentra
    isDev: false, // comando para desarrolladores
    isPremium: false, // solo para usuarios premium 
    isGroup: false, // solo para grupo
    isOwner: true, // solo para administradores
    require: ['plugin/@gpt', 'axios'], // dependencias que requiere
    on: true, // si el comando esta habilitado o deshabilitado 
    
    async execute(sock, m, store) {
        sock.sendMessage(m.chat, { text: 'status' })
    }
}
*/