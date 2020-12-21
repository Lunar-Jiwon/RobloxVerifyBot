const googleSpreadsheet = require('google-spreadsheet');
const creds = require('../../Data/skey.json');
const doc = new googleSpreadsheet("스프레드시트 아이디");
const CreateUser = require('../Scripts/NewUser');
const GroupCheck = require('../Scripts/UserGroupCheck');
module.exports.CheckUser = function(userid,message){
    doc.useServiceAccountAuth(creds,function(err){
        doc.getRows(
            1,
            {
                "offset":1,
                "limit": 10000,
                "orderby": "DiscordId",
                "reverse": true,
    
            },function(err,rows){
                for(const row of rows){
                    if(row.discordid == userid){
                        return GroupCheck.CheckUserGroup(message,row.robloxid);
                    }
                }
                return CreateUser.CreateNewUser(message);
            }
        )
    })
}