const spotify = require("spotify-url-info");
const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk) => {


	let track = await getData(args[0]);
	console.log(track)
	
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
