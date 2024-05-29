/* empty css                             */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_xTDPdUvo.mjs';

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class=" "> <div class="rounded-lg bg-gray-900 py-5"> <div class="px-20"> <h1 class="text-xl mb-2 font-mono font-black text-center text-green-500">
Crea tu nueva cuenta
</h1> <form class="text-center" method="POST" action="/api/signup"> <div class=""> <label for="username" class="text-sm font-mono font-extraligth text-green-500">Username</label> <input type="text" name="username" id="username" class="
                mb-6
                bg-gray-700 
                border
                border-gray-700 
                text-gray-900 
                rounded-lg 
                focus:border-primary-600 w-full h-10" required=""> </div> <div> <label for="password" class="block text-sm font-mono text-green-500">
Password
</label> <input type="password" name="password" id="password" placeholder="" class="
                w-full
                border 
                border-gray-700 
                text-gray-900 
                rounded-lg block 
                h-10
                bg-gray-700 
                placeholder-gray-400
                mb-4" required=""> </div> <button type="submit" class="mb-4 w-full text-green-400 bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button> </form> </div> </div> </section>`;
}, "/Users/juanelgueda/astroAuthLucia/src/pages/signup.astro", void 0);

const $$file = "/Users/juanelgueda/astroAuthLucia/src/pages/signup.astro";
const $$url = "/signup";

export { $$Signup as default, $$file as file, $$url as url };
