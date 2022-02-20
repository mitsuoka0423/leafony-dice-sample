/*
 * app.js: simple BLE connect application
 *
 * This application uses Web Bluetooth API.
 * Supporting OS and browsers are listed in the link below.
 * https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md
 */

class Dice {
	diceList = [
		document.getElementById('dice1'),
		document.getElementById('dice2'),
		document.getElementById('dice3'),
		document.getElementById('dice4'),
		document.getElementById('dice5'),
		document.getElementById('dice6'),
	];

	constructor(num = 1) {
		this.show(num);
	}

	show(num) {
		if (num < 1 || 6 < num) throw new Error('input from 1 to 6');
		
		this.diceList.forEach((dice) => {
			dice.style.display = 'none';
		});

		this.diceList[num - 1].style.display = '';
	}
}

const textDeviceName = document.getElementById('textDeviceName');
const textUniqueName = document.getElementById('textUniqueName');
const textDateTime = document.getElementById('textDateTime');
const textTemp = document.getElementById('textTemp');
const textHumid = document.getElementById('textHumid');
const textIllum = document.getElementById('textIllum');
const textTilt = document.getElementById('textTilt');
const textBatt = document.getElementById('textBatt');
const textDice = document.getElementById('textDice');

const buttonConnect = document.getElementById('ble-connect-button');
const buttonDisconnect = document.getElementById('ble-disconnect-button');
const buttonLedPls = document.getElementById('button-led-pls');
const buttonLedMns = document.getElementById('button-led-mns');
const buttonDownload = document.getElementById("button-download");

const switchSleepMode = document.getElementById('sleepmode-switch');

let leafony;
let dice;

// array of received data
let savedData = [];
// length of savedData
const CSV_BUFF_LEN = 1024;


window.onload = function () {

	dice = new Dice();
};


buttonConnect.addEventListener( 'click', function () {

	leafony = new Leafony();
	leafony.onStateChange( function ( state ) {
		updateDice( state );
	} );

	if ( switchSleepMode.checked ) {
		leafony.enableSleep();
	} else {
		leafony.disableSleep();
	}

	leafony.connect();

	buttonConnect.style.display = 'none';
	buttonDisconnect.style.display = '';


} );


buttonDisconnect.addEventListener( 'click', function () {

	leafony.disconnect();
	leafony = null;

	buttonConnect.style.display = '';
	buttonDisconnect.style.display = 'none';

} );

function updateDice( state ) {
	dice.show(state.dice);

}
