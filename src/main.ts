import { ExpressServer } from 'setup';

async function main() {
        const expressServer = new ExpressServer();
        await expressServer.setup();
        await expressServer.start();
}

main();
