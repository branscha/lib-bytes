import {rstr2barr as rstr2barr} from 'bytes';

test('rstr2barr', () => {
   let rstr = "abcdef";
   let barr = rstr2barr(rstr);
   expect(barr.length).toBe(6);
   expect(barr).toEqual([97, 98, 99, 100, 101, 102]);

   rstr = '\u0000\u0001\u0002\u00ff\u0100\uff00'
   barr = rstr2barr(rstr);
   expect(barr.length).toBe(6);
   expect(barr).toEqual([0, 1, 2, 255, 0, 0]);

});


