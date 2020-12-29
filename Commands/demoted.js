const fs = require('fs');
const roblox = require('noblox.js')
const discord =require('discord.js')
const discordmodule = require('./module/DiscordModule')
module.exports = {
    name: "강등",
    description: "그룹의 랭크를 올리는 명령어",
    execute(message,args){
        const serverdata = JSON.parse(fs.readFileSync('./Data/ServerData.json','utf8'))[message.guild.id];
        if(rolename.length == 1){
            if(!message.member.roles.cache.has(rolename[0])||!message.member.roles.cache.has(rolename[1])) return message.reply(discordmodule.ErrorEmbed("오류","권한이 없습니다."));
        }else{
            if(!message.member.roles.cache.has(rolename[0])) return message.reply(discordmodule.ErrorEmbed("오류","권한이 없습니다."));
        }
        if(args[0] == undefined) return message.reply(discordmodule.InfoEmbed("사용법",";강등 <유저 닉네임>"));
        message.reply(discordmodule.InfoEmbed("로딩중","잠시 기다려주세요")).then((msg)=>{
            roblox.getIdFromUsername(args[0]).then((userid)=>{
                roblox.changeRank(serverdata.DefaultGroup,userid,-1).then((result)=>{
                    message.client.channels.cache.get(serverdata.RankUpdateLogChannel).send(new discord.MessageEmbed().setTitle("강등 로그").setAuthor(message.author.tag,message.author.avatarURL()).setDescription(`<@${message.author.id}>이(가) **${args[0]}**플레이어의 랭크를 **${result.oldRole.name}**에서 **${result.newRole.name}**로 변경했습니다.`).setColor("#7bff6f"))
                    return msg.edit(new discord.MessageEmbed().setTitle("성공").setDescription(`성공적으로 **${args[0]}**플레이어의 랭크를 변경했습니다\n변경 사항은 아래와 같습니다.`).setColor("#7bff6f")
                    .addFields({name:"변경 전 계급",value:result.oldRole.name},{name:"변경 후 계급",value:result.newRole.name}))
                }).catch((error)=>{
                    console.log(error)
                    if(error == "Error: 403 You do not have permission to manage this member."){
                        return msg.edit(discordmodule.ErrorEmbed("오류","봇이 내릴 수 있는 권한 이상의 계급입니다."));
                    }else if(error == "Error: Target user is not in group"){
                        return msg.edit(discordmodule.ErrorEmbed("오류",`플레이어 ${args[0]}는(은) 해당 그룹에 속해있지 않습니다.`));
                    }
                })
            }).catch((error)=>{
                if(error == "Error: User not found"){
                    return msg.edit(discordmodule.ErrorEmbed("오류","해당하는 플레이어를 찾을 수 없습니다"));
                }
            })
        })
        
    }
}