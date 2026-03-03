import { Injectable } from "@nestjs/common";
import * as jsonwebtoken from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "src/common/constant/app.constant";

@Injectable()
export class TokenService {
    createTokens(userId: number | string, role: string) {
        const accessToken = jsonwebtoken.sign({ userId, role }, ACCESS_TOKEN_SECRET as string, { expiresIn: "2d" });
        const refreshToken = jsonwebtoken.sign({ userId, role }, REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" })
        return {
            accessToken,
            refreshToken
        }
    }

    verifyAccessToken(accessToken: any, option?: jsonwebtoken.VerifyOptions) {
        const decode = jsonwebtoken.verify(accessToken,
            ACCESS_TOKEN_SECRET as string,
            option)
        return decode
    }

    verifyRefreshToken(refreshToken: any) {
        const decode = jsonwebtoken.verify(refreshToken,
            REFRESH_TOKEN_SECRET as string)
        return decode
    }
}
