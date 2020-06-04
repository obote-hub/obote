const Discord = require('discord.js')
const ms = require("pretty-ms");

module.exports.run = async (client, message, args, ops, afk, db, mute) => {
	 if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("MUTE_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Voce nao tem permissao para usar esse comando.");
    }
    
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Voce precisa mencionar um usuario");
    
    let role = message.guild.roles.cache.find(r => r.name === "Mutado");
    if (!role) return message.channel.send("Nao consegui encontrar um cargo de mute, crie um chamado \`Mutado\`");
    
    if (!user.roles.cache.find(r => r.name === "Mutado")) return message.channel.send("Esse user nao esta mutado");
    
    await user.roles.remove(role.id).catch(err => message.channel.send(`Alguma coisa deu errado: ${err}`));
    await clearTimeout(mute.get(user.user.id));
    await mute.delete(user.user.id);
    await message.channel.send(`${user.user.tag} agora esta desmutado.`);

}

module.exports.config = {
	name:  "unmute",
	aliases: ["desmutar"],
	description: `Desmuta um usuario`
}

