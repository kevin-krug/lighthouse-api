import { Injectable } from '@nestjs/common';
import config from './config';

@Injectable()
export class AppService {
  async getMetrics(url: string) {
    const lighthouse = (await import('lighthouse')).default;
    const chromeLaunch = (await import('chrome-launcher')).launch;
    const chrome = await chromeLaunch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port,
    };
    // @ts-expect-error fix options type later
    const runnerResult = await lighthouse(url, options, config);

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult?.lhr.finalDisplayedUrl);
    console.log(
      'Performance score was',
      runnerResult?.lhr?.categories?.performance?.score || 0 * 100,
    );

    chrome.kill();

    return runnerResult;
  }
}
