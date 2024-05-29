/* empty css                             */
import { c as createComponent, r as renderTemplate, n as renderHead, e as createAstro } from '../astro_xTDPdUvo.mjs';
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import '@astrojs/db/dist/runtime/virtual.js';
import { generateId } from 'lucia';

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const User = asDrizzleTable("User", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true, "optional": false } }, "username": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "username", "collection": "User", "primaryKey": false, "optional": false } }, "password": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "password", "collection": "User", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const Session = asDrizzleTable("Session", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Session", "primaryKey": false, "optional": false } }, "userId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Session", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true, "optional": false } } } }, "expiresAt": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "expiresAt", "collection": "Session", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
asDrizzleTable("Category", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Category", "primaryKey": true } }, "label": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "label", "collection": "Category", "primaryKey": false, "optional": false } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Category", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const Todo = asDrizzleTable("Todo", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Todo", "primaryKey": true } }, "title": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "title", "collection": "Todo", "primaryKey": false, "optional": false } }, "stock": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "stock", "collection": "Todo", "primaryKey": false, "optional": false } }, "fecha": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "fecha", "collection": "Todo", "primaryKey": false, "optional": false } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Todo", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const $$Astro = createAstro();
const $$Product = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Product;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const id = generateId(8);
    const title = formData.get("title");
    const stock = formData.get("stock");
    const fecha = formData.get("fecha");
    const description = formData.get("description");
    console.log({ id, title, stock, fecha, description });
    if (typeof title === "string" && typeof description === "string" && typeof stock === "string" && typeof fecha === "string") {
      await db.insert(Todo).values({
        id,
        title,
        stock,
        fecha,
        description
      });
    }
  }
  const todos = await db.select().from(Todo);
  return renderTemplate`<html lang="es"> <head><title>Crear Tarea</title><meta charset="UTF-8">${renderHead()}</head> <body class="bg-gray-700"> <div class="block bg-gray-700"> <form method="POST" class="bg-black shadow-md rounded px-4 pt-6 pb-6"> <div class="mb-1"> <label class="block text-gray-300 text-sm font-bold mb-2" for="title">
Título
</label> <input name="title" class="shadow appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Título de la tarea"> </div> <div class="mb-1"> <label class="block text-gray-300 text-sm font-bold mb-2" for="title">
Stock
</label> <input name="stock" class="shadow appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Título de la tarea"> </div> <div class="mb-1"> <label class="block text-gray-300 text-sm font-bold mb-2" for="title">
Fecha
</label> <input type="date" name="fecha" class="shadow appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Título de la tarea"> </div> <div class="mb-1"> <label class="block text-gray-300 text-sm font-bold mb-2" for="description">
Descripción
</label> <textarea name="description" class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Descripción de la tarea"></textarea> </div> <div class="flex items-center justify-between"> <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
Crear Tarea
</button> </div> </form> <div class="justify-center mt-10  space-x-10 "> <div class="overflow-x-auto relative shadow-md sm:rounded-lg"> <div class="overflow-x-auto relative shadow-md sm:rounded-lg"> <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400"> <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> <tr> <th scope="col" class="py-3 px-6">ID</th> <th scope="col" class="py-3 px-6">Titulo</th> <th scope="col" class="py-3 px-6">Stock</th> <th scope="col" class="py-3 px-6">Fecha</th> <th scope="col" class="py-3 px-6">Descripcion</th> </tr> </thead> <tbody> ${todos.map((todos2) => renderTemplate`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"> <td class="py-4 px-6">${todos2.id}</td> <td class="py-4 px-6">${todos2.title}</td> <td class="py-4 px-6">${todos2.stock}</td> <td class="py-4 px-6">${todos2.fecha}</td> <td class="py-4 px-6">${todos2.description}</td> </tr>`)} </tbody> </table> </div> </div> </div> </div> </body></html>`;
}, "/Users/juanelgueda/astroAuthLucia/src/pages/product.astro", void 0);

const $$file = "/Users/juanelgueda/astroAuthLucia/src/pages/product.astro";
const $$url = "/product";

const product = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Product,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Product as $, Session as S, User as U, db as d, product as p };
