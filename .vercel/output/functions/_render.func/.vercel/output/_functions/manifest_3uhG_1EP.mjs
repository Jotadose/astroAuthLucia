import { a2 as bold, a3 as red, a4 as yellow, a5 as dim, a6 as blue } from './chunks/astro_xTDPdUvo.mjs';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.8.6_@types+node@16.18.11_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/auth/[...auth]","pattern":"^\\/api\\/auth(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.8.6_@types+node@16.18.11_typescript@5.4.5__next@14_7zhmwafqhhsbtehfnh2lnietfq/node_modules/auth-astro/src/api/[...auth].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signin.ts","pathname":"/api/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signout.ts","pathname":"/api/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signup","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signup\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signup.ts","pathname":"/api/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"async function p(n,t,e){const{callbackUrl:a=window.location.href,redirect:s=!0}=t??{},{prefix:c=\"/api/auth\",...i}=t??{},o=n===\"credentials\",w=o||n===\"email\",d=`${`${c}/${o?\"callback\":\"signin\"}/${n}`}?${new URLSearchParams(e)}`,u=await fetch(`${c}/csrf`),{csrfToken:f}=await u.json(),l=await fetch(d,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({...i,csrfToken:f,callbackUrl:a})}),r=await l.clone().json(),h=new URL(r.url).searchParams.get(\"error\");if(s||!w||!h){window.location.href=r.url??a,r.url.includes(\"#\")&&window.location.reload();return}return l}async function g(n){const{callbackUrl:t=window.location.href,prefix:e=\"/api/auth\"}=n??{},a=await fetch(`${e}/csrf`),{csrfToken:s}=await a.json(),o=(await(await fetch(`${e}/signout`,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({csrfToken:s,callbackUrl:t})})).json()).url??t;window.location.href=o,o.includes(\"#\")&&window.location.reload()}window.signIn=p;window.signOut=g;\n"}],"styles":[{"type":"external","src":"/_astro/authUser.BfCHi4cT.css"}],"routeData":{"route":"/authuser","isIndex":false,"type":"page","pattern":"^\\/authUser\\/?$","segments":[[{"content":"authUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/authUser.astro","pathname":"/authUser","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"async function p(n,t,e){const{callbackUrl:a=window.location.href,redirect:s=!0}=t??{},{prefix:c=\"/api/auth\",...i}=t??{},o=n===\"credentials\",w=o||n===\"email\",d=`${`${c}/${o?\"callback\":\"signin\"}/${n}`}?${new URLSearchParams(e)}`,u=await fetch(`${c}/csrf`),{csrfToken:f}=await u.json(),l=await fetch(d,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({...i,csrfToken:f,callbackUrl:a})}),r=await l.clone().json(),h=new URL(r.url).searchParams.get(\"error\");if(s||!w||!h){window.location.href=r.url??a,r.url.includes(\"#\")&&window.location.reload();return}return l}async function g(n){const{callbackUrl:t=window.location.href,prefix:e=\"/api/auth\"}=n??{},a=await fetch(`${e}/csrf`),{csrfToken:s}=await a.json(),o=(await(await fetch(`${e}/signout`,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({csrfToken:s,callbackUrl:t})})).json()).url??t;window.location.href=o,o.includes(\"#\")&&window.location.reload()}window.signIn=p;window.signOut=g;\n"}],"styles":[{"type":"external","src":"/_astro/authUser.BfCHi4cT.css"}],"routeData":{"route":"/oauthlayer","isIndex":false,"type":"page","pattern":"^\\/oauthLayer\\/?$","segments":[[{"content":"oauthLayer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauthLayer.astro","pathname":"/oauthLayer","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/authUser.BfCHi4cT.css"}],"routeData":{"route":"/product","isIndex":false,"type":"page","pattern":"^\\/product\\/?$","segments":[[{"content":"product","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/product.astro","pathname":"/product","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/authUser.BfCHi4cT.css"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/authUser.BfCHi4cT.css"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"async function p(n,t,e){const{callbackUrl:a=window.location.href,redirect:s=!0}=t??{},{prefix:c=\"/api/auth\",...i}=t??{},o=n===\"credentials\",w=o||n===\"email\",d=`${`${c}/${o?\"callback\":\"signin\"}/${n}`}?${new URLSearchParams(e)}`,u=await fetch(`${c}/csrf`),{csrfToken:f}=await u.json(),l=await fetch(d,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({...i,csrfToken:f,callbackUrl:a})}),r=await l.clone().json(),h=new URL(r.url).searchParams.get(\"error\");if(s||!w||!h){window.location.href=r.url??a,r.url.includes(\"#\")&&window.location.reload();return}return l}async function g(n){const{callbackUrl:t=window.location.href,prefix:e=\"/api/auth\"}=n??{},a=await fetch(`${e}/csrf`),{csrfToken:s}=await a.json(),o=(await(await fetch(`${e}/signout`,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({csrfToken:s,callbackUrl:t})})).json()).url??t;window.location.href=o,o.includes(\"#\")&&window.location.reload()}window.signIn=p;window.signOut=g;\n"}],"styles":[{"type":"external","src":"/_astro/authUser.BfCHi4cT.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/juanelgueda/astroAuthLucia/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/juanelgueda/astroAuthLucia/src/pages/product.astro",{"propagation":"none","containsHead":true}],["/Users/juanelgueda/astroAuthLucia/src/pages/oauthLayer.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","/node_modules/.pnpm/astro@4.8.6_@types+node@16.18.11_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_CGJwPd4O.mjs","/src/pages/index.astro":"chunks/pages/index_k8gwXcY0.mjs","/src/pages/oauthLayer.astro":"chunks/pages/oauthLayer_D8mQQYhE.mjs","/src/pages/signin.astro":"chunks/pages/signin_B3hinWkh.mjs","/src/pages/api/signout.ts":"chunks/pages/signout_CQoSQuQ2.mjs","/src/pages/signup.astro":"chunks/pages/signup_BDSCIScJ.mjs","/src/pages/api/signup.ts":"chunks/pages/signup_BGnIk5tE.mjs","\u0000@astrojs-manifest":"manifest_3uhG_1EP.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.8.6_@types+node@16.18.11_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_w_v3Ek9P.mjs","\u0000@astro-page:node_modules/.pnpm/auth-astro@4.1.1_@auth+core@0.18.6_astro@4.8.6_@types+node@16.18.11_typescript@5.4.5__next@14_7zhmwafqhhsbtehfnh2lnietfq/node_modules/auth-astro/src/api/[...auth]@_@ts":"chunks/_.._DFkZ4jE1.mjs","\u0000@astro-page:src/pages/api/signin@_@ts":"chunks/signin_VFWr4S1R.mjs","\u0000@astro-page:src/pages/api/signout@_@ts":"chunks/signout_DaLIE-3-.mjs","\u0000@astro-page:src/pages/api/signup@_@ts":"chunks/signup_6W2R2KlI.mjs","\u0000@astro-page:src/pages/authUser@_@astro":"chunks/authUser_CKm5wMf0.mjs","\u0000@astro-page:src/pages/oauthLayer@_@astro":"chunks/oauthLayer_BOL9z4_9.mjs","\u0000@astro-page:src/pages/product@_@astro":"chunks/product_DViLO2yq.mjs","\u0000@astro-page:src/pages/signin@_@astro":"chunks/signin_BHEbEpuw.mjs","\u0000@astro-page:src/pages/signup@_@astro":"chunks/signup_Bfo0M-xG.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_C6yfO2mt.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.C7xXQaiB.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/authUser.BfCHi4cT.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
