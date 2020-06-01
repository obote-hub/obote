
const Discord = require('discord.js')
module.exports.run = async (client, message) => {
let emote = '705555136981762130'
message.react(emote);
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
