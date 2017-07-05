# Bytes
## Goal

Provide a number of byte block/stream manipulation functions to ease the handling of data streams.

It concerns these concepts:
* "Raw string (rstr)" where each character represents a single byte. Technically a JavaScript character is 16 bits, but in this case we will only use the lower 8 bits. This representation is most often used for transport, to get the data in/out of the application. 
* "Byte array (barr)" where each byte is represented by a single unsigned numeric value 0-255 in an array. This representation is suited for byte manipulation algorithms.
* "Word array (warr)" each word is 2 bytes.
* "DWord array (dwarr)" each double word is 4 bytes.
* "Composite array (carr)" Everything larger than double word is a carr, it cannot be represented directly in JavaScript and we have to create our own data structure for it. An array of arrays where each subarray is a dwarr and represents a larger big endian unit. We can choose the endianness of the dwarr subarray ourselves because it is an internal convention it does not affect the external representation.




* Everything larger than double word is a carr, it cannot be represented directly in JavaScript and we have to create our own data structure for it.

// Carr construction.
// Unlimited byte precision above 32 bits JavaScript limit.
