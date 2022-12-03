module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | Estoy reproduciendo **\`${song.name}\`**, por ${song.user}`)
  }
}