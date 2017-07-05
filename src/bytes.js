const ERR010 = "Bytes/010: Cannot convert a null raw string.";
const ERR020 = "Bytes/020: Cannot convert a null byte array.";
const ERR030 = "Bytes/030: Input error. Expected a String input.";
const ERR040 = "Bytes/040: Input error. Expected an array input.";
const ERR050 = "Bytes/050: Input error. Length of input array should be a multiple of 2.";
const ERR060 = "Bytes/060: Input error. Length of input array should be a multiple of 4.";
const ERR070 = (len) => `Bytes/070: Input error. Length of input array should be a multiple of ${len}.`;
const ERR080 = "Bytes/080: Input error. The byte length of the composites should be a multiple of 4.";
const ERR090 = "Bytes/090: Input error. Number of shifts should be >= 0.";
const ERR100 = "Bytes/100: Input error. Cannot convert a null to a bit array.";
const ERR110 = "Bytes/110: Input error. Expected a number input.";
const ERR120 = "Bytes/120: Input error. Expected an array input, cannot convert a null to a byte.";
const ERR130 = "Bytes/130: Input error. Expected an array of bits as input.";
const ERR140 = "Bytes/140: Input error. The bit array should exactly be 8 bits long.";
const ERR150 = "Bytes/150: Input error. Cannot bit padd a null array.";
const ERR160 = "Bytes/160: Input error. Expected an array input to bit-padd.";
const ERR170 = "Bytes/170: Input error. The bit block length should be > 0.";
const ERR180 = "Bytes/180: Input error. Cannot unpadd a null array.";
const ERR190 = "Bytes/190: Input error. Expected an array input to bit-unpadd.";
const ERR200 = "Bytes/200: Input error. Cannot bit-padd a null byte array.";
const ERR210 = "Bytes/210: Input error. Expected a byte array to bit-padd.";
const ERR220 = "Bytes/220: Input error. The byte block length should be > 0.";
const ERR230 = "Bytes/230: Input error. Cannot bit-unpadd a null byte array.";
const ERR240 = "Bytes/240: Input error. Expected a byte array to bit-unpadd.";
const ERR250 = "Bytes/250: Could not find any bit padding.";

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
        let loByte = word & 0xff;
        let hiByte = (word >>> 8) & 0xff;
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
        let loByte = word & 0b11111111;
        let hiByte = word >>> 8;
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
        let byte1 = barr[i + 0] & 0xff;
        let byte2 = barr[i + 1] & 0xff;
        let byte3 = barr[i + 2] & 0xff;
        let byte4 = barr[i + 3] & 0xff;
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
        let byte1 = barr[i + 0] & 0xff;
        let byte2 = barr[i + 1] & 0xff;
        let byte3 = barr[i + 2] & 0xff;
        let byte4 = barr[i + 3] & 0xff;
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
        let lowestByte = dword & 0xff;
        let lowerByte = (dword >>> 8) & 0xff;
        let higherByte = (dword >>> 16) & 0xff;
        let highestByte = (dword >>> 24) & 0xff;
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
        let lowestByte = dword & 0xff;
        let lowerByte = (dword >>> 8) & 0xff;
        let higherByte = (dword >>> 16) & 0xff;
        let highestByte = (dword >>> 24) & 0xff;
        barr.push(highestByte, higherByte, lowerByte, lowestByte);
    }
    return barr;
}

// Carr construction.
// Unlimited byte precision above 32 bits JavaScript limit.

function barr2carrL(barr, carrByteSize) {
    if (!barr) throw new Error(ERR020);
    if (!Array.isArray(barr)) throw new Error(ERR040);
    if (!carrByteSize || carrByteSize % 4) throw new Error(ERR080);
    if (barr.length % carrByteSize) throw new Error(ERR070(carrByteSize));
    let carr = [];
    for (let i = 0; i < barr.length; i += carrByteSize) {
        let subarr = barr.slice(i, i + carrByteSize);
        subarr = subarr.reverse();
        let dwarr = barr2dwarrB(subarr);
        carr.push(dwarr);
    }
    return carr;
}

function barr2carrB(barr, carrByteSize) {
    if (!barr) throw new Error(ERR020);
    if (!Array.isArray(barr)) throw new Error(ERR040);
    if (!carrByteSize || carrByteSize % 4) throw new Error(ERR080);
    if (barr.length % carrByteSize) throw new Error(ERR070(carrByteSize));
    let carr = [];
    for (let i = 0; i < barr.length; i += carrByteSize) {
        let subarr = barr.slice(i, i + carrByteSize);
        let dwarr = barr2dwarrB(subarr);
        carr.push(dwarr);
    }
    return carr;
}

function carr2barrL(carr) {
    if (!carr) throw new Error(ERR020);
    if (!Array.isArray(carr)) throw new Error(ERR040);
    let barr = [];
    for(let i = 0; i < carr.length; i++) {
        let dwarr = carr[i];
        let subarr = dwarr2barrB(dwarr);
        subarr = subarr.reverse();
        barr = barr.concat(subarr);
    }
    return barr;
}

function carr2barrB(carr) {
    if (!carr) throw new Error(ERR020);
    if (!Array.isArray(carr)) throw new Error(ERR040);
    let barr = [];
    for(let i = 0; i < carr.length; i++) {
        let subarr = dwarr2barrB(carr[i]);
        barr = barr.concat(subarr);
    }
    return barr;
}

/**
 * A carr (composites array) represents an array of super-words of the same size.
 * A super-word is represented by a big endian dwarr (a dword array, most significant dword first).
 * This function test if a data structure can pass as a valid carr.
 * @param carr
 * @returns {boolean}
 */
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

/**
 * Both operands must be arrays of the same length.
 * @param op1
 * @param op2
 * @returns {boolean}
 */
function isCompatibleDwarrs(op1, op2) {
    return op1 !== null && op2 !== null && Array.isArray(op1) && Array.isArray(op2) && op1.length === op2.length;
}

function dwarrAnd(op1, op2) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(op1[i] & op2[i]);
    }
    return dwarr;
}

function dwarrOr(op1, op2) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(op1[i] | op2[i]);
    }
    return dwarr;
}

function dwarrXor(op1, op2) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(op1[i] ^ op2[i]);
    }
    return dwarr;
}

function dwarrNot(op1) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(~op1);
    }
    return dwarr;
}

/**
 * Left shift of big endian dword arrays (it could be the contents of a carr).
 * @param op1
 * @param nr
 * @returns {*}
 */
function dwarrLShift(op1, nr = 1) {
    if (nr < 0) throw new Error(ERR090);
    if (nr === 0) return op1;
    else if (nr === 1) {
        // Start from the lowest valued byte and
        // bring the carry bit of the previous shift.
        let dwarr = [];
        let carry = 0b0;
        for (let i = 0; i < op1.length; i++) {
            let dword = op1[op1.length - 1 - i];
            let hibit = (dword & 0x80000000) ? 1 : 0;
            dwarr.unshift((dword << 1) | carry);
            carry = hibit;
        }
        return dwarr;
    }
    else {
        // Repeat single bit shifts.
        for (let i = 0; i < nr; i++) {
            op1 = dwarrLShift(op1, 1);
        }
        return op1;
    }
}

/**
 * Right shift with sign extension of a big endian dword array (it could be the contents of a carr).
 * @param op1
 * @param nr
 * @returns {*}
 */
function dwarrRSShift(op1, nr = 1) {
    if (nr < 0) throw new Error(ERR090);
    if (nr === 0) return op1;
    else if (nr === 1) {
        // Start from the highest valued byte and
        // bring the carry bit of the previous shift.
        let dwarr = [];
        let carry = 0b0;
        let sign = op1[0] & 0x80000000;
        for (let i = 0; i < op1.length; i++) {
            let dword = op1[i];
            let lobit = (dword & 0b1) ? 0x80000000 : 0;
            if (i === 0) dwarr.unshift((dword >>> 1) | carry | sign);
            else dwarr.push((dword >> 1) | carry);
            carry = lobit;
        }
        return dwarr;
    }
    else {
        // Repeat single bit shifts.
        for (let i = 0; i < nr; i++) {
            op1 = dwarrRSShift(op1, 1);
        }
        return op1;
    }
}

/**
 * Right shift with zero extension of a big endian dword array (it could be the contents of a carr).
 * @param op1
 * @param nr
 * @returns {*}
 */
function dwarrRZShift(op1, nr = 1) {
    if (nr < 0) throw new Error(ERR090);
    if (nr === 0) return op1;
    else if (nr === 1) {
        // Start from the highest valued byte and
        // bring the carry bit of the previous shift.
        let dwarr = [];
        let carry = 0b0;
        for (let i = 0; i < op1.length; i++) {
            let dword = op1[i];
            let lobit = (dword & 0b1) ? 0x80000000 : 0;
            dwarr.push((dword >>> 1) | carry);
            carry = lobit;
        }
        return dwarr;
    }
    else {
        // Repeat single bit shifts.
        for (let i = 0; i < nr; i++) {
            op1 = dwarrRZShift(op1, 1);
        }
        return op1;
    }
}

function dwarrRRotate(dwarr, nr = 1) {

}

function dwarrRRotate(dwarr, nr = 1){

}

// Bit conversions
// Only on individual bytes.

function byte2bitarrB(byte) {
    if(byte === null) throw new Error(ERR100);
    if(typeof(byte) !== 'number') throw new Error(ERR110);
    let bitarr = [];
    let mask = 0b1;
    for(let i = 0; i < 8; i++) {
        bitarr.unshift(byte & mask);
        byte = byte >>> 1;
    }
    return bitarr;
}

function byte2bitarrL(byte) {
    if(byte === null) throw new Error(ERR100);
    if(typeof(byte) !== 'number') throw new Error(ERR110);
    let bitarr = [];
    let mask = 0b1;
    for(let i = 0; i < 8; i++) {
        bitarr.push(byte & mask);
        byte = byte >>> 1;
    }
    return bitarr;
}

function bitarr2byteB(bitarr){
    if(bitarr === null) throw new Error(ERR120);
    if(!Array.isArray(bitarr)) throw new Error(ERR130);
    if(bitarr.length !== 8) throw new Error(ERR140);
    let byte = 0;
    for(let i = 0; i < 8; i++) {
        byte = byte << 1;
        byte = byte | (bitarr[i] & 0b1);
    }
    return byte;
}

function bitarr2byteL(bitarr){
    if(bitarr === null) throw new Error(ERR120);
    if(!Array.isArray(bitarr)) throw new Error(ERR130);
    if(bitarr.length !== 8) throw new Error(ERR140);
    let byte = 0;
    for(let i = 0; i < 8; i++) {
        byte = byte << 1;
        byte = byte | (bitarr[8 - 1 -i] & 0b1);
    }
    return byte;
}

// ROTATE OPERATORS

function byteLRotate(byte, nr = 1) {
    if(nr < 0 ){
        return byteRRotate(byte, -1 * nr);
    }
    else if(nr === 0) {
        return byte;
    }
    else if(nr === 1) {
        // Fetch carry (highest bit).
        let carry = (byte & 0b10000000)?1:0;
        // Rotate and rotate the carry back in.
        return (byte << 1) & 0xff | carry;
    }
    else {
        // Reduce nr rotations to have the same effect.
        nr = nr % 8;
        for(let i = 0; i < nr; i++) {
            byte = byteLRotate(byte, 1);
        }
        return byte;
    }
}

function byteRRotate(byte, nr = 1) {
    if(nr < 0 ){
        return byteLRotate(byte, -1 * nr);
    }
    else if(nr === 0) {
        return byte;
    }
    else if(nr === 1) {
        // Fetch carry (lowest bit).
        let carry = (byte & 0b1)?0b10000000:0;
        // Rotate and rotate the carry back in.
        return (byte >>> 1) &0xff | carry;
    }
    else {
        // Reduce nr rotations to have the same effect.
        nr = nr % 8;
        for(let i = 0; i < nr; i++) {
            byte = byteRRotate(byte, 1);
        }
        return byte;
    }
}

function wordLRotate(word, nr = 1) {
    if(nr < 0 ){
        return wordRRotate(word, -1 * nr);
    }
    else if(nr === 0) {
        return word;
    }
    else if(nr === 1) {
        // Fetch carry (highest bit).
        let carry = (word & 0b1000000000000000)?1:0;
        // Rotate and rotate the carry back in.
        return (word << 1) & 0xffff | carry;
    }
    else {
        // Reduce nr rotations to have the same effect.
        nr = nr % 16;
        for(let i = 0; i < nr; i++) {
            word = wordLRotate(word, 1);
        }
        return word;
    }
}

function wordRRotate(word, nr = 1) {
    if(nr < 0 ){
        return wordLRotate(word, -1 * nr);
    }
    else if(nr === 0) {
        return word;
    }
    else if(nr === 1) {
        // Fetch carry (lowest bit).
        let carry = (word & 0b1)?0b1000000000000000:0;
        // Rotate and rotate the carry back in.
        return (word >>> 1) &0xffff | carry;
    }
    else {
        // Reduce nr rotations to have the same effect.
        nr = nr % 16;
        for(let i = 0; i < nr; i++) {
            word = wordRRotate(word, 1);
        }
        return word;
    }
}

function dwordLRotate(dword, nr = 1) {
    if(nr < 0 ){
        return dwordRRotate(dword, -1 * nr);
    }
    else if(nr === 0) {
        return dword;
    }
    else if(nr === 1) {
        // Fetch carry (highest bit).
        let carry = (dword & 0b10000000000000000000000000000000)?1:0;
        // Rotate and rotate the carry back in.
        return (dword << 1) & 0xffffffff | carry;
    }
    else {
        // Reduce nr rotations to have the same effect.
        nr = nr % 32;
        for(let i = 0; i < nr; i++) {
            dword = dwordLRotate(dword, 1);
        }
        return dword;
    }
}

function dwordRRotate(dword, nr = 1) {
    if(nr < 0 ){
        return dwordLRotate(dword, -1 * nr);
    }
    else if(nr === 0) {
        return dword;
    }
    else if(nr === 1) {
        // Fetch carry (lowest bit).
        let carry = (dword & 0b1)?0b10000000000000000000000000000000:0;
        // Rotate and rotate the carry back in.
        return (dword >>> 1) &0xffffffff | carry;
    }
    else {
        // Reduce nr rotations to have the same effect.
        nr = nr % 32;
        for(let i = 0; i < nr; i++) {
            dword = dwordRRotate(dword, 1);
        }
        return dword;
    }
}

//////////
// PADDING
//////////

// Returns a padded copy of the array.
// Padding is ALWAYS added to prevent ambiguities.
// If a block does not need padding, a full block of padding is added.
//
// RFC1321 step 3.1
// ISO/IEC 797-1 Padding Method 2
function paddBitarrBits(bitarr, bitBlockLen) {
    if (bitarr === null) throw Error(ERR150);
    if (!Array.isArray(bitarr)) throw Error(ERR160);
    if(bitBlockLen <= 0) throw Error(ERR170);
    // Clone the array first.
    bitarr = bitarr.slice();
    let padLen = bitBlockLen - (bitarr.length % bitBlockLen);
    // We ALWAYS add padding.
    if(padLen <= 0) padLen = bitBlockLen;
    bitarr.push(1);
    padLen--;
    while (padLen > 0) {
        bitarr.push(0);
        padLen--;
    }
    return bitarr;
}

// It is assumed that padding is ALWAYS there, otherwise padding/unpadding would be ambiguous.
function unpaddBitarrBits(bitarr){
    if (bitarr === null) throw Error(ERR180);
    if (!Array.isArray(bitarr)) throw Error(ERR190);
    let i = bitarr.length - 1;
    while(i >= 0 && bitarr[i] === 0) i--;
    if(i < 0 || bitarr[i] !== 1) throw Error(ERR250);
    return bitarr.slice(0, i);
}

// Padd a byte aray with bit padding. Padding is done one byte boundaries here (not within a byte).
function paddBarrBits(barr, byteBlockLen) {
    if (barr === null) throw Error(ERR200);
    if (!Array.isArray(barr)) throw Error(ERR210);
    if(byteBlockLen < 0) throw Error(ERR220);
    let padLen = byteBlockLen - (barr.length * byteBlockLen);
    // Clone the array first.
    barr = barr.slice();
    // We ALWAYS add padding.
    if(padLen <= 0) padLen = byteBlockLen;
    barr.push(0b10000000);
    padLen--;
    while (padLen > 0) {
        barr.push(0);
        padLen--;
    }
}

// It is assumed that padding is ALWAYS there, otherwise padding/unpadding would be ambiguous.
function unpaddBarrBits(barr) {
    if (barr === null) throw Error(ERR230);
    if (!Array.isArray(barr)) throw Error(ERR240);
    let i = barr.length - 1;
    while(i >= 0 && barr[i] === 0) i--;
    if(i < 0 || barr[i] !== 0b10000000) throw Error(ERR250);
    return barr.slice(0, i);
}


function paddPkcs7(barr, blockByteLen) {
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
function barr2blocks(barr, byteBlockLen) {
}

function blocks2barr(blocks) {
}


export {
    barr2rstr as barr2rstr,
    rstr2barr as rstr2barr,
    barr2warrL as barr2warrL,
    barr2warrB as barr2warrB,
    warr2barrL as warr2barrL,
    warr2barrB as warr2barrB,
    barr2dwarrL as barr2dwarrL,
    barr2dwarrB as barr2dwarrB,
    dwarr2barrL as dwarr2barrL,
    dwarr2barrB as dwarr2barrB,
    barr2carrL as barr2carrL,
    barr2carrB as barr2carrB,
    carr2barrL as carr2barrL,
    carr2barrB as carr2barrB,
    dwarrLShift as dwarrLShift,
    dwarrRSShift as dwarrRSShift,
    dwarrRZShift as dwarrRZShift,
    isConsistentCarr as isConsistentCarr,
    dwarrAnd as dwarrAnd,
    dwarrOr as dwarrOr,
    dwarrXor as dwarrXor,
    dwarrNot as dwarrNot,
    byte2bitarrB as byte2bitarrB,
    byte2bitarrL as byte2bitarrL,
    bitarr2byteL as bitarr2byteL,
    bitarr2byteB as bitarr2byteB,
    paddBitarrBits as paddBitarrBits,
    unpaddBitarrBits as unpaddBitarrBits,
    byteLRotate as byteLRotate,
    byteRRotate as byteRRotate,
    wordLRotate as wordLRotate,
    wordRRotate as wordRRotate,
    dwordLRotate as dwordLRotate,
    dwordRRotate as dwordRRotate,
}
