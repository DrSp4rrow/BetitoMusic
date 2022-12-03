module.exports = {
  name: 'skipto',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | No hay nada en la cola en este momento!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Proporcione tiempo (en segundos) para ir a rebobinar!`)
    }
    const num = Number(args[0])
    if (isNaN(num)) return message.channel.send(`${client.emotes.error} | por favor ingrese un número valido!`)
    await client.distube.jump(message, num).then(song => {
      message.channel.send({ content: `Skipeado a: ${song.name}` })
    })
  }
}
