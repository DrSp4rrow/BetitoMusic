const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'queue',
    aliases: ['q'],
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌${client.emotes.error} | No hay nada reproduciendose!`)
        const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Sonando:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n')
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${client.emotes.queue} | **Cola del servidor**`)
                    .setDescription(`${q}`)
                    .setColor('efb810')
            ]
        })
    }
}