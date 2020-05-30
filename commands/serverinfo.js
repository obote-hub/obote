const Discord = require('discord.js')
const ms = require("pretty-ms");
const dateformat = require("dateformat")
module.exports.run = async (client, message, args, ops, afk, db) => {
	
  let icon = message.guild.iconURL({size: 2048}); // Server Avatar
    
    let region = {
      "brazil": "Brazil",
      "eu-central": "Central Europe",
      "singapore": "Singapore",
      "london": "London",
      "russia": "Russia",
      "japan": "Japan",
      "hongkong": "Hongkong",
      "sydney": "Sydney",
      "us-central": "U.S. Central",
      "us-east": "U.S. East",
      "us-south": "U.S. South",
      "us-west": "U.S. West",
      "eu-west": "Western Europe"
    }

    let member = message.guild.members;
    let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
        online = member.cache.filter(m => m.user.presence.status === "online").size,
        idle = member.cache.filter(m => m.user.presence.status === "idle").size,
        dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
        robot = member.cache.filter(m => m.user.bot).size,
        total = message.guild.memberCount;
    
    // Channels
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size,
        totalchan = channels.cache.size;
    
    // Region
    let location = region[message.guild.region];
    
    // Date
    let x = Date.now() - message.guild.createdAt;
    let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
    let created = dateformat(message.guild.createdAt, 'yyyy-mm-dd'); // Install "dateformat" first.
    //Embed
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setThumbnail(icon)
    .setAuthor(message.guild.name, icon)
    .setDescription(`**ID:** ${message.guild.id}`)
    .addField("Regiao", location)
    .addField("Criado em", `${created.replace(/-/g, '/')} \nhá **${h}** dias`)
    .addField("Dono", `**${message.guild.owner.user.tag}** \n\`${message.guild.owner.user.id}\``)
    .addField(`Membros [${total}]`, `Online: ${online} \nIdle: ${idle} \nDND: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
    .addField(`Canais [${totalchan}]`, `Texto: ${text} \nVoz: ${vc} \nCategorias: ${category}`)
    message.channel.send(embed)
}

module.exports.config = {
	name:  "serverinfo",
	aliases: ["servinfo", 'sinfo', 'seinfo', 'serverstats', 'sstats']
}

