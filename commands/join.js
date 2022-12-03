const { Constants } = require('discord.js')

module.exports = {
    name: 'join',
    aliases: ['move'],
    run: async (client, message, args) => {
        let voiceChannel = message.member.voice.channel
        if (args[0]) {
            voiceChannel = await client.channels.fetch(args[0])
            if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
                return message.channel.send(`${client.emotes.error} | ${args[0]} no es un canal de voz válido!`)
            }
        }
        if (!voiceChannel) {
            return message.channel.send(
                `${client.emotes.error} | Debe estar en un canal de voz o ingresar una identificación de canal de voz!`
            )
        }
        client.distube.voices.join(voiceChannel)
    }
}