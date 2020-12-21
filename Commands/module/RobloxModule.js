const roblox = require('noblox.js');

// 쿠키로 로그인
module.exports.login = async function(cookie){
    await roblox.setCookie(cookie)
}