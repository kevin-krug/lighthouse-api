import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { URL } from 'node:url';
import dns from 'node:dns';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  validateUrl(inputUrl: string) {
    try {
      const parsedUrl = new URL(inputUrl);
      return parsedUrl;
    } catch {
      throw new HttpException(
        `The passed URL is not valid. Please pass a valid full URL`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  lookupUrl(parsedUrl: URL) {
    console.log(`looking up ${parsedUrl.host}...`);

    return new Promise<void>((resolve, reject) => {
      dns.lookup(parsedUrl.host, (error, address) => {
        if (error || !address) {
          reject(
            new HttpException(
              `The host of the passed URL cannot be found.`,
              HttpStatus.BAD_REQUEST,
            ),
          );
        } else {
          resolve(); // DNS lookup successful
        }
      });
    });
  }

  async transform(inputUrl: string) {
    if (!inputUrl) {
      return;
    }
    const parsedUrl = this.validateUrl(inputUrl);
    await this.lookupUrl(parsedUrl);
    return inputUrl;
  }
}
