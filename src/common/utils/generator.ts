import { v1 as uuid } from 'uuid';

export const generateRandomString = () => {
        return uuid();
};

export const generateRandomNumber = (max: number) => {
        return Math.floor(Math.random() * max) + 1;
};

export const generateFileName = (ext: string): string => {
        return uuid() + '.' + ext;
};
