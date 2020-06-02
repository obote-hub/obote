const Discord = require('discord.js')
const Canvas = require("canvas-constructor")
const fetch = require("node-fetch")
module.exports.run = async (client, message, args, ops, afk) => {
const avatar = await fetch(message.author.avatarURL({format: 'jpg'}))

let mage = new Canvas(500, 250)
.setColor("#ffffff")
.addRect(0, 0, 500, 250) //we gonna replace it with image
.setColor("#ff2050")
.addRect(0, 0, 500, 80)
.setColor("#ffffff")
.setTextFont('bold 40px Impact') //you can make it bold
.addText("PERFIL", 110, 55)
.setColor("#ff2050")
.setTextFont('bold 20px Impact') 
.addText(`ID - ${message.author.id}`, 30, 140)
.addText(`TAG - ${message.author.tag}`, 30, 170)
.addText(`NOME DA GUILD - ${message.guild.name}`, 30, 200)
.setColor("#ffffff")
.addCircle(60, 40, 33)
.addCircularImage(await avatar.buffer(), 60, 40, 30)
.toBuffer();

message.channel.send({files: [mage]}) //lol i forget again

}

module.exports.config = {
	name:  "profile",
	aliases: ["myprofile", "perfil"]
}
