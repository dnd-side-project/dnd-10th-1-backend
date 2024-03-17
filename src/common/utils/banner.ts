import { ApiConfigService } from '@/shared-service/env';
import { Table } from 'console-table-printer';
import gradient from 'gradient-string';

export function printBootBanner() {
        const coolGradient = gradient('red', 'blue', 'green', 'orange');

        const coolString = coolGradient(String.raw`

         /$$$$$$$$ /$$$$$$$$ /$$$$$$$  /$$$$$$$$
        | $$_____/|_____ $$ | $$__  $$|_____ $$ 
        | $$           /$$/ | $$  \ $$     /$$/ 
        | $$$$$       /$$/  | $$$$$$$/    /$$/  
        | $$__/      /$$/   | $$____/    /$$/   
        | $$        /$$/    | $$        /$$/    
        | $$$$$$$$ /$$$$$$$$| $$       /$$$$$$$$
        |________/|________/|__/      |________/
                                
      `);

        console.log(coolString);
}

export function printEnvBanner(config: ApiConfigService) {
        const p = new Table({
                title: '환경변수 체크사항',
                columns: [
                        { name: 'env_name', alignment: 'right' },
                        { name: 'env_value', alignment: 'left' },
                ],
        });

        p.addRows([
                {
                        env_name: 'NODE_ENV',
                        env_value: `${config.nodeEnv}`,
                },
                {
                        env_name: 'DB_HOST',
                        env_value: `${config.dbConfig.url}`,
                },
                {
                        env_name: 'SERVER_URL',
                        env_value: `${config.appConfig.url}`,
                },
                {
                        env_name: 'SWAGGER_URL',
                        env_value: `${config.appConfig.url}/docs`,
                },
        ]);

        p.printTable();
}
