export const isDev = process.env.NODE_ENV === 'dev' ? true : false;
export const isProd = process.env.NODE_ENV === 'prod' ? true : false;
export const isLocal = !isDev && !isProd;
