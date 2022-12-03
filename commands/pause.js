module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento.!`)
        if (queue.paused) {
            queue.resume()
            return message.channel.send('Reanudé la canción para ti:)')
        }
        queue.pause()
        message.channel.send('Pausé la canción para ti :)')
    }
}