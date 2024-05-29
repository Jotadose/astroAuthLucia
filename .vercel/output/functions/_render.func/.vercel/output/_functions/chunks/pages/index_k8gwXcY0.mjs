/* empty css                             */
import { c as createComponent, r as renderTemplate, l as addAttribute, n as renderHead, d as renderComponent, e as createAstro } from '../astro_xTDPdUvo.mjs';
import { g as getSession } from './__CUX5Auc8.mjs';
import $$OauthLayer from './oauthLayer_D8mQQYhE.mjs';
import { $ as $$AuthUser } from './authUser_BwIQ375J.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = await getSession(Astro2.request);
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>AstroAuthLuciaDB</title>${renderHead()}</head> <body class="h-screen w-screen flex justify-center place-items-center  bg-gray-950"> ${session ? renderTemplate`${renderComponent($$result, "OauthLayer", $$OauthLayer, {})}` : renderTemplate`${renderComponent($$result, "AuthUser", $$AuthUser, {})}`} </body></html>`;
}, "/Users/juanelgueda/astroAuthLucia/src/pages/index.astro", void 0);

const $$file = "/Users/juanelgueda/astroAuthLucia/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
