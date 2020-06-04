const fetch = require('node-fetch')
const Discord = require('discord.js')
module.exports.run = (client, message, args, ops, afk) =>{
	
	if(!args[0]){
       fetch('https://corona.lmao.ninja/v2/all')
       .then(response => response.json())
    .then(data => {
    	let confirmed = data.cases.toLocaleString() 
      let recovered = data.recovered.toLocaleString() 
      let deaths = data.deaths.toLocaleString() 

      let corona = new Discord.MessageEmbed()
      .setThumbnail('https://i.pinimg.com/originals/31/cb/de/31cbdebf465bd37b8b944e1013a671dc.png')
      .setColor("PURPLE") // Blurple.
      .addField(`Status Global:`, `Comfirmados: **${confirmed}** \nRecuperados: **${recovered}** \nMortes: **${deaths}**`)
      .setTimestamp()
      
      message.channel.send(corona)

    })
	} else {
		let countries = args[0] // Your/someone countries prefix.
    fetch(`https://corona.lmao.ninja/v2/countries/${countries}`)
    .then(response => response.json())
    .then(data => {
      let confirmed = data.cases.toLocaleString() 
      let recovered = data.recovered.toLocaleString() 
      let deaths = data.deaths.toLocaleString() 
      let country = data.country
      // Add .toLocaleString() to separate 3 numbers into commas.
      
      const embed = new Discord.MessageEmbed()
      .setThumbnail(data.countryInfo.flag)
      .setColor("PURPLE") // Blurple.
      .addField(`País: ${country}`, `Comfirmados: **${confirmed}** \nRecuperados: **${recovered}** \nMortes: **${deaths}**`)
      .setTimestamp()
      
      message.channel.send(embed)
      // Let's test it out!
    })

	}
 
}
module.exports.config = {
	name:  "corona",
	aliases: ['covid', 'covid19'],
	description: "Status atuais do virus covid-19 em paises"
}
