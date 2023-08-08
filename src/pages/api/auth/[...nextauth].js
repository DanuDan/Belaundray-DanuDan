import { loginUser } from "../../../store/slices/userSlice";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const { response } = await loginUser({
                        email: credentials.email,
                        password: credentials.password
                    })
                    return {
                        response,
                        name: "",
                        email: credentials.email,
                        token: response
                    }
                } catch (error) {
                    throw new Error(error?.data?.message)
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: async ({ token, user, trigger, session }) => {
            user && (token.user = user)
            if (trigger === 'update') {
                if (session.status) {
                    token.user.status = session.status
                }
                if (session.name) {
                    token.user.name = session.name
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    },
    session: {
        strategy: "jwt",
        maxAge: parseInt(process.env.NEXTAUTH_MAX_AGE),
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    }
}


export default NextAuth(authOptions)