const randomtext = ["Hello Roblox Hello Hello","red blue green roblox", "roblox bye green blue hello", "blue green yellow roblox red","green blue roblox bye hello", "blue green red roblox yellow bye", "hello red blue roblox green", "bye green roblox blue hello", "bye yellow gray bye hello","green gray blue hello"];
module.exports.getRandomText = function(){
    var randomvalue = Math.floor(Math.random() * randomtext.length-1)+1;
    return randomtext[randomvalue];
}