module.exports = {
    name: 'forward',
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
        if (!args[0]) {
            return message.channel.send(`${client.emotes.error} | Proporcione el tiempo (en segundos) para avanzar!`)
        }
        const time = Number(args[0])
        if (isNaN(time)) return message.channel.send(`${client.emotes.error} | por favor ingrese un número valido!`)
        queue.seek((queue.currentTime + time))
        message.channel.send(`Avanzando la canción a ${time}!`)
    }
}