import { v1 as uuid } from 'uuid';

export const generateRandomString = () => {
        return uuid();
};

export const generateFileName = (ext: string): string => {
        return uuid() + '.' + ext;
};
