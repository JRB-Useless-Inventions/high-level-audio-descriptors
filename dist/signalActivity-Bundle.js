(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function signalActivity(floor){
	if (floor === undefined) {
		throw "Lowest -dB must be given"
	}
	this.bufferCounter = 0;
	this.MAX_BUFFER = 10;
	this.memory = []
	this.floor = convertDecibelToVoltage(floor)
}

signalActivity.prototype.calc = function(BUFFER){
	let input = BUFFER;
	var BYTE_TYPE = getArrayByteType(BUFFER);
	if(BYTE_TYPE == undefined){
		throw "Type Array is not a valid type. Pleaese use Float32Array or Uint8Array"
		return undefined;
	}
	var level;

	var highestValue = Math.max(...input.map(x => Math.abs(x)))
	this.memory[this.bufferCounter] = highestValue

	if (this.bufferCounter >= this.MAX_BUFFER) {
		//Buffer Limit Reached
		//Get average level of all values
		if(Math.max(...this.memory) < this.floor){
			//Insufficent level of audio
			level = false;
			//console.log("No Audio")
		}else{
			//Sufficient Level of Audio
			level = true;
		}
		this.memory.shift() //Remove last memory value
		this.bufferCounter = this.MAX_BUFFER-1;
	}

	this.bufferCounter++;
	return level;
}

function getArrayByteType(ARRAY){
	if (ARRAY.constructor === Float32Array) {
		return 1
	}
	else if(ARRAY.constructor === Uint8Array){
		return 255
	}
	else if(ARRAY.constructor === Int8Array){
		return 127
	}
	else{
		return undefined || null;
	}
}
function convertVoltageToDecibel(v1,vRef=0.705){
	let dB = 20 * Math.log10(v1/vRef)
	return dB;
}
function convertDecibelToVoltage(dB){
	let voltage = 1*Math.pow(10,(dB/20));
	return voltage;
}
try{
	window.signalActivity = signalActivity;
}catch(e){
	module.exports.signalActivity = signalActivity;
}

},{}]},{},[1]);
