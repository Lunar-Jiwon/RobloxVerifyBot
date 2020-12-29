const googleSpreadsheet = require('google-spreadsheet');
const creds = require('../../Data/skey.json');
const doc = new googleSpreadsheet("스프레드시트 아이디");
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

module.exports.UpdateData = function(DiscordId,Robloxid){
    const data = {DiscordId: DiscordId, RobloxId: Robloxid};
    doc.useServiceAccountAuth(creds,function(err){
        doc.getCells(
            1,
            {
                "max-row":1000,
                "max-col": 2,
                "reverse": true,
    
            },function(err,cells){
                console.log(err)
                for(var num = 0; cells.length > num; num++){
                    if(cells[num].value == DiscordId){
                        var un = num + 1
                        cells[un].value = Robloxid;
                        return cells[un].save();
                    }
                }
            
                doc.addRow(
                    1,
                    data,
                    function(err){
                        console.log(err);
                    }
                )
            }
        )
    });
}
