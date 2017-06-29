const ERR010 = "Bytes/010: Cannot convert a null raw string.";
const ERR020 = "Bytes/020: Cannot convert a null byte array.";
const ERR030 = "Bytes/030: Input error. Expected a String input.";
const ERR040 = "Bytes/040: Input error. Expected an array input.";
const ERR050 = "Bytes/050: Input error. Length of input array should be a multiple of 2.";
const ERR060 = "Bytes/060: Input error. Length of input array should be a multiple of 4.";

// Raw string.

/**
 * Raw string to byte array.
 */
function rstr2barr(rstr) {
    if (!rstr) throw new Error(ERR010);
    if (!(typeof(rstr) === 'string')) throw new Error(ERR030);
    let barr = [];
    for (let i = 0; i < rstr.length; i++) {
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
    if (!barr) throw new Error(ERR020);
    if (!Array.isArray(barr)) throw new Error(ERR040);
    let rstr = "";
    for (let i = 0; i < barr.length; i++) {
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
    if (!barr) throw new Error(ERR020);
    if (!Array.isArray(barr)) throw new Error(ERR040);
    if (barr.length % 2) throw new Error(ERR050);
    let warr = [];
    for (let i = 0; i < barr.length; i += 2) {
        let byte1 = barr[i] & 0b11111111;
        let byte2 = barr[i + 1] & 0b11111111;
        let word = (byte2 << 8) | byte1;
        warr.push(word);
    }
    return warr;
}

function barr2warrB(barr) {
    if (!barr) throw new Error(ERR020);
    if (!Array.isArray(barr)) throw new Error(ERR040);
    if (barr.length % 2) throw new Error(ERR050);
    let warr = [];
    for (let i = 0; i < barr.length; i += 2) {
        let byte1 = barr[i] & 0b11111111;
        let byte2 = barr[i + 1] & 0b11111111;
        let word = (byte1 << 8) | byte2;
        warr.push(word);
    }
    return warr;
}

function warr2barrL(warr) {
    if (!warr) throw new Error(ERR020);
    if (!Array.isArray(warr)) throw new Error(ERR040);
    let barr = [];
    for(let i = 0; i < warr.length; i++) {
        let word = warr[i] & 0xffff;
        loByte = word & 0b11111111;
        hiByte = word >>> 8;
        barr.push(loByte, hiByte);
    }
    return barr;
}

function warr2barrB(warr) {
    if (!warr) throw new Error(ERR020);
    if (!Array.isArray(warr)) throw new Error(ERR040);
    let barr = [];
    for(let i = 0; i < warr.length; i++) {
        let word = warr[i] & 0xffff;
        loByte = word & 0b11111111;
        hiByte = word >>> 8;
        barr.push(hiByte, loByte);
    }
    return barr;
}

function barr2dwarrL(barr) {
    if (!barr) throw new Error(ERR020);
    if (!Array.isArray(barr)) throw new Error(ERR040);
    if (barr.length % 4) throw new Error(ERR060);
    let warr = [];
    for (let i = 0; i < barr.length; i += 4) {
        let byte1 = barr[i + 0] & 0b11111111;
        let byte2 = barr[i + 1] & 0b11111111;
        let byte3 = barr[i + 3] & 0b11111111;
        let byte4 = barr[i + 4] & 0b11111111;
        let dword = (byte4 << 24) | (byte3 << 16) | (byte2 << 8) | byte1;
        warr.push(dword);
    }
    return warr;
}

function barr2dwarrB(barr) {
    if (!barr) throw new Error(ERR020);
    if (!Array.isArray(barr)) throw new Error(ERR040);
    if (barr.length % 4) throw new Error(ERR060);
    let warr = [];
    for (let i = 0; i < barr.length; i += 4) {
        let byte1 = barr[i + 0] & 0b11111111;
        let byte2 = barr[i + 1] & 0b11111111;
        let byte3 = barr[i + 3] & 0b11111111;
        let byte4 = barr[i + 4] & 0b11111111;
        let dword = (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
        warr.push(dword);
    }
    return warr;
}

function dwarr2barrL(dwarr) {
    if (!dwarr) throw new Error(ERR020);
    if (!Array.isArray(dwarr)) throw new Error(ERR040);
    let barr = [];
    for (let i = 0; i < dwarr.length; i++) {
        let dword = dwarr[i] & 0xffffffff;
        lowestByte = dword & 0b11111111;
        lowerByte = (dword >>> 8) & 0b11111111;
        higherByte = (dword >>> 16) & 0b11111111;
        highestByte = (dword >>> 24) & 0b11111111;
        barr.push(lowestByte, lowerByte, higherByte, highestByte);
    }
    return barr;
}

function dwarr2barrB(dwarr) {
    if (!dwarr) throw new Error(ERR020);
    if (!Array.isArray(dwarr)) throw new Error(ERR040);
    let barr = [];
    for (let i = 0; i < dwarr.length; i++) {
        let dword = dwarr[i] & 0xffffffff;
        lowestByte = dword & 0b11111111;
        lowerByte = (dword >>> 8) & 0b11111111;
        higherByte = (dword >>> 16) & 0b11111111;
        highestByte = (dword >>> 24) & 0b11111111;
        barr.push(highestByte, higherByte, lowerByte, lowestByte);
    }
    return barr;
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
    if (carr === null) return false;
    if (!Array.isArray(carr)) return false;
    let byteLen = 0;
    if (carr.length > 0) {
        let firstDwarr = carr[0];
        if (!Array.isArray(firstDwarr)) return false;
        byteLen = firstDwarr.length;
    }
    for (let i = 1; i < carr.length; i++) {
        let dwarr = carr[i];
        if (!Array.isArray(dwarr)) return false;
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
    barr2warrL as barr2warrL,
    barr2warrB as barr2warrB,
}
