module.exports ={
    name: `인증`,
    description: "인증 명령어",
    execute(message, args){
        const roblox = require('noblox.js');
        const discordmodule = require('./module/DiscordModule')
        const verifymodule = require('./module/VerifyModule');
        const randomtext = verifymodule.getRandomText();
        const UserCheck = require('./Scripts/UserCheck')
        const discordid = message.author.id
        message.channel.send(discordmodule.InfoEmbed("인증","데이터를 불러오는 중입니다\n잠시 기다려주세요"))
        return UserCheck.CheckUser(discordid,message);
    }
}