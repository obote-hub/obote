const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
   var channels = db.collection("Channels").doc("Channels");
   
   channels.update({
    "Channels": db.FieldValue.Channels("namaca")
});
 
	
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
