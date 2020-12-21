const googleSpreadsheet = require('google-spreadsheet');
const creds = require('../../Data/skey.json');
const doc = new googleSpreadsheet("스프레드시트아이디");
module.exports.WriteData = function(DiscordId,RobloxId){
    const data = {DiscordId: DiscordId, RobloxId: RobloxId};
    doc.useServiceAccountAuth(creds,function(err){
        doc.addRow(
            1,
            data,
            function(err){
                console.log(err);
            }
        )
    });
}