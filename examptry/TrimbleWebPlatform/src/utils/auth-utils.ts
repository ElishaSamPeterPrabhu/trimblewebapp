import { SHA256, enc } from 'crypto-js';
import { setItemInLocalStorage } from "./localstorage-utils";
import * as randomstring from 'randomstring'

// Function to generate a code verifier
function generateCodeVerifier(): string {
  let codeVerifier = randomstring.generate({
    length: getLength(),
    charset: CODE_VERIFIER_CHARSET,
  })
  setItemInLocalStorage("codeVerifier", codeVerifier)
  return codeVerifier
}

// Function to generate a code challenge from a code verifier
function generateCodeChallenge(verifier: string): string {
  const hash = SHA256(verifier);
  const codeChallenger = enc.Base64.stringify(hash)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return codeChallenger;
}

function getLength(): number {
  return Math.floor(Math.random() * (128 - 43)) + 43;
}

function getCurrentTimeInSec(): number {
  return Math.floor(Date.now() / 1000);
}

const CODE_VERIFIER_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890.,-_~";

// Generate and export the code verifier and code challenge
export const codeVerifier = () => generateCodeVerifier();
export const codeChallenger = (codeVerifier: string) => generateCodeChallenge(codeVerifier);
export const currentTimeInSec = () => getCurrentTimeInSec();