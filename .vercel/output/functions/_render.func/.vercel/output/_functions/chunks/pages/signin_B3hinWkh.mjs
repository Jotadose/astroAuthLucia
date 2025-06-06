/* empty css                             */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_xTDPdUvo.mjs';

const $$Signin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1 class="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
Ingresa con tu cuenta
</h1> <form class="space-y-4 md:space-y-6" method="POST" action="/api/signin"> <div> <label for="username" class=" block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">Usuario</label> <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> <div> <label for="password" class="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">Contraseña</label> <input type="password" name="password" id="password" placeholder="********" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> <button type="submit" class="w-full text-white bg-blue-900 rounded-full p-2 shadow-lg border-spacing-1 border-white">Ingresar</button> <p class="text-sm text-center font-medium text-blue-200"> <a href="/signup">Crea una cuenta nueva</a> </p> </form>`;
}, "/Users/juanelgueda/astroAuthLucia/src/pages/signin.astro", void 0);

const $$file = "/Users/juanelgueda/astroAuthLucia/src/pages/signin.astro";
const $$url = "/signin";

export { $$Signin as default, $$file as file, $$url as url };
