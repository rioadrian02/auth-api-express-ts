import { Request, Response, NextFunction} from 'express';
import container from "../../container.js";
import logger from "../../logger/index.js";

class AuthenticationsHandler {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const loginUserUseCase = container.getInstance('LoginUserUseCase');

            const { accessToken, refreshToken } = await loginUserUseCase.execute(req.body);

            logger.info('User berhasil login', { username: req.body.username });

            res.status(201).json({
                status: 'success',
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch(error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const refreshAuthenticationUseCase = container.getInstance('RefreshAuthenticationUseCase');

            const { accessToken } = await refreshAuthenticationUseCase.execute(req.body);

            res.status(200).json({
                status: 'success',
                data: { accessToken },
            });

        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const logoutUserUseCase = container.getInstance('LogoutUserUseCase');

            await logoutUserUseCase.execute(req.body);

            logger.info('User berhasil logout');

            res.status(200).json({
                status: 'success',
                message: 'Logout berhasil',
            });

        } catch (error) {
            next(error);
        }
    }
}

export default new AuthenticationsHandler();