var can = require('socketcan');
var buffer = require('buffer');

// SQLite3 - Database
var sqlite3 = require('sqlite3').verbose();

// Work Better with timestamp
var moment = require('moment');

// Work with Files
const fs = require('fs');


// Sequencia
// create_file(); // Criar arqiovo


let db = new sqlite3.Database('./test1.db', sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});







// var channel = can.createRawChannel("can0", true /* ask for timestamps */);
// channel.start();

// function toHex(number) {
//   return ("00000000" + number.toString(16)).slice(-8);
// }

// function dumpPacket(msg) {
// 	log_messege = '(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase();
// 	fs.appendFile(file_name,'\n '+log_messege);
//   console.log(log_messege);
// }

// channel.addListener("onMessage", dumpPacket);



// Função de Criar o arquivo
	function create_file(){

		data_atual = moment().format('DD-MM-YYYY__HH-mm-ss-SSS');
		file_name = data_atual+'.txt';

		fs.appendFile(file_name,'',function (err) {
		  if (err) throw err;
		  console.log(file_name+' Created!');
		});

	}
