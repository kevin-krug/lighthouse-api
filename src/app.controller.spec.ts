import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('getMetrics', () => {
    it('should call app service get metrics method', async () => {
      jest.mock('lighthouse');
      jest.mock('chrome-launcher', () => ({
        launch: jest.fn(() => ({
          kill: jest.fn(),
        })),
      }));

      const spy = jest.spyOn(appService, 'getMetrics');
      await appController.getMetrics('https://www.google.de');

      expect(spy).toHaveBeenCalled();
    });
  });
});
