const Discord = require('discord.js')
const ms = require("pretty-ms");
const dateformat = require("dateformat")
module.exports.run = async (client, message, args, ops, afk, db) => {
	
let user = message.mentions.users.first() || message.author; // You can do it by mentioning the user, or not.
    
    if (user.presence.status === "dnd") user.presence.status = "Nao disturbe.";
    if (user.presence.status === "idle") user.presence.status = "Idle";
    if (user.presence.status === "offline") user.presence.status = "Offline";
    if (user.presence.status === "online") user.presence.status = "Online";
    
    function game() {
      let game;
      if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
      else if (user.presence.activities.length < 1) game = "Nenhum"; // This will check if the user doesn't playing anything.
      return game; // Return the result.
    }
    
    let x = Date.now() - user.createdAt; // Since the user created their account.
    let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; // Since the user joined the server.
    let created = Math.floor(x / 86400000); // 5 digits-zero.
    let joined = Math.floor(y / 86400000);
    
    const member = message.guild.member(user);
    let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : user.username; // Nickname
    let createdate = dateformat(user.createdAt, "yyyy-mm-dd")// User Created Date
    let joindate = dateformat(member.joinedAt, "yyyy-mm-dd") // User Joined the Server Date
    let status = user.presence.status; // DND, IDLE, OFFLINE, ONLINE
    let avatar = user.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, avatar)
    .setThumbnail(avatar)
    .setTimestamp()
    .setColor(0x7289DA)
    .addField("ID", user.id, true)
    .addField("Username", nickname, true)
    .addField("Conta criada em", `${createdate} \nhá ${created} dias atras`, true)
    .addField("Entrou no server em", `${joindate} \nhá ${joined} dias atras`, true)
    .addField("Status", status, true)
    .addField("Game", game(), true)
    
    message.channel.send(embed); // Let's see if it's working.





















}

module.exports.config = {
	name:  "userinfo",
	aliases: ["infouser", "uinfo"]
}

