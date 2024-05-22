import type { APIContext } from "astro";
import { db, eq, User } from 'astro:db';
import { lucia } from '@/auth';
import {Argon2id} from "oslo/password";


export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username !== "string") {
        return new Response("invalid username", {
            status:400
        });
    }
    // busca el usuario 
    const foundUser = (
        await db.select().from(User).where(eq(User.username, username))
    ).at(0);
    // si el user no se encuentra en la db 
    if (!foundUser) {
        return new Response("Incorrect username or password", {
            status:400
        });
    }
    // Verifica si el usuario tiene un password
    if (!foundUser.password) {
        return new Response ("Invalid password", {status:400}
        );
    }
    
    const validPassword = await new Argon2id().verify(
        foundUser.password,
        password
    );

    // si el password no es valido

    if (!validPassword) {
        return new Response("Incorrect username or password", {status:400});

    }

    //si el password es valido, entonces el usuario se puede loggear

    const session = await lucia.createSession(foundUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
    );

    return context.redirect("/");
}