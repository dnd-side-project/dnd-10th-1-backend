import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
        app: INestApplication;
        document: OpenAPIObject;
        logger: Logger = new Logger(Swagger.name);

        constructor(app: INestApplication) {
                this.app = app;
        }

        initialize() {
                this.build();
                this.pageSetup();
        }

        private build() {
                const options = new DocumentBuilder()
                        .setTitle('NESTJS Sample Project API')
                        .setDescription('This is a sample project')
                        .setVersion('1.0.0')
                        .addTag('Nestjs Swagger UI')
                        .addBearerAuth({
                                type: 'http',
                                scheme: 'bearer',
                                bearerFormat: 'JWT',
                        })
                        .setExternalDoc('Download JSON Specifications', '/docs-json')
                        .build();

                const document = SwaggerModule.createDocument(this.app, options);
                this.document = document;
        }

        private pageSetup() {
                SwaggerModule.setup('/docs', this.app, this.document);
                this.logger.log('Swagger Setup');
        }
}
