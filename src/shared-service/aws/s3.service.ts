import { S3 } from '@aws-sdk/client-s3';
import mime from 'mime-types';

import { Injectable } from '@nestjs/common';

import type { IFile } from '@/common/interfaces';
import { generateFileName } from '@/common/utils/generator';

import { ApiConfigService } from '../env/api-config.service';

@Injectable()
export class AwsS3Service {
        private readonly s3: S3;
        private readonly awsS3Config;

        constructor(public configService: ApiConfigService) {
                this.awsS3Config = configService.awsConfig;

                this.s3 = new S3({
                        apiVersion: this.awsS3Config.bucketApiVersion,
                        region: this.awsS3Config.bucketRegion,
                        credentials: {
                                accessKeyId: this.awsS3Config.accessKey,
                                secretAccessKey: this.awsS3Config.secretAccessKey,
                        },
                });
        }

        async uploadImage(file: IFile): Promise<string> {
                const extName = mime.extension(file.mimetype);
                const fileName = generateFileName(extName);
                const key = 'images/' + fileName;

                await this.s3.putObject({
                        Bucket: this.awsS3Config.bucketName,
                        Body: file.buffer,
                        ACL: 'public-read',
                        Key: key,
                });

                return key;
        }
}
