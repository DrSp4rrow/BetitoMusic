const { DisTube } = require('distube');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent
    ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.config = require('./config.json')
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log('No se pudo encontrar ningún comando!')
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('No se pudo encontrar ningún comando!')
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Cargado ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on('ready', () => {
    console.log(`${client.user.tag} está en linea.`)
})

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`${client.emotes.error} | Debes estar en un canal de voz!`)
    }
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
    }
})

const status = queue =>
    `Volumen: \`${queue.volume}%\` | Filtros: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${client.emotes.play} | Sonando \`${song.name}\` - \`${song.formattedDuration}\`\nCargada por: ${song.user}\n${status(queue)}`)
                    .setColor('efb810')
            ]
        })
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${client.emotes.success} | Añadido ${song.name} - \`${song.formattedDuration}\` a Cola por ${song.user}`)
                    .setColor('efb810')
            ]
        })
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${client.emotes.success} | Añadida \`${playlist.name}\` playlist (${playlist.songs.length} canciones) a la cola\n${status(queue)}`)
                    .setColor('efb810')
            ]
        })
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`${client.emotes.error} | Se encontró un error: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })
    .on('empty', channel => channel.send('¡El canal de voz está vacío! Dejando el canal...'))
    .on('searchNoResult', (message, query) =>
        message.channel.send(`${client.emotes.error} | No se ha encontrado ningún resultado para \`${query}\`!`)
    )
    .on('finish', queue => queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setDescription(`${client.emotes.Exclama} YA NO HAY CANCIONES EN COLA`)
                .setColor('efb810')
        ]
    }))
// DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => { })

client.login(config.token)