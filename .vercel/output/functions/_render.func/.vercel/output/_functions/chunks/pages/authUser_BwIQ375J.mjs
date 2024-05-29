/* empty css                             */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, e as createAstro, u as unescapeHTML, F as Fragment, f as defineScriptVars, g as renderSlot, s as spreadAttributes } from '../astro_xTDPdUvo.mjs';
import { g as getSession, a as authConfig } from './__CUX5Auc8.mjs';
import $$Signup from './signup_BDSCIScJ.mjs';
import $$Signin from './signin_B3hinWkh.mjs';

const $$Astro$3 = createAstro();
const $$Auth = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Auth;
  const { authConfig: authConfig$1 = authConfig } = Astro2.props;
  let session = await getSession(Astro2.request, authConfig$1);
  return renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [session]))}` })} </div>`;
}, "/Users/juanelgueda/astroAuthLucia/node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.8.6_@types+node@16.18.11_typescript@5.4.5__next@14_7zhmwafqhhsbtehfnh2lnietfq/node_modules/auth-astro/src/components/Auth.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro();
const $$SignIn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SignIn;
  const key = Math.random().toString(36).slice(2, 11);
  const { provider, options, authParams, ...attrs } = Astro2.props;
  attrs.class = `signin-${key} ${attrs.class ?? ""}`;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", "<button", "> ", " </button>  <script>(function(){", "\n	document\n		.querySelector(`.signin-${key}`)\n		?.addEventListener('click', () => signIn(provider, options, authParams))\n})();<\/script>"], ["", "<button", "> ", " </button>  <script>(function(){", "\n	document\n		.querySelector(\\`.signin-\\${key}\\`)\n		?.addEventListener('click', () => signIn(provider, options, authParams))\n})();<\/script>"])), maybeRenderHead(), spreadAttributes(attrs), renderSlot($$result, $$slots["default"]), defineScriptVars({ provider, options, authParams, key }));
}, "/Users/juanelgueda/astroAuthLucia/node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.8.6_@types+node@16.18.11_typescript@5.4.5__next@14_7zhmwafqhhsbtehfnh2lnietfq/node_modules/auth-astro/src/components/SignIn.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$SignOut = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SignOut;
  const key = Math.random().toString(36).slice(2, 11);
  const { params, ...attrs } = Astro2.props;
  attrs.class = `signout-${key} ${attrs.class ?? ""}`;
  return renderTemplate(_a || (_a = __template(["", "<button", "> ", " </button>  <script>(function(){", "\n	document.querySelector(`.signout-${key}`)?.addEventListener('click', () => signOut(params))\n})();<\/script>"], ["", "<button", "> ", " </button>  <script>(function(){", "\n	document.querySelector(\\`.signout-\\${key}\\`)?.addEventListener('click', () => signOut(params))\n})();<\/script>"])), maybeRenderHead(), spreadAttributes(attrs), renderSlot($$result, $$slots["default"]), defineScriptVars({ params, key }));
}, "/Users/juanelgueda/astroAuthLucia/node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.8.6_@types+node@16.18.11_typescript@5.4.5__next@14_7zhmwafqhhsbtehfnh2lnietfq/node_modules/auth-astro/src/components/SignOut.astro", void 0);

const $$Astro = createAstro();
const $$AuthUser = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthUser;
  const session = await getSession(Astro2.request);
  session?.user?.image;
  return renderTemplate`${maybeRenderHead()}<section class=""> <div class="grid gap-x-1 lg:grid-cols-1 "> <div class="row-span-5 h-full"> ${renderComponent($$result, "Signup", $$Signup, {})} </div> <h2 class="text-gray-900 bg-white shadow-md border border-black rounded-full text-center m-1">
Tambien puedes ingresar con tu cuenta :
</h2> ${renderComponent($$result, "SignIn", $$SignIn, { "provider": "google", "class": "row-span-1 justify-center text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm text-center flex flex-cols items-center  my-1 h-10" }, { "default": ($$result2) => renderTemplate` <svg width="50px" height="30px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
Google
` })} ${renderComponent($$result, "SignIn", $$SignIn, { "provider": "github", "class": "row-span-1 text-white bg-black hover:bg-gray-800  font-medium rounded-lg text-sm px-5 text-center h-10 flex flex-cols items-center justify-center" }, { "default": ($$result2) => renderTemplate` <svg width="50px" height="30px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"></path> </g> </g> </g> </g></svg>
GitHub
` })} ${renderComponent($$result, "SignIn", $$SignIn, { "provider": "twitch", "class": "row-span-1 w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm text-center flex items-center justify-center h-10 my-1" }, { "default": ($$result2) => renderTemplate` <svg width="50px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"></path> <g fill="#9146FF"> <path d="M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"></path> <path d="M11.5 3.75h-1v3h1v-3zM8.75 3.75h-1v3h1v-3z"></path> </g> </g></svg>
Twitch
` })} <div class="row-span-2 bg-gray-800 rounded-lg shadow "> <div class="mx-1"> ${renderComponent($$result, "Signin", $$Signin, {})} </div> </div> </div></section> `;
}, "/Users/juanelgueda/astroAuthLucia/src/pages/authUser.astro", void 0);

const $$file = "/Users/juanelgueda/astroAuthLucia/src/pages/authUser.astro";
const $$url = "/authUser";

const authUser = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$AuthUser,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$AuthUser as $, $$SignOut as a, authUser as b };
