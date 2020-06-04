const Discord = require('discord.js')
const ms = require("pretty-ms");
module.exports.run = async (client, message, args, ops, afk) => {
   
    const embed = new Discord.MessageEmbed()
    .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(`**Estou acordado por** \`\`${ms(client.uptime)}\`\`   🤓`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL);
    message.channel.send(embed);

}

module.exports.config = {
	name:  "uptime",
	aliases: ["botuptime", "up"],
	description: `Informa quantas horas eu estou acordado <:ResidentSleeper:715976042065428631>`
}
