import { Request, Response } from 'express';
import shortid from 'shortid';

import { URLModel } from '../database/model/URL';

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;

    const url = await URLModel.findOne({ originURL });
    if (url) {
      res.json(url);
      return;
    }

    const hash = shortid.generate();
    const shortURL = `${process.env.API_URL}:${process.env.API_PORT}/${hash}`;
    const newURL = await URLModel.create({ originURL, hash, shortURL });

    res.json(newURL);
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const url = await URLModel.findOne({ hash });
    if (url) {
      res.redirect(url.originURL);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  }
}
