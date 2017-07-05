const ERR010 = "Bytes/010: Expected a string argument.";
const ERR020 = "Bytes/020: Expected an array argument.";
const ERR030 = "Bytes/030: Expected a number argument.";
const ERR040 = (len) => `Bytes/040: Array length should be a multiple of ${len}.`;
const ERR050 = "Bytes/050: Number of shifts should be >= 0.";
const ERR060 = (len) => `Bytes/060: Array length should be exactly ${len}.`;
const ERR070 = "Bytes/070: The block length should be > 0.";
const ERR080 = "Bytes/080: No bit padding found.";

// Raw string.

/**
 * Raw string to byte array.
 */
function rstr2barr(rstr) {
    if (!(typeof(rstr) === 'string')) throw new Error(ERR010);
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
    if (!Array.isArray(barr)) throw new Error(ERR020);
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
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 2) throw new Error(ERR040(2));
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
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 2) throw new Error(ERR040(2));
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
    if (!Array.isArray(warr)) throw new Error(ERR020);
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
    if (!Array.isArray(warr)) throw new Error(ERR020);
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
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 4) throw new Error(ERR040(4));
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
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 4) throw new Error(ERR040(4));
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
    if (!Array.isArray(dwarr)) throw new Error(ERR020);
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
    if (!Array.isArray(dwarr)) throw new Error(ERR020);
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
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (!carrByteSize || carrByteSize % 4) throw new Error(ERR040(4));
    if (barr.length % carrByteSize) throw new Error(ERR040(carrByteSize));
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
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (!carrByteSize || carrByteSize % 4) throw new Error(ERR040(4));
    if (barr.length % carrByteSize) throw new Error(ERR040(carrByteSize));
    let carr = [];
    for (let i = 0; i < barr.length; i += carrByteSize) {
        let subarr = barr.slice(i, i + carrByteSize);
        let dwarr = barr2dwarrB(subarr);
        carr.push(dwarr);
    }
    return carr;
}

function carr2barrL(carr) {
    if (!Array.isArray(carr)) throw new Error(ERR020);
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
    if (!Array.isArray(carr)) throw new Error(ERR020);
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
    if (nr < 0) throw new Error(ERR050);
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
    if (nr < 0) throw new Error(ERR050);
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
    if (nr < 0) throw new Error(ERR050);
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
    if(typeof(byte) !== 'number') throw new Error(ERR030);
    let bitarr = [];
    let mask = 0b1;
    for(let i = 0; i < 8; i++) {
        bitarr.unshift(byte & mask);
        byte = byte >>> 1;
    }
    return bitarr;
}

function byte2bitarrL(byte) {
    if(typeof(byte) !== 'number') throw new Error(ERR030);
    let bitarr = [];
    let mask = 0b1;
    for(let i = 0; i < 8; i++) {
        bitarr.push(byte & mask);
        byte = byte >>> 1;
    }
    return bitarr;
}

function bitarr2byteB(bitarr){
    if(!Array.isArray(bitarr)) throw new Error(ERR020);
    if(bitarr.length !== 8) throw new Error(ERR060(8));
    let byte = 0;
    for(let i = 0; i < 8; i++) {
        byte = byte << 1;
        byte = byte | (bitarr[i] & 0b1);
    }
    return byte;
}

function bitarr2byteL(bitarr){
    if(!Array.isArray(bitarr)) throw new Error(ERR020);
    if(bitarr.length !== 8) throw new Error(ERR060(8));
    let byte = 0;
    for(let i = 0; i < 8; i++) {
        byte = byte << 1;
        byte = byte | (bitarr[8 - 1 -i] & 0b1);
    }
    return byte;
}

function barr2bitarrB(barr) {
    // TODO TESTS
    let bitarr = [];
    for(let i = 0; i < barr.length; i++) {
        bitarr = bitarr.concat(byte2bitarrB(barr[i]));
    }
    return bitarr;
}

function barr2bitarrL(barr) {
    // TODO TESTS
    let bitarr = [];
    for(let i = 0; i < barr.length; i++) {
        bitarr = bitarr.concat(byte2bitarrL(barr[i]));
    }
    return bitarr;
}

function bitarr2barrB(bitarr) {
    // TODO TESTS
    let barr = [];
    let byteLen = bitarr.length / 8;
    for(let i = 0; i < byteLen; i++) {
        barr = barr.concat(bitarr2byteB(bitarr.slice(i * 8, (i * 8) + 8)));
    }
    return barr;
}

function bitarr2barrL(bitarr) {
    // TODO TESTS
    let barr = [];
    let byteLen = bitarr.length / 8;
    for(let i = 0; i < byteLen; i++) {
        barr = barr.concat( bitarr2byteL(bitarr.slice(i * 8, (i*8) + 8)));
    }
    return barr;

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
    if (!Array.isArray(bitarr)) throw Error(ERR020);
    if(bitBlockLen <= 0) throw Error(ERR070);
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
    if (!Array.isArray(bitarr)) throw Error(ERR020);
    let i = bitarr.length - 1;
    while(i >= 0 && bitarr[i] === 0) i--;
    if(i < 0 || bitarr[i] !== 1) throw Error(ERR080);
    return bitarr.slice(0, i);
}

// Padd a byte aray with bit padding. Padding is done one byte boundaries here (not within a byte).
function paddBarrBits(barr, byteBlockLen) {
    if (!Array.isArray(barr)) throw Error(ERR020);
    if(byteBlockLen < 0) throw Error(ERR070);
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
    if (!Array.isArray(barr)) throw Error(ERR020);
    let i = barr.length - 1;
    while(i >= 0 && barr[i] === 0) i--;
    if(i < 0 || barr[i] !== 0b10000000) throw Error(ERR080);
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
    barr2bitarrB as barr2bitarrB,
    barr2bitarrL as barr2bitarrL,
    bitarr2barrB as bitarr2barrB,
    bitarr2barrL as bitarr2barrL
}
