const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log('private key: ', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
const publicAddress = keccak256(publicKey.slice(1)).slice(-20);

console.log('public key: ', toHex(publicAddress));

// pri 1  : 80f32235ead91cace3e89d136d5ec408a46f8aa8c8a0204b368582f75263b28e
// pri 2 : 1f49d94cbce99c34a3088d47059236f17da9edb77bddd89b83d143f9946a82ad
// pri 3 : b7820b9419f81ab732f6b45601708f9ac8f1e997a4f34c23c7a726b318844e16
