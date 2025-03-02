const { bots } = require('../lib/antilink');
const { setAntilink, getAntilink, removeAntilink } = require('../sql');
const isAdmin = require('../helpers/isAdmin');

async function handleAntilinkCommand(sock, chatId, userMessage, senderId, isSenderAdmin) {
    try {
        if (!isSenderAdmin) {
            await sock.sendMessage(chatId, { text: '```For Group Admins Only!```' });
            return;
        }

        const prefix = '.';
        const args = userMessage.slice(9).toLowerCase().trim().split(' ');
        const action = args[0];

        if (!action) {
            const usage = `\`\`\`ANTILINK SETUP\n\n${prefix}antilink on\n${prefix}antilink set delete | kick | warn\n${prefix}antilink off\n\`\`\``;
            await sock.sendMessage(chatId, { text: usage });
            return;
        }

        switch (action) {
            case 'on':
                const existingConfig = await getAntilink(chatId, 'on');
                if (existingConfig?.enabled) {
                    await sock.sendMessage(chatId, { text: '*_Antilink is already on_*' });
                    return;
                }
                const result = await setAntilink(chatId, 'on', 'delete');
                await sock.sendMessage(chatId, { 
                    text: result ? '*_Antilink has been turned ON_*' : '*_Failed to turn on Antilink_*' 
                });
                break;

            case 'off':
                await removeAntilink(chatId, 'on');
                await sock.sendMessage(chatId, { text: '*_Antilink has been turned OFF_*' });
                break;

            case 'set':
                if (args.length < 2) {
                    await sock.sendMessage(chatId, { 
                        text: `*_Please specify an action: ${prefix}antilink set delete | kick | warn_*` 
                    });
                    return;
                }
                const setAction = args[1];
                if (!['delete', 'kick', 'warn'].includes(setAction)) {
                    await sock.sendMessage(chatId, { 
                        text: '*_Invalid action. Choose delete, kick, or warn._*' 
                    });
                    return;
                }
                const setResult = await setAntilink(chatId, 'on', setAction);
                await sock.sendMessage(chatId, { 
                    text: setResult ? `*_Antilink action set to ${setAction}_*` : '*_Failed to set Antilink action_*' 
                });
                break;

            case 'get':
                const status = await getAntilink(chatId, 'on');
                const actionConfig = await getAntilink(chatId, 'on');
                await sock.sendMessage(chatId, { 
                    text: `*_Antilink Configuration:_*\nStatus: ${status ? 'ON' : 'OFF'}\nAction: ${actionConfig ? actionConfig.action : 'Not set'}` 
                });
                break;

            default:
                await sock.sendMessage(chatId, { text: `*_Use ${prefix}antilink for usage._*` });
        }
    } catch (error) {
        console.error('Error in antilink command:', error);
        await sock.sendMessage