module.exports = agent => {
    agent.messenger.on('egg-ready', () => {
        const data = { name: 'rich' };
        agent.messenger.sendToApp('rich', data);
    });

    agent.messenger.on('test', data => {
        console.log(data);
    });
};