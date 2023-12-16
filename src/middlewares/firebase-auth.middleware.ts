import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }

    const authorizationHeader = req.headers.authorization.split(' ')[1];

    if (!authorizationHeader) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req['user'] = decodedToken; // Attach the decoded user to the request
      next();
    } catch (error) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
  }
}
