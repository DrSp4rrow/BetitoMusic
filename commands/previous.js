module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
    const song = queue.previous()
    message.channel.send(`${client.emotes.success} | Reproduciendo ahora:\n${song.name}`)
  }
}
