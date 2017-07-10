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

## Unlimited-bit Composite Array Functions

In JavaScript a 32-bit word is the largest bit storage available to do bit manipulation. 
In order to deal with this 32-bit limit, the library contains the carr concept, a data structure to store an unlimited number of bits.
A carr is a a 32-bit dword array stored in big endian order. 

Convert a byte array into a composite array. The bytes are organized in little endian order.
A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
A composite is represented by a big endian 32-bit dword array.

    function barr2carrL(barr, carrByteSize)

Convert a byte array into a composite array. The bytes are organized in big endian order.
A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
A composite is represented by a big endian 32-bit dword array.
  
      function barr2carrB(barr, carrByteSize)


Convert a composite array into a byte array. The bytes are organized in little endian order.
A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
A composite is represented by a big endian 32-bit dword array.

    function carr2barrL(carr)

Convert a composite array into a byte array. The bytes are organized in big endian order.
A composite can hold unlimited number of bytes, it is not restricted to the 32-bit JavaScript boundary.
A composite is represented by a big endian 32-bit dword array.

    function carr2barrB(carr)


A composite array (carr) represents an array of super-words of the same size.
A super-word is represented by a big endian 32-bit dword array (dwarr).
This function test if a data structure can pass as a valid composite array.

    function isConsistentCarr(carr)
    
    
Verify if two 32-bit dword arrays (aka. dwarr) are compatible to act as operands in one of the bit operators.
The test is NOT automatically called in the bit operators for reasons of efficiency.
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function isCompatibleDwarrs(op1, op2) 


Bitwise AND on two 32-bit dword arrays (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrAnd(op1, op2) 


Bitwise OR on two 32-bit dword arrays (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrOr(op1, op2) 


Bitwise XOR on two 32-bit dword arrays (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrXor(op1, op2) 


Bitwise NOT of a 32-bit dword array (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrNot(op1) 

Bitwise LEFT SHIFT of a 32-bit dword array (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrLShift(op1, nr = 1) 


Bitwise RIGHT SHIFT with sign extension of a 32-bit dword array (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrRSShift(op1, nr = 1) 


Bitwise RIGHT SHIFT with zero extension of a 32-bit dword array (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrRZShift(op1, nr = 1) 


Bitwise RIGHT ROTATE of a 32-bit dword array (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrRRotate(dwarr, nr = 1) 


Bitwise LEFT ROTATE of a 32-bit dword array (aka. dwarr).
This is part of a group of functions that operate on the super-words (32-bit big endian dword arrays)  in a composite array (carr).

    function dwarrLRotate(dwarr, nr = 1)

## Bit Array

TODO

## Rotation of byte/word/dword

Rotate the bits of a byte to the left, the high order bit will re-appear as the low order bit.

    function byteLRotate(byte, nr = 1)


Rotate the bits of a byte to the right, the low order bit will re-appear as the high order bit.

    function byteRRotate(byte, nr = 1)


Rotate the bits of a 16-bit word to the left, the high order bit will re-appear as the low order bit.

    function wordLRotate(word, nr = 1)


Rotate the bits of a 16-bit word to the right, the low order bit will re-appear as the high order bit.

    function wordRRotate(word, nr = 1)


Rotate the bits of a 32-bit dword to the left, the high order bit will re-appear as the low order bit.

    function dwordLRotate(dword, nr = 1)

Rotate the bits of a 32-bit dword to the right, the low order bit will re-appear as the high order bit.

    function dwordRRotate(dword, nr = 1)
    
    
### Padding Functions

Apply bit padding to an array of bits. Padding is ALWAYS added. It returns a padded array.
It follows standards RFC1321 step 3.1 and ISO/IEC 797-1 Padding Method 2.

    function paddBitarrBits(bitarr, bitBlockLen, minBitPadLen = 0) 


Remove the bit padding from an array of bits. It is assumed that padding is present.

    function unpaddBitarrBits(bitarr)

Add bit padding to a byte array. Padding is done on byte boundaries (not within a byte).
Padding is ALWAYS added, it follows spec. ISO/IEC 7816-4.

    function paddBarrBits(barr, byteBlockLen, minBytePadLen = 0)


Remove bit padding from a byte array. It is assumed that padding is ALWAYS present and that padding was done on
byte boundaries (not within a byte).

    function unpaddBarrBits(barr)

Add PKCS7 padding to a byte array. Padding can be maximum 256 bytes long.

    function paddPkcs7(barr, blockByteLen)

Remove the PKCS7 padding from a byte array

    function unpaddPkcs7(barr)

Add PKCS5 padding to a byte array. Padding is exactly the same as PKCS7, but it can be maximum 8 bytes long.

    function paddPkcs5(barr, blockByteLen)

Remove the PKCS5 padding from a byte array.

    function unpaddPkcs5(barr)


Add zero padding where the last byte contains the padding length. Padding is ALWAYS added.
it follows spec. ANSI X.923. Padding can be max. 256 long.

    function paddLenMarker(barr, blockByteLen)

Remove the zero padding with its length byte.

    function unpaddLenMarker(barr)

Add zero padding to a byte array. It can lead to information loss when unpadding because trailing zeroes already
present are hidden by the padding, the information of the starting point of the padding is not remembered.
Not guaranteed to be reversible.

    function paddZeroes(barr, blockByteLen)

Remove the trailing zeroes from a byte array. It is assumed padding is present.

    function unpaddZeroes(barr)
    
### Block Splitting/Merging

Split a byte array in blocks of specified length. Obviously the byte array should have a length that is a
multiple of the block length, which can be achieved by adding some kind of padding.

    function barr2blocks(barr, byteBlockLen) 

Convert a block array to a byte array by flattening the block structure.

    function blocks2barr(blocks)


