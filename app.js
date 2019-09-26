var can = require('socketcan');
var buffer = require('buffer');
const fs = require('fs');


data_atual = Date.now();
file_name = data_atual+'.txt';


fs.appendFile(file_name,'',function (err) {
  if (err) throw err;
  console.log('File Created!');
});


var channel = can.createRawChannel("can0", true /* ask for timestamps */);
channel.start();

function toHex(number) {
  return ("00000000" + number.toString(16)).slice(-8);
}

function dumpPacket(msg) {
	log_messege = '(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase();
	fs.appendFile(file_name,'\n '+log_messege);
  console.log(log_messege);
}

channel.addListener("onMessage", dumpPacket);
