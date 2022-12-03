module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento.!`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | por favor ingrese un número valido!`)
    queue.setVolume(volume)
    message.channel.send(`${client.emotes.success} | Volumen ajustado a \`${volume}\``)
  }
}
