module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Reanudé la canción para ti :)')
    } else {
      message.channel.send('La cola no está en pausa!')
    }
  }
}
