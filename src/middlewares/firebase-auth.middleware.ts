import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    const errorResBody = {
      error: true,
      message: 'Unauthorized user token is missing!',
    };

    if (!authorizationHeader) {
      return res.status(401).json(errorResBody);
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req['user'] = decodedToken; // Attach the decoded user to the request
      next();
    } catch (error) {
      return res.status(401).json(errorResBody);
    }
  }
}
