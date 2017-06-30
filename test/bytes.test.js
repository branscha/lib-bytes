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
    dwarrLshift as dwarrLshift,

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
    expect(() => rstr2barr({})).toThrow(/Bytes\/030/);

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
    expect(() => barr2rstr({})).toThrow(/Bytes\/040/);

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
    expect(() => barr2warrL({})).toThrow(/Bytes\/040/);
    expect(() => barr2warrL([1, 2, 3])).toThrow(/Bytes\/050/);
});

test('barr2warrB', () => {
    let barr = [0x05, 0x07, 0x0b, 0x0d, 0x010a, 0x010b];
    let warr = barr2warrB(barr);

    expect(warr.length).toBe(3);
    expect(warr).toEqual([0x0507, 0x0b0d, 0x0a0b]);

    expect(() => barr2warrB(null)).toThrow(/Bytes\/020/);
    expect(() => barr2warrB({})).toThrow(/Bytes\/040/);
    expect(() => barr2warrB([1, 2, 3])).toThrow(/Bytes\/050/);
});

test('warr2barrL', () => {
    let warr = [0x0705, 0x0d0b, 0x0b0a];
    let barr = warr2barrL(warr);

    expect(barr.length).toBe(6);
    expect(barr).toEqual([0x05, 0x07, 0x0b, 0x0d, 0x0a, 0x0b]);

    expect(() => warr2barrL(null)).toThrow(/Bytes\/020/);
    expect(() => warr2barrL({})).toThrow(/Bytes\/040/);
});

test('warr2barrB', () => {
    let warr = [0x0507, 0x0b0d, 0x0a0b];
    let barr = warr2barrB(warr);

    expect(barr.length).toBe(6);
    expect(barr).toEqual([0x05, 0x07, 0x0b, 0x0d, 0x0a, 0x0b]);

    expect(() => warr2barrB(null)).toThrow(/Bytes\/020/);
    expect(() => warr2barrB({})).toThrow(/Bytes\/040/);
});

test('barr2dwarrL', () => {
    let barr = [0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d ];
    let dwarr = barr2dwarrL(barr);

    expect(dwarr.length).toBe(2);
    expect(dwarr).toEqual([0x09080706, 0x0d0c0b0a]);

    expect(() => barr2dwarrL(null)).toThrow(/Bytes\/020/);
    expect(() => barr2dwarrL({})).toThrow(/Bytes\/040/);
    expect(() => barr2dwarrL([1, 2, 3])).toThrow(/Bytes\/060/);
});

test('barr2dwarrB', () => {
    let barr = [0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d ];
    let dwarr = barr2dwarrB(barr);

    expect(dwarr.length).toBe(2);
    expect(dwarr).toEqual([0x06070809, 0x0a0b0c0d]);

    expect(() => barr2dwarrB(null)).toThrow(/Bytes\/020/);
    expect(() => barr2dwarrB({})).toThrow(/Bytes\/040/);
    expect(() => barr2dwarrB([1, 2, 3])).toThrow(/Bytes\/060/);
});

test('dwarr2barrL', () => {
    let dwarr = [0x09080706, 0x0d0c0b0a];
    let barr = dwarr2barrL(dwarr);

    expect(barr.length).toBe(8);
    expect(barr).toEqual([0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d ]);

    expect(() => dwarr2barrL(null)).toThrow(/Bytes\/020/);
    expect(() => dwarr2barrL({})).toThrow(/Bytes\/040/);
});

test('dwarr2barrB', () => {
    let dwarr = [0x06070809, 0x0a0b0c0d];
    let barr = dwarr2barrB(dwarr);

    expect(barr.length).toBe(8);
    expect(barr).toEqual([0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d ]);

    expect(() => dwarr2barrB(null)).toThrow(/Bytes\/020/);
    expect(() => dwarr2barrB({})).toThrow(/Bytes\/040/);
});

test('barr2carrL', () => {
    let barr = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d, 0x0e ];
    let carr = barr2carrL(barr, 8);

    expect(carr.length).toBe(2);
    expect(carr).toEqual([[0x08070605, 0x04030201], [0x0e0d0c0b, 0x0a090807]]);

    expect(() => barr2carrL(null)).toThrow(/Bytes\/020/);
    expect(() => barr2carrL({})).toThrow(/Bytes\/040/);
    expect(() => barr2carrL([1, 2, 3])).toThrow(/Bytes\/080/);
    expect(() => barr2carrL([1, 2, 3, 4], 3)).toThrow(/Bytes\/080/);
    expect(() => barr2carrL([1, 2, 3], 4)).toThrow(/Bytes\/070/);
});

test('barr2carrB', () => {
    let barr = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x010c, 0x010d, 0x0e ];
    let carr = barr2carrB(barr, 8);

    expect(carr.length).toBe(2);
    expect(carr).toEqual([[0x01020304, 0x05060708], [0x0708090a, 0x0b0c0d0e]]);

    expect(() => barr2carrB(null)).toThrow(/Bytes\/020/);
    expect(() => barr2carrB({})).toThrow(/Bytes\/040/);
    expect(() => barr2carrB([1, 2, 3])).toThrow(/Bytes\/080/);
    expect(() => barr2carrB([1, 2, 3, 4], 3)).toThrow(/Bytes\/080/);
    expect(() => barr2carrB([1, 2, 3], 4)).toThrow(/Bytes\/070/);
});

test('carr2barrL', () => {
    let carr = [[0x08070605, 0x04030201], [0x0e0d0c0b, 0x0a090807]];
    let barr = carr2barrL(carr);

    expect(barr.length).toBe(16);
    expect(barr).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e ]);

    expect(() => carr2barrL(null)).toThrow(/Bytes\/020/);
    expect(() => carr2barrL({})).toThrow(/Bytes\/040/);
});

test('carr2barrB', () => {
    let carr = [[0x01020304, 0x05060708], [0x0708090a, 0x0b0c0d0e]];
    let barr = carr2barrB(carr);

    expect(barr.length).toBe(16);
    expect(barr).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,   0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e ]);

    expect(() => carr2barrB(null)).toThrow(/Bytes\/020/);
    expect(() => carr2barrB({})).toThrow(/Bytes\/040/);
});

test('dwarrLshift', () => {
    // Simple case, stay in lowest byte.
    let bytes = [0,0,0,0,0,0,0, 0xb00000001];
    let dwarr = barr2dwarrB(bytes);
    let sdwarr = dwarrLshift(dwarr, 3);
    let bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0,0b00001000]);

    // Shift over 2 bytes.
    sdwarr = dwarrLshift(dwarr, (1*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0,0,0,0,0,0,0b00001000,0]);

    // Shift over 7 bytes.
    sdwarr = dwarrLshift(dwarr, (7*8)+3);
    bytes2 = dwarr2barrB(sdwarr);
    expect(bytes2.length).toBe(8);
    expect(bytes2).toEqual([0b00001000,0,0,0,0,0,0,0])



});