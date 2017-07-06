import {
    rstr2barr as rstr2barr,
    barr2rstr as barr2rstr,
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
    bitarr2barrL as bitarr2barrL,
    dwarrRRotate as dwarrRRotate,
    dwarrLRotate as dwarrLRotate,
    barr2blocks as barr2blocks,
    blocks2barr as blocks2barr,
} from 'bytes';

test('rstr2barr', () => {
    let rstr = "abcdef";
    let barr = rstr2barr(rstr);
    expect(barr.length).toBe(6);
    expect(barr).toEqual([97, 98, 99, 100, 101, 102]);

    rstr = '\u0000\u0001\u0002\u00ff\u0100\uff00';
    barr = rstr2barr(rstr);
    expect(barr.length).toBe(6);
    expect(barr).toEqual([0, 1, 2, 255, 0, 0]);

    expect(() => rstr2barr(null)).toThrow(/Bytes\/010/);

    let rstr2 = "";
    for(let i = 0; i < 256; i++) rstr2 += (i %10);
    let barr2 = rstr2barr(rstr2);
    expect(barr2.length).toBe(256);
});

test('barr2rstr', () => {
    let barr = [0, 1, 2, 3, 13, 256];
    let rstr = barr2rstr(barr);

    expect(rstr.length).toBe(6);
    expect(rstr).toBe("\u0000\u0001\u0002\u0003\u000d\u0000");

    expect(() => barr2rstr(null)).toThrow(/Bytes\/020/);

    let barr2 = [];
    for(let i = 0; i < 256; i++) barr2.push(i);
    let rstr2 = barr2rstr(barr2);
    expect(rstr2.length).toBe(256);
});

test('barr2warrL', () => {
    let barr = [0x05, 0x07, 0x0b, 0x0d, 0x010a, 0x010b];
    let warr = barr2warrL(barr);

    expect(warr.length).toBe(3);
    expect(warr).toEqual([0x0705, 0x0d0b, 0x0b0a]);

    expect(() => barr2warrL(null)).toThrow(/Bytes\/020/);
    expect(() => barr2warrL([1, 2, 3])).toThrow(/Bytes\/040/);
});

test('barr2warrB', () => {
    let barr = [0x05, 0x07, 0x0b, 0x0d, 0x010a, 0x010b];
    let warr = barr2warrB(barr);

    expect(warr.length).toBe(3);
    expect(warr).toEqual([0x0507, 0x0b0d, 0x0a0b]);

    expect(() => barr2warrB(null)).toThrow(/Bytes\/020/);
    expect(() => barr2warrB([1, 2, 3])).toThrow(/Bytes\/040/);
});

test('warr2barrL', () => {
    let warr = [0x0705, 0x0d0b, 0x0b0a];
    let barr = warr2barrL(warr);

    expect(barr.length).toBe(6);
    expect(barr).toEqual([0x05, 0x07, 0x0b, 0x0d, 0x0a, 0x0b]);

    expect(() => warr2barrL(null)).toThrow(/Bytes\/020/);
});

test('warr2barrB', () => {
    let warr = [0x0507, 0x0b0d, 0x0a0b];
    let barr = warr2barrB(warr);

    expect(barr.length).toBe(6);
    expect(barr).toEqual([0x05, 0x07, 0x0b, 0x0d, 0x0a, 0x0b]);

    expect(() => warr2barrB(null)).toThrow(/Bytes\/020/);
});

test('barr2dwarrL', () => {
    let barr = [0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d ];
    let dwarr = barr2dwarrL(barr);

    expect(dwarr.length).toBe(2);
    expect(dwarr).toEqual([0x09080706, 0x0d0c0b0a]);

    expect(() => barr2dwarrL(null)).toThrow(/Bytes\/020/);
    expect(() => barr2dwarrL([1, 2, 3])).toThrow(/Bytes\/040/);
});

test('barr2dwarrB', () => {
    let barr = [0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d ];
    let dwarr = barr2dwarrB(barr);

    expect(dwarr.length).toBe(2);
    expect(dwarr).toEqual([0x06070809, 0x0a0b0c0d]);

    expect(() => barr2dwarrB(null)).toThrow(/Bytes\/020/);
    expect(() => barr2dwarrB([1, 2, 3])).toThrow(/Bytes\/040/);
});

test('dwarr2barrL', () => {
    let dwarr = [0x09080706, 0x0d0c0b0a];
    let barr = dwarr2barrL(dwarr);

    expect(barr.length).toBe(8);
    expect(barr).toEqual([0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d ]);

    expect(() => dwarr2barrL(null)).toThrow(/Bytes\/020/);
});

test('dwarr2barrB', () => {
    let dwarr = [0x06070809, 0x0a0b0c0d];
    let barr = dwarr2barrB(dwarr);

    expect(barr.length).toBe(8);
    expect(barr).toEqual([0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d ]);

    expect(() => dwarr2barrB(null)).toThrow(/Bytes\/020/);
});

test('barr2carrL', () => {
    let barr = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d, 0x0e ];
    let carr = barr2carrL(barr, 8);

    expect(carr.length).toBe(2);
    expect(carr).toEqual([[0x08070605, 0x04030201], [0x0e0d0c0b, 0x0a090807]]);

    expect(() => barr2carrL(null)).toThrow(/Bytes\/020/);
    expect(() => barr2carrL([1, 2, 3])).toThrow(/Bytes\/040/);
    expect(() => barr2carrL([1, 2, 3, 4], 3)).toThrow(/Bytes\/040/);
    expect(() => barr2carrL([1, 2, 3], 4)).toThrow(/Bytes\/040/);
});

test('barr2carrB', () => {
    let barr = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d, 0x0e ];
    let carr = barr2carrB(barr, 8);

    expect(carr.length).toBe(2);
    expect(carr).toEqual([[0x01020304, 0x05060708], [0x0708090a, 0x0b0c0d0e]]);

    expect(() => barr2carrB(null)).toThrow(/Bytes\/020/);
    expect(() => barr2carrB([1, 2, 3])).toThrow(/Bytes\/040/);
    expect(() => barr2carrB([1, 2, 3, 4], 3)).toThrow(/Bytes\/040/);
    expect(() => barr2carrB([1, 2, 3], 4)).toThrow(/Bytes\/040/);
});

test('carr2barrL', () => {
    let carr = [[0x08070605, 0x04030201], [0x0e0d0c0b, 0x0a090807]];
    let barr = carr2barrL(carr);

    expect(barr.length).toBe(16);
    expect(barr).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e ]);

    expect(() => carr2barrL(null)).toThrow(/Bytes\/020/);
});

test('carr2barrB', () => {
    let carr = [[0x01020304, 0x05060708], [0x0708090a, 0x0b0c0d0e]];
    let barr = carr2barrB(carr);

    expect(barr.length).toBe(16);
    expect(barr).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e ]);

    expect(() => carr2barrB(null)).toThrow(/Bytes\/020/);
});

test('dwarrLShift', () => {
    // Simple case, stay in lowest byte.
    let bytes = [0,0,0,0,0,0,0, 0xb00000001];
    let dwarr = barr2dwarrB(bytes);
    let sdwarr = dwarrLShift(dwarr, 3);
    let bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0,0b00001000]);

    // Shift over 2 bytes.
    sdwarr = dwarrLShift(dwarr, (1*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0b00001000,0]);

    // Shift over 7 bytes.
    sdwarr = dwarrLShift(dwarr, (7*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0b00001000,0,0,0,0,0,0,0])
});

test('dwarrRZShift', () => {
    // Simple case, stay in highest byte.
    let bytes = [0b10000000, 0, 0, 0, 0, 0, 0, 0];
    let dwarr = barr2dwarrB(bytes);
    let sdwarr = dwarrRZShift(dwarr, 3);
    let bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0b00010000,0,0,0,0,0,0,0]);

    // Shift over 2 bytes, cross a single byte boundary.
    sdwarr = dwarrRZShift(dwarr, (1*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0, 0b00010000, 0, 0, 0, 0, 0, 0 ]);

    // Shift over 7 bytes.
    sdwarr = dwarrRZShift(dwarr, (7*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0,0b00010000])
});

test('dwarrRSShift', () => {
    // Simple case, stay in highest byte.
    // The sign must be extended.
    let bytes = [0b10000000, 0, 0, 0, 0, 0, 0, 0];
    let dwarr = barr2dwarrB(bytes);
    let sdwarr = dwarrRSShift(dwarr, 3);
    let bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0b11110000,0,0,0,0,0,0,0]);

    // Shift over 2 bytes, cross a single byte boundary.
    sdwarr = dwarrRSShift(dwarr, (1*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0xff, 0b11110000, 0, 0, 0, 0, 0, 0 ]);

    // Shift over 7 bytes.
    sdwarr = dwarrRSShift(dwarr, (7*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,0b11110000])

    // Simple case, stay in highest byte.
    // The sign must NOT be extended.
    let bytes3 = [0b01000000, 0, 0, 0, 0, 0, 0, 0];
    let dwarr2 = barr2dwarrB(bytes3);
    let sdwarr2 = dwarrRSShift(dwarr2, 3);
    let bytes4 = dwarr2barrB(sdwarr2);
    expect(bytes4.length).toBe(8);
    expect(bytes4).toEqual([0b00001000,0,0,0,0,0,0,0]);
});

test('isConsistentCarr', () => {
    expect(isConsistentCarr(null)).toBeFalsy();
    expect(isConsistentCarr([])).toBeTruthy();
    expect(isConsistentCarr([0, 0])).toBeFalsy();
    expect(isConsistentCarr([[0], [0]])).toBeTruthy();
    expect(isConsistentCarr([[0, 0, 0, 0, 0], [0]])).toBeFalsy();
    expect(isConsistentCarr([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])).toBeTruthy();
});

test('dwarrAnd', () => {
    let op1 = barr2dwarrB([0b10101010, 0b11110000, 0b00001111, 0b10101010]);
    let op2 = barr2dwarrB([0b01010101, 0b10101010, 0b01010101, 0b10101010]);
    let and_result = dwarrAnd(op1, op2);
    let result = dwarr2barrB(and_result);

    expect(result.length).toBe(4);
    expect(result).toEqual([0b00000000, 0b10100000, 0b00000101, 0b10101010]);
});

test('dwarrOr', () => {
    let op1 = barr2dwarrB([0b10101010, 0b11110000, 0b00001111, 0b10101010]);
    let op2 = barr2dwarrB([0b01010101, 0b10101010, 0b01010101, 0b10101010]);
    let dwarrResult = dwarrOr(op1, op2);
    let result = dwarr2barrB(dwarrResult);

    expect(result.length).toBe(4);
    expect(result).toEqual([0b11111111, 0b11111010, 0b01011111, 0b10101010]);
});

test('dwarrXor', () => {
    let op1 = barr2dwarrB([0b10101010, 0b11110000, 0b00001111, 0b10101010]);
    let op2 = barr2dwarrB([0b01010101, 0b10101010, 0b01010101, 0b10101010]);
    let dwarrResult = dwarrXor(op1, op2);
    let result = dwarr2barrB(dwarrResult);

    expect(result.length).toBe(4);
    expect(result).toEqual([0b11111111, 0b01011010, 0b01011010, 0b00000000]);
});

test('dwarrNot', () => {
    let op1 = barr2dwarrB([0b10101010, 0b11110000, 0b00001111, 0b10101010]);
    let dwarrResult = dwarrNot(op1);
    let result = dwarr2barrB(dwarrResult);

    expect(result.length).toBe(4);
    expect(result).toEqual([0b01010101, 0b00001111, 0b11110000, 0b01010101]);
});

test('byte2bitarrB', () => {
    let byte = 0b11000001;
    let bitarr = byte2bitarrB(byte);
    expect(bitarr.length).toBe(8);
    expect(bitarr).toEqual([1, 1, 0, 0, 0, 0, 0, 1]);

    expect(() => byte2bitarrB(null)).toThrow(/Bytes\/030/);
    expect(() => byte2bitarrB("5")).toThrow(/Bytes\/030/);
});

test('byte2bitarrL', () => {
    let byte = 0b11000001;
    let bitarr = byte2bitarrL(byte);
    expect(bitarr.length).toBe(8);
    expect(bitarr).toEqual([1, 0, 0, 0, 0, 0, 1, 1]);

    expect(() => byte2bitarrL(null)).toThrow(/Bytes\/030/);
    expect(() => byte2bitarrL("5")).toThrow(/Bytes\/030/);
});

test('bitarr2byteB', () => {
    let bitarr = [1, 1, 0, 0, 0, 0, 0, 1];
    let byte = bitarr2byteB(bitarr);
    expect(byte).toBe(0b11000001);

    expect(() => bitarr2byteB(null)).toThrow(/Bytes\/020/);
    expect(() => bitarr2byteB([1,0])).toThrow(/Bytes\/060/);
});

test('bitarr2byteL', () => {
    let bitarr = [1, 1, 0, 0, 0, 0, 0, 1];
    let byte = bitarr2byteL(bitarr);
    expect(byte).toBe(0b10000011);

    expect(() => bitarr2byteL(null)).toThrow(/Bytes\/020/);
    expect(() => bitarr2byteL([1,0])).toThrow(/Bytes\/060/);
});

test('paddBitarrBits', () => {
    let bitarr = [1,0,1];
    let padded = paddBitarrBits(bitarr, 8);
    expect(padded.length).toBe(8);
    expect(padded).toEqual([1, 0, 1, 1, 0, 0, 0, 0]);

    // Full block of padding should be added ...
    bitarr = [1, 0, 0, 0, 0, 0, 1 , 1];
    padded = paddBitarrBits(bitarr, 8);
    expect(padded.length).toBe(16);
    expect(padded).toEqual([1, 0, 0, 0, 0, 0, 1 , 1, 1, 0, 0, 0, 0, 0, 0, 0]);

    expect(() => paddBitarrBits(null, 8)).toThrow(/Bytes\/020/);
    expect(() => paddBitarrBits([1, 1, 1, 1, 1, 1, 1, 1], -3)).toThrow(/Bytes\/070/);
});

test('unpaddBitarrBits', () => {
    let padded = [1, 0, 1, 1, 0, 0, 0, 0];
    let unpadded = unpaddBitarrBits(padded);
    expect(unpadded.length).toBe(3)
    expect(unpadded).toEqual([1, 0, 1]);

    expect(() => unpaddBitarrBits(null)).toThrow(/Bytes\/020/);
    expect(() => unpaddBitarrBits([0, 0, 0, 0, 0, 0, 0, 0])).toThrow(/Bytes\/080/);
});

test('byteLRotate', () => {
    expect(byteLRotate(0b10000000, 1)).toBe(0b00000001);
    expect(byteLRotate(0b10000000, 2)).toBe(0b00000010);
    expect(byteLRotate(0b10000000, 3)).toBe(0b00000100);
    expect(byteLRotate(0b10000000, 4)).toBe(0b00001000);
    expect(byteLRotate(0b10000000, 5)).toBe(0b00010000);
    expect(byteLRotate(0b10000000, 6)).toBe(0b00100000);
    expect(byteLRotate(0b10000000, 7)).toBe(0b01000000);
    expect(byteLRotate(0b10000000, 8)).toBe(0b10000000);
});

test('byteRRotate', () => {
    expect(byteRRotate(0b10000000, 1)).toBe(0b01000000);
    expect(byteRRotate(0b10000000, 2)).toBe(0b00100000);
    expect(byteRRotate(0b10000000, 3)).toBe(0b00010000);
    expect(byteRRotate(0b10000000, 4)).toBe(0b00001000);
    expect(byteRRotate(0b10000000, 5)).toBe(0b00000100);
    expect(byteRRotate(0b10000000, 6)).toBe(0b00000010);
    expect(byteRRotate(0b10000000, 7)).toBe(0b00000001);
    expect(byteRRotate(0b10000000, 8)).toBe(0b10000000);
});

test('bitarr2barrB', () => {
    let bitarr = [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0];
    let barr = bitarr2barrB(bitarr);
    expect(barr).toEqual([0b10000011, 0b11110000]);
    expect(() => bitarr2barrB(null)).toThrow(/Bytes\/020/);
});

test('bitarr2barrL', () => {
    let bitarr = [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0];
    let barr = bitarr2barrL(bitarr);
    expect(barr).toEqual([0b11000001, 0b00001111]);
    expect(() => bitarr2barrL(null)).toThrow(/Bytes\/020/);

});

test('barr2bitarrB', ()=>{
    let barr = [0b10000011, 0b11110000];
    let bitarr = barr2bitarrB(barr);
    expect(bitarr).toEqual([1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]);
    expect(() => barr2bitarrB(null)).toThrow(/Bytes\/020/);
});

test('barr2bitarrL', ()=>{
    let barr = [0b11000001, 0b00001111];
    let bitarr = barr2bitarrL(barr);
    expect(bitarr).toEqual([1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]);
    expect(() => barr2bitarrL(null)).toThrow(/Bytes\/020/);
});

function constructSparseWord(bitPos) {
    let arr = [];
    bitPos = bitPos % 16;
    for (let i = 0; i < 16; i++) {
        if (i === bitPos) arr.push(1);
        else arr.push(0);
    }
    return barr2warrB(bitarr2barrB(arr))[0];
}

function constructSparseDword(bitPos) {
    let arr = [];
    bitPos = bitPos % 32;
    for (let i = 0; i < 32; i++) {
        if (i === bitPos) arr.push(1);
        else arr.push(0);
    }
    return barr2dwarrB(bitarr2barrB(arr))[0];
}

test('wordLRotate', () => {
    let word = 0b1000000000000000;
    for (let i = 1; i < 16; i++) {
        let rotated = wordLRotate(word, i);
        let std = constructSparseWord(15 + 1 - i);
        expect(rotated).toBe(std);
    }
});

test('wordRRotate', () => {
    let word = 0b1000000000000000;
    for (let i = 1; i < 16; i++) {
        let rotated = wordRRotate(word, i);
        let std = constructSparseWord(i);
        expect(rotated).toBe(std);
    }
});

test('dwordLRotate', () => {
    let word = 0b10000000000000000000000000000000;
    for (let i = 1; i < 32; i++) {
        let rotated = dwordLRotate(word, i);
        let std = constructSparseDword(31 + 1 - i);
        expect(rotated).toBe(std);
    }
});

test('dwordRRotate', () => {
    let word = 0b10000000000000000000000000000000;
    for (let i = 1; i < 32; i++) {
        let rotated = dwordRRotate(word, i);
        let std = constructSparseDword(i);
        expect(rotated).toBe(std);
    }
});

test('dwarrRRotate', () => {
    // Simple case, stay in lowest byte.
    let bytes = [0,0,0,0,0,0,0, 0b00000001];
    let dwarr = barr2dwarrB(bytes);
    let sdwarr = dwarrRRotate(dwarr, 3);
    let bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0b00100000,0,0,0,0,0,0,0]);

    // Rotate over 2 bytes.
    sdwarr = dwarrRRotate(dwarr, (1*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0b00100000,0,0,0,0,0,0]);

    // Rotate over 7 bytes.
    sdwarr = dwarrRRotate(dwarr, (7*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0,0b00100000])
});

test('dwarrLRotate', () => {
    // Simple case, stay in lowest byte.
    let bytes = [0,0,0,0,0,0,0, 0b00000001];
    let dwarr = barr2dwarrB(bytes);
    let sdwarr = dwarrLRotate(dwarr, 3);
    let bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0,0b00001000]);

    // Rotate over 2 bytes.
    sdwarr = dwarrLRotate(dwarr, (1*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0b00001000,0]);

    // Rotate over 7 bytes.
    sdwarr = dwarrLRotate(dwarr, (7*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0b00001000,0,0,0,0,0,0,0])
});

test('barr2blocks', ()=>{
    expect(barr2blocks([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(barr2blocks([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2], 1)).toEqual([[1], [2], [1], [2],[1], [2],[1], [2],[1], [2],[1], [2],]);
    expect(() => barr2blocks(null, 5)).toThrow(/Bytes\/020/);
    expect(() => barr2blocks([1, 2, 3, 4, 5, 6], 5)).toThrow(/Bytes\/090/);
});

test('blocks2barr', ()=>{
    expect(blocks2barr([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(blocks2barr([[1], [2], [1], [2],[1], [2],[1], [2],[1], [2],[1], [2],])).toEqual([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);
    expect(() => blocks2barr(null)).toThrow(/Bytes\/020/);
    expect(() => blocks2barr([[1, 2, 3], true, [7, 8, 9]])).toThrow(/Bytes\/100/);
});