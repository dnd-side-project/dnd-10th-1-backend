import gradient from 'gradient-string';

export function printBootBanner() {
        const coolGradient = gradient('red', 'blue', 'green', 'orange');

        const coolString = coolGradient(String.raw`

          ███████╗███████╗██████╗ ███████╗
          ██╔════╝╚══███╔╝██╔══██╗╚══███╔╝
          █████╗    ███╔╝ ██████╔╝  ███╔╝ 
          ██╔══╝   ███╔╝  ██╔═══╝  ███╔╝  
          ███████╗███████╗██║     ███████╗
          ╚══════╝╚══════╝╚═╝     ╚══════╝
                                
      `);

        return coolString;
}
