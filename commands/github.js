async function githubCommand(sock, chatId) {
    const repoInfo = `*🤖 OnyxBot MD*\n
*📂 GitHub Repository:*\nhttps://github.com/mruniquehacker/Onyxbot-MD\n
*📢 Official Channel:*\nhttps://youtube.com/@mr_unique_hacker\n
_Star ⭐ the repository if you like the bot!_`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363161513685998@newsletter',
                    newsletterName: 'OnyxBot MD',
                    serverMessageId: -1
                }
            }
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

module.exports = githubCommand; 
