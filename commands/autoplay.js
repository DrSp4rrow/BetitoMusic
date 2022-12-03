module.exports = {
    name: 'autoplay',
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
        const autoplay = queue.toggleAutoplay()
        message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
    }
}