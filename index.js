const {
	default: makeWASocket,
	useMultiFileAuthState,
	DisconnectReason,
	makeCacheableSignalKeyStore,
	getContentType
} = require('@whiskeysockets/baileys');
const P = require('pino');
const { exec } = require('child_process');
const express = require('express');
const app = express();
const path = require('path');

const start = async () => {
	const logger = P({ level: 'silent' }); // Ajusta el nivel de registro según sea necesario
	try {
		const { state, saveCreds } = await useMultiFileAuthState('session');

		const sock = makeWASocket({
			logger,
			browser: ['Kaori - v0.x', 'Firefox', '3.0.0'],
			printQRInTerminal: true,
			auth: {
				creds: state.creds,
				keys: makeCacheableSignalKeyStore(state.keys, logger),
			}
		});

		sock.ev.on('connection.update', (update) => {
			const { connection, lastDisconnect } = update;
			if (connection === 'close') {
				if (lastDisconnect.error.output.statusCode !== 401) {
					start();
				} else {
					exec('rm -rf session', (err) => {
						if (err) {
							logger.error('Error eliminando sesión:', err);
						} else {
							logger.info('Sesión eliminada');
							start();
						}
					});
				}
			} else if (connection === 'open') {
				logger.info('Conexión abierta');
			}
		});

		sock.ev.on('creds.update', saveCreds);
		
        sock.ev.on('group-participants.update', async (update) => {
            const groupId = update.id
            const participants = update.participants;
            const action = update.action;
            const author = update.author
            console.log(author)
            const metadata = await sock.groupMetadata(groupId);
            const groupName = metadata.subject
        
            for (const participant of participants) {
                const user = participant.split('@')[0];
                if (action === 'add') {
                    sock.sendMessage(groupId, {
                        text:`¡Bienvenido, *@${user}⁩*! 🌠

Kaori está emocionado por tenerte en *${groupName}*. Si quieres explorar los comandos de Kaori, usa *.menu* en cualquier momento. ¡Disfruta tu estancia! 🤖`,
                        contextInfo: {
                            mentionedJid: [participant],
                            remoteJid: [groupId],
                            externalAdReply: {
                                title: `${groupName} • ${author ? author : 'Kaori'}`,
                                thumbnailUrl: 'https://telegra.ph/file/8615e70dd92328db2395b.mp4'
                            }
                        }
                    })
        
                } else if (action === 'remove') {
                    sock.sendMessage(groupId, {
                        text:`¡Adiós, *@${user}⁩*! 🌠

Lamentamos ver tu partida del grupo ${groupName}. Siempre serás bienvenido/a de regreso si decides volver. ¡Hasta pronto y te deseamos lo mejor!`,
                        contextInfo: {
                            mentionedJid: [participant],
                            remoteJid: [groupId],
                            externalAdReply: {
                                title: `${groupName} ${author ? author : 'Kaori'}`,
                                thumbnailUrl: 'https://telegra.ph/file/8615e70dd92328db2395b.mp4'
                            }
                        }
                    })
                }
            }
        });


		sock.ev.on('messages.upsert', messages => {
			messages = messages.messages[0];
			if (!messages) return;

			messages.message = (getContentType(messages.message) === 'ephemeralMessage') ? messages.message.ephemeralMessage.message : messages.message;
			if (messages.key && messages.key.remoteJid === 'status@broadcast') return;

			require('./message/upsert')(sock, messages);
		});
	} catch (error) {
		logger.error('Error en la función start:', error);
	}
};

app.use(express.static(path.join(__dirname, 'others')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'others', 'index.html'));
});

app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'others', '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
	start();
});
