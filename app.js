var can = require('socketcan');
var buffer = require('buffer');

// SQLite3 - Database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');
var check;

// Work Better with timestamp
var moment = require('moment');

// Work with Files
// const fs = require('fs');


// Sequencia
// create_file(); // Criar arqiovo


// let userDB = new sqlite3.Database("./user1.db", 
//     sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
//     (err) => { 
//         // do your thing 
//     });


// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

db.serialize(function() {

  db.run("CREATE TABLE if not exists data (ts INTEGER,ts_u INTEGER,ts_complete REAL,data_time TEXT,module TEXT,info TEXT,upload INTEGER)");

});

// db.close();







var channel = can.createRawChannel("can0", true /* ask for timestamps */);
channel.start();

function toHex(number) {
  return (number.toString(16)).slice(-8);
}

function dumpPacket(msg) {

	// fs.appendFile(file_name,'\n '+log_messege);

	ts = msg.ts_sec;
	ts_u = msg.ts_usec;
	ts_complete = parseFloat(ts+"."+ts_u);
	ts_complete_2 = ts_complete.toFixed(3);
	data_time = moment.unix(ts_complete_2).format('YYYY-MM-DD HH:mm:ss.SSS');
	mod = toHex(msg.id);
	data = msg.data.toString('hex');
	
		db.run('INSERT INTO data(ts,ts_u,ts_complete,data_time,module,info,upload) VALUES(?, ?, ?, ?, ?, ?, ?)', [ts,ts_u,ts_complete,data_time,mod,data,0], (err) => {

			if(err){
				return console.log(err.message);
			}
				console.log("Row Add "+ts+" "+ts_u+" "+ts_complete+" "+data_time+" "+mod+" "+data+" "+ts_complete_2);
			});

			// db.close();
}

channel.addListener("onMessage", dumpPacket);



// Função de Criar o arquivo
	function create_file(){

		data_atual = moment().format('DD-MM-YYYY__HH-mm-ss-SSS');
		file_name = data_atual+'.txt';

		fs.appendFile(file_name,'',function (err) {
		  if (err) throw err;
		  console.log(file_name+' Created!');
		});

	}
