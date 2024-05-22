const crypto = require("crypto");
require("dotenv").config();
const { SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } = process.env;

if (!SECRET_KEY || !SECRET_IV || !ENCRYPTION_METHOD) {
  throw new Error("secretKey, secretIV, and ecnryptionMethod are required");
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash("sha512")
  .update(SECRET_KEY)
  .digest("hex")
  .substring(0, 32);
const encryptionIV = crypto
  .createHash("sha512")
  .update(SECRET_IV)
  .digest("hex")
  .substring(0, 16);

// Encrypt data
function EncryptData({ data }) {
  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64"); // Encrypts data and converts to hex and base64
}

// Decrypt data
function DecryptData({ encryptedData }) {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_METHOD,
    key,
    encryptionIV
  );
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  ); // Decrypts data and converts to utf8
}
module.exports = { EncryptData, DecryptData };
