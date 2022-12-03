const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'cmd', 'command'],
    run: async (client, message) => {
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Comandos')
                    .setDescription(`Prefijo: \`${client.config.prefix}\`\n${client.commands.map(cmd => `\`${cmd.name}\``).join(', ')}`)
                    .setColor('efb810')
            ]
        })
    }
}