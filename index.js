const {
	default: makeWASocket,
	useMultiFileAuthState,
	DisconnectReason,
	makeCacheableSignalKeyStore,
	getContentType
} = require('@whiskeysockets/baileys');
const P = require('pino');
const { exec } = require('child_process');
const path = require('path');

const start = async() => {
	const level = P({ level: 'silent' })
	const {
		state,
		saveCreds
	} = await useMultiFileAuthState('session')
	
	const sock = makeWASocket({
		logger: level,
		browser: ['Kaori - v0.x', 'Firefox', '3.0.0'],
		printQRInTerminal: true,
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, level),
		}
	})
	
	sock.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
			if(connection === 'close') {
				if (lastDisconnect.error.output.statusCode !== 401) {
					start()
				} else {
					exec('rm -rf session')
					console.error('connection closed')
					start()
				}
			} else if(connection === 'open') {
			    sock.sendMessage('120363183824931603@g.us', { text: `[ ! ] Kaori ya está en línea 🚀
¡Puedes comenzar a enviar mensajes y utilizar los comandos!`, contextInfo:{remoteJid:'120363183824931603@g.us'}})
				console.log('opened connection')
			}
	})
	
	sock.ev.on('creds.update', saveCreds)
	
	sock.ev.on('group-participants.update', async (update) => {
	    const groupId = update.id
	    const participants = update.participants;
	    const action = update.action;
	    const metadata = await sock.groupMetadata(groupId);
	    const groupName = metadata.subject
	    const ing = "120363183824931603@g.us"
	    
	    if (groupId === ing) {
	        return;
	    }
	    for (const participant of participants) {
	        const user = participant.split('@')[0];
	        if (action === 'add') {
	            sock.sendMessage(groupId, {
	                text:`¡Bienvenido, *@${user}⁩*! 🌠

Kaori está emocionado por tenerte en *${groupName}.* Si quieres explorar los comandos de Kaori, usa *.menu* en cualquier momento. ¡Disfruta tu estancia! 🤖`,
	                contextInfo: {
	                    mentionedJid: [participant],
	                    remoteJid: [groupId],
	                    externalAdReply: {
	                        title: `${groupName}`,
	                        renderLargerThumbnail: true, 
	                        mediaType: 1,
	                        thumbnailUrl: 'https://telegra.ph/file/2071468c407a3c3e7f759.jpg',
	                    }
	                }
	            })
	        } /* else if (action === 'remove') {
	            sock.sendMessage(groupId, {
	                text:`¡Adiós, *@${user}⁩*! 🌠

Lamentamos ver tu partida del grupo ${groupName}. Siempre serás bienvenido/a de regreso si decides volver. ¡Hasta pronto y te deseamos lo mejor!`,
	                contextInfo: {
	                    mentionedJid: [participant],
	                    remoteJid: [groupId],
	                    externalAdReply: {
	                        title: `${groupName}`,
	                        renderLargerThumbnail: true, 
	                        mediaType: 1,
	                        thumbnailUrl: 'https://telegra.ph/file/2071468c407a3c3e7f759.jpg',
	                    }
	                }
	            })
	        } */
	    }
	});
	sock.ev.on('messages.upsert', messages => {
		messages = messages.messages[0]
		if (!messages) return
		
		messages.message = (getContentType(messages.message) === 'ephemeralMessage') ? messages.message.ephemeralMessage.message : messages.message
		if (messages.key && messages.key.remoteJid === 'status@broadcast') return
		
		require('./message/upsert')(sock, messages)
	})
}

start();