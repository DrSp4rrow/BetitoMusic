module.exports = {
    name: 'filter',
    aliases: ['filters'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
        const filter = args[0]
        if (filter === 'off' && queue.filters.size) queue.filters.clear()
        else if (Object.keys(client.distube.filters).includes(filter)) {
            if (queue.filters.has(filter)) queue.filters.remove(filter)
            else queue.filters.add(filter)
        } else if (args[0]) return message.channel.send(`${client.emotes.error} | No es un filtro válido`)
        message.channel.send(`Filtro de cola actual: \`${queue.filters.names.join(', ') || 'Off'}\``)
    }
}