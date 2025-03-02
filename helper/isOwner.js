const settings = require('../settings');

function isOwner(senderId) {
    const ownerJid = "22587400838@s.whatsapp.net";
    return senderId === ownerJid;
}

module.exports = isOwner;