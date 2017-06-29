import {
    rstr2barr as rstr2barr,
    barr2rstr as barr2rstr,
    barr2warrL as barr2warrL,
    barr2warrB as barr2warrB,
    warr2barrL as warr2barrL,
    warr2barrB as warr2barrB
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
