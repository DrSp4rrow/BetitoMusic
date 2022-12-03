module.exports = {
  name: 'seek',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Proporcione la posición (en segundos) para buscar!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | por favor ingrese un número valido!`)
    queue.seek(time)
    message.channel.send(`buscó ${time}!`)
  }
}
