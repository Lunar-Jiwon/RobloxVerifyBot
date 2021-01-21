const roblox = require('noblox.js');
const fs = require('fs');
const embed = require('../module/DiscordModule');
var isjoin = null
module.exports.CheckUserGroup = function (message, robloxuserid) {
    if (isjoin) { isjoin = null }
    try {
        const data = fs.readFileSync('./Data/ServerData.json', 'utf8');
        const serverdatas = JSON.parse(data)
        if (serverdatas[message.guild.id].SubGroup != null) {
            for (var a = 0; a < Object.keys(serverdatas[message.guild.id].SubGroup).length; a++) {
                var rs = Object.keys(serverdatas[message.guild.id].SubGroup)[a]
                if (message.member.roles.cache.has(serverdatas[message.guild.id].SubGroup[rs].RoleId)) {
                    message.member.roles.remove(serverdatas[message.guild.id].SubGroup[rs].RoleId)
                }
            }
        }

        for (var i = 0; i < Object.keys(serverdatas[message.guild.id].Ranks).length; i++) {
            var theTypeIs = Object.keys(serverdatas[message.guild.id].Ranks)[i];
            var rolename = serverdatas[message.guild.id].Ranks[theTypeIs].split(",");
            for (var role of rolename) {
                if (message.member.roles.cache.has(role)) {
                    message.member.roles.remove(role)
                }
            }
        }
        roblox.getRankInGroup(serverdatas[message.guild.id].DefaultGroup, robloxuserid).then((rank) => {
            if (rank === 0) return message.channel.send(embed.SuccessfulEmbed("인증 완료", "그룹 가입 후 인증해주세요"));

            message.member.roles.add(serverdatas[message.guild.id].DefaultRole)

            for (var i = 0; i < Object.keys(serverdatas[message.guild.id].Ranks).length; i++) {
                var theTypeIs = Object.keys(serverdatas[message.guild.id].Ranks)[i];
                if (rank == theTypeIs) {
                    var rolename = serverdatas[message.guild.id].Ranks[theTypeIs].split(",");
                    for (const role of rolename) {
                        message.member.roles.add(role)
                    }
                }
            }
            roblox.getRankNameInGroup(serverdatas[message.guild.id].DefaultGroup, robloxuserid).then((rankname) => {
                run()
                async function run() {
                    if (serverdatas[message.guild.id].SubGroup != null) {
                        for (var x = 0; x < Object.keys(serverdatas[message.guild.id].SubGroup).length; x++) {
                            var rs = Object.keys(serverdatas[message.guild.id].SubGroup)[x];
                            const rank1 = await roblox.getRankNameInGroup(rs, robloxuserid)
                            if (rank1 == "Guest") {
                                isjoin = false
                            } else {
                                isjoin = true
                                break
                            }
                        }
                        if (!isjoin) {
                            roblox.getRankNameInGroup(serverdatas[message.guild.id].DefaultGroup, robloxuserid).then((rankname) => {
                                var name = rankname.substring(rankname.indexOf("["), rankname.lastIndexOf("]") + 1);
                                roblox.getUsernameFromId(robloxuserid).then((username) => {
                                    message.member.setNickname(`${name} ${username}`)
                                    return message.channel.send(embed.SuccessfulEmbed("인증 완료", "성공적으로 인증이 완료되었습니다.\n역할 지급은 여러번 인증 시 딜레이가 발생할 수 있습니다."));
                                })
                            })
                        } else {
                            var name = rankname.substring(rankname.indexOf("["), rankname.lastIndexOf("]") + 1);
                            roblox.getUsernameFromId(robloxuserid).then((username) => {
                                message.member.setNickname(`${name} (${serverdatas[message.guild.id].SubGroup[rs].Nickname}) ${username}`)
                                message.member.roles.add(serverdatas[message.guild.id].SubGroup[rs].RoleId)
                                return message.channel.send(embed.SuccessfulEmbed("인증 완료", "성공적으로 인증이 완료되었습니다.\n역할 지급은 여러번 인증 시 딜레이가 발생할 수 있습니다."));
                            })
                        }



                    } else {
                        var name = rankname.substring(rankname.indexOf("["), rankname.lastIndexOf("]") + 1);
                        roblox.getUsernameFromId(robloxuserid).then((username) => {
                            message.member.setNickname(`${name} ${username}`)
                            return message.channel.send(embed.SuccessfulEmbed("인증 완료", "성공적으로 인증이 완료되었습니다.\n역할 지급은 여러번 인증 시 딜레이가 발생할 수 있습니다."));
                        })
                    }
                }


            })
        }).catch((error) => {
            message.delete();
            message.channel.send(embed.ErrorEmbed("인증", `오류 : ${error}`))
        })

    } catch (error) {
        console.log(error)
    }
}
