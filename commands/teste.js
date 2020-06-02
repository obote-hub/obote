const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk) => {
   const spotify = require("spotify-url-info");

   let track = await spotify.getData(args[0]);
   console.log(track)
	
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
