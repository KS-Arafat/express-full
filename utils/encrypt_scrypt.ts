import { type ScryptOptions, scryptSync, timingSafeEqual } from "crypto";

const scryptOpt: ScryptOptions = {
	N: 16384,
	r: 8,
	p: 1,
};

const salt_size = 16,
	hash_size = 32;

let saltBuffer = Buffer.alloc(salt_size);

const scrypt_generation = (pwd: string) => {
	saltBuffer = crypto.getRandomValues(saltBuffer);

	const hashBuffer = scryptSync(pwd, saltBuffer, hash_size, scryptOpt);
	return {
		hash: hashBuffer.toString("hex"),
		salt: saltBuffer.toString("hex"),
		hashBuffer,
	};
};

const scrypt_regeneration = (pwd: string, salt: string) => {
	const hashBuffer = scryptSync(
		pwd,
		Buffer.from(salt, "hex"),
		hash_size,
		scryptOpt
	);
	return { hash: hashBuffer.toString("hex"), salt, hashBuffer: hashBuffer };
};

const scrypt_verify = ({
	pwd,
	hash,
	salt,
}: {
	pwd: string;
	hash: string;
	salt: string;
}) => {
	const hs = scrypt_regeneration(pwd, salt);
	const transToBuffer = Buffer.from;
	if (timingSafeEqual(transToBuffer(hs.hash), transToBuffer(hash))) return true;
	return false;
};

export { scrypt_generation, scrypt_regeneration, scrypt_verify };
