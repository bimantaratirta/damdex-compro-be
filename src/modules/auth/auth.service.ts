import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
    ) {

    }
}
