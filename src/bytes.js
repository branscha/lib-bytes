const ERR010 = "Bytes/010: Cannot convert a null raw string into a byte array."
const ERR020 = "Bytes/020: Cannot convert a null byte array into a raw string."

// Raw string.

/**
 * Raw string to byte array.
 */
function rstr2barr(rstr) {
	if(!rstr) throw new Error(ERR010);
	let barr = [];
	for(let i = 0; i < rstr.length; i++) {
		// Only keep the lower byte ignore higher byte.
		let byte = rstr.charCodeAt(i) & 0b11111111;
		barr.push(byte);
	}
	return barr;
}


/**
 * Byte array to raw string.
 */
function barr2rstr(barr) {
	if(!barr) throw new Error(ERR020);
	let rstr = "";
	for(let i = 0; i < barr.length; i++) {
		// Only keep the lower byte ignore higher byte.
		let byte = barr[i] & 0b11111111;
		rstr = rstr + String.fromCharCode(byte);
	}
	return rstr;
}

// Word, double word.
// Note:
// * Everything larger than double word is a carr, it cannot be represented directly in JavaScript and we have to create our own data structure for it.

function barr2warrL(barr) {
}

function barr2warrB(barr) {
}

function warr2barrL(warr) {
}

function warr2barrB(warr) {
}

function barr2dwarrL(barr) {
}

function barr2dwarrB(barr) {
}

function dwarr2barrL(dwarr) {
}

function dwarr2barrB(dwarr) {
}

// Carr construction.
// Unlimited byte precision above 32 bits JavaScript limit.

function barr2carrL(barr, carrByteSize) {
}

function barr2carrB(barr, carrByteSize) {
}

function carr2barrL(carr) {
}

function carr2barrB(carr) {
}

function isConsistentCarr(carr) {
	if(carr === null) return false;
	if(!Array.isArray(carr)) return false;
	let byteLen = 0;
	if(carr.length > 0) {
		let firstDwarr = carr[0];
		if(!Array.isArray(firstDwarr)) return false;
		byteLen = firstDwarr.length;
	}
	for(let i = 1; i < carr.length; i++) {
		let dwarr = carr[i];
		if(!Array.isArray(dwarr)) return false;
		if (dwarr.length !== byteLen) return false;
	}
	return true;
}

// Bit operations on dwarrs.
// Notes:
// * dwarr is is considered to be big endian here.

function isCompatibleDwarrs(op1, op2) {
	return op1 !== null && op2 !== null && Array.isArray(op1) && Array.isArray(op2) && op1.length === op2.length;
}

function dwarrAnd(op1, op2) {
}

function dwarrOr(op1, op2) {
}

function dwarrXor(op1, op2) {
}

function dwarrNot(op1) {
}

function dwarrLshift(op1) {
}

function dwarrRSshift(op1) {
}

function dwarrRZshift(op1) {
}

// Padding

function paddPkcs7(barr, blockLen) {
}

function unpaddPkcs7(barr) {
}

// Note
// * Same as pkcs7 but 1-8 max.
// * Just another name for 3DES standard.
function paddPkcs5(barr, blockLen) {
}

function unpaddPkcs5(barr) {
}

// Blocks


// Note: 
// * Padding should have been done first.
// * Error if barr not a multiple of blocklen.
function barr2blocks(barr, blockLen) {
}

function blocks2barr(blocks) {
}


export {
    barr2rstr as barr2rstr,
    rstr2barr as rstr2barr,
}
