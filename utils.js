// Modification de la fonction generateSessionId
function generateSessionId(prefix = 'OnyxBot') {
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex');
    return `${prefix}-${random}-${timestamp}`;
}

// Modification du chemin temporaire
const getTempDir = () => {
    if (process.env.NODE_ENV === 'production') {
        const tempDir = '/tmp/onyxbot';
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        return tempDir;
    }
    return path.join(os.tmpdir(), 'onyxbot');
};