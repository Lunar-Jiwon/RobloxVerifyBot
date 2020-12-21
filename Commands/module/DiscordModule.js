const Discord = require('discord.js');

module.exports.SuccessfulEmbed = function(title, des){
    return new Discord.MessageEmbed().setTitle(title).setDescription(des).setColor("#7bff6f");
}
module.exports.ErrorEmbed = function(title, des){
    return new Discord.MessageEmbed().setTitle(title).setDescription(des).setColor("#ff6f6f");
}
module.exports.InfoEmbed = function(title, des,field){
    if(field == undefined){
        return new Discord.MessageEmbed().setTitle(title).setDescription(des).setColor("#6fbaff");
    }else{
        return new Discord.MessageEmbed().setTitle(title).setDescription(des).addFields(field).setColor("#6fbaff");
    }
}