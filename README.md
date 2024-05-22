// Iniciar Astro empty
pnpm create astro@latest
//Instalar Dependecias
pnpm i @lucia-auth/adapter-drizzle
pnpm i oslo
pnpm astro add db
pnpm astro add tailwind
pnpm astro add vercel
pnpm i arctic


para acceder a los datos de la base de datos atravez del middlaware

---
const user = Astro.locals.user
console.log(user);
---


para agregar el OAuth de GitHub, necesitamos agregar la libreria de 'arctic'