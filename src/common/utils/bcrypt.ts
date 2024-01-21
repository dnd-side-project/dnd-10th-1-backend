import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
        const SALT = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(rawPassword, SALT);

        return hashedPassword;
}

export async function validatePassword(rawPassword: string, hashPassword: string) {
        return await bcrypt.compare(rawPassword, hashPassword);
}
