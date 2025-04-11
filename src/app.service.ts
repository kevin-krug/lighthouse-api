import { Injectable } from '@nestjs/common';
import config from './config';
import { Flags, RunnerResult } from 'lighthouse';

export interface IMetrics {
  url?: string;
  userAgent?: string;
  score: number;
  metrics?: {
    title?: string;
    description?: string;
    timing?: string;
  }[];
  opportunities?: {
    id?: string;
    title?: string;
    description?: string;
    score: number | null;
    displayValue?: string;
    metricSavings?: {
      FCP?: number;
      LCP?: number;
    };
  }[];
}

const metricKeys = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'cumulative-layout-shift',
  'interactive',
  'total-blocking-time',
];

@Injectable()
export class AppService {
  private lighthouseQueue: Promise<void> = Promise.resolve();

  async getMetrics(url: string): Promise<IMetrics> {
    let runnerResult: IMetrics;
    return new Promise((resolve, reject) => {
      this.lighthouseQueue = this.lighthouseQueue.then(async () => {
        try {
          runnerResult = await this.runLighthouse(url);
          resolve(runnerResult);
        } catch (e) {
          reject(e as Error);
        }
      });
    });
  }

  private async runLighthouse(url: string): Promise<IMetrics> {
    const lighthouse = (await import('lighthouse')).default;
    const chromeLaunch = (await import('chrome-launcher')).launch;

    const chrome = await chromeLaunch({ chromeFlags: ['--headless'] });

    const flags = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port,
    } as Flags;

    const runnerResult: RunnerResult | undefined = await lighthouse(
      url,
      flags,
      config,
    );

    const audits = runnerResult?.lhr?.audits;
    const categories = runnerResult?.lhr?.categories;

    const metrics = metricKeys.map((metric) => ({
      title: audits?.[metric].title,
      description: audits?.[metric].description,
      timing: audits?.[metric].displayValue,
    }));

    const opportunities = audits
      ? Object.values(audits)
          .filter(
            (audit) => audit?.details && audit?.details.type === 'opportunity',
          )
          .map(
            ({
              id,
              title,
              description,
              score,
              displayValue,
              metricSavings,
            }) => ({
              id,
              title,
              description,
              score,
              displayValue,
              metricSavings,
            }),
          )
      : [];

    chrome.kill();

    return {
      url: runnerResult?.lhr.finalDisplayedUrl,
      userAgent: runnerResult?.lhr.userAgent,
      score: categories?.performance?.score || 0 * 100 * 100,
      metrics,
      opportunities,
    };
  }
}

