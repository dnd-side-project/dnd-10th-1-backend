import Joi from 'joi';

// .env 파일 환경 변수 검증 용도
export const EnvironmentVariablesValidator = Joi.object({
        NODE_ENV: Joi.string().valid('LOCAL', 'DEV', 'PROD').default('LOCAL'),
        SERVICE_NAME: Joi.string()
                .required()
                .default("You Have to change 'SERVICE_NAME' on .env file"),
        PORT: Joi.string().default(3000),
        DATABASE_URL: Joi.string().required(),
        // DATABASE_PORT: Joi.number().required(),
        // DATABASE_PASSWORD: Joi.string().required(),
        // DATABASE_USERNAME: Joi.string().required(),
        // DATABASE_NAME: Joi.string(),
        // OAUTH_FACEBOOK_APP_ID: Joi.string().required(),
        // OAUTH_FACEBOOK_CALLBACK_URL: Joi.string().required(),
        // OAUTH_FACEBOOK_SECRET: Joi.string().required(),
        // OAUTH_GOOGLE_APP_ID: Joi.string().required(),
        // OAUTH_GOOGLE_CLIENT_SECRET: Joi.string().required(),
        // OAUTH_GOOGLE_CALLBACK_URL: Joi.string().required(),
        // OAUTH_KAKAO_APP_ID: Joi.string().required(),
        // OAUTH_KAKAO_CALLBACK_URL: Joi.string().required(),
        // OAUTH_KAKAO_SECRET: Joi.optional().default(''),
        // MAIL_HOST: Joi.string().required(),
        // MAIL_USER: Joi.string().required(),
        // MAIL_PASSWORD: Joi.string().required(),
        // MAIL_FROM: Joi.string().required(),
        // JWT_PRIVATE_KEY: Joi.string().required(),
        // JWT_EXPIRATION_TIME: Joi.string().required(),
});
