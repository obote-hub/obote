const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.GOOGLE_API_KEY);

module.exports.run = async (client, message, args, ops, afk) => {


try {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('Voce precisa estar em um canal de voz');
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
                return message.channel.send("**Voce precisa estar no mesmo canal de voz que eu..**");
            };
            const serverQueue = ops.get(message.guild.id);
            if (!serverQueue) return message.channel.send('❌ **Nada tocando neste server**');
            let video = serverQueue.queue[0]
            let conectado = serverQueue.dispatcher.streamTime
            let description;
            if (video.duration == 'Live Stream') {
                description = 'Ao vivo';
            } else {
                description = playbackBar(video);
            }
            const videoEmbed = new MessageEmbed()
                .setThumbnail(video.thumbnail)
                .setColor('GREEN')
                .setTitle(video.title)
                .setDescription(description)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(videoEmbed);
            return;

            function playbackBar(video) {
                const passedTimeInMS = conectado
                const passedTimeInMSObj = {
                    seconds: Math.floor((passedTimeInMS / 1000) % 60),
                    minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
                    hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24)
                };
                const passedTimeFormatted = formatDuration(
                    passedTimeInMSObj
                );

                const totalDurationObj = video.duration;
                const totalDurationFormatted = formatDuration(
                    totalDurationObj
                );

                let totalDurationInMS = 0;
                Object.keys(totalDurationObj).forEach(function (key) {
                    if (key == 'hours') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 3600000;
                    } else if (key == 'minutes') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
                    } else if (key == 'seconds') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 100;
                    }
                });
                const playBackBarLocation = Math.round(
                    (passedTimeInMS / totalDurationInMS) * 10
                );
                
                let playBack = '';
                for (let i = 1; i < 21; i++) {
                    if (playBackBarLocation == 0) {
                        playBack = ':musical_note:▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                        break;
                    } else if (playBackBarLocation == 11) {
                        playBack = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬:musical_note:';
                        break;
                    } else if (i == playBackBarLocation * 2) {
                        playBack = playBack + ':musical_note:';
                    } else {
                        playBack = playBack + '▬';
                    }
                }
                playBack = `${playBack}\n\n\`${passedTimeFormatted} / ${totalDurationFormatted}\``;
                return playBack
            }

            function formatDuration(durationObj) {
                const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
                    durationObj.minutes ? durationObj.minutes : '00'
                    }:${
                    (durationObj.seconds < 10)
                        ? ('0' + durationObj.seconds)
                        : (durationObj.seconds
                            ? durationObj.seconds
                            : '00')
                    }`;
                return duration;
            }
        } catch {
            message.channel.send("**Algo deu errado!**")
        }
        
}


module.exports.config = {
  name:  "nowplaying",
  aliases: ["np", "tocandoagora", "playingnow"]
}
