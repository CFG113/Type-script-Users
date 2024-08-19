import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.authService.createUser(req.body);      
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { identifier, password } = req.body;
            const user = await this.authService.loginUser(identifier, password);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
