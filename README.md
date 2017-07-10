# Bytes
## Goal

Provide a number of byte block/stream manipulation functions to ease the handling of data streams.

It concerns these concepts:
* "Raw string (rstr)" where each character represents a single byte. Technically a JavaScript character is 16 bits, but in this case we will only use the lower 8 bits. This representation is most often used for transport, to get the data in/out of the application. 
* "Byte array (barr)" where each byte is represented by a single unsigned numeric value 0-255 in an array. This representation is suited for byte manipulation algorithms.
* "Word array (warr)" each word is 2 bytes.
* "DWord array (dwarr)" each double word is 4 bytes.
* "Composite array (carr)" Everything larger than double word is a carr, it cannot be represented directly in JavaScript and we have to create our own data structure for it. An array of arrays where each subarray is a dwarr and represents a larger big endian unit. We can choose the endianness of the dwarr subarray ourselves because it is an internal convention it does not affect the external representation.
* "Bit array (bitarr)" A bit array.


## Raw String Functions

Raw string (each character represents a single byte)  to byte array with values 0-255.
The high order byte of the character (which is 16 bits) is ignored.
 
    function rstr2barr(rstr)


Byte array to raw string (each character represents a single byte).
Only the low order byte of the character is taken into account the higher order bytes are ignored.

    function barr2rstr(barr)
    
## 16-bit Word Array Functions

Convert a byte array into a 16-bit word array. The bytes are organized in little endian order.
Each pair of bytes is converted into a 16-bit word, the first byte is the low order byte, the second byte is the high order byte.

    function barr2warrL(barr)

Convert a byte array into a 16-bit word array. The bytes are organized in big endian order.
Each pair of bytes is converted into a 16-bit word, the first byte is the high order byte, the second byte is the low order byte.

    function barr2warrB(barr) 

Convert a 16-bit word array into a byte array. The bytes are organized in little endian order.
Each 16-bit word is converted into a pair of bytes, the first byte is the low order byte, the second byte is the high order byte.

    function warr2barrL(warr)


Convert a 16-bit word array into a byte array. The bytes are organized in big endian order.
Each 16-bit word is converted into a pair of bytes, the first byte is the high order byte, the second byte is the low order byte.

    function warr2barrB(warr)
    
    
## 32-bit Dword Array Functions

Convert a byte array into a 32-bit word (aka. dword) array. The bytes are organized in little endian order.
Each quadruple of bytes is converted into a 32-bit word, the first byte is the low order byte.

    function barr2dwarrL(barr)



Convert a byte array into a 32-bit word (aka. dword) array. The bytes are organized in big endian order.
Each quadruple of bytes is converted into a 32-bit word, the first byte is the high order byte.

    function barr2dwarrB(barr)


Convert a 32-bit word (aka. dword) array into a byte array. The bytes are organized in little endian order.
Each 32-bit word is converted into a quadruple of bytes, the first byte is the low order byte.

    function dwarr2barrL(dwarr)


Convert a 32-bit word (aka. dword) array into a byte array. The bytes are organized in big endian order.
Each 32-bit word is converted into a quadruple of bytes, the first byte is the low order byte.

    function dwarr2barrB(dwarr)
