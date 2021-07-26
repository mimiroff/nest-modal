import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { Builder } from '@nuxt/builder';
import { NextFunction, Request, Response } from 'express';
import { Nuxt } from 'nuxt';

import configFile from '../../nuxt.config';

@Controller()
export class NuxtController {
  private nuxt!: Nuxt;
  readonly production!: boolean;

  constructor() {
    this.production = !configFile.dev;
    if (!process.env.NO_NUXT) {
      this.init();
    }
  }

  public async init() {
    this.nuxt = new Nuxt(configFile);
    await this.nuxt.ready();

    if (!this.production) {
      await new Builder(this.nuxt).build();
    }
  }

  @Get('*')
  public root(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (req.path.startsWith('/api')) {
      return next();
    } else if (this.nuxt) {
      return this.nuxt.render(req, res);
    } else {
      return res.send('Nuxt is disabled.');
    }
  }
}
