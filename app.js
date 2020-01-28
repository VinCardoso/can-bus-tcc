var can = require('socketcan');
var buffer = require('buffer');

// SQLite3 - Database
const Database = require('better-sqlite3');
const db = new Database('database.db');

// Work Better with timestamp
var moment = require('moment');


// Create Table If Not Exist
db.exec("CREATE TABLE if not exists data (id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER,ts_u INTEGER,ts_complete REAL,data_time TEXT,module TEXT,info TEXT,upload INTEGER)");
db.pragma('journal_mode = WAL');

// Database Prapere to Add Row
const stmt = db.prepare("INSERT INTO data(ts,ts_u,ts_complete,data_time,module,info,upload) VALUES(?, ?, ?, ?, ?, ?, ?)");


var channel = can.createRawChannel("can0", true /* ask for timestamps */);

function dumpPacket(msg) {

	ts = msg.ts_sec;
	ts_u = msg.ts_usec;
	ts_complete = parseFloat(ts+"."+ts_u);
	ts_complete_2 = ts_complete.toFixed(3);
	data_time = moment.unix(ts_complete_2).format('YYYY-MM-DD HH:mm:ss.SSS');
	mod = toHex(msg.id);
	data = msg.data.toString('hex');
	
	const add = stmt.run(ts,ts_u,ts_complete,data_time,mod,data,0);
	// console.log("Row Add "+ts+" "+ts_u+" "+ts_complete+" "+data_time+" "+mod+" "+data+" "+ts_complete_2);

}

// To Hex
function toHex(number) {
  return (number.toString(16)).slice(-8);
}

// Executes
channel.start();
channel.addListener("onMessage", dumpPacket);