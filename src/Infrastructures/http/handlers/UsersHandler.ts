import { Request, Response, NextFunction } from "express";
import container from "../../container.js";
import logger from "../../logger/index.js";

class UsersHandler {
    async postUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const addUser = container.getInstance('AddUserUseCase');
            const registeredUser = await addUser.execute(req.body);

            logger.info('User berhasil registrasi', { userId: registeredUser.id });

            res.status(201).json({
                status: 'success',
                data: {
                    registeredUser
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const detailUserUseCase = container.getInstance('DetailUserUseCase');

            const user = await detailUserUseCase.execute(req.params as {id: string});

            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async updateFullname(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updateFullnameUseCase = container.getInstance('UpdateFullnameUseCase');

            const user = await updateFullnameUseCase.execute(req.body, req.params as {id: string});

            logger.info('User berhasil udpate username', { userId: user.id });

            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch(error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deleteUserUseCase = container.getInstance('DeleteUserUseCase');

            await deleteUserUseCase.execute({ userId: req.params.id as string});

            logger.info('User berhasil dihapus', { userId: req.params.id });
            res.status(200).json({
                status: 'success',
                message: 'User berhasil dihapus'
            });
        } catch(error) {
            next(error);
        }
    }
}

export default new UsersHandler();