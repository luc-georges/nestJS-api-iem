import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {

    signup() {
        return {message: 'i am sign up'}
    }

    signin() {
        return {message: 'i am sign in'}
    }
}