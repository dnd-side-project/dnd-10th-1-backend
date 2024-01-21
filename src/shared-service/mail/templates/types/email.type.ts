export enum Template {
        VERIFY = 'verify-email',
        RESET = 'reset-password',
        WELCOME = 'welcome',
}
export enum Subject {
        VERIFY = '인증 메일입니다.',
        RESET = '비밀번호 재설정',
        WELCOME = '환영합니다. 이메일 인증을 완료해주세요.',
}

export enum Transport {
        GMAIL = 'gmail',
        OUTLOOK = 'outlook',
        NAVER = 'naver',
}
