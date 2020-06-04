const os = require('os')
const cpuStat = require('cpu-stat')
const Discord = require('discord.js')
const ms = require('ms')


module.exports.run = (client, message, args, ops, afk) =>{


cpuStat.usagePercent(function (error, percent, seconds) {
      if (error) {
        return console.error(error)
      }
      
      const cores = os.cpus().length // Counting how many cores your hosting has.
      const cpuModel = os.cpus()[0].model // Your hosting CPU model.
      const guild = client.guilds.cache.size.toLocaleString() // Counting how many servers invite your bot. Tolocalestring, meaning separate 3 numbers with commas.
      const user = client.users.cache.size.toLocaleString() // Counting how many members in the server that invite your bot.
      const channel = client.channels.cache.size.toLocaleString() // Counting how many channels in the server that invite your bot.
      const usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
      const Node = process.version // Your node version.
      const CPU = percent.toFixed(2) // Your CPU usage.
      
      const embed = new Discord.MessageEmbed() // Stable or < below than 11.x.x use RichEmbed. More than 12.x.x or Master or https://github.com/discordjs/discord.js/ (github:discordjs/discord.js) use MessageEmbed.
      // Actually they are exactly the same.
      embed.setThumbnail('https://images-ext-2.discordapp.net/external/rxY1ha_bB2VTdLkRHn17P6C9bpw4eKTE4ypNRLng79s/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/551109092177870851/b337f575d0983234531c2db518d1ca6e.png?width=375&height=375')
      embed.addField('Bot estatisticas:', `Servers: ${guild} \nUsers: ${user} \nCanais: ${channel} \nMemoria usada: ${usage} \nNode: ${Node} \nCPU: ${CPU}%`) // Use Grave accent or `` 
      // (its on your keyboard, besides on number 1.)
      // Use \n to make a new line.
      embed.addField('Estatisticas fisicas:', `CPU: ${cores} - ${cpuModel} \nUptime: **${parseDur(client.uptime)}**`)
      // Let's test it!
      // Use ** turn the text into bold.
      // Let's test again.
      message.channel.send(embed)
    })
}
module.exports.config = {
	name:  "status",
	aliases: ['stats'],
	description: `Insformações sobre meus status: uptime, servers, users, cpu (ETC..)`
}

function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
} 


function parseDur(ms) {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} dias, ${hours} horas, ${minutes} minutos`
  } else if (hours) {
    return `${hours} horas, ${minutes} minutos, ${seconds} segundos`
  } else if (minutes) {
    return `${minutes} minutos, ${seconds} segundos`
  }
  
  return `${seconds} segundos`
} // Uptime bot.
