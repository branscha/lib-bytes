const ERR010 = "Bytes/010: Expected a string argument.";
const ERR020 = "Bytes/020: Expected an array argument.";
const ERR030 = "Bytes/030: Expected a number argument.";
const ERR040 = (len) => `Bytes/040: Array length should be a multiple of ${len}.`;
const ERR050 = "Bytes/050: Number of shifts should be >= 0.";
const ERR060 = (len) => `Bytes/060: Array length should be exactly ${len}.`;
const ERR070 = "Bytes/070: The block length should be > 0.";
const ERR080 = "Bytes/080: Inconsistent padding.";
const ERR090 = "Bytes/090: Array length should be a multiple of the block length.";
const ERR100 = "Bytes/100: Expected an array of arrays.";
const ERR110 = "Bytes/110: Padding length max. 255 exceeded.";
const ERR120 = "Bytes/120: Padding length max. 8 exceeded.";

// RAW STRING
/////////////

/**
 * Raw string (each character represents a single byte)  to byte array with values 0-255.
 * The high order byte of the character (which is 16 bits) is ignored.
 * @param {String} rstr - A raw string.
 * @returns {Array.<number>} - A byte array.
 * @public
 */
export function rstr2barr(rstr) {
    if (!(typeof(rstr) === 'string')) throw new Error(ERR010);
    let barr = [];
    for (let i = 0; i < rstr.length; i++) {
        // Only keep the lower byte ignore higher byte.
        let byte = rstr.charCodeAt(i) & 0xff;
        barr.push(byte);
    }
    return barr;
}

/**
 * Byte array to raw string (each character represents a single byte).
 * Only the low order byte of the character is taken into account the higher order bytes are ignored.
 * @param {Array.<Number>} barr - A byte array.
 * @returns {String} - A raw string.
 * @public
 */
export function barr2rstr(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    let rstr = "";
    for (let i = 0; i < barr.length; i++) {
        // Only keep the lower byte ignore higher byte.
        let byte = barr[i] & 0xff;
        rstr = rstr + String.fromCharCode(byte);
    }
    return rstr;
}

// WORD ARRAY
//////////////

/**
 * Convert a byte array into a 16-bit word array. The bytes are organized in little endian order.
 * Each pair of bytes is converted into a 16-bit word, the first byte is the low order byte, the second byte is the high order byte.
 * @param {Array.<Number>} barr - Byte array
 * @returns {Array.<Number>} - Word array.
 * @public
 */
export function barr2warrL(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 2) throw new Error(ERR040(2));
    let warr = [];
    for (let i = 0; i < barr.length; i += 2) {
        let byte1 = barr[i] & 0xff;
        let byte2 = barr[i + 1] & 0xff;
        let word = (byte2 << 8) | byte1;
        warr.push(word);
    }
    return warr;
}

/**
 * Convert a byte array into a 16-bit word array. The bytes are organized in big endian order.
 * Each pair of bytes is converted into a 16-bit word, the first byte is the high order byte, the second byte is the low order byte.
 * @param {Array.<Number>} barr - Byte array
 * @returns {Array.<Number>} - Word array.
 * @public
 */
export function barr2warrB(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 2) throw new Error(ERR040(2));
    let warr = [];
    for (let i = 0; i < barr.length; i += 2) {
        let byte1 = barr[i] & 0xff;
        let byte2 = barr[i + 1] & 0xff;
        let word = (byte1 << 8) | byte2;
        warr.push(word);
    }
    return warr;
}

/**
 * Convert a 16-bit word array into a byte array. The bytes are organized in little endian order.
 * Each 16-bit word is converted into a pair of bytes, the first byte is the low order byte, the second byte is the high order byte.
 * @param {Array.<Number>} warr - A word array, 16 bits will be used.
 * @returns {Array.<Number>} - Byte array, little endian.
 * @public
 */
export function warr2barrL(warr) {
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

/**
 * Convert a 16-bit word array into a byte array. The bytes are organized in big endian order.
 * Each 16-bit word is converted into a pair of bytes, the first byte is the high order byte, the second byte is the low order byte.
 * @param {Array.<Number>} warr - A word array, 16 bits will be used.
 * @returns {Array.<Number>} - Byte array.
 * @public
 */
export function warr2barrB(warr) {
    if (!Array.isArray(warr)) throw new Error(ERR020);
    let barr = [];
    for(let i = 0; i < warr.length; i++) {
        let word = warr[i] & 0xffff;
        let loByte = word & 0xff;
        let hiByte = word >>> 8;
        barr.push(hiByte, loByte);
    }
    return barr;
}

// DWORD ARRAY
//////////////

/**
 * Convert a byte array into a 32-bit word (aka. dword) array. The bytes are organized in little endian order.
 * Each quadruple of bytes is converted into a 32-bit word, the first byte is the low order byte.
 * @param {Array.<Number>} barr - Byte array.
 * @returns {Array.<Number>} - Dword array.
 * @public
 */
export function barr2dwarrL(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 4) throw new Error(ERR040(4));
    let warr = [];
    for (let i = 0; i < barr.length; i += 4) {
        let byte1 = barr[i] & 0xff;
        let byte2 = barr[i + 1] & 0xff;
        let byte3 = barr[i + 2] & 0xff;
        let byte4 = barr[i + 3] & 0xff;
        let dword = (byte4 << 24) | (byte3 << 16) | (byte2 << 8) | byte1;
        warr.push(dword);
    }
    return warr;
}

/**
 * Convert a byte array into a 32-bit word (aka. dword) array. The bytes are organized in big endian order.
 * Each quadruple of bytes is converted into a 32-bit word, the first byte is the high order byte.
 * @param {Array.<Number>} barr - Byte array.
 * @returns {Array.<Number>} - Dword array.
 * @public
 */
export function barr2dwarrB(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (barr.length % 4) throw new Error(ERR040(4));
    let warr = [];
    for (let i = 0; i < barr.length; i += 4) {
        let byte1 = barr[i] & 0xff;
        let byte2 = barr[i + 1] & 0xff;
        let byte3 = barr[i + 2] & 0xff;
        let byte4 = barr[i + 3] & 0xff;
        let dword = (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
        warr.push(dword);
    }
    return warr;
}

/**
 * Convert a 32-bit word (aka. dword) array into a byte array. The bytes are organized in little endian order.
 * Each 32-bit word is converted into a quadruple of bytes, the first byte is the low order byte.
 * @param {Array.<Number>} dwarr - Dword array.
 * @returns {Array.<Number>} - Byte array.
 * @public
 */
export function dwarr2barrL(dwarr) {
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

/**
 * Convert a 32-bit word (aka. dword) array into a byte array. The bytes are organized in big endian order.
 * Each 32-bit word is converted into a quadruple of bytes, the first byte is the low order byte.
 * @param {Array.<Number>} dwarr - Dword array.
 * @returns {Array.<Number>} - Byte array.
 * @public
 */
export function dwarr2barrB(dwarr) {
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

// COMPOSITE ARRAY
//////////////////

/**
 * Convert a byte array into a composite array. The bytes are organized in little endian order.
 * A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
 * A composite is represented by a big endian 32-bit dword array.
 * @param {Array.<Number>} barr - Byte array.
 * @param {Number} carrByteSize - The length of a composite in bytes, should be a multiple of 4.
 * @returns {Array.<Number>} - Composite array.
 * @public
 */
export function barr2carrL(barr, carrByteSize) {
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

/**
 * Convert a byte array into a composite array. The bytes are organized in big endian order.
 * A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
 * A composite is represented by a big endian 32-bit dword array.
 * @param {Array.<Number>} barr - Byte array.
 * @param {Number} carrByteSize - The length of a composite in bytes, should be a multiple of 4.
 * @returns {Array.<Number>} - Composite array.
 * @public
 */
export function barr2carrB(barr, carrByteSize) {
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

/**
 * Convert a composite array into a byte array. The bytes are organized in little endian order.
 * A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
 * A composite is represented by a big endian 32-bit dword array.
 * @param {Array.<Number>} carr - Composite array.
 * @returns {Array.<Number>} - Byte array.
 * @public
 */
export function carr2barrL(carr) {
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

/**
 * Convert a composite array into a byte array. The bytes are organized in big endian order.
 * A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
 * A composite is represented by a big endian 32-bit dword array.
 * @param {Array.<Number>} carr - Composite array.
 * @returns {Array.<Number>} - Byte array.
 * @public
 */
export function carr2barrB(carr) {
    if (!Array.isArray(carr)) throw new Error(ERR020);
    let barr = [];
    for(let i = 0; i < carr.length; i++) {
        let subarr = dwarr2barrB(carr[i]);
        barr = barr.concat(subarr);
    }
    return barr;
}

/**
 * A composite array (carr) represents an array of super-words of the same size.
 * A super-word is represented by a big endian 32-bit dword array (dwarr).
 * This function test if a data structure can pass as a valid composite array.
 * @param carr
 * @returns {boolean}
 */
export function isConsistentCarr(carr) {
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

// DWORD ARRAY FUNCTIONS
/////////////////////////

/**
 * Verify if two 32-bit dword arrays (aka. dwarr) are compatible to act as operands in one of the bit operators.
 * The test is NOT automatically called in the bit operators for reasons of efficiency.
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - First operand.
 * @param {Array<Number>} op2 - Second operand.
 * @returns {boolean} - Indicates whether op1 and op2 are arrays of the same length.
 */
export function isCompatibleDwarrs(op1, op2) {
    return op1 !== null && op2 !== null && Array.isArray(op1) && Array.isArray(op2) && op1.length === op2.length;
}

/**
 * Bitwise AND on two 32-bit dword arrays (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - First operand, a super-word dwarr.
 * @param {Array<Number>} op2 - Second operand a super-word dwarr.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrAnd(op1, op2) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(op1[i] & op2[i]);
    }
    return dwarr;
}

/**
 * Bitwise OR on two 32-bit dword arrays (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - First operand, a super-word dwarr.
 * @param {Array<Number>} op2 - Second operand a super-word dwarr.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrOr(op1, op2) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(op1[i] | op2[i]);
    }
    return dwarr;
}

/**
 * Bitwise XOR on two 32-bit dword arrays (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - First operand, a super-word dwarr.
 * @param {Array<Number>} op2 - Second operand a super-word dwarr.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrXor(op1, op2) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(op1[i] ^ op2[i]);
    }
    return dwarr;
}

/**
 * Bitwise NOT of a 32-bit dword array (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - Operand, a super-word dwarr.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrNot(op1) {
    let dwarr = [];
    for (let i = 0; i < op1.length; i++) {
        dwarr.push(~op1);
    }
    return dwarr;
}

/**
 * Bitwise LEFT SHIFT of a 32-bit dword array (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - Operand, a super-word dwarr.
 * @param {Number} nr - The number of shifts.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrLShift(op1, nr = 1) {
    if (nr < 0) throw new Error(ERR050);
    if (nr === 0) return op1;
    else if (nr === 1) {
        // Start from the lowest valued byte and
        // bring the carry bit of the previous shift.
        let dwarr = [];
        let carry = 0b0;
        for (let i = 0; i < op1.length; i++) {
            let dword = op1[op1.length - 1 - i];
            let hiBit = (dword & 0x80000000) ? 1 : 0;
            dwarr.unshift((dword << 1) | carry);
            carry = hiBit;
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
 * Bitwise RIGHT SHIFT with sign extension of a 32-bit dword array (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - Operand, a super-word dwarr.
 * @param {Number} nr - The number of shifts.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrRSShift(op1, nr = 1) {
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
 * Bitwise RIGHT SHIFT with zero extension of a 32-bit dword array (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} op1 - Operand, a super-word dwarr.
 * @param {Number} nr - The number of shifts.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrRZShift(op1, nr = 1) {
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

/**
 * Bitwise RIGHT ROTATE of a 32-bit dword array (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} dwarr - Operand, a super-word dwarr.
 * @param {Number} nr - The number of shifts.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrRRotate(dwarr, nr = 1) {
    if(nr < 0) {
        return dwarrLRotate(dwarr, -1 * nr);
    }
    else if(nr === 0) {
        return dwarr;
    }
    else if(nr === 1) {
        let loByteIndex = dwarr.length -1;
        let lobit = (dwarr[loByteIndex] & 0b1)?0x80000000:0;
        dwarr = dwarrRZShift(dwarr, 1);
        // Integrate the lobit value into the hibit.
        dwarr[0] = dwarr[0] | lobit;
        return dwarr;
    }
    else {
        for(let i = 0; i < nr; i++){
            dwarr = dwarrRRotate(dwarr, 1);
        }
        return dwarr;
    }
}

/**
 * Bitwise LEFT ROTATE of a 32-bit dword array (aka. dwarr).
 * This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).
 * @param {Array.<Number>} dwarr - Operand, a super-word dwarr.
 * @param {Number} nr - The number of shifts.
 * @returns {Array.<Number>} - A super-word dwarr, the result of the bitwise operator.
 */
export function dwarrLRotate(dwarr, nr = 1){
    if(nr < 0) {
        return dwarrRRotate(dwarr, -1 * nr);
    }
    else if(nr === 0) {
        return dwarr;
    }
    else if(nr === 1) {
        let hibit = (dwarr[0] & 0x80000000)?1:0;
        dwarr = dwarrLShift(dwarr, 1);
        // Integrate the hibit value into the lobit.
        let loByteIndex = dwarr.length - 1;
        dwarr[loByteIndex] = dwarr[loByteIndex] | hibit;
        return dwarr;
    }
    else {
        for(let i = 0; i < nr; i++){
            dwarr = dwarrLRotate(dwarr, 1);
        }
        return dwarr;
    }
}

// BIT ARRAY
////////////

/**
 * Convert a byte to a bit array, where the bits are big endian, the most important bit first.
 * @param {Number} byte - The byte to decompose.
 * @returns {Array.<Number>} - An array of bits.
 */
export function byte2bitarrB(byte) {
    if(typeof(byte) !== 'number') throw new Error(ERR030);
    let bitarr = [];
    let mask = 0b1;
    for(let i = 0; i < 8; i++) {
        bitarr.unshift(byte & mask);
        byte = byte >>> 1;
    }
    return bitarr;
}

/**
 * Convert a byte to a bit array, where the bits are little endian, the least important bit first.
 * @param {Number} byte - The byte to decompose.
 * @returns {Array.<Number>} - An array of bits.
 */
export function byte2bitarrL(byte) {
    if(typeof(byte) !== 'number') throw new Error(ERR030);
    let bitarr = [];
    let mask = 0b1;
    for(let i = 0; i < 8; i++) {
        bitarr.push(byte & mask);
        byte = byte >>> 1;
    }
    return bitarr;
}

/**
 * Convert a bit array of exactly 8 bits into a byte. The bits in the array  are organized in a big endian way.
 * @param {Array.<Number>} bitarr - The array of bits.
 * @returns {number} - Byte.
 */
export function bitarr2byteB(bitarr){
    if(!Array.isArray(bitarr)) throw new Error(ERR020);
    if(bitarr.length !== 8) throw new Error(ERR060(8));
    let byte = 0;
    for(let i = 0; i < 8; i++) {
        byte = byte << 1;
        byte = byte | (bitarr[i] & 0b1);
    }
    return byte;
}

/**
 * Convert a bit array of exactly 8 bits into a byte. The bits in the array  are organized in a little endian way.
 * @param {Array.<Number>} bitarr - The array of bits.
 * @returns {number} - Byte.
 */
export function bitarr2byteL(bitarr){
    if(!Array.isArray(bitarr)) throw new Error(ERR020);
    if(bitarr.length !== 8) throw new Error(ERR060(8));
    let byte = 0;
    for(let i = 0; i < 8; i++) {
        byte = byte << 1;
        byte = byte | (bitarr[8 - 1 -i] & 0b1);
    }
    return byte;
}

/**
 * Convert a byte array into a bit array. The bits are organized in big endian order where the most important bit
 * comes first in the list.
 * @param {Array.<Number>} barr - A byte array.
 * @returns {Array.<Number>} A bit array.
 */
export function barr2bitarrB(barr) {
    if(!Array.isArray(barr)) throw new Error(ERR020);
    let bitarr = [];
    for(let i = 0; i < barr.length; i++) {
        bitarr = bitarr.concat(byte2bitarrB(barr[i]));
    }
    return bitarr;
}

/**
 * Convert a byte array into a bit array. The bits are organized in little endian order where the least important bit
 * comes first in the list.
 * @param {Array.<Number>} barr - A byte array.
 * @returns {Array.<Number>} A bit array.
 */
export function barr2bitarrL(barr) {
    if(!Array.isArray(barr)) throw new Error(ERR020);
    let bitarr = [];
    for(let i = 0; i < barr.length; i++) {
        bitarr = bitarr.concat(byte2bitarrL(barr[i]));
    }
    return bitarr;
}

/**
 * Convert a bit array to a byte array, the bits are organized big endian order, the most important bits come first.
 * @param {Array.<Number>} bitarr - A bit array.
 * @returns {Array.<Number>}  A byte array.
 */
export function bitarr2barrB(bitarr) {
    if(!Array.isArray(bitarr)) throw new Error(ERR020);
    let barr = [];
    let byteLen = bitarr.length / 8;
    for(let i = 0; i < byteLen; i++) {
        barr = barr.concat(bitarr2byteB(bitarr.slice(i * 8, (i * 8) + 8)));
    }
    return barr;
}

/**
 * Convert a bit array to a byte array, the bits are organized little endian order, the least important bits come first.
 * @param {Array.<Number>} bitarr - A bit array.
 * @returns {Array.<Number>}  A byte array.
 */
export function bitarr2barrL(bitarr) {
    if(!Array.isArray(bitarr)) throw new Error(ERR020);
    let barr = [];
    let byteLen = bitarr.length / 8;
    for(let i = 0; i < byteLen; i++) {
        barr = barr.concat( bitarr2byteL(bitarr.slice(i * 8, (i*8) + 8)));
    }
    return barr;
}

// ROTATION
////////////

/**
 * Rotate the bits of a byte to the left, the high order bit will re-appear as the low order bit.
 * @param {Number} byte - The bit values to rotate.
 * @param {Number} nr - The number of bits to rotate, negative number rotates the other direction.
 * @returns {Number} - A rotated byte.
 */
export function byteLRotate(byte, nr = 1) {
    if(typeof(byte) !== 'number') throw new Error(ERR030);
    if(nr < 0 ){
        return byteRRotate(byte, -1 * nr);
    }
    else {
        // Put two copies of the byte in a 16-bit word.
        // The we shift left and the result is in the upper byte.
        // So we use the redundant space to have a complete copy.
        return ((((byte << 8 | byte) << (nr % 8)) >>> 8) & 0xff);
    }
}

/**
 * Rotate the bits of a byte to the right, the low order bit will re-appear as the high order bit.
 * @param {Number} byte - The bit values to rotate.
 * @param {Number} nr - The number of bits to rotate, negative number rotates the other direction.
 * @returns {Number} - A rotated byte.
 */
export function byteRRotate(byte, nr = 1) {
    if(typeof(byte) !== 'number') throw new Error(ERR030);
    if(nr < 0 ){
        return byteLRotate(byte, -1 * nr);
    }
    else {
        // Put two copies of the byte in a 16-bit word.
        // The we shift right and the result is in the lower byte.
        // So we use the redundant space to have a complete copy.
        return (((byte << 8 | byte) >>> (nr % 8)) & 0xff);
    }
}

/**
 * Rotate the bits of a 16-bit word to the left, the high order bit will re-appear as the low order bit.
 * @param {Number} word - The bit values to rotate.
 * @param {Number} nr - The number of bits to rotate, negative number rotates the other direction.
 * @returns {Number} - A rotated word.
 */
export function wordLRotate(word, nr = 1) {
    if(typeof(word) !== 'number') throw new Error(ERR030);
    if(nr < 0 ){
        return wordRRotate(word, -1 * nr);
    }
    else {
        // Put two copies of the word in a 32-bit dword.
        // The we shift left and the result is in the upper word.
        // So we use the redundant space to have a complete copy.
        return ((((word << 16 | word) << (nr % 16)) >>> 16) & 0xffff);
    }
}

/**
 * Rotate the bits of a 16-bit word to the right, the low order bit will re-appear as the high order bit.
 * @param {Number} word - The bit values to rotate.
 * @param {Number} nr - The number of bits to rotate, negative number rotates the other direction.
 * @returns {Number} - A rotated word.
 */
export function wordRRotate(word, nr = 1) {
    if(typeof(word) !== 'number') throw new Error(ERR030);
    if(nr < 0 ){
        return wordLRotate(word, -1 * nr);
    }
    else {
        // Put two copies of the word in a 32-bit dword.
        // The we shift right and the result is in the lower word.
        // So we use the redundant space to have a complete copy.
        return (((word << 16 | word) >>> (nr % 16)) & 0xffff);
    }
}

/**
 * Rotate the bits of a 32-bit dword to the left, the high order bit will re-appear as the low order bit.
 * @param {Number} dword - The bit values to rotate.
 * @param {Number} nr - The number of bits to rotate, negative number rotates the other direction.
 * @returns {Number} - A rotated dword.
 */
export function dwordLRotate(dword, nr = 1) {
    if(typeof(dword) !== 'number') throw new Error(ERR030);
    nr = nr % 32;
    if(nr < 0 ){
        return dwordRRotate(dword, -1 * nr);
    }
    else if(nr <= 16) {
        // Put a copy of the high order 16-bit word in a separate variable.
        // Shift both dword and the copy, the high order word of the copy will contain the bits that were shifted out.
        // Since the max bit storage in JavaScript is 32 bits we can only apply this trick with half of the bits.
        let overflow = ((dword >>> 16) & 0xffff) << nr;
        return (dword << nr) | (overflow >>> 16);
    }
    else {
        // Rotate the other way with less moves.
        return dwordRRotate(dword, 32 - nr);
    }
}

/**
 * Rotate the bits of a 32-bit dword to the right, the low order bit will re-appear as the high order bit.
 * @param {Number} dword - The bit values to rotate.
 * @param {Number} nr - The number of bits to rotate, negative number rotates the other direction.
 * @returns {Number} - A rotated dword.
 */
export function dwordRRotate(dword, nr = 1) {
    if(typeof(dword) !== 'number') throw new Error(ERR030);
    nr = nr % 32;
    if(nr < 0 ){
        return dwordLRotate(dword, -1 * nr);
    }
    else if(nr <= 16) {
        // Put a copy of the low order 16-bit word in a separate variable.
        // Shift both dword and the copy, the low order word of the copy will contain the bits that were shifted out.
        // Since the max bit storage in JavaScript is 32 bits we can only apply this trick with half of the bits.
        let overflow = ((dword << 16) >> nr) & 0xffff;
        return (dword >>> nr) | overflow;
    }
    else {
        // Rotate the other way with less moves.
        return dwordLRotate(dword, 32 - nr);
    }
}

// PADDING
//////////

/**
 * Apply bit padding to an array of bits. Padding is ALWAYS added. It returns a padded array.
 * It follows standards RFC1321 step 3.1 and ISO/IEC 797-1 Padding Method 2.
 * @param {Array.<Number>} bitarr - A bit array.
 * @param {Number} bitBlockLen - The block length in nr of bits. Padding is added so that the total length is a multiple of the bit block length.
 * @param {Number} minBitPadLen - Minimum padding size, sometimes one wants to add information in the padding region, this ensures there is enough room.
 * @returns {Array.<Number>} - A padded bit array.
 */
export function paddBitarrBits(bitarr, bitBlockLen, minBitPadLen = 0) {
    if (!Array.isArray(bitarr)) throw Error(ERR020);
    if(bitBlockLen <= 0) throw Error(ERR070);
    // Clone the array first.
    bitarr = bitarr.slice();
    let padLen = bitBlockLen - (bitarr.length % bitBlockLen);
    // We ALWAYS add padding.
    if(padLen <= 0) padLen = bitBlockLen;
    // Add more padding if the padding is smaller than the required size.
    while(padLen < minBitPadLen) padLen += bitBlockLen;
    // Append the padding.
    bitarr.push(1);
    padLen--;
    while (padLen > 0) {
        bitarr.push(0);
        padLen--;
    }
    return bitarr;
}

/**
 * Remove the bit padding from an array of bits. It is assumed that padding is present.
 * @param {Array.<Number>} bitarr - A padded bit array.
 * @returns {Array.<Number>} - A bit array with the padding removed.
 */
export function unpaddBitarrBits(bitarr){
    if (!Array.isArray(bitarr)) throw Error(ERR020);
    let i = bitarr.length - 1;
    while(i >= 0 && bitarr[i] === 0) i--;
    if(i < 0 || bitarr[i] !== 1) throw Error(ERR080);
    return bitarr.slice(0, i);
}

/**
 * Add bit padding to a byte array. Padding is done on byte boundaries (not within a byte).
 * Padding is ALWAYS added, it follows spec. ISO/IEC 7816-4.
 * @param {Array.<Number>} barr - A byte array.
 * @param {Number} byteBlockLen - The block length in bytes. The padded array length will be a multiple of the block length.
 * @param {Number} minBytePadLen - The minimum padding size, in case one wants to add extra information in the padding region.
 * @returns {Array.<Number>} The padded byte array.
 */
export function paddBarrBits(barr, byteBlockLen, minBytePadLen = 0) {
    if (!Array.isArray(barr)) throw Error(ERR020);
    if(byteBlockLen < 0) throw Error(ERR070);
    let padLen = byteBlockLen - (barr.length % byteBlockLen);
    // We ALWAYS add padding.
    if(padLen <= 0) padLen = byteBlockLen;
    while(padLen < minBytePadLen) padLen += byteBlockLen;
    // Clone the array first.
    barr = barr.slice();
    barr.push(0b10000000);
    padLen--;
    while (padLen > 0) {
        barr.push(0);
        padLen--;
    }
}

/**
 * Remove bit padding from a byte array. It is assumed that padding is ALWAYS present and that padding was done on
 * byte boundaries (not within a byte).
 * @param {Array.<Number>} barr - A byte array with padding.
 * @returns {Array.<Number>} - Byte array without padding.
 */
export function unpaddBarrBits(barr) {
    if (!Array.isArray(barr)) throw Error(ERR020);
    let i = barr.length - 1;
    while(i >= 0 && barr[i] === 0) i--;
    if(i < 0 || barr[i] !== 0b10000000) throw Error(ERR080);
    return barr.slice(0, i);
}

/**
 * Add PKCS7 padding to a byte array. Padding can be maximum 255 bytes long.
 * @param {Array.<Number>} barr - A byte array.
 * @param {Number} blockByteLen - The block length in bytes. The padded array length will be a multiple of the block length.
 * @returns {Array.<Number>} The padded byte array.
 */
export function paddPkcs7(barr, blockByteLen) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (blockByteLen <= 0) throw new Error(ERR070);
    if(blockByteLen > 255) throw new Error(ERR110);
    let padLen = blockByteLen - (barr.length % blockByteLen);
    // We ALWAYS add padding.
    if(padLen <= 0) padLen = blockByteLen;
    // Clone the array first.
    barr = barr.slice();
    for (let i = 0; i < padLen; i++) barr.push(padLen);
    return barr;
}

/**
 * Remove the PKCS7 padding from a byte array.
 * @param {Array.<Number>} barr - A byte array.
 * @returns {Array.<Number>} - The byte array stripped from its padding.
 */
export function unpaddPkcs7(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    let padLen = barr[barr.length -1];
    if(padLen > 255) throw new Error(ERR110);
    if(padLen > barr.length) throw new Error(ERR080);
    // Verify the padding contents.
    for(let i = barr.length - padLen; i < barr.length; i++) {
        if(barr[i] !== padLen) throw new Error(ERR080);
    }
    return barr.slice(0, barr.length - padLen);
}

/**
 * Add PKCS5 padding to a byte array. Padding is exactly the same as PKCS7, but it can be maximum 8 bytes long.
 * @param {Array.<Number>} barr - A byte array.
 * @param {Number} blockByteLen - The block length in bytes. The padded array length will be a multiple of the block length.
 * @returns {Array.<Number>} The padded byte array.
 */
export function paddPkcs5(barr, blockByteLen) {
    if(blockByteLen > 8) throw new Error(ERR120);
    return paddPkcs7(barr, blockByteLen);
}

/**
 * Remove the PKCS5 padding from a byte array.
 * @param {Array.<Number>} barr - A byte array.
 * @returns {Array.<Number>} - The byte array stripped from its padding.
 */
export function unpaddPkcs5(barr) {
    return unpaddPkcs7(barr);
}

/**
 * Add zero padding where the last byte contains the padding length. Padding is ALWAYS added.
 * it follows spec. ANSI X.923. Padding can be max. 255 long.
 * @param {Array.<Number>} barr - Byte array.
 * @param {Number} blockByteLen - The block length in bytes. The padded array length will be a multiple of the block length.
 * @returns {Array.<Number>} - Padded byte array.
 */
export function paddLenMarker(barr, blockByteLen) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (blockByteLen <= 0) throw new Error(ERR070);
    if(blockByteLen > 255) throw new Error(ERR110);
    let padLen = blockByteLen - (barr.length % blockByteLen);
    // We ALWAYS add padding.
    if(padLen <= 0) padLen = blockByteLen;
    // Clone the array first.
    barr = barr.slice();
    for (let i = 0; i < padLen - 1; i++) barr.push(0);
    barr.push(padLen);
    return barr;
}

/**
 * Remove the zero padding with its length byte.
 * @param {Array.<Number>} barr - Byte array with zero/length padding.
 * @returns {Array.<Number>} - Byte array where padding is stripped.
 */
export function unpaddLenMarker(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    let padLen = barr[barr.length -1];
    if(padLen > 255) throw new Error(ERR110);
    if(padLen > barr.length) throw new Error(ERR080);
    // Verify the padding contents.
    for(let i = barr.length - padLen; i < barr.length - 1; i++) {
        if(barr[i] !== 0) throw new Error(ERR080);
    }
    return barr.slice(0, barr.length - padLen);
}

/**
 * Add zero padding to a byte array. It can lead to information loss when unpadding because trailing zeroes already
 * present are hidden by the padding, the information of the starting point of the padding is not remembered.
 * Not guaranteed to be reversible.
 * @param {Array.<Number>} barr - Byte array.
 * @param {Number} blockByteLen - The block length in nr of bytes. The padded block length will be a multiple of the block length.
 * @returns {Array.<Number>} - Padded array.
 */
export function paddZeroes(barr, blockByteLen) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (blockByteLen <= 0) throw new Error(ERR070);
    let padLen = blockByteLen - (barr.length % blockByteLen);
    // We ALWAYS add padding.
    if(padLen <= 0) padLen = blockByteLen;
    // Clone the array first.
    barr = barr.slice();
    for (let i = 0; i < padLen ; i++) barr.push(0);
    return barr;
}

/**
 * Remove the trailing zeroes from a byte array. It is assumed padding is present.
 * @param {Array.<Number>} barr - A byte array.
 * @returns {Array.<Number>} - Array with trailing zeroes removed.
 */
export function unpaddZeroes(barr) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    // Count nr of zeroes at the end.
    let nrZeroes = 0;
    for(let i = barr.length - 1; (i > 0) && (barr[i] === 0); i--) nrZeroes++;
    return barr.slice(0, barr.length - nrZeroes);
}

// BLOCK FUNCTIONS
//////////////////

/**
 * Split a byte array in blocks of specified length. Obviously the byte array should have a length that is a
 * multiple of the block length, which can be achieved by adding some kind of padding.
 * @param {Array.<Number>} barr - Byte array with length a multiple of the block length.
 * @param {Number} byteBlockLen - Byte block length.
 * @returns {Array.<Array.<Number>>} - An array of blocks, each block is byteBlockLeng long.
 */
export function barr2blocks(barr, byteBlockLen) {
    if (!Array.isArray(barr)) throw new Error(ERR020);
    if (byteBlockLen <= 0) throw new Error(ERR070);
    if (barr.length % byteBlockLen) throw new Error(ERR090);
    let blocks = [];
    let nrBlocks = barr.length / byteBlockLen;
    for (let i = 0; i < nrBlocks; i++) {
        blocks.push(barr.slice(i * byteBlockLen, (i * byteBlockLen) + byteBlockLen));
    }
    return blocks;
}

/**
 * Convert a block array to a byte array by flattening the block structure.
 * @param {Array.<Array.<Number>>} blocks - An array of blocks of bytes.
 * @returns {Array.<Number>} - Flattened array.
 */
export function blocks2barr(blocks) {
    if(!Array.isArray(blocks)) throw new Error(ERR020);
    let barr = [];
    for(let i = 0; i < blocks.length; i++) {
        if(!Array.isArray(blocks[i])) throw new Error(ERR100);
        barr = barr.concat(blocks[i]);
    }
    return barr;
}
