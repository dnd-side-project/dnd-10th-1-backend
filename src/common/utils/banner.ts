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

        return coolString;
}
