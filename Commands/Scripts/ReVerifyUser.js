const roblox = require('noblox.js')
const Discord = require('discord.js')
const discordmodule = require('../module/DiscordModule')
module.exports.CreateNewUser = function(message){
    let filter = m => m.author.id === message.author.id
    const r = require('../module/VerifyModule').getRandomText();
    const randomtext = r;
    message.channel.send(discordmodule.InfoEmbed("인증",`인증 할 닉네임을 입력해주세요.`)).then(() =>{
        message.channel.awaitMessages(filter,{
            max: 1,
            time: 60000,
            error: ['time']
        }).then(message =>{
            message = message.first();
            if(message.content != "취소"){
                roblox.getIdFromUsername(message.content).then((Userid)=>{
                    message.channel.send(new Discord.MessageEmbed().setTitle("인증").setDescription(`\`\`\`${randomtext}\`\`\`\n아래의 사진과 같이 위의 코드를 붙여 넣은 후 **완료**를 입력해주세요.`).setImage("https://im7.ezgif.com/tmp/ezgif-7-5fc95d3f08a1.gif").setColor("#6fbaff")).then(()=>{
                        message.channel.awaitMessages(filter,{
                            max:1,
                            time:60000,
                            error: ['error']
                        }).then(message =>{
                            message = message.first();
                            if(message.content == "완료"){
                                roblox.getStatus(Userid).then((status)=>{
                                    if(status == randomtext){
                                        require('./WriteUserData').UpdateData(message.author.id,Userid);
                                        require('./UserGroupCheck').CheckUserGroup(message,Userid);
                                    }else{
                                        return message.reply(discordmodule.ErrorEmbed("오류","상태 메시지에 코드와 동일한 메시지를 찾을 수 없습니다."))
                                    }
                                }).catch((error)=>{
                                    console.log(error)
                                    message.reply(discordmodule.ErrorEmbed("오류","알 수 없는 오류가 발생했습니다."))
                                })
                            }else{
                                return message.reply(discordmodule.ErrorEmbed("인증","인증이 취소되었습니다."))
                            }
                        }).catch(()=>{
                            return message.channel.send(discordmodule.ErrorEmbed("인증","인증시간이 만료되었습니다."));
                        })
                    })
                }).catch((error)=>{
                    if(error == "Error: User not found"){
                        message.channel.send(discordmodule.ErrorEmbed("인증","해당하는 유저 정보가 없습니다.\n이름을 다시 확인해주세요."));
                    }
                })
            }else{
                return message.channel.send(discordmodule.ErrorEmbed("인증","인증을 취소했습니다."))
            }
        }).catch(()=>{
            return message.channel.send(discordmodule.ErrorEmbed("인증","인증시간이 만료되었습니다."));
        })
    })
}