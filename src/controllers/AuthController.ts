import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.authService.createUser(req.body);

            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { identifier, password } = req.body;
            const user = await this.authService.loginUser(identifier, password);

            if (!user) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
