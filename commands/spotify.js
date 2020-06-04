const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk) => {

let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }
 let convert = require('parse-ms')
 let status = user.presence.activities[0];

  if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") return message.channel.send("Esse usuario nao esta ouvindo spotify");
     if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
      let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
          url = `https://open.spotify.com/track/${status.syncID}`,
          name = status.details,
          artist = status.state,
          album = status.assets.largeText,
          timeStart = status.timestamps.start,
          timeEnd = status.timestamps.end,
          timeConvert = convert(timeEnd - timeStart);
      
      let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
      let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
      
      let time = `${minutes}:${seconds}`;
      
      const embed = new Discord.MessageEmbed()
      .setAuthor("Spotify Track Information", "https://cdn.icon-icons.com/icons2/836/PNG/512/Spotify_icon-icons.com_66783.png")
      .setColor(0x1ED768)
      .setThumbnail(image)
      .addField("Nome:", name, true)
      .addField("Album:", album, true)
      .addField("Artista:", artist, true)
      .addField("Duração:", time, false)
      .addField("Ouça agora em Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
      message.channel.send(embed)
    }
}

module.exports.config = {
	name:  "spotify",
	aliases: ['spotifytrack', 'trackspotify'],
	description: `Informações sobre a musica que algum usuario esta ouvindo`
}
