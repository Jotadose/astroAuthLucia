import { d as db, S as Session, U as User } from './product_BAMHQ1pn.mjs';
import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub } from 'arctic';
import { Argon2id } from 'oslo/password';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const adapter = new DrizzleSQLiteAdapter(db, Session, User);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      username: attributes.username
    };
  }
});
new GitHub(
  "Ov23liMOSuAsQPkRNrO3",
  "33ba942bdba070f62d44e4a72a943cbf76d578ff"
);

async function POST(context) {
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (typeof username !== "string") {
    return new Response("invalid username", {
      status: 400
    });
  }
  const foundUser = (await db.select().from(User).where(eq(User.username, username))).at(0);
  if (!foundUser) {
    return new Response("Incorrect username or password", {
      status: 400
    });
  }
  if (!foundUser.password) {
    return new Response(
      "Invalid password",
      { status: 400 }
    );
  }
  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );
  if (!validPassword) {
    return new Response("Incorrect username or password", { status: 400 });
  }
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/product");
}

const signin = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

export { lucia as l, signin as s };
