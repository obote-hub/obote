
const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk) => {
  let reason = args.join(' ') ? args.join(' ') : 'To afk. 🏃 💻 ';
    let afklist = client.afk.get(message.author.id);
    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason,
            tag: message.author.tag
        };
       
        client.afk.set(message.author.id, construct);
       var embed = new Discord.MessageEmbed()
       .setDescription(`**${message.author.tag}** está AFK:      ${reason}`)
        return message.channel.send(embed)
    }

}

module.exports.config = {
	name:  "afk",
	aliases: []
}
