// opencode-codebase-index - Semantic codebase search for OpenCode
import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ignore/index.js
var require_ignore = __commonJS({
  "node_modules/ignore/index.js"(exports, module2) {
    "use strict";
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var UNDEFINED = void 0;
    var EMPTY = "";
    var SPACE = " ";
    var ESCAPE = "\\";
    var REGEX_TEST_BLANK_LINE = /^\s+$/;
    var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
    var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    var REGEX_SPLITALL_CRLF = /\r?\n/g;
    var REGEX_TEST_INVALID_PATH = /^\.{0,2}\/|^\.{1,2}$/;
    var REGEX_TEST_TRAILING_SLASH = /\/$/;
    var SLASH2 = "/";
    var TMP_KEY_IGNORE = "node-ignore";
    if (typeof Symbol !== "undefined") {
      TMP_KEY_IGNORE = /* @__PURE__ */ Symbol.for("node-ignore");
    }
    var KEY_IGNORE = TMP_KEY_IGNORE;
    var define = (object, key, value) => {
      Object.defineProperty(object, key, { value });
      return value;
    };
    var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
    var RETURN_FALSE = () => false;
    var sanitizeRange = (range) => range.replace(
      REGEX_REGEXP_RANGE,
      (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY
    );
    var cleanRangeBackSlash = (slashes) => {
      const { length } = slashes;
      return slashes.slice(0, length - length % 2);
    };
    var REPLACERS = [
      [
        // Remove BOM
        // TODO:
        // Other similar zero-width characters?
        /^\uFEFF/,
        () => EMPTY
      ],
      // > Trailing spaces are ignored unless they are quoted with backslash ("\")
      [
        // (a\ ) -> (a )
        // (a  ) -> (a)
        // (a ) -> (a)
        // (a \ ) -> (a  )
        /((?:\\\\)*?)(\\?\s+)$/,
        (_, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? SPACE : EMPTY)
      ],
      // Replace (\ ) with ' '
      // (\ ) -> ' '
      // (\\ ) -> '\\ '
      // (\\\ ) -> '\\ '
      [
        /(\\+?)\s/g,
        (_, m1) => {
          const { length } = m1;
          return m1.slice(0, length - length % 2) + SPACE;
        }
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^"
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/"
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*\\\*\\\*\\\//,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        /^(?=[^^])/,
        function startingReplacer() {
          return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (_, p1, p2) => {
          const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
          return p1 + unescaped;
        }
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => ESCAPE
      ],
      [
        // > The range notation, e.g. [a-zA-Z],
        // > can be used to match one of the characters in a range.
        // `\` is escaped by step 3
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        /(?:[^*])$/,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
      ]
    ];
    var REGEX_REPLACE_TRAILING_WILDCARD = /(^|\\\/)?\\\*$/;
    var MODE_IGNORE = "regex";
    var MODE_CHECK_IGNORE = "checkRegex";
    var UNDERSCORE = "_";
    var TRAILING_WILD_CARD_REPLACERS = {
      [MODE_IGNORE](_, p1) {
        const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
        return `${prefix}(?=$|\\/$)`;
      },
      [MODE_CHECK_IGNORE](_, p1) {
        const prefix = p1 ? `${p1}[^/]*` : "[^/]*";
        return `${prefix}(?=$|\\/$)`;
      }
    };
    var makeRegexPrefix = (pattern) => REPLACERS.reduce(
      (prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern)),
      pattern
    );
    var isString = (subject) => typeof subject === "string";
    var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
    var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF).filter(Boolean);
    var IgnoreRule = class {
      constructor(pattern, mark, body, ignoreCase, negative, prefix) {
        this.pattern = pattern;
        this.mark = mark;
        this.negative = negative;
        define(this, "body", body);
        define(this, "ignoreCase", ignoreCase);
        define(this, "regexPrefix", prefix);
      }
      get regex() {
        const key = UNDERSCORE + MODE_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_IGNORE, key);
      }
      get checkRegex() {
        const key = UNDERSCORE + MODE_CHECK_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_CHECK_IGNORE, key);
      }
      _make(mode, key) {
        const str = this.regexPrefix.replace(
          REGEX_REPLACE_TRAILING_WILDCARD,
          // It does not need to bind pattern
          TRAILING_WILD_CARD_REPLACERS[mode]
        );
        const regex = this.ignoreCase ? new RegExp(str, "i") : new RegExp(str);
        return define(this, key, regex);
      }
    };
    var createRule = ({
      pattern,
      mark
    }, ignoreCase) => {
      let negative = false;
      let body = pattern;
      if (body.indexOf("!") === 0) {
        negative = true;
        body = body.substr(1);
      }
      body = body.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      const regexPrefix = makeRegexPrefix(body);
      return new IgnoreRule(
        pattern,
        mark,
        body,
        ignoreCase,
        negative,
        regexPrefix
      );
    };
    var RuleManager = class {
      constructor(ignoreCase) {
        this._ignoreCase = ignoreCase;
        this._rules = [];
      }
      _add(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules._rules);
          this._added = true;
          return;
        }
        if (isString(pattern)) {
          pattern = {
            pattern
          };
        }
        if (checkPattern(pattern.pattern)) {
          const rule = createRule(pattern, this._ignoreCase);
          this._added = true;
          this._rules.push(rule);
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(pattern) {
        this._added = false;
        makeArray(
          isString(pattern) ? splitPattern(pattern) : pattern
        ).forEach(this._add, this);
        return this._added;
      }
      // Test one single path without recursively checking parent directories
      //
      // - checkUnignored `boolean` whether should check if the path is unignored,
      //   setting `checkUnignored` to `false` could reduce additional
      //   path matching.
      // - check `string` either `MODE_IGNORE` or `MODE_CHECK_IGNORE`
      // @returns {TestResult} true if a file is ignored
      test(path12, checkUnignored, mode) {
        let ignored = false;
        let unignored = false;
        let matchedRule;
        this._rules.forEach((rule) => {
          const { negative } = rule;
          if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
            return;
          }
          const matched = rule[mode].test(path12);
          if (!matched) {
            return;
          }
          ignored = !negative;
          unignored = negative;
          matchedRule = negative ? UNDEFINED : rule;
        });
        const ret = {
          ignored,
          unignored
        };
        if (matchedRule) {
          ret.rule = matchedRule;
        }
        return ret;
      }
    };
    var throwError = (message, Ctor) => {
      throw new Ctor(message);
    };
    var checkPath = (path12, originalPath, doThrow) => {
      if (!isString(path12)) {
        return doThrow(
          `path must be a string, but got \`${originalPath}\``,
          TypeError
        );
      }
      if (!path12) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path12)) {
        const r = "`path.relative()`d";
        return doThrow(
          `path should be a ${r} string, but got "${originalPath}"`,
          RangeError
        );
      }
      return true;
    };
    var isNotRelative = (path12) => REGEX_TEST_INVALID_PATH.test(path12);
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore2 = class {
      constructor({
        ignorecase = true,
        ignoreCase = ignorecase,
        allowRelativePaths = false
      } = {}) {
        define(this, KEY_IGNORE, true);
        this._rules = new RuleManager(ignoreCase);
        this._strictPathCheck = !allowRelativePaths;
        this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null);
        this._testCache = /* @__PURE__ */ Object.create(null);
      }
      add(pattern) {
        if (this._rules.add(pattern)) {
          this._initCache();
        }
        return this;
      }
      // legacy
      addPattern(pattern) {
        return this.add(pattern);
      }
      // @returns {TestResult}
      _test(originalPath, cache, checkUnignored, slices) {
        const path12 = originalPath && checkPath.convert(originalPath);
        checkPath(
          path12,
          originalPath,
          this._strictPathCheck ? throwError : RETURN_FALSE
        );
        return this._t(path12, cache, checkUnignored, slices);
      }
      checkIgnore(path12) {
        if (!REGEX_TEST_TRAILING_SLASH.test(path12)) {
          return this.test(path12);
        }
        const slices = path12.split(SLASH2).filter(Boolean);
        slices.pop();
        if (slices.length) {
          const parent = this._t(
            slices.join(SLASH2) + SLASH2,
            this._testCache,
            true,
            slices
          );
          if (parent.ignored) {
            return parent;
          }
        }
        return this._rules.test(path12, false, MODE_CHECK_IGNORE);
      }
      _t(path12, cache, checkUnignored, slices) {
        if (path12 in cache) {
          return cache[path12];
        }
        if (!slices) {
          slices = path12.split(SLASH2).filter(Boolean);
        }
        slices.pop();
        if (!slices.length) {
          return cache[path12] = this._rules.test(path12, checkUnignored, MODE_IGNORE);
        }
        const parent = this._t(
          slices.join(SLASH2) + SLASH2,
          cache,
          checkUnignored,
          slices
        );
        return cache[path12] = parent.ignored ? parent : this._rules.test(path12, checkUnignored, MODE_IGNORE);
      }
      ignores(path12) {
        return this._test(path12, this._ignoreCache, false).ignored;
      }
      createFilter() {
        return (path12) => !this.ignores(path12);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path12) {
        return this._test(path12, this._testCache, true);
      }
    };
    var factory = (options) => new Ignore2(options);
    var isPathValid = (path12) => checkPath(path12 && checkPath.convert(path12), path12, RETURN_FALSE);
    var setupWindows = () => {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGEX_TEST_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path12) => REGEX_TEST_WINDOWS_PATH_ABSOLUTE.test(path12) || isNotRelative(path12);
    };
    if (
      // Detect `process` so that it can run in browsers.
      typeof process !== "undefined" && process.platform === "win32"
    ) {
      setupWindows();
    }
    module2.exports = factory;
    factory.default = factory;
    module2.exports.isPathValid = isPathValid;
    define(module2.exports, /* @__PURE__ */ Symbol.for("setupWindows"), setupWindows);
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter3.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter3.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter3.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter3.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter3.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter3;
    }
  }
});

// src/index.ts
import * as path11 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// src/config/constants.ts
var DEFAULT_INCLUDE = [
  "**/*.{ts,tsx,js,jsx,mjs,cjs}",
  "**/*.{py,pyi}",
  "**/*.{go,rs,java,kt,scala}",
  "**/*.{c,cpp,cc,h,hpp}",
  "**/*.{rb,php,inc,swift}",
  "**/*.{cls,trigger}",
  "**/*.{vue,svelte,astro}",
  "**/*.{sql,graphql,proto}",
  "**/*.{yaml,yml,toml}",
  "**/*.{md,mdx}",
  "**/*.{sh,bash,zsh}",
  "**/*.{txt,html,htm}",
  "**/*.zig",
  "**/*.gd"
];
var DEFAULT_EXCLUDE = [
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/build/**",
  "**/*build*/**",
  "**/*.min.js",
  "**/*.bundle.js",
  "**/vendor/**",
  "**/__pycache__/**",
  "**/target/**",
  "**/coverage/**",
  "**/.next/**",
  "**/.nuxt/**",
  "**/.opencode/**",
  "**/.*",
  "**/.*/**"
];
var EMBEDDING_MODELS = {
  "google": {
    // `text-embedding-004` is DEPRECATED - https://ai.google.dev/gemini-api/docs/deprecations
    "text-embedding-005": {
      provider: "google",
      model: "text-embedding-005",
      dimensions: 768,
      maxTokens: 2048,
      costPer1MTokens: 0.025,
      taskAble: false
      // Note: on reality, this model allows for task-specific embeddings. See: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings/task-types
    },
    "gemini-embedding-001": {
      provider: "google",
      model: "gemini-embedding-001",
      // Native output is 3072D, but we use Matryoshka truncation via outputDimensionality
      // to reduce to 1536D for better storage/search efficiency with minimal quality loss.
      // Google recommends 768, 1536, or 3072. See: https://ai.google.dev/gemini-api/docs/embeddings
      dimensions: 1536,
      maxTokens: 2048,
      costPer1MTokens: 0.15,
      taskAble: true
    }
  },
  "openai": {
    "text-embedding-3-small": {
      provider: "openai",
      model: "text-embedding-3-small",
      dimensions: 1536,
      maxTokens: 8191,
      costPer1MTokens: 0.02
    },
    "text-embedding-3-large": {
      provider: "openai",
      model: "text-embedding-3-large",
      dimensions: 3072,
      maxTokens: 8191,
      costPer1MTokens: 0.13
    }
  },
  "ollama": {
    "nomic-embed-text": {
      provider: "ollama",
      model: "nomic-embed-text",
      dimensions: 768,
      maxTokens: 2048,
      costPer1MTokens: 0
    },
    "mxbai-embed-large": {
      provider: "ollama",
      model: "mxbai-embed-large",
      dimensions: 1024,
      maxTokens: 512,
      costPer1MTokens: 0
    }
  },
  "github-copilot": {
    "text-embedding-3-small": {
      provider: "github-copilot",
      model: "text-embedding-3-small",
      dimensions: 1536,
      maxTokens: 8191,
      costPer1MTokens: 0
    }
  }
};
var DEFAULT_PROVIDER_MODELS = {
  "github-copilot": "text-embedding-3-small",
  "openai": "text-embedding-3-small",
  "google": "gemini-embedding-001",
  "ollama": "nomic-embed-text"
};
var AUTO_DETECT_PROVIDER_ORDER = [
  "ollama",
  "github-copilot",
  "openai",
  "google"
];

// src/config/env-substitution.ts
var ENV_REFERENCE_PATTERN = /^\{env:([A-Z_][A-Z0-9_]*)\}$/;
var ENV_REFERENCE_LIKE_PATTERN = /\{env:[^}]+\}/;
function substituteEnvString(value, keyPath) {
  const match = value.match(ENV_REFERENCE_PATTERN);
  if (!match) {
    if (ENV_REFERENCE_LIKE_PATTERN.test(value)) {
      throw new Error(
        `Invalid environment variable reference at '${keyPath}'. Expected the entire string to match '{env:VAR_NAME}' with VAR_NAME matching [A-Z_][A-Z0-9_]*.`
      );
    }
    return value;
  }
  const variableName = match[1];
  const envValue = process.env[variableName];
  if (envValue === void 0) {
    throw new Error(`Missing environment variable '${variableName}' referenced by config at '${keyPath}'.`);
  }
  return envValue;
}

// src/config/schema.ts
function getDefaultIndexingConfig() {
  return {
    autoIndex: false,
    watchFiles: true,
    maxFileSize: 1048576,
    maxChunksPerFile: 100,
    semanticOnly: false,
    retries: 3,
    retryDelayMs: 1e3,
    autoGc: true,
    gcIntervalDays: 7,
    gcOrphanThreshold: 100,
    requireProjectMarker: true,
    maxDepth: 5,
    maxFilesPerDirectory: 100,
    fallbackToTextOnMaxChunks: true
  };
}
function getDefaultSearchConfig() {
  return {
    maxResults: 20,
    minScore: 0.1,
    includeContext: true,
    hybridWeight: 0.5,
    fusionStrategy: "rrf",
    rrfK: 60,
    rerankTopN: 20,
    contextLines: 0,
    routingHints: true
  };
}
function isValidFusionStrategy(value) {
  return value === "weighted" || value === "rrf";
}
function isValidRerankerProvider(value) {
  return value === "cohere" || value === "jina" || value === "custom";
}
function getDefaultRerankerBaseUrl(provider) {
  switch (provider) {
    case "cohere":
      return "https://api.cohere.ai/v1";
    case "jina":
      return "https://api.jina.ai/v1";
    case "custom":
      return "";
  }
}
function getDefaultDebugConfig() {
  return {
    enabled: false,
    logLevel: "info",
    logSearch: true,
    logEmbedding: true,
    logCache: true,
    logGc: true,
    logBranch: true,
    metrics: true
  };
}
var VALID_SCOPES = ["project", "global"];
var VALID_LOG_LEVELS = ["error", "warn", "info", "debug"];
function isValidProvider(value) {
  return typeof value === "string" && Object.keys(EMBEDDING_MODELS).includes(value);
}
function isValidModel(value, provider) {
  return typeof value === "string" && Object.keys(EMBEDDING_MODELS[provider]).includes(value);
}
function isValidScope(value) {
  return typeof value === "string" && VALID_SCOPES.includes(value);
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function getResolvedString(value, keyPath) {
  if (typeof value !== "string") {
    return void 0;
  }
  return substituteEnvString(value, keyPath);
}
function getResolvedStringArray(value, keyPath) {
  if (!isStringArray(value)) {
    return void 0;
  }
  return value.map((item, index) => substituteEnvString(item, `${keyPath}[${index}]`));
}
function isValidLogLevel(value) {
  return typeof value === "string" && VALID_LOG_LEVELS.includes(value);
}
function parseConfig(raw) {
  const input = raw && typeof raw === "object" ? raw : {};
  const embeddingProviderValue = getResolvedString(input.embeddingProvider, "$root.embeddingProvider");
  const scopeValue = getResolvedString(input.scope, "$root.scope");
  const includeValue = getResolvedStringArray(input.include, "$root.include");
  const excludeValue = getResolvedStringArray(input.exclude, "$root.exclude");
  const defaultIndexing = getDefaultIndexingConfig();
  const defaultSearch = getDefaultSearchConfig();
  const defaultDebug = getDefaultDebugConfig();
  const rawIndexing = input.indexing && typeof input.indexing === "object" ? input.indexing : {};
  const indexing = {
    autoIndex: typeof rawIndexing.autoIndex === "boolean" ? rawIndexing.autoIndex : defaultIndexing.autoIndex,
    watchFiles: typeof rawIndexing.watchFiles === "boolean" ? rawIndexing.watchFiles : defaultIndexing.watchFiles,
    maxFileSize: typeof rawIndexing.maxFileSize === "number" ? rawIndexing.maxFileSize : defaultIndexing.maxFileSize,
    maxChunksPerFile: typeof rawIndexing.maxChunksPerFile === "number" ? Math.max(1, rawIndexing.maxChunksPerFile) : defaultIndexing.maxChunksPerFile,
    semanticOnly: typeof rawIndexing.semanticOnly === "boolean" ? rawIndexing.semanticOnly : defaultIndexing.semanticOnly,
    retries: typeof rawIndexing.retries === "number" ? rawIndexing.retries : defaultIndexing.retries,
    retryDelayMs: typeof rawIndexing.retryDelayMs === "number" ? rawIndexing.retryDelayMs : defaultIndexing.retryDelayMs,
    autoGc: typeof rawIndexing.autoGc === "boolean" ? rawIndexing.autoGc : defaultIndexing.autoGc,
    gcIntervalDays: typeof rawIndexing.gcIntervalDays === "number" ? Math.max(1, rawIndexing.gcIntervalDays) : defaultIndexing.gcIntervalDays,
    gcOrphanThreshold: typeof rawIndexing.gcOrphanThreshold === "number" ? Math.max(0, rawIndexing.gcOrphanThreshold) : defaultIndexing.gcOrphanThreshold,
    requireProjectMarker: typeof rawIndexing.requireProjectMarker === "boolean" ? rawIndexing.requireProjectMarker : defaultIndexing.requireProjectMarker,
    maxDepth: typeof rawIndexing.maxDepth === "number" ? rawIndexing.maxDepth < -1 ? -1 : rawIndexing.maxDepth : defaultIndexing.maxDepth,
    maxFilesPerDirectory: typeof rawIndexing.maxFilesPerDirectory === "number" ? Math.max(1, rawIndexing.maxFilesPerDirectory) : defaultIndexing.maxFilesPerDirectory,
    fallbackToTextOnMaxChunks: typeof rawIndexing.fallbackToTextOnMaxChunks === "boolean" ? rawIndexing.fallbackToTextOnMaxChunks : defaultIndexing.fallbackToTextOnMaxChunks
  };
  const rawSearch = input.search && typeof input.search === "object" ? input.search : {};
  const search = {
    maxResults: typeof rawSearch.maxResults === "number" ? rawSearch.maxResults : defaultSearch.maxResults,
    minScore: typeof rawSearch.minScore === "number" ? rawSearch.minScore : defaultSearch.minScore,
    includeContext: typeof rawSearch.includeContext === "boolean" ? rawSearch.includeContext : defaultSearch.includeContext,
    hybridWeight: typeof rawSearch.hybridWeight === "number" ? Math.min(1, Math.max(0, rawSearch.hybridWeight)) : defaultSearch.hybridWeight,
    fusionStrategy: isValidFusionStrategy(rawSearch.fusionStrategy) ? rawSearch.fusionStrategy : defaultSearch.fusionStrategy,
    rrfK: typeof rawSearch.rrfK === "number" ? Math.max(1, Math.floor(rawSearch.rrfK)) : defaultSearch.rrfK,
    rerankTopN: typeof rawSearch.rerankTopN === "number" ? Math.min(200, Math.max(0, Math.floor(rawSearch.rerankTopN))) : defaultSearch.rerankTopN,
    contextLines: typeof rawSearch.contextLines === "number" ? Math.min(50, Math.max(0, rawSearch.contextLines)) : defaultSearch.contextLines,
    routingHints: typeof rawSearch.routingHints === "boolean" ? rawSearch.routingHints : defaultSearch.routingHints
  };
  const rawDebug = input.debug && typeof input.debug === "object" ? input.debug : {};
  const debug = {
    enabled: typeof rawDebug.enabled === "boolean" ? rawDebug.enabled : defaultDebug.enabled,
    logLevel: isValidLogLevel(rawDebug.logLevel) ? rawDebug.logLevel : defaultDebug.logLevel,
    logSearch: typeof rawDebug.logSearch === "boolean" ? rawDebug.logSearch : defaultDebug.logSearch,
    logEmbedding: typeof rawDebug.logEmbedding === "boolean" ? rawDebug.logEmbedding : defaultDebug.logEmbedding,
    logCache: typeof rawDebug.logCache === "boolean" ? rawDebug.logCache : defaultDebug.logCache,
    logGc: typeof rawDebug.logGc === "boolean" ? rawDebug.logGc : defaultDebug.logGc,
    logBranch: typeof rawDebug.logBranch === "boolean" ? rawDebug.logBranch : defaultDebug.logBranch,
    metrics: typeof rawDebug.metrics === "boolean" ? rawDebug.metrics : defaultDebug.metrics
  };
  const rawKnowledgeBases = input.knowledgeBases;
  const knowledgeBases = isStringArray(rawKnowledgeBases) ? rawKnowledgeBases.filter((p) => typeof p === "string" && p.trim().length > 0).map((p) => p.trim()) : [];
  const rawAdditionalInclude = input.additionalInclude;
  const additionalInclude = isStringArray(rawAdditionalInclude) ? rawAdditionalInclude.filter((p) => typeof p === "string" && p.trim().length > 0).map((p) => p.trim()) : [];
  let embeddingProvider;
  let embeddingModel = void 0;
  let customProvider = void 0;
  let reranker = void 0;
  if (embeddingProviderValue === "custom") {
    embeddingProvider = "custom";
    const rawCustom = input.customProvider && typeof input.customProvider === "object" ? input.customProvider : null;
    const baseUrlValue = getResolvedString(rawCustom?.baseUrl, "$root.customProvider.baseUrl");
    const modelValue = getResolvedString(rawCustom?.model, "$root.customProvider.model");
    const apiKeyValue = getResolvedString(rawCustom?.apiKey, "$root.customProvider.apiKey");
    if (rawCustom && typeof baseUrlValue === "string" && baseUrlValue.trim().length > 0 && typeof modelValue === "string" && modelValue.trim().length > 0 && typeof rawCustom.dimensions === "number" && Number.isInteger(rawCustom.dimensions) && rawCustom.dimensions > 0) {
      customProvider = {
        baseUrl: baseUrlValue.trim().replace(/\/+$/, ""),
        model: modelValue,
        dimensions: rawCustom.dimensions,
        apiKey: apiKeyValue,
        maxTokens: typeof rawCustom.maxTokens === "number" ? rawCustom.maxTokens : void 0,
        timeoutMs: typeof rawCustom.timeoutMs === "number" ? Math.max(1e3, rawCustom.timeoutMs) : void 0,
        concurrency: typeof rawCustom.concurrency === "number" ? Math.max(1, Math.floor(rawCustom.concurrency)) : void 0,
        requestIntervalMs: typeof rawCustom.requestIntervalMs === "number" ? Math.max(0, Math.floor(rawCustom.requestIntervalMs)) : void 0,
        maxBatchSize: typeof rawCustom.maxBatchSize === "number" ? Math.max(1, Math.floor(rawCustom.maxBatchSize)) : typeof rawCustom.max_batch_size === "number" ? Math.max(1, Math.floor(rawCustom.max_batch_size)) : void 0
      };
      if (!/\/v\d+\/?$/.test(customProvider.baseUrl)) {
        console.warn(
          `[codebase-index] Warning: customProvider.baseUrl ("${customProvider.baseUrl}") does not end with an API version path like /v1. The plugin appends /embeddings automatically, so the full URL will be "${customProvider.baseUrl}/embeddings". If your provider expects /v1/embeddings, set baseUrl to "${customProvider.baseUrl}/v1".`
        );
      }
    } else {
      throw new Error(
        "embeddingProvider is 'custom' but customProvider config is missing or invalid. Required fields: baseUrl (string), model (string), dimensions (positive integer)."
      );
    }
  } else if (isValidProvider(embeddingProviderValue)) {
    embeddingProvider = embeddingProviderValue;
    const rawEmbeddingModel = input.embeddingModel;
    if (typeof rawEmbeddingModel === "string") {
      const embeddingModelValue = substituteEnvString(rawEmbeddingModel, "$root.embeddingModel");
      if (embeddingModelValue) {
        embeddingModel = isValidModel(embeddingModelValue, embeddingProvider) ? embeddingModelValue : DEFAULT_PROVIDER_MODELS[embeddingProvider];
      }
    } else if (rawEmbeddingModel) {
      embeddingModel = DEFAULT_PROVIDER_MODELS[embeddingProvider];
    }
  } else {
    embeddingProvider = "auto";
  }
  const rawReranker = input.reranker && typeof input.reranker === "object" ? input.reranker : {};
  const rerankerEnabled = typeof rawReranker.enabled === "boolean" ? rawReranker.enabled : false;
  if (rerankerEnabled) {
    const provider = isValidRerankerProvider(rawReranker.provider) ? rawReranker.provider : "custom";
    const model = getResolvedString(rawReranker.model, "$root.reranker.model");
    if (!model || model.trim().length === 0) {
      throw new Error("reranker is enabled but reranker.model is missing or invalid.");
    }
    const configuredBaseUrl = getResolvedString(rawReranker.baseUrl, "$root.reranker.baseUrl");
    const baseUrl = configuredBaseUrl?.trim() || getDefaultRerankerBaseUrl(provider);
    if (baseUrl.length === 0) {
      throw new Error("reranker is enabled but reranker.baseUrl is missing or invalid for provider 'custom'.");
    }
    const apiKey = getResolvedString(rawReranker.apiKey, "$root.reranker.apiKey");
    if ((provider === "cohere" || provider === "jina") && (!apiKey || apiKey.trim().length === 0)) {
      throw new Error(`reranker provider '${provider}' requires reranker.apiKey when enabled.`);
    }
    reranker = {
      enabled: true,
      provider,
      model: model.trim(),
      baseUrl: baseUrl.replace(/\/+$/, ""),
      apiKey: apiKey?.trim() || void 0,
      topN: typeof rawReranker.topN === "number" ? Math.min(50, Math.max(1, Math.floor(rawReranker.topN))) : 15,
      timeoutMs: typeof rawReranker.timeoutMs === "number" ? Math.max(1e3, Math.floor(rawReranker.timeoutMs)) : 1e4
    };
  }
  return {
    embeddingProvider,
    embeddingModel,
    customProvider,
    scope: isValidScope(scopeValue) ? scopeValue : "project",
    include: includeValue ?? DEFAULT_INCLUDE,
    exclude: excludeValue ?? DEFAULT_EXCLUDE,
    additionalInclude,
    indexing,
    search,
    debug,
    reranker,
    knowledgeBases
  };
}
function getDefaultModelForProvider(provider) {
  const models = EMBEDDING_MODELS[provider];
  const providerDefault = DEFAULT_PROVIDER_MODELS[provider];
  return models[providerDefault];
}
var availableProviders = Object.keys(EMBEDDING_MODELS);
var autoDetectProviders = AUTO_DETECT_PROVIDER_ORDER.filter(
  (provider) => provider in EMBEDDING_MODELS
);

// src/config/merger.ts
import { existsSync as existsSync3, mkdirSync, readFileSync as readFileSync2, writeFileSync } from "fs";
import * as os2 from "os";
import * as path3 from "path";

// src/config/paths.ts
import { existsSync as existsSync2 } from "fs";
import * as os from "os";
import * as path2 from "path";

// src/git/index.ts
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import * as path from "path";
function readPackedRefs(gitDir) {
  const packedRefsPath = path.join(gitDir, "packed-refs");
  if (!existsSync(packedRefsPath)) {
    return [];
  }
  try {
    return readFileSync(packedRefsPath, "utf-8").split("\n").map((line) => line.trim()).filter((line) => line.length > 0 && !line.startsWith("#") && !line.startsWith("^"));
  } catch {
    return [];
  }
}
function resolveCommonGitDir(gitDir) {
  const commonDirPath = path.join(gitDir, "commondir");
  if (!existsSync(commonDirPath)) {
    return gitDir;
  }
  try {
    const raw = readFileSync(commonDirPath, "utf-8").trim();
    if (!raw) {
      return gitDir;
    }
    const resolved = path.isAbsolute(raw) ? raw : path.resolve(gitDir, raw);
    if (existsSync(resolved)) {
      return resolved;
    }
  } catch {
    return gitDir;
  }
  return gitDir;
}
function resolveWorktreeMainRepoRoot(repoRoot) {
  const gitDir = resolveGitDir(repoRoot);
  if (!gitDir) {
    return null;
  }
  const commonGitDir = resolveCommonGitDir(gitDir);
  if (commonGitDir === gitDir || path.basename(commonGitDir) !== ".git") {
    return null;
  }
  const mainRepoRoot = path.dirname(commonGitDir);
  if (!existsSync(mainRepoRoot)) {
    return null;
  }
  return path.resolve(mainRepoRoot) === path.resolve(repoRoot) ? null : mainRepoRoot;
}
function resolveGitDir(repoRoot) {
  const gitPath = path.join(repoRoot, ".git");
  if (!existsSync(gitPath)) {
    return null;
  }
  try {
    const stat4 = statSync(gitPath);
    if (stat4.isDirectory()) {
      return gitPath;
    }
    if (stat4.isFile()) {
      const content = readFileSync(gitPath, "utf-8").trim();
      const match = content.match(/^gitdir:\s*(.+)$/);
      if (match) {
        const gitdir = match[1];
        const resolvedPath = path.isAbsolute(gitdir) ? gitdir : path.resolve(repoRoot, gitdir);
        if (existsSync(resolvedPath)) {
          return resolvedPath;
        }
      }
    }
  } catch {
  }
  return null;
}
function isGitRepo(dir) {
  return resolveGitDir(dir) !== null;
}
function getCurrentBranch(repoRoot) {
  const gitDir = resolveGitDir(repoRoot);
  if (!gitDir) {
    return null;
  }
  const headPath = path.join(gitDir, "HEAD");
  if (!existsSync(headPath)) {
    return null;
  }
  try {
    const headContent = readFileSync(headPath, "utf-8").trim();
    const match = headContent.match(/^ref: refs\/heads\/(.+)$/);
    if (match) {
      return match[1];
    }
    if (/^[0-9a-f]{40}$/i.test(headContent)) {
      return headContent.slice(0, 7);
    }
    return null;
  } catch {
    return null;
  }
}
function getBaseBranch(repoRoot) {
  const gitDir = resolveGitDir(repoRoot);
  const refStoreDir = gitDir ? resolveCommonGitDir(gitDir) : null;
  const candidates = ["main", "master", "develop", "trunk"];
  if (refStoreDir) {
    for (const candidate of candidates) {
      const refPath = path.join(refStoreDir, "refs", "heads", candidate);
      if (existsSync(refPath)) {
        return candidate;
      }
      const packedRefs = readPackedRefs(refStoreDir);
      if (packedRefs.some((line) => line.endsWith(` refs/heads/${candidate}`))) {
        return candidate;
      }
    }
  }
  return getCurrentBranch(repoRoot) ?? "main";
}
function getBranchOrDefault(repoRoot) {
  if (!isGitRepo(repoRoot)) {
    return "default";
  }
  return getCurrentBranch(repoRoot) ?? "default";
}
function getHeadPath(repoRoot) {
  const gitDir = resolveGitDir(repoRoot);
  if (gitDir) {
    return path.join(gitDir, "HEAD");
  }
  return path.join(repoRoot, ".git", "HEAD");
}

// src/config/paths.ts
var PROJECT_CONFIG_RELATIVE_PATH = path2.join(".opencode", "codebase-index.json");
var PROJECT_INDEX_RELATIVE_PATH = path2.join(".opencode", "index");
function resolveWorktreeFallbackPath(projectRoot, relativePath) {
  const mainRepoRoot = resolveWorktreeMainRepoRoot(projectRoot);
  if (!mainRepoRoot) {
    return null;
  }
  const fallbackPath = path2.join(mainRepoRoot, relativePath);
  return existsSync2(fallbackPath) ? fallbackPath : null;
}
function hasProjectConfig(projectRoot) {
  return existsSync2(path2.join(projectRoot, PROJECT_CONFIG_RELATIVE_PATH));
}
function getGlobalIndexPath() {
  return path2.join(os.homedir(), ".opencode", "global-index");
}
function resolveProjectConfigPath(projectRoot) {
  const localConfigPath = path2.join(projectRoot, PROJECT_CONFIG_RELATIVE_PATH);
  if (existsSync2(localConfigPath)) {
    return localConfigPath;
  }
  return resolveWorktreeFallbackPath(projectRoot, PROJECT_CONFIG_RELATIVE_PATH) ?? localConfigPath;
}
function resolveWritableProjectConfigPath(projectRoot) {
  return path2.join(projectRoot, PROJECT_CONFIG_RELATIVE_PATH);
}
function resolveProjectIndexPath(projectRoot, scope) {
  if (scope === "global") {
    return getGlobalIndexPath();
  }
  const localIndexPath = path2.join(projectRoot, PROJECT_INDEX_RELATIVE_PATH);
  if (existsSync2(localIndexPath)) {
    return localIndexPath;
  }
  if (hasProjectConfig(projectRoot)) {
    return localIndexPath;
  }
  return resolveWorktreeFallbackPath(projectRoot, PROJECT_INDEX_RELATIVE_PATH) ?? localIndexPath;
}

// src/config/merger.ts
function loadJsonFile(filePath) {
  try {
    if (existsSync3(filePath)) {
      const content = readFileSync2(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch {
  }
  return null;
}
function normalizeRelativeConfigPath(candidate) {
  return candidate.replace(/\\/g, "/");
}
function isWithinRoot(rootDir, targetPath) {
  const relativePath = path3.relative(rootDir, targetPath);
  return relativePath === "" || !relativePath.startsWith("..") && !path3.isAbsolute(relativePath);
}
function resolveInheritedKnowledgeBaseEntries(values, sourceRoot, targetRoot) {
  if (!Array.isArray(values)) {
    return [];
  }
  return values.filter((value) => typeof value === "string").map((value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return trimmed;
    }
    if (path3.isAbsolute(trimmed)) {
      if (isWithinRoot(sourceRoot, trimmed)) {
        return normalizeRelativeConfigPath(path3.normalize(path3.relative(sourceRoot, trimmed) || "."));
      }
      return path3.normalize(trimmed);
    }
    const resolvedFromSource = path3.resolve(sourceRoot, trimmed);
    if (isWithinRoot(sourceRoot, resolvedFromSource)) {
      return normalizeRelativeConfigPath(path3.normalize(trimmed));
    }
    return normalizeRelativeConfigPath(path3.normalize(path3.relative(targetRoot, resolvedFromSource)));
  }).filter(Boolean);
}
function materializeLocalProjectConfig(projectRoot, config) {
  const localConfigPath = path3.join(projectRoot, ".opencode", "codebase-index.json");
  mkdirSync(path3.dirname(localConfigPath), { recursive: true });
  writeFileSync(localConfigPath, JSON.stringify(config, null, 2), "utf-8");
  return localConfigPath;
}
function loadProjectConfigLayer(projectRoot) {
  const projectConfigPath = resolveProjectConfigPath(projectRoot);
  const projectConfig = loadJsonFile(projectConfigPath);
  if (!projectConfig) {
    return {};
  }
  const normalizedConfig = { ...projectConfig };
  const projectConfigBaseDir = path3.dirname(path3.dirname(projectConfigPath));
  if (Array.isArray(normalizedConfig.knowledgeBases)) {
    normalizedConfig.knowledgeBases = resolveInheritedKnowledgeBaseEntries(
      normalizedConfig.knowledgeBases,
      projectConfigBaseDir,
      projectRoot
    );
  }
  return normalizedConfig;
}
function loadMergedConfig(projectRoot) {
  const globalConfigPath = os2.homedir() + "/.config/opencode/codebase-index.json";
  const globalConfig = loadJsonFile(globalConfigPath);
  const projectConfigPath = resolveProjectConfigPath(projectRoot);
  const projectConfig = loadJsonFile(projectConfigPath);
  const normalizedProjectConfig = loadProjectConfigLayer(projectRoot);
  if (!globalConfig && !projectConfig) {
    return {};
  }
  if (!projectConfig && globalConfig) {
    return globalConfig;
  }
  if (!globalConfig && projectConfig) {
    return normalizedProjectConfig;
  }
  const merged = { ...globalConfig };
  if (projectConfig && "embeddingProvider" in normalizedProjectConfig) {
    merged.embeddingProvider = normalizedProjectConfig.embeddingProvider;
  } else if (globalConfig && globalConfig.embeddingProvider) {
    merged.embeddingProvider = globalConfig.embeddingProvider;
  }
  if (projectConfig && "customProvider" in normalizedProjectConfig) {
    merged.customProvider = normalizedProjectConfig.customProvider;
  } else if (globalConfig && globalConfig.customProvider) {
    merged.customProvider = globalConfig.customProvider;
  }
  if (projectConfig && "embeddingModel" in normalizedProjectConfig) {
    merged.embeddingModel = normalizedProjectConfig.embeddingModel;
  } else if (globalConfig && globalConfig.embeddingModel) {
    merged.embeddingModel = globalConfig.embeddingModel;
  }
  if (projectConfig && "reranker" in normalizedProjectConfig) {
    merged.reranker = normalizedProjectConfig.reranker;
  } else if (globalConfig && globalConfig.reranker) {
    merged.reranker = globalConfig.reranker;
  }
  if (projectConfig && "include" in normalizedProjectConfig) {
    merged.include = normalizedProjectConfig.include;
  } else if (globalConfig && globalConfig.include) {
    merged.include = globalConfig.include;
  }
  if (projectConfig && "exclude" in normalizedProjectConfig) {
    merged.exclude = normalizedProjectConfig.exclude;
  } else if (globalConfig && globalConfig.exclude) {
    merged.exclude = globalConfig.exclude;
  }
  if (projectConfig && "indexing" in normalizedProjectConfig) {
    merged.indexing = normalizedProjectConfig.indexing;
  } else if (globalConfig && globalConfig.indexing) {
    merged.indexing = globalConfig.indexing;
  }
  if (projectConfig && "search" in normalizedProjectConfig) {
    merged.search = normalizedProjectConfig.search;
  } else if (globalConfig && globalConfig.search) {
    merged.search = globalConfig.search;
  }
  if (projectConfig && "debug" in normalizedProjectConfig) {
    merged.debug = normalizedProjectConfig.debug;
  } else if (globalConfig && globalConfig.debug) {
    merged.debug = globalConfig.debug;
  }
  if (projectConfig && "scope" in normalizedProjectConfig) {
    merged.scope = normalizedProjectConfig.scope;
  } else if (globalConfig && "scope" in globalConfig) {
    merged.scope = globalConfig.scope;
  }
  if (projectConfig) {
    for (const key of Object.keys(projectConfig)) {
      if (key === "embeddingProvider" || key === "customProvider" || key === "embeddingModel" || key === "reranker" || key === "include" || key === "exclude" || key === "indexing" || key === "search" || key === "debug" || key === "scope" || key === "knowledgeBases" || key === "additionalInclude") {
        continue;
      }
      merged[key] = normalizedProjectConfig[key];
    }
  }
  const globalKbs = globalConfig && Array.isArray(globalConfig.knowledgeBases) ? globalConfig.knowledgeBases : [];
  const projectKbs = projectConfig ? Array.isArray(normalizedProjectConfig.knowledgeBases) ? normalizedProjectConfig.knowledgeBases : [] : [];
  const allKbs = [...globalKbs, ...projectKbs];
  const uniqueKbs = [...new Set(allKbs.map((p) => String(p).trim()))];
  merged.knowledgeBases = uniqueKbs;
  const globalAdditional = globalConfig && Array.isArray(globalConfig.additionalInclude) ? globalConfig.additionalInclude : [];
  const projectAdditional = projectConfig && Array.isArray(projectConfig.additionalInclude) ? projectConfig.additionalInclude : [];
  const allAdditional = [...globalAdditional, ...projectAdditional];
  const uniqueAdditional = [...new Set(allAdditional.map((p) => String(p).trim()))];
  merged.additionalInclude = uniqueAdditional;
  return merged;
}

// node_modules/chokidar/index.js
import { EventEmitter } from "events";
import { stat as statcb, Stats } from "fs";
import { readdir as readdir2, stat as stat3 } from "fs/promises";
import * as sp2 from "path";

// node_modules/readdirp/index.js
import { lstat, readdir, realpath, stat } from "fs/promises";
import { join as pjoin, relative as prelative, resolve as presolve, sep as psep } from "path";
import { Readable } from "stream";
var EntryTypes = {
  FILE_TYPE: "files",
  DIR_TYPE: "directories",
  FILE_DIR_TYPE: "files_directories",
  EVERYTHING_TYPE: "all"
};
var defaultOptions = {
  root: ".",
  fileFilter: (_entryInfo) => true,
  directoryFilter: (_entryInfo) => true,
  type: EntryTypes.FILE_TYPE,
  lstat: false,
  depth: 2147483648,
  alwaysStat: false,
  highWaterMark: 4096
};
Object.freeze(defaultOptions);
var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
var ALL_TYPES = [
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
];
var DIR_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE
]);
var FILE_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
]);
var isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
var wantBigintFsStats = process.platform === "win32";
var emptyFn = (_entryInfo) => true;
var normalizeFilter = (filter) => {
  if (filter === void 0)
    return emptyFn;
  if (typeof filter === "function")
    return filter;
  if (typeof filter === "string") {
    const fl = filter.trim();
    return (entry) => entry.basename === fl;
  }
  if (Array.isArray(filter)) {
    const trItems = filter.map((item) => item.trim());
    return (entry) => trItems.some((f) => entry.basename === f);
  }
  return emptyFn;
};
var ReaddirpStream = class extends Readable {
  parents;
  reading;
  parent;
  _stat;
  _maxDepth;
  _wantsDir;
  _wantsFile;
  _wantsEverything;
  _root;
  _isDirent;
  _statsProp;
  _rdOptions;
  _fileFilter;
  _directoryFilter;
  constructor(options = {}) {
    super({
      objectMode: true,
      autoDestroy: true,
      highWaterMark: options.highWaterMark
    });
    const opts = { ...defaultOptions, ...options };
    const { root, type } = opts;
    this._fileFilter = normalizeFilter(opts.fileFilter);
    this._directoryFilter = normalizeFilter(opts.directoryFilter);
    const statMethod = opts.lstat ? lstat : stat;
    if (wantBigintFsStats) {
      this._stat = (path12) => statMethod(path12, { bigint: true });
    } else {
      this._stat = statMethod;
    }
    this._maxDepth = opts.depth != null && Number.isSafeInteger(opts.depth) ? opts.depth : defaultOptions.depth;
    this._wantsDir = type ? DIR_TYPES.has(type) : false;
    this._wantsFile = type ? FILE_TYPES.has(type) : false;
    this._wantsEverything = type === EntryTypes.EVERYTHING_TYPE;
    this._root = presolve(root);
    this._isDirent = !opts.alwaysStat;
    this._statsProp = this._isDirent ? "dirent" : "stats";
    this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
    this.parents = [this._exploreDir(root, 1)];
    this.reading = false;
    this.parent = void 0;
  }
  async _read(batch) {
    if (this.reading)
      return;
    this.reading = true;
    try {
      while (!this.destroyed && batch > 0) {
        const par = this.parent;
        const fil = par && par.files;
        if (fil && fil.length > 0) {
          const { path: path12, depth } = par;
          const slice = fil.splice(0, batch).map((dirent) => this._formatEntry(dirent, path12));
          const awaited = await Promise.all(slice);
          for (const entry of awaited) {
            if (!entry)
              continue;
            if (this.destroyed)
              return;
            const entryType = await this._getEntryType(entry);
            if (entryType === "directory" && this._directoryFilter(entry)) {
              if (depth <= this._maxDepth) {
                this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
              }
              if (this._wantsDir) {
                this.push(entry);
                batch--;
              }
            } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
              if (this._wantsFile) {
                this.push(entry);
                batch--;
              }
            }
          }
        } else {
          const parent = this.parents.pop();
          if (!parent) {
            this.push(null);
            break;
          }
          this.parent = await parent;
          if (this.destroyed)
            return;
        }
      }
    } catch (error) {
      this.destroy(error);
    } finally {
      this.reading = false;
    }
  }
  async _exploreDir(path12, depth) {
    let files;
    try {
      files = await readdir(path12, this._rdOptions);
    } catch (error) {
      this._onError(error);
    }
    return { files, depth, path: path12 };
  }
  async _formatEntry(dirent, path12) {
    let entry;
    const basename5 = this._isDirent ? dirent.name : dirent;
    try {
      const fullPath = presolve(pjoin(path12, basename5));
      entry = { path: prelative(this._root, fullPath), fullPath, basename: basename5 };
      entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
    } catch (err) {
      this._onError(err);
      return;
    }
    return entry;
  }
  _onError(err) {
    if (isNormalFlowError(err) && !this.destroyed) {
      this.emit("warn", err);
    } else {
      this.destroy(err);
    }
  }
  async _getEntryType(entry) {
    if (!entry && this._statsProp in entry) {
      return "";
    }
    const stats = entry[this._statsProp];
    if (stats.isFile())
      return "file";
    if (stats.isDirectory())
      return "directory";
    if (stats && stats.isSymbolicLink()) {
      const full = entry.fullPath;
      try {
        const entryRealPath = await realpath(full);
        const entryRealPathStats = await lstat(entryRealPath);
        if (entryRealPathStats.isFile()) {
          return "file";
        }
        if (entryRealPathStats.isDirectory()) {
          const len = entryRealPath.length;
          if (full.startsWith(entryRealPath) && full.substr(len, 1) === psep) {
            const recursiveError = new Error(`Circular symlink detected: "${full}" points to "${entryRealPath}"`);
            recursiveError.code = RECURSIVE_ERROR_CODE;
            return this._onError(recursiveError);
          }
          return "directory";
        }
      } catch (error) {
        this._onError(error);
        return "";
      }
    }
  }
  _includeAsFile(entry) {
    const stats = entry && entry[this._statsProp];
    return stats && this._wantsEverything && !stats.isDirectory();
  }
};
function readdirp(root, options = {}) {
  let type = options.entryType || options.type;
  if (type === "both")
    type = EntryTypes.FILE_DIR_TYPE;
  if (type)
    options.type = type;
  if (!root) {
    throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
  } else if (typeof root !== "string") {
    throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
  } else if (type && !ALL_TYPES.includes(type)) {
    throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
  }
  options.root = root;
  return new ReaddirpStream(options);
}

// node_modules/chokidar/handler.js
import { watch as fs_watch, unwatchFile, watchFile } from "fs";
import { realpath as fsrealpath, lstat as lstat2, open, stat as stat2 } from "fs/promises";
import { type as osType } from "os";
import * as sp from "path";
var STR_DATA = "data";
var STR_END = "end";
var STR_CLOSE = "close";
var EMPTY_FN = () => {
};
var pl = process.platform;
var isWindows = pl === "win32";
var isMacos = pl === "darwin";
var isLinux = pl === "linux";
var isFreeBSD = pl === "freebsd";
var isIBMi = osType() === "OS400";
var EVENTS = {
  ALL: "all",
  READY: "ready",
  ADD: "add",
  CHANGE: "change",
  ADD_DIR: "addDir",
  UNLINK: "unlink",
  UNLINK_DIR: "unlinkDir",
  RAW: "raw",
  ERROR: "error"
};
var EV = EVENTS;
var THROTTLE_MODE_WATCH = "watch";
var statMethods = { lstat: lstat2, stat: stat2 };
var KEY_LISTENERS = "listeners";
var KEY_ERR = "errHandlers";
var KEY_RAW = "rawEmitters";
var HANDLER_KEYS = [KEY_LISTENERS, KEY_ERR, KEY_RAW];
var binaryExtensions = /* @__PURE__ */ new Set([
  "3dm",
  "3ds",
  "3g2",
  "3gp",
  "7z",
  "a",
  "aac",
  "adp",
  "afdesign",
  "afphoto",
  "afpub",
  "ai",
  "aif",
  "aiff",
  "alz",
  "ape",
  "apk",
  "appimage",
  "ar",
  "arj",
  "asf",
  "au",
  "avi",
  "bak",
  "baml",
  "bh",
  "bin",
  "bk",
  "bmp",
  "btif",
  "bz2",
  "bzip2",
  "cab",
  "caf",
  "cgm",
  "class",
  "cmx",
  "cpio",
  "cr2",
  "cur",
  "dat",
  "dcm",
  "deb",
  "dex",
  "djvu",
  "dll",
  "dmg",
  "dng",
  "doc",
  "docm",
  "docx",
  "dot",
  "dotm",
  "dra",
  "DS_Store",
  "dsk",
  "dts",
  "dtshd",
  "dvb",
  "dwg",
  "dxf",
  "ecelp4800",
  "ecelp7470",
  "ecelp9600",
  "egg",
  "eol",
  "eot",
  "epub",
  "exe",
  "f4v",
  "fbs",
  "fh",
  "fla",
  "flac",
  "flatpak",
  "fli",
  "flv",
  "fpx",
  "fst",
  "fvt",
  "g3",
  "gh",
  "gif",
  "graffle",
  "gz",
  "gzip",
  "h261",
  "h263",
  "h264",
  "icns",
  "ico",
  "ief",
  "img",
  "ipa",
  "iso",
  "jar",
  "jpeg",
  "jpg",
  "jpgv",
  "jpm",
  "jxr",
  "key",
  "ktx",
  "lha",
  "lib",
  "lvp",
  "lz",
  "lzh",
  "lzma",
  "lzo",
  "m3u",
  "m4a",
  "m4v",
  "mar",
  "mdi",
  "mht",
  "mid",
  "midi",
  "mj2",
  "mka",
  "mkv",
  "mmr",
  "mng",
  "mobi",
  "mov",
  "movie",
  "mp3",
  "mp4",
  "mp4a",
  "mpeg",
  "mpg",
  "mpga",
  "mxu",
  "nef",
  "npx",
  "numbers",
  "nupkg",
  "o",
  "odp",
  "ods",
  "odt",
  "oga",
  "ogg",
  "ogv",
  "otf",
  "ott",
  "pages",
  "pbm",
  "pcx",
  "pdb",
  "pdf",
  "pea",
  "pgm",
  "pic",
  "png",
  "pnm",
  "pot",
  "potm",
  "potx",
  "ppa",
  "ppam",
  "ppm",
  "pps",
  "ppsm",
  "ppsx",
  "ppt",
  "pptm",
  "pptx",
  "psd",
  "pya",
  "pyc",
  "pyo",
  "pyv",
  "qt",
  "rar",
  "ras",
  "raw",
  "resources",
  "rgb",
  "rip",
  "rlc",
  "rmf",
  "rmvb",
  "rpm",
  "rtf",
  "rz",
  "s3m",
  "s7z",
  "scpt",
  "sgi",
  "shar",
  "snap",
  "sil",
  "sketch",
  "slk",
  "smv",
  "snk",
  "so",
  "stl",
  "suo",
  "sub",
  "swf",
  "tar",
  "tbz",
  "tbz2",
  "tga",
  "tgz",
  "thmx",
  "tif",
  "tiff",
  "tlz",
  "ttc",
  "ttf",
  "txz",
  "udf",
  "uvh",
  "uvi",
  "uvm",
  "uvp",
  "uvs",
  "uvu",
  "viv",
  "vob",
  "war",
  "wav",
  "wax",
  "wbmp",
  "wdp",
  "weba",
  "webm",
  "webp",
  "whl",
  "wim",
  "wm",
  "wma",
  "wmv",
  "wmx",
  "woff",
  "woff2",
  "wrm",
  "wvx",
  "xbm",
  "xif",
  "xla",
  "xlam",
  "xls",
  "xlsb",
  "xlsm",
  "xlsx",
  "xlt",
  "xltm",
  "xltx",
  "xm",
  "xmind",
  "xpi",
  "xpm",
  "xwd",
  "xz",
  "z",
  "zip",
  "zipx"
]);
var isBinaryPath = (filePath) => binaryExtensions.has(sp.extname(filePath).slice(1).toLowerCase());
var foreach = (val, fn) => {
  if (val instanceof Set) {
    val.forEach(fn);
  } else {
    fn(val);
  }
};
var addAndConvert = (main, prop, item) => {
  let container = main[prop];
  if (!(container instanceof Set)) {
    main[prop] = container = /* @__PURE__ */ new Set([container]);
  }
  container.add(item);
};
var clearItem = (cont) => (key) => {
  const set = cont[key];
  if (set instanceof Set) {
    set.clear();
  } else {
    delete cont[key];
  }
};
var delFromSet = (main, prop, item) => {
  const container = main[prop];
  if (container instanceof Set) {
    container.delete(item);
  } else if (container === item) {
    delete main[prop];
  }
};
var isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
var FsWatchInstances = /* @__PURE__ */ new Map();
function createFsWatchInstance(path12, options, listener, errHandler, emitRaw) {
  const handleEvent = (rawEvent, evPath) => {
    listener(path12);
    emitRaw(rawEvent, evPath, { watchedPath: path12 });
    if (evPath && path12 !== evPath) {
      fsWatchBroadcast(sp.resolve(path12, evPath), KEY_LISTENERS, sp.join(path12, evPath));
    }
  };
  try {
    return fs_watch(path12, {
      persistent: options.persistent
    }, handleEvent);
  } catch (error) {
    errHandler(error);
    return void 0;
  }
}
var fsWatchBroadcast = (fullPath, listenerType, val1, val2, val3) => {
  const cont = FsWatchInstances.get(fullPath);
  if (!cont)
    return;
  foreach(cont[listenerType], (listener) => {
    listener(val1, val2, val3);
  });
};
var setFsWatchListener = (path12, fullPath, options, handlers) => {
  const { listener, errHandler, rawEmitter } = handlers;
  let cont = FsWatchInstances.get(fullPath);
  let watcher;
  if (!options.persistent) {
    watcher = createFsWatchInstance(path12, options, listener, errHandler, rawEmitter);
    if (!watcher)
      return;
    return watcher.close.bind(watcher);
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_ERR, errHandler);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    watcher = createFsWatchInstance(
      path12,
      options,
      fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
      errHandler,
      // no need to use broadcast here
      fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
    );
    if (!watcher)
      return;
    watcher.on(EV.ERROR, async (error) => {
      const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
      if (cont)
        cont.watcherUnusable = true;
      if (isWindows && error.code === "EPERM") {
        try {
          const fd = await open(path12, "r");
          await fd.close();
          broadcastErr(error);
        } catch (err) {
        }
      } else {
        broadcastErr(error);
      }
    });
    cont = {
      listeners: listener,
      errHandlers: errHandler,
      rawEmitters: rawEmitter,
      watcher
    };
    FsWatchInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_ERR, errHandler);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      cont.watcher.close();
      FsWatchInstances.delete(fullPath);
      HANDLER_KEYS.forEach(clearItem(cont));
      cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var FsWatchFileInstances = /* @__PURE__ */ new Map();
var setFsWatchFileListener = (path12, fullPath, options, handlers) => {
  const { listener, rawEmitter } = handlers;
  let cont = FsWatchFileInstances.get(fullPath);
  const copts = cont && cont.options;
  if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
    unwatchFile(fullPath);
    cont = void 0;
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    cont = {
      listeners: listener,
      rawEmitters: rawEmitter,
      options,
      watcher: watchFile(fullPath, options, (curr, prev) => {
        foreach(cont.rawEmitters, (rawEmitter2) => {
          rawEmitter2(EV.CHANGE, fullPath, { curr, prev });
        });
        const currmtime = curr.mtimeMs;
        if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
          foreach(cont.listeners, (listener2) => listener2(path12, curr));
        }
      })
    };
    FsWatchFileInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      FsWatchFileInstances.delete(fullPath);
      unwatchFile(fullPath);
      cont.options = cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var NodeFsHandler = class {
  fsw;
  _boundHandleError;
  constructor(fsW) {
    this.fsw = fsW;
    this._boundHandleError = (error) => fsW._handleError(error);
  }
  /**
   * Watch file for changes with fs_watchFile or fs_watch.
   * @param path to file or dir
   * @param listener on fs change
   * @returns closer for the watcher instance
   */
  _watchWithNodeFs(path12, listener) {
    const opts = this.fsw.options;
    const directory = sp.dirname(path12);
    const basename5 = sp.basename(path12);
    const parent = this.fsw._getWatchedDir(directory);
    parent.add(basename5);
    const absolutePath = sp.resolve(path12);
    const options = {
      persistent: opts.persistent
    };
    if (!listener)
      listener = EMPTY_FN;
    let closer;
    if (opts.usePolling) {
      const enableBin = opts.interval !== opts.binaryInterval;
      options.interval = enableBin && isBinaryPath(basename5) ? opts.binaryInterval : opts.interval;
      closer = setFsWatchFileListener(path12, absolutePath, options, {
        listener,
        rawEmitter: this.fsw._emitRaw
      });
    } else {
      closer = setFsWatchListener(path12, absolutePath, options, {
        listener,
        errHandler: this._boundHandleError,
        rawEmitter: this.fsw._emitRaw
      });
    }
    return closer;
  }
  /**
   * Watch a file and emit add event if warranted.
   * @returns closer for the watcher instance
   */
  _handleFile(file, stats, initialAdd) {
    if (this.fsw.closed) {
      return;
    }
    const dirname8 = sp.dirname(file);
    const basename5 = sp.basename(file);
    const parent = this.fsw._getWatchedDir(dirname8);
    let prevStats = stats;
    if (parent.has(basename5))
      return;
    const listener = async (path12, newStats) => {
      if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5))
        return;
      if (!newStats || newStats.mtimeMs === 0) {
        try {
          const newStats2 = await stat2(file);
          if (this.fsw.closed)
            return;
          const at = newStats2.atimeMs;
          const mt = newStats2.mtimeMs;
          if (!at || at <= mt || mt !== prevStats.mtimeMs) {
            this.fsw._emit(EV.CHANGE, file, newStats2);
          }
          if ((isMacos || isLinux || isFreeBSD) && prevStats.ino !== newStats2.ino) {
            this.fsw._closeFile(path12);
            prevStats = newStats2;
            const closer2 = this._watchWithNodeFs(file, listener);
            if (closer2)
              this.fsw._addPathCloser(path12, closer2);
          } else {
            prevStats = newStats2;
          }
        } catch (error) {
          this.fsw._remove(dirname8, basename5);
        }
      } else if (parent.has(basename5)) {
        const at = newStats.atimeMs;
        const mt = newStats.mtimeMs;
        if (!at || at <= mt || mt !== prevStats.mtimeMs) {
          this.fsw._emit(EV.CHANGE, file, newStats);
        }
        prevStats = newStats;
      }
    };
    const closer = this._watchWithNodeFs(file, listener);
    if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
      if (!this.fsw._throttle(EV.ADD, file, 0))
        return;
      this.fsw._emit(EV.ADD, file, stats);
    }
    return closer;
  }
  /**
   * Handle symlinks encountered while reading a dir.
   * @param entry returned by readdirp
   * @param directory path of dir being read
   * @param path of this item
   * @param item basename of this item
   * @returns true if no more processing is needed for this entry.
   */
  async _handleSymlink(entry, directory, path12, item) {
    if (this.fsw.closed) {
      return;
    }
    const full = entry.fullPath;
    const dir = this.fsw._getWatchedDir(directory);
    if (!this.fsw.options.followSymlinks) {
      this.fsw._incrReadyCount();
      let linkPath;
      try {
        linkPath = await fsrealpath(path12);
      } catch (e) {
        this.fsw._emitReady();
        return true;
      }
      if (this.fsw.closed)
        return;
      if (dir.has(item)) {
        if (this.fsw._symlinkPaths.get(full) !== linkPath) {
          this.fsw._symlinkPaths.set(full, linkPath);
          this.fsw._emit(EV.CHANGE, path12, entry.stats);
        }
      } else {
        dir.add(item);
        this.fsw._symlinkPaths.set(full, linkPath);
        this.fsw._emit(EV.ADD, path12, entry.stats);
      }
      this.fsw._emitReady();
      return true;
    }
    if (this.fsw._symlinkPaths.has(full)) {
      return true;
    }
    this.fsw._symlinkPaths.set(full, true);
  }
  _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
    directory = sp.join(directory, "");
    const throttleKey = target ? `${directory}:${target}` : directory;
    throttler = this.fsw._throttle("readdir", throttleKey, 1e3);
    if (!throttler)
      return;
    const previous = this.fsw._getWatchedDir(wh.path);
    const current = /* @__PURE__ */ new Set();
    let stream = this.fsw._readdirp(directory, {
      fileFilter: (entry) => wh.filterPath(entry),
      directoryFilter: (entry) => wh.filterDir(entry)
    });
    if (!stream)
      return;
    stream.on(STR_DATA, async (entry) => {
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      const item = entry.path;
      let path12 = sp.join(directory, item);
      current.add(item);
      if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path12, item)) {
        return;
      }
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      if (item === target || !target && !previous.has(item)) {
        this.fsw._incrReadyCount();
        path12 = sp.join(dir, sp.relative(dir, path12));
        this._addToNodeFs(path12, initialAdd, wh, depth + 1);
      }
    }).on(EV.ERROR, this._boundHandleError);
    return new Promise((resolve9, reject) => {
      if (!stream)
        return reject();
      stream.once(STR_END, () => {
        if (this.fsw.closed) {
          stream = void 0;
          return;
        }
        const wasThrottled = throttler ? throttler.clear() : false;
        resolve9(void 0);
        previous.getChildren().filter((item) => {
          return item !== directory && !current.has(item);
        }).forEach((item) => {
          this.fsw._remove(directory, item);
        });
        stream = void 0;
        if (wasThrottled)
          this._handleRead(directory, false, wh, target, dir, depth, throttler);
      });
    });
  }
  /**
   * Read directory to add / remove files from `@watched` list and re-read it on change.
   * @param dir fs path
   * @param stats
   * @param initialAdd
   * @param depth relative to user-supplied path
   * @param target child path targeted for watch
   * @param wh Common watch helpers for this path
   * @param realpath
   * @returns closer for the watcher instance.
   */
  async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath2) {
    const parentDir = this.fsw._getWatchedDir(sp.dirname(dir));
    const tracked = parentDir.has(sp.basename(dir));
    if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
      this.fsw._emit(EV.ADD_DIR, dir, stats);
    }
    parentDir.add(sp.basename(dir));
    this.fsw._getWatchedDir(dir);
    let throttler;
    let closer;
    const oDepth = this.fsw.options.depth;
    if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath2)) {
      if (!target) {
        await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
        if (this.fsw.closed)
          return;
      }
      closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
        if (stats2 && stats2.mtimeMs === 0)
          return;
        this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
      });
    }
    return closer;
  }
  /**
   * Handle added file, directory, or glob pattern.
   * Delegates call to _handleFile / _handleDir after checks.
   * @param path to file or ir
   * @param initialAdd was the file added at watch instantiation?
   * @param priorWh depth relative to user-supplied path
   * @param depth Child path actually targeted for watch
   * @param target Child path actually targeted for watch
   */
  async _addToNodeFs(path12, initialAdd, priorWh, depth, target) {
    const ready = this.fsw._emitReady;
    if (this.fsw._isIgnored(path12) || this.fsw.closed) {
      ready();
      return false;
    }
    const wh = this.fsw._getWatchHelpers(path12);
    if (priorWh) {
      wh.filterPath = (entry) => priorWh.filterPath(entry);
      wh.filterDir = (entry) => priorWh.filterDir(entry);
    }
    try {
      const stats = await statMethods[wh.statMethod](wh.watchPath);
      if (this.fsw.closed)
        return;
      if (this.fsw._isIgnored(wh.watchPath, stats)) {
        ready();
        return false;
      }
      const follow = this.fsw.options.followSymlinks;
      let closer;
      if (stats.isDirectory()) {
        const absPath = sp.resolve(path12);
        const targetPath = follow ? await fsrealpath(path12) : path12;
        if (this.fsw.closed)
          return;
        closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (absPath !== targetPath && targetPath !== void 0) {
          this.fsw._symlinkPaths.set(absPath, targetPath);
        }
      } else if (stats.isSymbolicLink()) {
        const targetPath = follow ? await fsrealpath(path12) : path12;
        if (this.fsw.closed)
          return;
        const parent = sp.dirname(wh.watchPath);
        this.fsw._getWatchedDir(parent).add(wh.watchPath);
        this.fsw._emit(EV.ADD, wh.watchPath, stats);
        closer = await this._handleDir(parent, stats, initialAdd, depth, path12, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (targetPath !== void 0) {
          this.fsw._symlinkPaths.set(sp.resolve(path12), targetPath);
        }
      } else {
        closer = this._handleFile(wh.watchPath, stats, initialAdd);
      }
      ready();
      if (closer)
        this.fsw._addPathCloser(path12, closer);
      return false;
    } catch (error) {
      if (this.fsw._handleError(error)) {
        ready();
        return path12;
      }
    }
  }
};

// node_modules/chokidar/index.js
var SLASH = "/";
var SLASH_SLASH = "//";
var ONE_DOT = ".";
var TWO_DOTS = "..";
var STRING_TYPE = "string";
var BACK_SLASH_RE = /\\/g;
var DOUBLE_SLASH_RE = /\/\//g;
var DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
var REPLACER_RE = /^\.[/\\]/;
function arrify(item) {
  return Array.isArray(item) ? item : [item];
}
var isMatcherObject = (matcher) => typeof matcher === "object" && matcher !== null && !(matcher instanceof RegExp);
function createPattern(matcher) {
  if (typeof matcher === "function")
    return matcher;
  if (typeof matcher === "string")
    return (string) => matcher === string;
  if (matcher instanceof RegExp)
    return (string) => matcher.test(string);
  if (typeof matcher === "object" && matcher !== null) {
    return (string) => {
      if (matcher.path === string)
        return true;
      if (matcher.recursive) {
        const relative8 = sp2.relative(matcher.path, string);
        if (!relative8) {
          return false;
        }
        return !relative8.startsWith("..") && !sp2.isAbsolute(relative8);
      }
      return false;
    };
  }
  return () => false;
}
function normalizePath(path12) {
  if (typeof path12 !== "string")
    throw new Error("string expected");
  path12 = sp2.normalize(path12);
  path12 = path12.replace(/\\/g, "/");
  let prepend = false;
  if (path12.startsWith("//"))
    prepend = true;
  path12 = path12.replace(DOUBLE_SLASH_RE, "/");
  if (prepend)
    path12 = "/" + path12;
  return path12;
}
function matchPatterns(patterns, testString, stats) {
  const path12 = normalizePath(testString);
  for (let index = 0; index < patterns.length; index++) {
    const pattern = patterns[index];
    if (pattern(path12, stats)) {
      return true;
    }
  }
  return false;
}
function anymatch(matchers, testString) {
  if (matchers == null) {
    throw new TypeError("anymatch: specify first argument");
  }
  const matchersArray = arrify(matchers);
  const patterns = matchersArray.map((matcher) => createPattern(matcher));
  if (testString == null) {
    return (testString2, stats) => {
      return matchPatterns(patterns, testString2, stats);
    };
  }
  return matchPatterns(patterns, testString);
}
var unifyPaths = (paths_) => {
  const paths = arrify(paths_).flat();
  if (!paths.every((p) => typeof p === STRING_TYPE)) {
    throw new TypeError(`Non-string provided as watch path: ${paths}`);
  }
  return paths.map(normalizePathToUnix);
};
var toUnix = (string) => {
  let str = string.replace(BACK_SLASH_RE, SLASH);
  let prepend = false;
  if (str.startsWith(SLASH_SLASH)) {
    prepend = true;
  }
  str = str.replace(DOUBLE_SLASH_RE, SLASH);
  if (prepend) {
    str = SLASH + str;
  }
  return str;
};
var normalizePathToUnix = (path12) => toUnix(sp2.normalize(toUnix(path12)));
var normalizeIgnored = (cwd = "") => (path12) => {
  if (typeof path12 === "string") {
    return normalizePathToUnix(sp2.isAbsolute(path12) ? path12 : sp2.join(cwd, path12));
  } else {
    return path12;
  }
};
var getAbsolutePath = (path12, cwd) => {
  if (sp2.isAbsolute(path12)) {
    return path12;
  }
  return sp2.join(cwd, path12);
};
var EMPTY_SET = Object.freeze(/* @__PURE__ */ new Set());
var DirEntry = class {
  path;
  _removeWatcher;
  items;
  constructor(dir, removeWatcher) {
    this.path = dir;
    this._removeWatcher = removeWatcher;
    this.items = /* @__PURE__ */ new Set();
  }
  add(item) {
    const { items } = this;
    if (!items)
      return;
    if (item !== ONE_DOT && item !== TWO_DOTS)
      items.add(item);
  }
  async remove(item) {
    const { items } = this;
    if (!items)
      return;
    items.delete(item);
    if (items.size > 0)
      return;
    const dir = this.path;
    try {
      await readdir2(dir);
    } catch (err) {
      if (this._removeWatcher) {
        this._removeWatcher(sp2.dirname(dir), sp2.basename(dir));
      }
    }
  }
  has(item) {
    const { items } = this;
    if (!items)
      return;
    return items.has(item);
  }
  getChildren() {
    const { items } = this;
    if (!items)
      return [];
    return [...items.values()];
  }
  dispose() {
    this.items.clear();
    this.path = "";
    this._removeWatcher = EMPTY_FN;
    this.items = EMPTY_SET;
    Object.freeze(this);
  }
};
var STAT_METHOD_F = "stat";
var STAT_METHOD_L = "lstat";
var WatchHelper = class {
  fsw;
  path;
  watchPath;
  fullWatchPath;
  dirParts;
  followSymlinks;
  statMethod;
  constructor(path12, follow, fsw) {
    this.fsw = fsw;
    const watchPath = path12;
    this.path = path12 = path12.replace(REPLACER_RE, "");
    this.watchPath = watchPath;
    this.fullWatchPath = sp2.resolve(watchPath);
    this.dirParts = [];
    this.dirParts.forEach((parts) => {
      if (parts.length > 1)
        parts.pop();
    });
    this.followSymlinks = follow;
    this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
  }
  entryPath(entry) {
    return sp2.join(this.watchPath, sp2.relative(this.watchPath, entry.fullPath));
  }
  filterPath(entry) {
    const { stats } = entry;
    if (stats && stats.isSymbolicLink())
      return this.filterDir(entry);
    const resolvedPath = this.entryPath(entry);
    return this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
  }
  filterDir(entry) {
    return this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
  }
};
var FSWatcher = class extends EventEmitter {
  closed;
  options;
  _closers;
  _ignoredPaths;
  _throttled;
  _streams;
  _symlinkPaths;
  _watched;
  _pendingWrites;
  _pendingUnlinks;
  _readyCount;
  _emitReady;
  _closePromise;
  _userIgnored;
  _readyEmitted;
  _emitRaw;
  _boundRemove;
  _nodeFsHandler;
  // Not indenting methods for history sake; for now.
  constructor(_opts = {}) {
    super();
    this.closed = false;
    this._closers = /* @__PURE__ */ new Map();
    this._ignoredPaths = /* @__PURE__ */ new Set();
    this._throttled = /* @__PURE__ */ new Map();
    this._streams = /* @__PURE__ */ new Set();
    this._symlinkPaths = /* @__PURE__ */ new Map();
    this._watched = /* @__PURE__ */ new Map();
    this._pendingWrites = /* @__PURE__ */ new Map();
    this._pendingUnlinks = /* @__PURE__ */ new Map();
    this._readyCount = 0;
    this._readyEmitted = false;
    const awf = _opts.awaitWriteFinish;
    const DEF_AWF = { stabilityThreshold: 2e3, pollInterval: 100 };
    const opts = {
      // Defaults
      persistent: true,
      ignoreInitial: false,
      ignorePermissionErrors: false,
      interval: 100,
      binaryInterval: 300,
      followSymlinks: true,
      usePolling: false,
      // useAsync: false,
      atomic: true,
      // NOTE: overwritten later (depends on usePolling)
      ..._opts,
      // Change format
      ignored: _opts.ignored ? arrify(_opts.ignored) : arrify([]),
      awaitWriteFinish: awf === true ? DEF_AWF : typeof awf === "object" ? { ...DEF_AWF, ...awf } : false
    };
    if (isIBMi)
      opts.usePolling = true;
    if (opts.atomic === void 0)
      opts.atomic = !opts.usePolling;
    const envPoll = process.env.CHOKIDAR_USEPOLLING;
    if (envPoll !== void 0) {
      const envLower = envPoll.toLowerCase();
      if (envLower === "false" || envLower === "0")
        opts.usePolling = false;
      else if (envLower === "true" || envLower === "1")
        opts.usePolling = true;
      else
        opts.usePolling = !!envLower;
    }
    const envInterval = process.env.CHOKIDAR_INTERVAL;
    if (envInterval)
      opts.interval = Number.parseInt(envInterval, 10);
    let readyCalls = 0;
    this._emitReady = () => {
      readyCalls++;
      if (readyCalls >= this._readyCount) {
        this._emitReady = EMPTY_FN;
        this._readyEmitted = true;
        process.nextTick(() => this.emit(EVENTS.READY));
      }
    };
    this._emitRaw = (...args) => this.emit(EVENTS.RAW, ...args);
    this._boundRemove = this._remove.bind(this);
    this.options = opts;
    this._nodeFsHandler = new NodeFsHandler(this);
    Object.freeze(opts);
  }
  _addIgnoredPath(matcher) {
    if (isMatcherObject(matcher)) {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher.path && ignored.recursive === matcher.recursive) {
          return;
        }
      }
    }
    this._ignoredPaths.add(matcher);
  }
  _removeIgnoredPath(matcher) {
    this._ignoredPaths.delete(matcher);
    if (typeof matcher === "string") {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher) {
          this._ignoredPaths.delete(ignored);
        }
      }
    }
  }
  // Public methods
  /**
   * Adds paths to be watched on an existing FSWatcher instance.
   * @param paths_ file or file list. Other arguments are unused
   */
  add(paths_, _origAdd, _internal) {
    const { cwd } = this.options;
    this.closed = false;
    this._closePromise = void 0;
    let paths = unifyPaths(paths_);
    if (cwd) {
      paths = paths.map((path12) => {
        const absPath = getAbsolutePath(path12, cwd);
        return absPath;
      });
    }
    paths.forEach((path12) => {
      this._removeIgnoredPath(path12);
    });
    this._userIgnored = void 0;
    if (!this._readyCount)
      this._readyCount = 0;
    this._readyCount += paths.length;
    Promise.all(paths.map(async (path12) => {
      const res = await this._nodeFsHandler._addToNodeFs(path12, !_internal, void 0, 0, _origAdd);
      if (res)
        this._emitReady();
      return res;
    })).then((results) => {
      if (this.closed)
        return;
      results.forEach((item) => {
        if (item)
          this.add(sp2.dirname(item), sp2.basename(_origAdd || item));
      });
    });
    return this;
  }
  /**
   * Close watchers or start ignoring events from specified paths.
   */
  unwatch(paths_) {
    if (this.closed)
      return this;
    const paths = unifyPaths(paths_);
    const { cwd } = this.options;
    paths.forEach((path12) => {
      if (!sp2.isAbsolute(path12) && !this._closers.has(path12)) {
        if (cwd)
          path12 = sp2.join(cwd, path12);
        path12 = sp2.resolve(path12);
      }
      this._closePath(path12);
      this._addIgnoredPath(path12);
      if (this._watched.has(path12)) {
        this._addIgnoredPath({
          path: path12,
          recursive: true
        });
      }
      this._userIgnored = void 0;
    });
    return this;
  }
  /**
   * Close watchers and remove all listeners from watched paths.
   */
  close() {
    if (this._closePromise) {
      return this._closePromise;
    }
    this.closed = true;
    this.removeAllListeners();
    const closers = [];
    this._closers.forEach((closerList) => closerList.forEach((closer) => {
      const promise = closer();
      if (promise instanceof Promise)
        closers.push(promise);
    }));
    this._streams.forEach((stream) => stream.destroy());
    this._userIgnored = void 0;
    this._readyCount = 0;
    this._readyEmitted = false;
    this._watched.forEach((dirent) => dirent.dispose());
    this._closers.clear();
    this._watched.clear();
    this._streams.clear();
    this._symlinkPaths.clear();
    this._throttled.clear();
    this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
    return this._closePromise;
  }
  /**
   * Expose list of watched paths
   * @returns for chaining
   */
  getWatched() {
    const watchList = {};
    this._watched.forEach((entry, dir) => {
      const key = this.options.cwd ? sp2.relative(this.options.cwd, dir) : dir;
      const index = key || ONE_DOT;
      watchList[index] = entry.getChildren().sort();
    });
    return watchList;
  }
  emitWithAll(event, args) {
    this.emit(event, ...args);
    if (event !== EVENTS.ERROR)
      this.emit(EVENTS.ALL, event, ...args);
  }
  // Common helpers
  // --------------
  /**
   * Normalize and emit events.
   * Calling _emit DOES NOT MEAN emit() would be called!
   * @param event Type of event
   * @param path File or directory path
   * @param stats arguments to be passed with event
   * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  async _emit(event, path12, stats) {
    if (this.closed)
      return;
    const opts = this.options;
    if (isWindows)
      path12 = sp2.normalize(path12);
    if (opts.cwd)
      path12 = sp2.relative(opts.cwd, path12);
    const args = [path12];
    if (stats != null)
      args.push(stats);
    const awf = opts.awaitWriteFinish;
    let pw;
    if (awf && (pw = this._pendingWrites.get(path12))) {
      pw.lastChange = /* @__PURE__ */ new Date();
      return this;
    }
    if (opts.atomic) {
      if (event === EVENTS.UNLINK) {
        this._pendingUnlinks.set(path12, [event, ...args]);
        setTimeout(() => {
          this._pendingUnlinks.forEach((entry, path13) => {
            this.emit(...entry);
            this.emit(EVENTS.ALL, ...entry);
            this._pendingUnlinks.delete(path13);
          });
        }, typeof opts.atomic === "number" ? opts.atomic : 100);
        return this;
      }
      if (event === EVENTS.ADD && this._pendingUnlinks.has(path12)) {
        event = EVENTS.CHANGE;
        this._pendingUnlinks.delete(path12);
      }
    }
    if (awf && (event === EVENTS.ADD || event === EVENTS.CHANGE) && this._readyEmitted) {
      const awfEmit = (err, stats2) => {
        if (err) {
          event = EVENTS.ERROR;
          args[0] = err;
          this.emitWithAll(event, args);
        } else if (stats2) {
          if (args.length > 1) {
            args[1] = stats2;
          } else {
            args.push(stats2);
          }
          this.emitWithAll(event, args);
        }
      };
      this._awaitWriteFinish(path12, awf.stabilityThreshold, event, awfEmit);
      return this;
    }
    if (event === EVENTS.CHANGE) {
      const isThrottled = !this._throttle(EVENTS.CHANGE, path12, 50);
      if (isThrottled)
        return this;
    }
    if (opts.alwaysStat && stats === void 0 && (event === EVENTS.ADD || event === EVENTS.ADD_DIR || event === EVENTS.CHANGE)) {
      const fullPath = opts.cwd ? sp2.join(opts.cwd, path12) : path12;
      let stats2;
      try {
        stats2 = await stat3(fullPath);
      } catch (err) {
      }
      if (!stats2 || this.closed)
        return;
      args.push(stats2);
    }
    this.emitWithAll(event, args);
    return this;
  }
  /**
   * Common handler for errors
   * @returns The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  _handleError(error) {
    const code = error && error.code;
    if (error && code !== "ENOENT" && code !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code !== "EPERM" && code !== "EACCES")) {
      this.emit(EVENTS.ERROR, error);
    }
    return error || this.closed;
  }
  /**
   * Helper utility for throttling
   * @param actionType type being throttled
   * @param path being acted upon
   * @param timeout duration of time to suppress duplicate actions
   * @returns tracking object or false if action should be suppressed
   */
  _throttle(actionType, path12, timeout) {
    if (!this._throttled.has(actionType)) {
      this._throttled.set(actionType, /* @__PURE__ */ new Map());
    }
    const action = this._throttled.get(actionType);
    if (!action)
      throw new Error("invalid throttle");
    const actionPath = action.get(path12);
    if (actionPath) {
      actionPath.count++;
      return false;
    }
    let timeoutObject;
    const clear = () => {
      const item = action.get(path12);
      const count = item ? item.count : 0;
      action.delete(path12);
      clearTimeout(timeoutObject);
      if (item)
        clearTimeout(item.timeoutObject);
      return count;
    };
    timeoutObject = setTimeout(clear, timeout);
    const thr = { timeoutObject, clear, count: 0 };
    action.set(path12, thr);
    return thr;
  }
  _incrReadyCount() {
    return this._readyCount++;
  }
  /**
   * Awaits write operation to finish.
   * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
   * @param path being acted upon
   * @param threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
   * @param event
   * @param awfEmit Callback to be called when ready for event to be emitted.
   */
  _awaitWriteFinish(path12, threshold, event, awfEmit) {
    const awf = this.options.awaitWriteFinish;
    if (typeof awf !== "object")
      return;
    const pollInterval = awf.pollInterval;
    let timeoutHandler;
    let fullPath = path12;
    if (this.options.cwd && !sp2.isAbsolute(path12)) {
      fullPath = sp2.join(this.options.cwd, path12);
    }
    const now = /* @__PURE__ */ new Date();
    const writes = this._pendingWrites;
    function awaitWriteFinishFn(prevStat) {
      statcb(fullPath, (err, curStat) => {
        if (err || !writes.has(path12)) {
          if (err && err.code !== "ENOENT")
            awfEmit(err);
          return;
        }
        const now2 = Number(/* @__PURE__ */ new Date());
        if (prevStat && curStat.size !== prevStat.size) {
          writes.get(path12).lastChange = now2;
        }
        const pw = writes.get(path12);
        const df = now2 - pw.lastChange;
        if (df >= threshold) {
          writes.delete(path12);
          awfEmit(void 0, curStat);
        } else {
          timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval, curStat);
        }
      });
    }
    if (!writes.has(path12)) {
      writes.set(path12, {
        lastChange: now,
        cancelWait: () => {
          writes.delete(path12);
          clearTimeout(timeoutHandler);
          return event;
        }
      });
      timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval);
    }
  }
  /**
   * Determines whether user has asked to ignore this path.
   */
  _isIgnored(path12, stats) {
    if (this.options.atomic && DOT_RE.test(path12))
      return true;
    if (!this._userIgnored) {
      const { cwd } = this.options;
      const ign = this.options.ignored;
      const ignored = (ign || []).map(normalizeIgnored(cwd));
      const ignoredPaths = [...this._ignoredPaths];
      const list = [...ignoredPaths.map(normalizeIgnored(cwd)), ...ignored];
      this._userIgnored = anymatch(list, void 0);
    }
    return this._userIgnored(path12, stats);
  }
  _isntIgnored(path12, stat4) {
    return !this._isIgnored(path12, stat4);
  }
  /**
   * Provides a set of common helpers and properties relating to symlink handling.
   * @param path file or directory pattern being watched
   */
  _getWatchHelpers(path12) {
    return new WatchHelper(path12, this.options.followSymlinks, this);
  }
  // Directory helpers
  // -----------------
  /**
   * Provides directory tracking objects
   * @param directory path of the directory
   */
  _getWatchedDir(directory) {
    const dir = sp2.resolve(directory);
    if (!this._watched.has(dir))
      this._watched.set(dir, new DirEntry(dir, this._boundRemove));
    return this._watched.get(dir);
  }
  // File helpers
  // ------------
  /**
   * Check for read permissions: https://stackoverflow.com/a/11781404/1358405
   */
  _hasReadPermissions(stats) {
    if (this.options.ignorePermissionErrors)
      return true;
    return Boolean(Number(stats.mode) & 256);
  }
  /**
   * Handles emitting unlink events for
   * files and directories, and via recursion, for
   * files and directories within directories that are unlinked
   * @param directory within which the following item is located
   * @param item      base path of item/directory
   */
  _remove(directory, item, isDirectory) {
    const path12 = sp2.join(directory, item);
    const fullPath = sp2.resolve(path12);
    isDirectory = isDirectory != null ? isDirectory : this._watched.has(path12) || this._watched.has(fullPath);
    if (!this._throttle("remove", path12, 100))
      return;
    if (!isDirectory && this._watched.size === 1) {
      this.add(directory, item, true);
    }
    const wp = this._getWatchedDir(path12);
    const nestedDirectoryChildren = wp.getChildren();
    nestedDirectoryChildren.forEach((nested) => this._remove(path12, nested));
    const parent = this._getWatchedDir(directory);
    const wasTracked = parent.has(item);
    parent.remove(item);
    if (this._symlinkPaths.has(fullPath)) {
      this._symlinkPaths.delete(fullPath);
    }
    let relPath = path12;
    if (this.options.cwd)
      relPath = sp2.relative(this.options.cwd, path12);
    if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
      const event = this._pendingWrites.get(relPath).cancelWait();
      if (event === EVENTS.ADD)
        return;
    }
    this._watched.delete(path12);
    this._watched.delete(fullPath);
    const eventName = isDirectory ? EVENTS.UNLINK_DIR : EVENTS.UNLINK;
    if (wasTracked && !this._isIgnored(path12))
      this._emit(eventName, path12);
    this._closePath(path12);
  }
  /**
   * Closes all watchers for a path
   */
  _closePath(path12) {
    this._closeFile(path12);
    const dir = sp2.dirname(path12);
    this._getWatchedDir(dir).remove(sp2.basename(path12));
  }
  /**
   * Closes only file-specific watchers
   */
  _closeFile(path12) {
    const closers = this._closers.get(path12);
    if (!closers)
      return;
    closers.forEach((closer) => closer());
    this._closers.delete(path12);
  }
  _addPathCloser(path12, closer) {
    if (!closer)
      return;
    let list = this._closers.get(path12);
    if (!list) {
      list = [];
      this._closers.set(path12, list);
    }
    list.push(closer);
  }
  _readdirp(root, opts) {
    if (this.closed)
      return;
    const options = { type: EVENTS.ALL, alwaysStat: true, lstat: true, ...opts, depth: 0 };
    let stream = readdirp(root, options);
    this._streams.add(stream);
    stream.once(STR_CLOSE, () => {
      stream = void 0;
    });
    stream.once(STR_END, () => {
      if (stream) {
        this._streams.delete(stream);
        stream = void 0;
      }
    });
    return stream;
  }
};
function watch(paths, options = {}) {
  const watcher = new FSWatcher(options);
  watcher.add(paths);
  return watcher;
}
var chokidar_default = { watch, FSWatcher };

// src/watcher/index.ts
import * as path5 from "path";

// src/utils/files.ts
var import_ignore = __toESM(require_ignore(), 1);
import { existsSync as existsSync4, readFileSync as readFileSync3, promises as fsPromises } from "fs";
import * as path4 from "path";
var PROJECT_MARKERS = [
  ".git",
  "package.json",
  "Cargo.toml",
  "go.mod",
  "pyproject.toml",
  "setup.py",
  "requirements.txt",
  "Gemfile",
  "composer.json",
  "pom.xml",
  "build.gradle",
  "CMakeLists.txt",
  "Makefile",
  ".opencode"
];
function hasProjectMarker(projectRoot) {
  for (const marker of PROJECT_MARKERS) {
    if (existsSync4(path4.join(projectRoot, marker))) {
      return true;
    }
  }
  return false;
}
function createIgnoreFilter(projectRoot) {
  const ig = (0, import_ignore.default)();
  const defaultIgnores = [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".nuxt",
    "coverage",
    "__pycache__",
    "target",
    "vendor",
    ".opencode",
    ".*",
    "**/.*",
    "**/.*/**",
    "**/*build*/**"
  ];
  ig.add(defaultIgnores);
  const gitignorePath = path4.join(projectRoot, ".gitignore");
  if (existsSync4(gitignorePath)) {
    const gitignoreContent = readFileSync3(gitignorePath, "utf-8");
    ig.add(gitignoreContent);
  }
  return ig;
}
function shouldIncludeFile(filePath, projectRoot, includePatterns, excludePatterns, ignoreFilter) {
  const relativePath = path4.relative(projectRoot, filePath);
  const pathParts = relativePath.split(path4.sep);
  for (const part of pathParts) {
    if (part.startsWith(".") && part !== "." && part !== "..") {
      return false;
    }
    if (part.toLowerCase().includes("build")) {
      return false;
    }
  }
  if (ignoreFilter.ignores(relativePath)) {
    return false;
  }
  for (const pattern of excludePatterns) {
    if (matchGlob(relativePath, pattern)) {
      return false;
    }
  }
  for (const pattern of includePatterns) {
    if (matchGlob(relativePath, pattern)) {
      return true;
    }
  }
  return false;
}
function matchGlob(filePath, pattern) {
  if (pattern.startsWith("**/")) {
    const withoutPrefix = pattern.slice(3);
    if (withoutPrefix && matchGlob(filePath, withoutPrefix)) {
      return true;
    }
  }
  const escapedPattern = pattern.replace(/[.+^$()|[\]\\]/g, "\\$&");
  let regexPattern = escapedPattern.replace(/\*\*/g, "<<<DOUBLESTAR>>>").replace(/\*/g, "[^/]*").replace(/<<<DOUBLESTAR>>>/g, ".*").replace(/\?/g, ".").replace(/\{([^}]+)\}/g, (_, p1) => `(${p1.split(",").join("|")})`);
  if (regexPattern.startsWith(".*/")) {
    regexPattern = `(.*\\/)?${regexPattern.slice(3)}`;
  }
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(filePath);
}
async function* walkDirectory(dir, projectRoot, includePatterns, excludePatterns, ignoreFilter, maxFileSize, skipped, options, currentDepth = 0) {
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });
  const filesInDir = [];
  const subdirs = [];
  for (const entry of entries) {
    const fullPath = path4.join(dir, entry.name);
    const relativePath = path4.relative(projectRoot, fullPath);
    if (entry.name.startsWith(".") && entry.name !== "." && entry.name !== "..") {
      if (entry.isDirectory()) {
        skipped.push({ path: relativePath, reason: "excluded" });
      }
      continue;
    }
    if (entry.isDirectory() && entry.name.toLowerCase().includes("build")) {
      skipped.push({ path: relativePath, reason: "excluded" });
      continue;
    }
    if (ignoreFilter.ignores(relativePath)) {
      if (entry.isFile()) {
        skipped.push({ path: relativePath, reason: "gitignore" });
      }
      continue;
    }
    if (entry.isDirectory()) {
      subdirs.push({ fullPath, relativePath });
    } else if (entry.isFile()) {
      const stat4 = await fsPromises.stat(fullPath);
      if (stat4.size > maxFileSize) {
        skipped.push({ path: relativePath, reason: "too_large" });
        continue;
      }
      for (const pattern of excludePatterns) {
        if (matchGlob(relativePath, pattern)) {
          skipped.push({ path: relativePath, reason: "excluded" });
          continue;
        }
      }
      let matched = false;
      for (const pattern of includePatterns) {
        if (matchGlob(relativePath, pattern)) {
          matched = true;
          break;
        }
      }
      if (matched) {
        filesInDir.push({ path: fullPath, size: stat4.size });
      }
    }
  }
  filesInDir.sort((a, b) => a.size - b.size);
  const limitedFiles = filesInDir.slice(0, options.maxFilesPerDirectory);
  for (const f of limitedFiles) {
    yield f;
  }
  for (let i = options.maxFilesPerDirectory; i < filesInDir.length; i++) {
    skipped.push({ path: path4.relative(projectRoot, filesInDir[i].path), reason: "excluded" });
  }
  const canRecurse = options.maxDepth === -1 || currentDepth < options.maxDepth;
  if (canRecurse) {
    for (const sub of subdirs) {
      yield* walkDirectory(
        sub.fullPath,
        projectRoot,
        includePatterns,
        excludePatterns,
        ignoreFilter,
        maxFileSize,
        skipped,
        options,
        currentDepth + 1
      );
    }
  }
}
async function collectFiles(projectRoot, includePatterns, excludePatterns, maxFileSize, additionalRoots, walkOptions) {
  const opts = walkOptions ?? { maxDepth: 5, maxFilesPerDirectory: 100 };
  const ignoreFilter = createIgnoreFilter(projectRoot);
  const files = [];
  const skipped = [];
  for await (const file of walkDirectory(
    projectRoot,
    projectRoot,
    includePatterns,
    excludePatterns,
    ignoreFilter,
    maxFileSize,
    skipped,
    opts,
    0
  )) {
    files.push(file);
  }
  if (additionalRoots && additionalRoots.length > 0) {
    const normalizedRoots = /* @__PURE__ */ new Set();
    for (const kbRoot of additionalRoots) {
      const resolved = path4.normalize(
        path4.isAbsolute(kbRoot) ? kbRoot : path4.resolve(projectRoot, kbRoot)
      );
      normalizedRoots.add(resolved);
    }
    for (const resolvedKbRoot of normalizedRoots) {
      try {
        const stat4 = await fsPromises.stat(resolvedKbRoot);
        if (!stat4.isDirectory()) {
          skipped.push({ path: resolvedKbRoot, reason: "excluded" });
          continue;
        }
        const kbIgnoreFilter = createIgnoreFilter(resolvedKbRoot);
        for await (const file of walkDirectory(
          resolvedKbRoot,
          resolvedKbRoot,
          includePatterns,
          excludePatterns,
          kbIgnoreFilter,
          maxFileSize,
          skipped,
          opts,
          0
        )) {
          files.push(file);
        }
      } catch {
        skipped.push({ path: resolvedKbRoot, reason: "excluded" });
      }
    }
  }
  return { files, skipped };
}

// src/watcher/index.ts
var FileWatcher = class {
  watcher = null;
  projectRoot;
  config;
  pendingChanges = /* @__PURE__ */ new Map();
  debounceTimer = null;
  debounceMs = 1e3;
  onChanges = null;
  constructor(projectRoot, config) {
    this.projectRoot = projectRoot;
    this.config = config;
  }
  start(handler) {
    if (this.watcher) {
      return;
    }
    this.onChanges = handler;
    const ignoreFilter = createIgnoreFilter(this.projectRoot);
    this.watcher = chokidar_default.watch(this.projectRoot, {
      ignored: (filePath) => {
        const relativePath = path5.relative(this.projectRoot, filePath);
        if (!relativePath) return false;
        const pathParts = relativePath.split(path5.sep);
        for (const part of pathParts) {
          if (part.startsWith(".") && part !== "." && part !== "..") {
            return true;
          }
          if (part.toLowerCase().includes("build")) {
            return true;
          }
        }
        if (ignoreFilter.ignores(relativePath)) {
          return true;
        }
        return false;
      },
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100
      }
    });
    this.watcher.on("add", (filePath) => this.handleChange("add", filePath));
    this.watcher.on("change", (filePath) => this.handleChange("change", filePath));
    this.watcher.on("unlink", (filePath) => this.handleChange("unlink", filePath));
  }
  handleChange(type, filePath) {
    const includePatterns = [...this.config.include, ...this.config.additionalInclude ?? []];
    if (!shouldIncludeFile(
      filePath,
      this.projectRoot,
      includePatterns,
      this.config.exclude,
      createIgnoreFilter(this.projectRoot)
    )) {
      return;
    }
    this.pendingChanges.set(filePath, type);
    this.scheduleFlush();
  }
  scheduleFlush() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.flush();
    }, this.debounceMs);
  }
  async flush() {
    if (this.pendingChanges.size === 0 || !this.onChanges) {
      return;
    }
    const changes = Array.from(this.pendingChanges.entries()).map(
      ([path12, type]) => ({ path: path12, type })
    );
    this.pendingChanges.clear();
    try {
      await this.onChanges(changes);
    } catch (error) {
      console.error("Error handling file changes:", error);
    }
  }
  stop() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
    this.pendingChanges.clear();
    this.onChanges = null;
  }
  isRunning() {
    return this.watcher !== null;
  }
};
var GitHeadWatcher = class {
  watcher = null;
  projectRoot;
  currentBranch = null;
  onBranchChange = null;
  debounceTimer = null;
  debounceMs = 100;
  // Short debounce for git operations
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
  }
  start(handler) {
    if (this.watcher) {
      return;
    }
    if (!isGitRepo(this.projectRoot)) {
      return;
    }
    this.onBranchChange = handler;
    this.currentBranch = getCurrentBranch(this.projectRoot);
    const headPath = getHeadPath(this.projectRoot);
    const refsPath = path5.join(this.projectRoot, ".git", "refs", "heads");
    this.watcher = chokidar_default.watch([headPath, refsPath], {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 50,
        pollInterval: 10
      }
    });
    this.watcher.on("change", () => this.handleHeadChange());
    this.watcher.on("add", () => this.handleHeadChange());
  }
  handleHeadChange() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.checkBranchChange();
    }, this.debounceMs);
  }
  async checkBranchChange() {
    const newBranch = getCurrentBranch(this.projectRoot);
    if (newBranch && newBranch !== this.currentBranch && this.onBranchChange) {
      const oldBranch = this.currentBranch;
      this.currentBranch = newBranch;
      try {
        await this.onBranchChange(oldBranch, newBranch);
      } catch (error) {
        console.error("Error handling branch change:", error);
      }
    } else if (newBranch) {
      this.currentBranch = newBranch;
    }
  }
  getCurrentBranch() {
    return this.currentBranch;
  }
  stop() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
    this.onBranchChange = null;
  }
  isRunning() {
    return this.watcher !== null;
  }
};
function createWatcherWithIndexer(getIndexer2, projectRoot, config) {
  const fileWatcher = new FileWatcher(projectRoot, config);
  fileWatcher.start(async (changes) => {
    const hasAddOrChange = changes.some(
      (c) => c.type === "add" || c.type === "change"
    );
    const hasDelete = changes.some((c) => c.type === "unlink");
    if (hasAddOrChange || hasDelete) {
      await getIndexer2().index();
    }
  });
  let gitWatcher = null;
  if (isGitRepo(projectRoot)) {
    gitWatcher = new GitHeadWatcher(projectRoot);
    gitWatcher.start(async (oldBranch, newBranch) => {
      console.log(`Branch changed: ${oldBranch ?? "(none)"} -> ${newBranch}`);
      await getIndexer2().index();
    });
  }
  return {
    fileWatcher,
    gitWatcher,
    stop() {
      fileWatcher.stop();
      gitWatcher?.stop();
    }
  };
}

// src/tools/index.ts
import { tool } from "@opencode-ai/plugin";

// src/indexer/index.ts
import { existsSync as existsSync6, readFileSync as readFileSync5, writeFileSync as writeFileSync2, renameSync, unlinkSync, promises as fsPromises2 } from "fs";
import * as path8 from "path";
import { performance as performance2 } from "perf_hooks";

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/p-timeout/index.js
var TimeoutError = class _TimeoutError extends Error {
  name = "TimeoutError";
  constructor(message, options) {
    super(message, options);
    Error.captureStackTrace?.(this, _TimeoutError);
  }
};
var getAbortedReason = (signal) => signal.reason ?? new DOMException("This operation was aborted.", "AbortError");
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout },
    signal
  } = options;
  let timer;
  let abortHandler;
  const wrappedPromise = new Promise((resolve9, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (signal?.aborted) {
      reject(getAbortedReason(signal));
      return;
    }
    if (signal) {
      abortHandler = () => {
        reject(getAbortedReason(signal));
      };
      signal.addEventListener("abort", abortHandler, { once: true });
    }
    promise.then(resolve9, reject);
    if (milliseconds === Number.POSITIVE_INFINITY) {
      return;
    }
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve9(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve9();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
    if (abortHandler && signal) {
      signal.removeEventListener("abort", abortHandler);
    }
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}

// node_modules/p-queue/dist/lower-bound.js
function lowerBound(array, value, comparator) {
  let first = 0;
  let count = array.length;
  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it = first + step;
    if (comparator(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}

// node_modules/p-queue/dist/priority-queue.js
var PriorityQueue = class {
  #queue = [];
  enqueue(run, options) {
    const { priority = 0, id } = options ?? {};
    const element = {
      priority,
      id,
      run
    };
    if (this.size === 0 || this.#queue[this.size - 1].priority >= priority) {
      this.#queue.push(element);
      return;
    }
    const index = lowerBound(this.#queue, element, (a, b) => b.priority - a.priority);
    this.#queue.splice(index, 0, element);
  }
  setPriority(id, priority) {
    const index = this.#queue.findIndex((element) => element.id === id);
    if (index === -1) {
      throw new ReferenceError(`No promise function with the id "${id}" exists in the queue.`);
    }
    const [item] = this.#queue.splice(index, 1);
    this.enqueue(item.run, { priority, id });
  }
  remove(idOrRun) {
    const index = this.#queue.findIndex((element) => {
      if (typeof idOrRun === "string") {
        return element.id === idOrRun;
      }
      return element.run === idOrRun;
    });
    if (index !== -1) {
      this.#queue.splice(index, 1);
    }
  }
  dequeue() {
    const item = this.#queue.shift();
    return item?.run;
  }
  filter(options) {
    return this.#queue.filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return this.#queue.length;
  }
};

// node_modules/p-queue/dist/index.js
var PQueue = class extends import_index.default {
  #carryoverIntervalCount;
  #isIntervalIgnored;
  #intervalCount = 0;
  #intervalCap;
  #rateLimitedInInterval = false;
  #rateLimitFlushScheduled = false;
  #interval;
  #intervalEnd = 0;
  #lastExecutionTime = 0;
  #intervalId;
  #timeoutId;
  #strict;
  // Circular buffer implementation for better performance
  #strictTicks = [];
  #strictTicksStartIndex = 0;
  #queue;
  #queueClass;
  #pending = 0;
  // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
  #concurrency;
  #isPaused;
  // Use to assign a unique identifier to a promise function, if not explicitly specified
  #idAssigner = 1n;
  // Track currently running tasks for debugging
  #runningTasks = /* @__PURE__ */ new Map();
  #queueAbortListenerCleanupFunctions = /* @__PURE__ */ new Set();
  /**
      Get or set the default timeout for all tasks. Can be changed at runtime.
  
      Operations will throw a `TimeoutError` if they don't complete within the specified time.
  
      The timeout begins when the operation is dequeued and starts execution, not while it's waiting in the queue.
  
      @example
      ```
      const queue = new PQueue({timeout: 5000});
  
      // Change timeout for all future tasks
      queue.timeout = 10000;
      ```
      */
  timeout;
  constructor(options) {
    super();
    options = {
      carryoverIntervalCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: PriorityQueue,
      strict: false,
      ...options
    };
    if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${options.intervalCap?.toString() ?? ""}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${options.interval?.toString() ?? ""}\` (${typeof options.interval})`);
    }
    if (options.strict && options.interval === 0) {
      throw new TypeError("The `strict` option requires a non-zero `interval`");
    }
    if (options.strict && options.intervalCap === Number.POSITIVE_INFINITY) {
      throw new TypeError("The `strict` option requires a finite `intervalCap`");
    }
    this.#carryoverIntervalCount = options.carryoverIntervalCount ?? options.carryoverConcurrencyCount ?? false;
    this.#isIntervalIgnored = options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0;
    this.#intervalCap = options.intervalCap;
    this.#interval = options.interval;
    this.#strict = options.strict;
    this.#queue = new options.queueClass();
    this.#queueClass = options.queueClass;
    this.concurrency = options.concurrency;
    if (options.timeout !== void 0 && !(Number.isFinite(options.timeout) && options.timeout > 0)) {
      throw new TypeError(`Expected \`timeout\` to be a positive finite number, got \`${options.timeout}\` (${typeof options.timeout})`);
    }
    this.timeout = options.timeout;
    this.#isPaused = options.autoStart === false;
    this.#setupRateLimitTracking();
  }
  #cleanupStrictTicks(now) {
    while (this.#strictTicksStartIndex < this.#strictTicks.length) {
      const oldestTick = this.#strictTicks[this.#strictTicksStartIndex];
      if (oldestTick !== void 0 && now - oldestTick >= this.#interval) {
        this.#strictTicksStartIndex++;
      } else {
        break;
      }
    }
    const shouldCompact = this.#strictTicksStartIndex > 100 && this.#strictTicksStartIndex > this.#strictTicks.length / 2 || this.#strictTicksStartIndex === this.#strictTicks.length;
    if (shouldCompact) {
      this.#strictTicks = this.#strictTicks.slice(this.#strictTicksStartIndex);
      this.#strictTicksStartIndex = 0;
    }
  }
  // Helper methods for interval consumption
  #consumeIntervalSlot(now) {
    if (this.#strict) {
      this.#strictTicks.push(now);
    } else {
      this.#intervalCount++;
    }
  }
  #rollbackIntervalSlot() {
    if (this.#strict) {
      if (this.#strictTicks.length > this.#strictTicksStartIndex) {
        this.#strictTicks.pop();
      }
    } else if (this.#intervalCount > 0) {
      this.#intervalCount--;
    }
  }
  #getActiveTicksCount() {
    return this.#strictTicks.length - this.#strictTicksStartIndex;
  }
  get #doesIntervalAllowAnother() {
    if (this.#isIntervalIgnored) {
      return true;
    }
    if (this.#strict) {
      return this.#getActiveTicksCount() < this.#intervalCap;
    }
    return this.#intervalCount < this.#intervalCap;
  }
  get #doesConcurrentAllowAnother() {
    return this.#pending < this.#concurrency;
  }
  #next() {
    this.#pending--;
    if (this.#pending === 0) {
      this.emit("pendingZero");
    }
    this.#tryToStartAnother();
    this.emit("next");
  }
  #onResumeInterval() {
    this.#timeoutId = void 0;
    this.#onInterval();
    this.#initializeIntervalIfNeeded();
  }
  #isIntervalPausedAt(now) {
    if (this.#strict) {
      this.#cleanupStrictTicks(now);
      const activeTicksCount = this.#getActiveTicksCount();
      if (activeTicksCount >= this.#intervalCap) {
        const oldestTick = this.#strictTicks[this.#strictTicksStartIndex];
        const delay = this.#interval - (now - oldestTick);
        this.#createIntervalTimeout(delay);
        return true;
      }
      return false;
    }
    if (this.#intervalId === void 0) {
      const delay = this.#intervalEnd - now;
      if (delay < 0) {
        if (this.#lastExecutionTime > 0) {
          const timeSinceLastExecution = now - this.#lastExecutionTime;
          if (timeSinceLastExecution < this.#interval) {
            this.#createIntervalTimeout(this.#interval - timeSinceLastExecution);
            return true;
          }
        }
        this.#intervalCount = this.#carryoverIntervalCount ? this.#pending : 0;
      } else {
        this.#createIntervalTimeout(delay);
        return true;
      }
    }
    return false;
  }
  #createIntervalTimeout(delay) {
    if (this.#timeoutId !== void 0) {
      return;
    }
    this.#timeoutId = setTimeout(() => {
      this.#onResumeInterval();
    }, delay);
  }
  #clearIntervalTimer() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = void 0;
    }
  }
  #clearTimeoutTimer() {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = void 0;
    }
  }
  #tryToStartAnother() {
    if (this.#queue.size === 0) {
      this.#clearIntervalTimer();
      this.emit("empty");
      if (this.#pending === 0) {
        this.#clearTimeoutTimer();
        if (this.#strict && this.#strictTicksStartIndex > 0) {
          const now = Date.now();
          this.#cleanupStrictTicks(now);
        }
        this.emit("idle");
      }
      return false;
    }
    let taskStarted = false;
    if (!this.#isPaused) {
      const now = Date.now();
      const canInitializeInterval = !this.#isIntervalPausedAt(now);
      if (this.#doesIntervalAllowAnother && this.#doesConcurrentAllowAnother) {
        const job = this.#queue.dequeue();
        if (!this.#isIntervalIgnored) {
          this.#consumeIntervalSlot(now);
          this.#scheduleRateLimitUpdate();
        }
        this.emit("active");
        job();
        if (canInitializeInterval) {
          this.#initializeIntervalIfNeeded();
        }
        taskStarted = true;
      }
    }
    return taskStarted;
  }
  #initializeIntervalIfNeeded() {
    if (this.#isIntervalIgnored || this.#intervalId !== void 0) {
      return;
    }
    if (this.#strict) {
      return;
    }
    this.#intervalId = setInterval(() => {
      this.#onInterval();
    }, this.#interval);
    this.#intervalEnd = Date.now() + this.#interval;
  }
  #onInterval() {
    if (!this.#strict) {
      if (this.#intervalCount === 0 && this.#pending === 0 && this.#intervalId) {
        this.#clearIntervalTimer();
      }
      this.#intervalCount = this.#carryoverIntervalCount ? this.#pending : 0;
    }
    this.#processQueue();
    this.#scheduleRateLimitUpdate();
  }
  /**
  Executes all queued functions until it reaches the limit.
  */
  #processQueue() {
    while (this.#tryToStartAnother()) {
    }
  }
  get concurrency() {
    return this.#concurrency;
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    this.#concurrency = newConcurrency;
    this.#processQueue();
  }
  /**
      Updates the priority of a promise function by its id, affecting its execution order. Requires a defined concurrency limit to take effect.
  
      For example, this can be used to prioritize a promise function to run earlier.
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 1});
  
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦀', {priority: 0, id: '🦀'});
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦄', {priority: 1});
  
      queue.setPriority('🦀', 2);
      ```
  
      In this case, the promise function with `id: '🦀'` runs second.
  
      You can also deprioritize a promise function to delay its execution:
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 1});
  
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦀', {priority: 1, id: '🦀'});
      queue.add(async () => '🦄');
      queue.add(async () => '🦄', {priority: 0});
  
      queue.setPriority('🦀', -1);
      ```
      Here, the promise function with `id: '🦀'` executes last.
      */
  setPriority(id, priority) {
    if (typeof priority !== "number" || !Number.isFinite(priority)) {
      throw new TypeError(`Expected \`priority\` to be a finite number, got \`${priority}\` (${typeof priority})`);
    }
    this.#queue.setPriority(id, priority);
  }
  async add(function_, options = {}) {
    options = {
      timeout: this.timeout,
      ...options,
      // Assign unique ID if not provided
      id: options.id ?? (this.#idAssigner++).toString()
    };
    return new Promise((resolve9, reject) => {
      const taskSymbol = /* @__PURE__ */ Symbol(`task-${options.id}`);
      let cleanupQueueAbortHandler = () => void 0;
      const run = async () => {
        cleanupQueueAbortHandler();
        this.#pending++;
        this.#runningTasks.set(taskSymbol, {
          id: options.id,
          priority: options.priority ?? 0,
          // Match priority-queue default
          startTime: Date.now(),
          timeout: options.timeout
        });
        let eventListener;
        try {
          try {
            options.signal?.throwIfAborted();
          } catch (error) {
            this.#rollbackIntervalConsumption();
            this.#runningTasks.delete(taskSymbol);
            throw error;
          }
          this.#lastExecutionTime = Date.now();
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), {
              milliseconds: options.timeout,
              message: `Task timed out after ${options.timeout}ms (queue has ${this.#pending} running, ${this.#queue.size} waiting)`
            });
          }
          if (options.signal) {
            const { signal } = options;
            operation = Promise.race([operation, new Promise((_resolve, reject2) => {
              eventListener = () => {
                reject2(signal.reason);
              };
              signal.addEventListener("abort", eventListener, { once: true });
            })]);
          }
          const result = await operation;
          resolve9(result);
          this.emit("completed", result);
        } catch (error) {
          reject(error);
          this.emit("error", error);
        } finally {
          if (eventListener) {
            options.signal?.removeEventListener("abort", eventListener);
          }
          this.#runningTasks.delete(taskSymbol);
          queueMicrotask(() => {
            this.#next();
          });
        }
      };
      this.#queue.enqueue(run, options);
      const removeQueuedTask = () => {
        if (this.#queue instanceof PriorityQueue) {
          this.#queue.remove(run);
          return;
        }
        this.#queue.remove?.(options.id);
      };
      if (options.signal) {
        const { signal } = options;
        const queueAbortHandler = () => {
          cleanupQueueAbortHandler();
          removeQueuedTask();
          reject(signal.reason);
          this.#tryToStartAnother();
          this.emit("next");
        };
        cleanupQueueAbortHandler = () => {
          signal.removeEventListener("abort", queueAbortHandler);
          this.#queueAbortListenerCleanupFunctions.delete(cleanupQueueAbortHandler);
        };
        if (signal.aborted) {
          queueAbortHandler();
          return;
        }
        signal.addEventListener("abort", queueAbortHandler, { once: true });
        this.#queueAbortListenerCleanupFunctions.add(cleanupQueueAbortHandler);
      }
      this.emit("add");
      this.#tryToStartAnother();
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
  start() {
    if (!this.#isPaused) {
      return this;
    }
    this.#isPaused = false;
    this.#processQueue();
    return this;
  }
  /**
  Put queue execution on hold.
  */
  pause() {
    this.#isPaused = true;
  }
  /**
  Clear the queue.
  */
  clear() {
    for (const cleanupQueueAbortHandler of this.#queueAbortListenerCleanupFunctions) {
      cleanupQueueAbortHandler();
    }
    this.#queue = new this.#queueClass();
    this.#clearIntervalTimer();
    this.#updateRateLimitState();
    this.emit("empty");
    if (this.#pending === 0) {
      this.#clearTimeoutTimer();
      this.emit("idle");
    }
    this.emit("next");
  }
  /**
      Can be called multiple times. Useful if you for example add additional items at a later time.
  
      @returns A promise that settles when the queue becomes empty.
      */
  async onEmpty() {
    if (this.#queue.size === 0) {
      return;
    }
    await this.#onEvent("empty");
  }
  /**
      @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
  
      If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
  
      Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
      */
  async onSizeLessThan(limit) {
    if (this.#queue.size < limit) {
      return;
    }
    await this.#onEvent("next", () => this.#queue.size < limit);
  }
  /**
      The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
  
      @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
      */
  async onIdle() {
    if (this.#pending === 0 && this.#queue.size === 0) {
      return;
    }
    await this.#onEvent("idle");
  }
  /**
      The difference with `.onIdle` is that `.onPendingZero` only waits for currently running tasks to finish, ignoring queued tasks.
  
      @returns A promise that settles when all currently running tasks have completed; `queue.pending === 0`.
      */
  async onPendingZero() {
    if (this.#pending === 0) {
      return;
    }
    await this.#onEvent("pendingZero");
  }
  /**
  @returns A promise that settles when the queue becomes rate-limited due to intervalCap.
  */
  async onRateLimit() {
    if (this.isRateLimited) {
      return;
    }
    await this.#onEvent("rateLimit");
  }
  /**
  @returns A promise that settles when the queue is no longer rate-limited.
  */
  async onRateLimitCleared() {
    if (!this.isRateLimited) {
      return;
    }
    await this.#onEvent("rateLimitCleared");
  }
  /**
      @returns A promise that rejects when any task in the queue errors.
  
      Use with `Promise.race([queue.onError(), queue.onIdle()])` to fail fast on the first error while still resolving normally when the queue goes idle.
  
      Important: The promise returned by `add()` still rejects. You must handle each `add()` promise (for example, `.catch(() => {})`) to avoid unhandled rejections.
  
      @example
      ```
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 2});
  
      queue.add(() => fetchData(1)).catch(() => {});
      queue.add(() => fetchData(2)).catch(() => {});
      queue.add(() => fetchData(3)).catch(() => {});
  
      // Stop processing on first error
      try {
          await Promise.race([
              queue.onError(),
              queue.onIdle()
          ]);
      } catch (error) {
          queue.pause(); // Stop processing remaining tasks
          console.error('Queue failed:', error);
      }
      ```
      */
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  onError() {
    return new Promise((_resolve, reject) => {
      const handleError = (error) => {
        this.off("error", handleError);
        reject(error);
      };
      this.on("error", handleError);
    });
  }
  async #onEvent(event, filter) {
    return new Promise((resolve9) => {
      const listener = () => {
        if (filter && !filter()) {
          return;
        }
        this.off(event, listener);
        resolve9();
      };
      this.on(event, listener);
    });
  }
  /**
  Size of the queue, the number of queued items waiting to run.
  */
  get size() {
    return this.#queue.size;
  }
  /**
      Size of the queue, filtered by the given options.
  
      For example, this can be used to find the number of items remaining in the queue with a specific priority level.
      */
  sizeBy(options) {
    return this.#queue.filter(options).length;
  }
  /**
  Number of running items (no longer in the queue).
  */
  get pending() {
    return this.#pending;
  }
  /**
  Whether the queue is currently paused.
  */
  get isPaused() {
    return this.#isPaused;
  }
  #setupRateLimitTracking() {
    if (this.#isIntervalIgnored) {
      return;
    }
    this.on("add", () => {
      if (this.#queue.size > 0) {
        this.#scheduleRateLimitUpdate();
      }
    });
    this.on("next", () => {
      this.#scheduleRateLimitUpdate();
    });
  }
  #scheduleRateLimitUpdate() {
    if (this.#isIntervalIgnored || this.#rateLimitFlushScheduled) {
      return;
    }
    this.#rateLimitFlushScheduled = true;
    queueMicrotask(() => {
      this.#rateLimitFlushScheduled = false;
      this.#updateRateLimitState();
    });
  }
  #rollbackIntervalConsumption() {
    if (this.#isIntervalIgnored) {
      return;
    }
    this.#rollbackIntervalSlot();
    this.#scheduleRateLimitUpdate();
  }
  #updateRateLimitState() {
    const previous = this.#rateLimitedInInterval;
    if (this.#isIntervalIgnored || this.#queue.size === 0) {
      if (previous) {
        this.#rateLimitedInInterval = false;
        this.emit("rateLimitCleared");
      }
      return;
    }
    let count;
    if (this.#strict) {
      const now = Date.now();
      this.#cleanupStrictTicks(now);
      count = this.#getActiveTicksCount();
    } else {
      count = this.#intervalCount;
    }
    const shouldBeRateLimited = count >= this.#intervalCap;
    if (shouldBeRateLimited !== previous) {
      this.#rateLimitedInInterval = shouldBeRateLimited;
      this.emit(shouldBeRateLimited ? "rateLimit" : "rateLimitCleared");
    }
  }
  /**
  Whether the queue is currently rate-limited due to intervalCap.
  */
  get isRateLimited() {
    return this.#rateLimitedInInterval;
  }
  /**
      Whether the queue is saturated. Returns `true` when:
      - All concurrency slots are occupied and tasks are waiting, OR
      - The queue is rate-limited and tasks are waiting
  
      Useful for detecting backpressure and potential hanging tasks.
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 2});
  
      // Backpressure handling
      if (queue.isSaturated) {
          console.log('Queue is saturated, waiting for capacity...');
          await queue.onSizeLessThan(queue.concurrency);
      }
  
      // Monitoring for stuck tasks
      setInterval(() => {
          if (queue.isSaturated) {
              console.warn(`Queue saturated: ${queue.pending} running, ${queue.size} waiting`);
          }
      }, 60000);
      ```
      */
  get isSaturated() {
    return this.#pending === this.#concurrency && this.#queue.size > 0 || this.isRateLimited && this.#queue.size > 0;
  }
  /**
      The tasks currently being executed. Each task includes its `id`, `priority`, `startTime`, and `timeout` (if set).
  
      Returns an array of task info objects.
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 2});
  
      // Add tasks with IDs for better debugging
      queue.add(() => fetchUser(123), {id: 'user-123'});
      queue.add(() => fetchPosts(456), {id: 'posts-456', priority: 1});
  
      // Check what's running
      console.log(queue.runningTasks);
      // => [{
      //   id: 'user-123',
      //   priority: 0,
      //   startTime: 1759253001716,
      //   timeout: undefined
      // }, {
      //   id: 'posts-456',
      //   priority: 1,
      //   startTime: 1759253001916,
      //   timeout: undefined
      // }]
      ```
      */
  get runningTasks() {
    return [...this.#runningTasks.values()].map((task) => ({ ...task }));
  }
};

// node_modules/is-network-error/index.js
var objectToString = Object.prototype.toString;
var isError = (value) => objectToString.call(value) === "[object Error]";
var errorMessages = /* @__PURE__ */ new Set([
  "network error",
  // Chrome
  "NetworkError when attempting to fetch resource.",
  // Firefox
  "The Internet connection appears to be offline.",
  // Safari 16
  "Network request failed",
  // `cross-fetch`
  "fetch failed",
  // Undici (Node.js)
  "terminated",
  // Undici (Node.js)
  " A network error occurred.",
  // Bun (WebKit)
  "Network connection lost"
  // Cloudflare Workers (fetch)
]);
function isNetworkError(error) {
  const isValid = error && isError(error) && error.name === "TypeError" && typeof error.message === "string";
  if (!isValid) {
    return false;
  }
  const { message, stack } = error;
  if (message === "Load failed") {
    return stack === void 0 || "__sentry_captured__" in error;
  }
  if (message.startsWith("error sending request for url")) {
    return true;
  }
  if (message === "Failed to fetch" || message.startsWith("Failed to fetch (") && message.endsWith(")")) {
    return true;
  }
  return errorMessages.has(message);
}

// node_modules/p-retry/index.js
function validateRetries(retries) {
  if (typeof retries === "number") {
    if (retries < 0) {
      throw new TypeError("Expected `retries` to be a non-negative number.");
    }
    if (Number.isNaN(retries)) {
      throw new TypeError("Expected `retries` to be a valid number or Infinity, got NaN.");
    }
  } else if (retries !== void 0) {
    throw new TypeError("Expected `retries` to be a number or Infinity.");
  }
}
function validateNumberOption(name, value, { min = 0, allowInfinity = false } = {}) {
  if (value === void 0) {
    return;
  }
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new TypeError(`Expected \`${name}\` to be a number${allowInfinity ? " or Infinity" : ""}.`);
  }
  if (!allowInfinity && !Number.isFinite(value)) {
    throw new TypeError(`Expected \`${name}\` to be a finite number.`);
  }
  if (value < min) {
    throw new TypeError(`Expected \`${name}\` to be \u2265 ${min}.`);
  }
}
var AbortError = class extends Error {
  constructor(message) {
    super();
    if (message instanceof Error) {
      this.originalError = message;
      ({ message } = message);
    } else {
      this.originalError = new Error(message);
      this.originalError.stack = this.stack;
    }
    this.name = "AbortError";
    this.message = message;
  }
};
function calculateDelay(retriesConsumed, options) {
  const attempt = Math.max(1, retriesConsumed + 1);
  const random = options.randomize ? Math.random() + 1 : 1;
  let timeout = Math.round(random * options.minTimeout * options.factor ** (attempt - 1));
  timeout = Math.min(timeout, options.maxTimeout);
  return timeout;
}
function calculateRemainingTime(start, max) {
  if (!Number.isFinite(max)) {
    return max;
  }
  return max - (performance.now() - start);
}
async function onAttemptFailure({ error, attemptNumber, retriesConsumed, startTime, options }) {
  const normalizedError = error instanceof Error ? error : new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`);
  if (normalizedError instanceof AbortError) {
    throw normalizedError.originalError;
  }
  const retriesLeft = Number.isFinite(options.retries) ? Math.max(0, options.retries - retriesConsumed) : options.retries;
  const maxRetryTime = options.maxRetryTime ?? Number.POSITIVE_INFINITY;
  const context = Object.freeze({
    error: normalizedError,
    attemptNumber,
    retriesLeft,
    retriesConsumed
  });
  await options.onFailedAttempt(context);
  if (calculateRemainingTime(startTime, maxRetryTime) <= 0) {
    throw normalizedError;
  }
  const consumeRetry = await options.shouldConsumeRetry(context);
  const remainingTime = calculateRemainingTime(startTime, maxRetryTime);
  if (remainingTime <= 0 || retriesLeft <= 0) {
    throw normalizedError;
  }
  if (normalizedError instanceof TypeError && !isNetworkError(normalizedError)) {
    if (consumeRetry) {
      throw normalizedError;
    }
    options.signal?.throwIfAborted();
    return false;
  }
  if (!await options.shouldRetry(context)) {
    throw normalizedError;
  }
  if (!consumeRetry) {
    options.signal?.throwIfAborted();
    return false;
  }
  const delayTime = calculateDelay(retriesConsumed, options);
  const finalDelay = Math.min(delayTime, remainingTime);
  options.signal?.throwIfAborted();
  if (finalDelay > 0) {
    await new Promise((resolve9, reject) => {
      const onAbort = () => {
        clearTimeout(timeoutToken);
        options.signal?.removeEventListener("abort", onAbort);
        reject(options.signal.reason);
      };
      const timeoutToken = setTimeout(() => {
        options.signal?.removeEventListener("abort", onAbort);
        resolve9();
      }, finalDelay);
      if (options.unref) {
        timeoutToken.unref?.();
      }
      options.signal?.addEventListener("abort", onAbort, { once: true });
    });
  }
  options.signal?.throwIfAborted();
  return true;
}
async function pRetry(input, options = {}) {
  options = { ...options };
  validateRetries(options.retries);
  if (Object.hasOwn(options, "forever")) {
    throw new Error("The `forever` option is no longer supported. For many use-cases, you can set `retries: Infinity` instead.");
  }
  options.retries ??= 10;
  options.factor ??= 2;
  options.minTimeout ??= 1e3;
  options.maxTimeout ??= Number.POSITIVE_INFINITY;
  options.maxRetryTime ??= Number.POSITIVE_INFINITY;
  options.randomize ??= false;
  options.onFailedAttempt ??= () => {
  };
  options.shouldRetry ??= () => true;
  options.shouldConsumeRetry ??= () => true;
  validateNumberOption("factor", options.factor, { min: 0, allowInfinity: false });
  validateNumberOption("minTimeout", options.minTimeout, { min: 0, allowInfinity: false });
  validateNumberOption("maxTimeout", options.maxTimeout, { min: 0, allowInfinity: true });
  validateNumberOption("maxRetryTime", options.maxRetryTime, { min: 0, allowInfinity: true });
  if (!(options.factor > 0)) {
    options.factor = 1;
  }
  options.signal?.throwIfAborted();
  let attemptNumber = 0;
  let retriesConsumed = 0;
  const startTime = performance.now();
  while (Number.isFinite(options.retries) ? retriesConsumed <= options.retries : true) {
    attemptNumber++;
    try {
      options.signal?.throwIfAborted();
      const result = await input(attemptNumber);
      options.signal?.throwIfAborted();
      return result;
    } catch (error) {
      if (await onAttemptFailure({
        error,
        attemptNumber,
        retriesConsumed,
        startTime,
        options
      })) {
        retriesConsumed++;
      }
    }
  }
  throw new Error("Retry attempts exhausted without throwing an error.");
}

// src/embeddings/detector.ts
import { existsSync as existsSync5, readFileSync as readFileSync4 } from "fs";
import * as path6 from "path";
import * as os3 from "os";
function getOpenCodeAuthPath() {
  return path6.join(os3.homedir(), ".local", "share", "opencode", "auth.json");
}
function loadOpenCodeAuth() {
  const authPath = getOpenCodeAuthPath();
  try {
    if (existsSync5(authPath)) {
      return JSON.parse(readFileSync4(authPath, "utf-8"));
    }
  } catch {
  }
  return {};
}
async function detectEmbeddingProvider(preferredProvider, model) {
  const credentials = await getProviderCredentials(preferredProvider);
  if (credentials) {
    if (!model) {
      return {
        provider: preferredProvider,
        credentials,
        modelInfo: getDefaultModelForProvider(preferredProvider)
      };
    }
    if (!isValidModel(model, preferredProvider)) {
      throw new Error(
        `Model '${model}' is not supported by provider '${preferredProvider}'`
      );
    }
    const providerModels = EMBEDDING_MODELS[preferredProvider];
    return {
      provider: preferredProvider,
      credentials,
      modelInfo: providerModels[model]
    };
  }
  throw new Error(
    `Preferred provider '${preferredProvider}' is not configured or authenticated`
  );
}
async function tryDetectProvider() {
  for (const provider of autoDetectProviders) {
    const credentials = await getProviderCredentials(provider);
    if (credentials) {
      return {
        provider,
        credentials,
        modelInfo: getDefaultModelForProvider(provider)
      };
    }
  }
  throw new Error(
    `No embedding-capable provider found. Please authenticate with OpenCode using one of: ${autoDetectProviders.join(", ")}.`
  );
}
async function getProviderCredentials(provider) {
  switch (provider) {
    case "github-copilot":
      return getGitHubCopilotCredentials();
    case "openai":
      return getOpenAICredentials();
    case "google":
      return getGoogleCredentials();
    case "ollama":
      return getOllamaCredentials();
    default:
      return null;
  }
}
function getGitHubCopilotCredentials() {
  const authData = loadOpenCodeAuth();
  const copilotAuth = authData["github-copilot"] || authData["github-copilot-enterprise"];
  if (!copilotAuth || copilotAuth.type !== "oauth") {
    return null;
  }
  const baseUrl = copilotAuth.enterpriseUrl ? `https://copilot-api.${copilotAuth.enterpriseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}` : "https://models.github.ai";
  return {
    provider: "github-copilot",
    baseUrl,
    refreshToken: copilotAuth.refresh,
    accessToken: copilotAuth.access,
    tokenExpires: copilotAuth.expires
  };
}
function getOpenAICredentials() {
  const authData = loadOpenCodeAuth();
  const openaiAuth = authData["openai"];
  if (openaiAuth?.type === "api") {
    return {
      provider: "openai",
      apiKey: openaiAuth.key,
      baseUrl: "https://api.openai.com/v1"
    };
  }
  return null;
}
function getGoogleCredentials() {
  const authData = loadOpenCodeAuth();
  const googleAuth = authData["google"] || authData["google-generative-ai"];
  if (googleAuth?.type === "api") {
    return {
      provider: "google",
      apiKey: googleAuth.key,
      baseUrl: "https://generativelanguage.googleapis.com/v1beta"
    };
  }
  return null;
}
async function getOllamaCredentials() {
  const baseUrl = process.env.OLLAMA_HOST || "http://localhost:11434";
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2e3);
    const response = await fetch(`${baseUrl}/api/tags`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      const hasEmbeddingModel = data.models?.some(
        (m) => m.name.includes("nomic-embed") || m.name.includes("mxbai-embed") || m.name.includes("all-minilm")
      );
      if (hasEmbeddingModel) {
        return {
          provider: "ollama",
          baseUrl
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}
function getProviderDisplayName(provider) {
  switch (provider) {
    case "github-copilot":
      return "GitHub Copilot";
    case "openai":
      return "OpenAI";
    case "google":
      return "Google (Gemini)";
    case "ollama":
      return "Ollama (Local)";
    case "custom":
      return "Custom (OpenAI-compatible)";
    default:
      return provider;
  }
}
function createCustomProviderInfo(config) {
  const baseUrl = config.baseUrl.replace(/\/+$/, "");
  return {
    provider: "custom",
    credentials: {
      provider: "custom",
      baseUrl,
      apiKey: config.apiKey
    },
    modelInfo: {
      provider: "custom",
      model: config.model,
      dimensions: config.dimensions,
      maxTokens: config.maxTokens ?? 8192,
      costPer1MTokens: 0,
      timeoutMs: config.timeoutMs ?? 3e4,
      maxBatchSize: config.maxBatchSize
    }
  };
}

// src/embeddings/provider.ts
var CustomProviderNonRetryableError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomProviderNonRetryableError";
  }
};
function createEmbeddingProvider(configuredProviderInfo) {
  switch (configuredProviderInfo.provider) {
    case "github-copilot":
      return new GitHubCopilotEmbeddingProvider(configuredProviderInfo.credentials, configuredProviderInfo.modelInfo);
    case "openai":
      return new OpenAIEmbeddingProvider(configuredProviderInfo.credentials, configuredProviderInfo.modelInfo);
    case "google":
      return new GoogleEmbeddingProvider(configuredProviderInfo.credentials, configuredProviderInfo.modelInfo);
    case "ollama":
      return new OllamaEmbeddingProvider(configuredProviderInfo.credentials, configuredProviderInfo.modelInfo);
    case "custom":
      return new CustomEmbeddingProvider(configuredProviderInfo.credentials, configuredProviderInfo.modelInfo);
    default: {
      const _exhaustive = configuredProviderInfo;
      throw new Error(`Unsupported embedding provider: ${_exhaustive.provider}`);
    }
  }
}
var GitHubCopilotEmbeddingProvider = class {
  constructor(credentials, modelInfo) {
    this.credentials = credentials;
    this.modelInfo = modelInfo;
  }
  getToken() {
    if (!this.credentials.refreshToken) {
      throw new Error("No OAuth token available for GitHub");
    }
    return this.credentials.refreshToken;
  }
  async embedQuery(query) {
    const result = await this.embedBatch([query]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedDocument(document) {
    const result = await this.embedBatch([document]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedBatch(texts) {
    const token = this.getToken();
    const response = await fetch(`${this.credentials.baseUrl}/inference/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify({
        model: `openai/${this.modelInfo.model}`,
        input: texts
      })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GitHub Copilot embedding API error: ${response.status} - ${error}`);
    }
    const data = await response.json();
    return {
      embeddings: data.data.map((d) => d.embedding),
      totalTokensUsed: data.usage.total_tokens
    };
  }
  getModelInfo() {
    return this.modelInfo;
  }
};
var OpenAIEmbeddingProvider = class {
  constructor(credentials, modelInfo) {
    this.credentials = credentials;
    this.modelInfo = modelInfo;
  }
  async embedQuery(query) {
    const result = await this.embedBatch([query]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedDocument(document) {
    const result = await this.embedBatch([document]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedBatch(texts) {
    const response = await fetch(`${this.credentials.baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.credentials.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: this.modelInfo.model,
        input: texts
      })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI embedding API error: ${response.status} - ${error}`);
    }
    const data = await response.json();
    return {
      embeddings: data.data.map((d) => d.embedding),
      totalTokensUsed: data.usage.total_tokens
    };
  }
  getModelInfo() {
    return this.modelInfo;
  }
};
var GoogleEmbeddingProvider = class _GoogleEmbeddingProvider {
  constructor(credentials, modelInfo) {
    this.credentials = credentials;
    this.modelInfo = modelInfo;
  }
  static BATCH_SIZE = 20;
  async embedQuery(query) {
    const taskType = this.modelInfo.taskAble ? "CODE_RETRIEVAL_QUERY" : void 0;
    const result = await this.embedWithTaskType([query], taskType);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedDocument(document) {
    const taskType = this.modelInfo.taskAble ? "RETRIEVAL_DOCUMENT" : void 0;
    const result = await this.embedWithTaskType([document], taskType);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedBatch(texts) {
    const taskType = this.modelInfo.taskAble ? "RETRIEVAL_DOCUMENT" : void 0;
    return this.embedWithTaskType(texts, taskType);
  }
  /**
   * Embeds texts using the Google embedContent API.
   * Sends multiple texts as parts in batched requests (up to BATCH_SIZE per call).
   * When taskType is provided (gemini-embedding-001), includes it in the request
   * for task-specific embedding optimization.
   */
  async embedWithTaskType(texts, taskType) {
    const batches = [];
    for (let i = 0; i < texts.length; i += _GoogleEmbeddingProvider.BATCH_SIZE) {
      batches.push(texts.slice(i, i + _GoogleEmbeddingProvider.BATCH_SIZE));
    }
    const batchResults = await Promise.all(
      batches.map(async (batch) => {
        const requests = batch.map((text) => ({
          model: `models/${this.modelInfo.model}`,
          content: {
            parts: [{ text }]
          },
          taskType,
          outputDimensionality: this.modelInfo.dimensions
        }));
        const response = await fetch(
          `${this.credentials.baseUrl}/models/${this.modelInfo.model}:batchEmbedContents?key=${this.credentials.apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ requests })
          }
        );
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Google embedding API error: ${response.status} - ${error}`);
        }
        const data = await response.json();
        return {
          embeddings: data.embeddings.map((e) => e.values),
          tokensUsed: batch.reduce((sum, text) => sum + Math.ceil(text.length / 4), 0)
        };
      })
    );
    return {
      embeddings: batchResults.flatMap((r) => r.embeddings),
      totalTokensUsed: batchResults.reduce((sum, r) => sum + r.tokensUsed, 0)
    };
  }
  getModelInfo() {
    return this.modelInfo;
  }
};
var OllamaEmbeddingProvider = class _OllamaEmbeddingProvider {
  constructor(credentials, modelInfo) {
    this.credentials = credentials;
    this.modelInfo = modelInfo;
  }
  static MIN_TRUNCATION_CHARS = 512;
  async embedQuery(query) {
    const result = await this.embedBatch([query]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedDocument(document) {
    const result = await this.embedBatch([document]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  estimateTokens(text) {
    return Math.ceil(text.length / 4);
  }
  truncateToCharLimit(text, maxChars) {
    if (text.length <= maxChars) {
      return text;
    }
    return `${text.slice(0, Math.max(0, maxChars - 17))}
... [truncated]`;
  }
  isContextLengthError(error) {
    const message = (error instanceof Error ? error.message : String(error)).toLowerCase();
    return message.includes("context length") && (message.includes("exceed") || message.includes("exceeded") || message.includes("too long")) || message.includes("input length exceeds the context length") || message.includes("context length exceeded");
  }
  buildTruncationCandidates(text) {
    const baseMaxChars = Math.max(1, this.modelInfo.maxTokens * 4);
    const candidateLimits = /* @__PURE__ */ new Set();
    const baselineLimit = text.length > baseMaxChars ? baseMaxChars : Math.max(
      _OllamaEmbeddingProvider.MIN_TRUNCATION_CHARS,
      Math.floor(text.length * 0.9)
    );
    if (baselineLimit < text.length) {
      candidateLimits.add(baselineLimit);
    }
    for (const factor of [0.75, 0.6, 0.45, 0.35, 0.25]) {
      const scaledLimit = Math.max(
        _OllamaEmbeddingProvider.MIN_TRUNCATION_CHARS,
        Math.floor(baselineLimit * factor)
      );
      if (scaledLimit < text.length) {
        candidateLimits.add(scaledLimit);
      }
    }
    candidateLimits.add(Math.min(text.length - 1, _OllamaEmbeddingProvider.MIN_TRUNCATION_CHARS));
    const candidates = [];
    const seen = /* @__PURE__ */ new Set();
    for (const limit of [...candidateLimits].sort((a, b) => b - a)) {
      if (limit <= 0 || limit >= text.length) {
        continue;
      }
      const truncated = this.truncateToCharLimit(text, limit);
      if (truncated === text || seen.has(truncated)) {
        continue;
      }
      seen.add(truncated);
      candidates.push(truncated);
    }
    return candidates;
  }
  async embedSingleWithFallback(text) {
    try {
      return await this.embedSingle(text);
    } catch (error) {
      if (!this.isContextLengthError(error)) {
        throw error;
      }
      let lastError = error;
      for (const truncated of this.buildTruncationCandidates(text)) {
        try {
          return await this.embedSingle(truncated);
        } catch (retryError) {
          if (!this.isContextLengthError(retryError)) {
            throw retryError;
          }
          lastError = retryError;
        }
      }
      throw lastError;
    }
  }
  async embedSingle(text) {
    const response = await fetch(`${this.credentials.baseUrl}/api/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: this.modelInfo.model,
        prompt: text,
        truncate: false
      })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Ollama embedding API error: ${response.status} - ${error}`);
    }
    const data = await response.json();
    return {
      embedding: data.embedding,
      tokensUsed: this.estimateTokens(text)
    };
  }
  async embedBatch(texts) {
    const results = [];
    for (const text of texts) {
      results.push(await this.embedSingleWithFallback(text));
    }
    return {
      embeddings: results.map((r) => r.embedding),
      totalTokensUsed: results.reduce((sum, r) => sum + r.tokensUsed, 0)
    };
  }
  getModelInfo() {
    return this.modelInfo;
  }
};
var CustomEmbeddingProvider = class {
  constructor(credentials, modelInfo) {
    this.credentials = credentials;
    this.modelInfo = modelInfo;
  }
  splitIntoRequestBatches(texts) {
    const maxBatchSize = this.modelInfo.maxBatchSize;
    if (!maxBatchSize || texts.length <= maxBatchSize) {
      return [texts];
    }
    const batches = [];
    for (let i = 0; i < texts.length; i += maxBatchSize) {
      batches.push(texts.slice(i, i + maxBatchSize));
    }
    return batches;
  }
  async embedRequest(texts) {
    if (texts.length === 0) {
      return {
        embeddings: [],
        totalTokensUsed: 0
      };
    }
    const headers = {
      "Content-Type": "application/json"
    };
    if (this.credentials.apiKey) {
      headers["Authorization"] = `Bearer ${this.credentials.apiKey}`;
    }
    const baseUrl = this.credentials.baseUrl ?? "";
    const timeoutMs = this.modelInfo.timeoutMs;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await fetch(`${baseUrl}/embeddings`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.modelInfo.model,
          input: texts
        }),
        signal: controller.signal
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Custom embedding API request timed out after ${timeoutMs}ms for ${baseUrl}/embeddings`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new CustomProviderNonRetryableError(`Custom embedding API error (non-retryable): ${response.status} - ${errorText}`);
      }
      throw new Error(`Custom embedding API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    if (data.data && Array.isArray(data.data)) {
      if (data.data.length > 0) {
        const actualDims = data.data[0].embedding.length;
        if (actualDims !== this.modelInfo.dimensions) {
          throw new Error(
            `Dimension mismatch: customProvider.dimensions is ${this.modelInfo.dimensions}, but the API returned vectors with ${actualDims} dimensions. Update your config to match the model's actual output dimensions.`
          );
        }
      }
      if (data.data.length !== texts.length) {
        throw new Error(
          `Embedding count mismatch: sent ${texts.length} texts but received ${data.data.length} embeddings. The custom embedding server may not support batch input.`
        );
      }
      return {
        embeddings: data.data.map((d) => d.embedding),
        // Rough estimate: ~4 chars per token. Used as fallback when the server
        // doesn't return usage.total_tokens (e.g. llama.cpp, some vLLM configs).
        totalTokensUsed: data.usage?.total_tokens ?? texts.reduce((sum, t) => sum + Math.ceil(t.length / 4), 0)
      };
    }
    throw new Error("Custom embedding API returned unexpected response format. Expected OpenAI-compatible format with data[].embedding.");
  }
  async embedQuery(query) {
    const result = await this.embedBatch([query]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedDocument(document) {
    const result = await this.embedBatch([document]);
    return {
      embedding: result.embeddings[0],
      tokensUsed: result.totalTokensUsed
    };
  }
  async embedBatch(texts) {
    const requestBatches = this.splitIntoRequestBatches(texts);
    const embeddings = [];
    let totalTokensUsed = 0;
    for (const batch of requestBatches) {
      const result = await this.embedRequest(batch);
      embeddings.push(...result.embeddings);
      totalTokensUsed += result.totalTokensUsed;
    }
    return {
      embeddings,
      totalTokensUsed
    };
  }
  getModelInfo() {
    return this.modelInfo;
  }
};

// src/rerank/index.ts
function createReranker(config) {
  if (!config.enabled) {
    return new NoOpReranker();
  }
  return new SiliconFlowReranker(config);
}
var NoOpReranker = class {
  isAvailable() {
    return false;
  }
  async rerank(_query, documents, _topN) {
    return {
      results: documents.map((_, index) => ({ index, relevanceScore: 0 }))
    };
  }
};
var SiliconFlowReranker = class {
  config;
  constructor(config) {
    this.config = config;
  }
  isAvailable() {
    return this.config.enabled && !!this.config.baseUrl && !!this.config.model;
  }
  async rerank(query, documents, topN) {
    if (documents.length === 0) {
      return { results: [] };
    }
    const headers = {
      "Content-Type": "application/json"
    };
    if (this.config.apiKey) {
      headers["Authorization"] = `Bearer ${this.config.apiKey}`;
    }
    const baseUrl = this.config.baseUrl ?? "https://api.siliconflow.cn/v1";
    const timeoutMs = this.config.timeoutMs ?? 3e4;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(`${baseUrl}/rerank`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.config.model,
          query,
          documents,
          top_n: topN ?? this.config.topN ?? 20,
          return_documents: false
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Rerank API error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      return {
        results: data.results.map((r) => ({
          index: r.index,
          relevanceScore: r.relevance_score,
          document: r.document?.text
        })),
        tokensUsed: data.meta?.tokens?.input_tokens
      };
    } catch (error) {
      clearTimeout(timeout);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Rerank API request timed out after ${timeoutMs}ms`);
      }
      throw error;
    }
  }
};

// src/utils/cost.ts
function estimateChunksFromFiles(files) {
  let totalChunks = 0;
  for (const file of files) {
    const avgChunkSize = 400;
    const chunksPerFile = Math.max(1, Math.ceil(file.size / avgChunkSize));
    totalChunks += chunksPerFile;
  }
  return totalChunks;
}
function estimateCost(estimatedTokens, modelInfo) {
  return estimatedTokens / 1e6 * modelInfo.costPer1MTokens;
}
function createCostEstimate(files, provider) {
  const filesCount = files.length;
  const totalSizeBytes = files.reduce((sum, f) => sum + f.size, 0);
  const estimatedChunks = estimateChunksFromFiles(files);
  const avgTokensPerChunk = 150;
  const estimatedTokens = estimatedChunks * avgTokensPerChunk;
  const estimatedCost = estimateCost(estimatedTokens, provider.modelInfo);
  return {
    filesCount,
    totalSizeBytes,
    estimatedChunks,
    estimatedTokens,
    estimatedCost,
    provider: getProviderDisplayName(provider.provider),
    model: provider.modelInfo.model,
    isFree: provider.modelInfo.costPer1MTokens === 0
  };
}
function formatCostEstimate(estimate) {
  const sizeFormatted = formatBytes(estimate.totalSizeBytes);
  const costFormatted = estimate.isFree ? "Free" : `~$${estimate.estimatedCost.toFixed(4)}`;
  return `
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  \u{1F4CA} Indexing Estimate                                           \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502                                                                 \u2502
\u2502  Files to index:     ${padRight(estimate.filesCount.toLocaleString() + " files", 40)}\u2502
\u2502  Total size:         ${padRight(sizeFormatted, 40)}\u2502
\u2502  Estimated chunks:   ${padRight("~" + estimate.estimatedChunks.toLocaleString() + " chunks", 40)}\u2502
\u2502  Estimated tokens:   ${padRight("~" + estimate.estimatedTokens.toLocaleString() + " tokens", 40)}\u2502
\u2502                                                                 \u2502
\u2502  Provider: ${padRight(estimate.provider, 52)}\u2502
\u2502  Model:    ${padRight(estimate.model, 52)}\u2502
\u2502  Cost:     ${padRight(costFormatted, 52)}\u2502
\u2502                                                                 \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
`;
}
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
function padRight(str, length) {
  return str.padEnd(length);
}

// src/utils/logger.ts
var LOG_LEVEL_PRIORITY = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
function createEmptyMetrics() {
  return {
    filesScanned: 0,
    filesParsed: 0,
    parseMs: 0,
    chunksProcessed: 0,
    chunksEmbedded: 0,
    chunksFromCache: 0,
    chunksRemoved: 0,
    embeddingApiCalls: 0,
    embeddingTokensUsed: 0,
    embeddingErrors: 0,
    searchCount: 0,
    searchTotalMs: 0,
    searchAvgMs: 0,
    searchLastMs: 0,
    embeddingCallMs: 0,
    vectorSearchMs: 0,
    keywordSearchMs: 0,
    fusionMs: 0,
    cacheHits: 0,
    cacheMisses: 0,
    queryCacheHits: 0,
    queryCacheSimilarHits: 0,
    queryCacheMisses: 0,
    gcRuns: 0,
    gcOrphansRemoved: 0,
    gcChunksRemoved: 0,
    gcEmbeddingsRemoved: 0
  };
}
var Logger = class {
  config;
  metrics;
  logs = [];
  maxLogs = 1e3;
  constructor(config) {
    this.config = config;
    this.metrics = createEmptyMetrics();
  }
  shouldLog(level) {
    if (!this.config.enabled) return false;
    return LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[this.config.logLevel];
  }
  log(level, category, message, data) {
    if (!this.shouldLog(level)) return;
    const entry = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      category,
      message,
      data
    };
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }
  search(level, message, data) {
    if (this.config.logSearch) {
      this.log(level, "search", message, data);
    }
  }
  embedding(level, message, data) {
    if (this.config.logEmbedding) {
      this.log(level, "embedding", message, data);
    }
  }
  cache(level, message, data) {
    if (this.config.logCache) {
      this.log(level, "cache", message, data);
    }
  }
  gc(level, message, data) {
    if (this.config.logGc) {
      this.log(level, "gc", message, data);
    }
  }
  branch(level, message, data) {
    if (this.config.logBranch) {
      this.log(level, "branch", message, data);
    }
  }
  info(message, data) {
    this.log("info", "general", message, data);
  }
  warn(message, data) {
    this.log("warn", "general", message, data);
  }
  error(message, data) {
    this.log("error", "general", message, data);
  }
  debug(message, data) {
    this.log("debug", "general", message, data);
  }
  recordIndexingStart() {
    if (!this.config.metrics) return;
    this.metrics.indexingStartTime = Date.now();
  }
  recordIndexingEnd() {
    if (!this.config.metrics) return;
    this.metrics.indexingEndTime = Date.now();
  }
  recordFilesScanned(count) {
    if (!this.config.metrics) return;
    this.metrics.filesScanned = count;
  }
  recordFilesParsed(count) {
    if (!this.config.metrics) return;
    this.metrics.filesParsed = count;
  }
  recordParseDuration(durationMs) {
    if (!this.config.metrics) return;
    this.metrics.parseMs = durationMs;
  }
  recordChunksProcessed(count) {
    if (!this.config.metrics) return;
    this.metrics.chunksProcessed += count;
  }
  recordChunksEmbedded(count) {
    if (!this.config.metrics) return;
    this.metrics.chunksEmbedded += count;
  }
  recordChunksFromCache(count) {
    if (!this.config.metrics) return;
    this.metrics.chunksFromCache += count;
  }
  recordChunksRemoved(count) {
    if (!this.config.metrics) return;
    this.metrics.chunksRemoved += count;
  }
  recordEmbeddingApiCall(tokens) {
    if (!this.config.metrics) return;
    this.metrics.embeddingApiCalls++;
    this.metrics.embeddingTokensUsed += tokens;
  }
  recordEmbeddingError() {
    if (!this.config.metrics) return;
    this.metrics.embeddingErrors++;
  }
  recordSearch(durationMs, breakdown) {
    if (!this.config.metrics) return;
    this.metrics.searchCount++;
    this.metrics.searchTotalMs += durationMs;
    this.metrics.searchLastMs = durationMs;
    this.metrics.searchAvgMs = this.metrics.searchTotalMs / this.metrics.searchCount;
    if (breakdown) {
      this.metrics.embeddingCallMs = breakdown.embeddingMs;
      this.metrics.vectorSearchMs = breakdown.vectorMs;
      this.metrics.keywordSearchMs = breakdown.keywordMs;
      this.metrics.fusionMs = breakdown.fusionMs;
    }
  }
  recordCacheHit() {
    if (!this.config.metrics) return;
    this.metrics.cacheHits++;
  }
  recordCacheMiss() {
    if (!this.config.metrics) return;
    this.metrics.cacheMisses++;
  }
  recordQueryCacheHit() {
    if (!this.config.metrics) return;
    this.metrics.queryCacheHits++;
  }
  recordQueryCacheSimilarHit() {
    if (!this.config.metrics) return;
    this.metrics.queryCacheSimilarHits++;
  }
  recordQueryCacheMiss() {
    if (!this.config.metrics) return;
    this.metrics.queryCacheMisses++;
  }
  recordGc(orphans, chunks, embeddings) {
    if (!this.config.metrics) return;
    this.metrics.gcRuns++;
    this.metrics.gcOrphansRemoved += orphans;
    this.metrics.gcChunksRemoved += chunks;
    this.metrics.gcEmbeddingsRemoved += embeddings;
  }
  getMetrics() {
    return { ...this.metrics };
  }
  getLogs(limit) {
    const logs = [...this.logs];
    if (limit) {
      return logs.slice(-limit);
    }
    return logs;
  }
  getLogsByCategory(category, limit) {
    const filtered = this.logs.filter((l) => l.category === category);
    if (limit) {
      return filtered.slice(-limit);
    }
    return filtered;
  }
  getLogsByLevel(level, limit) {
    const filtered = this.logs.filter((l) => l.level === level);
    if (limit) {
      return filtered.slice(-limit);
    }
    return filtered;
  }
  resetMetrics() {
    this.metrics = createEmptyMetrics();
  }
  clearLogs() {
    this.logs = [];
  }
  formatMetrics() {
    const m = this.metrics;
    const lines = [];
    if (m.indexingStartTime && m.indexingEndTime) {
      const duration = m.indexingEndTime - m.indexingStartTime;
      lines.push(`Indexing duration: ${(duration / 1e3).toFixed(2)}s`);
    }
    lines.push("");
    lines.push("Indexing:");
    lines.push(`  Files scanned: ${m.filesScanned}`);
    lines.push(`  Files parsed: ${m.filesParsed}`);
    lines.push(`  Chunks processed: ${m.chunksProcessed}`);
    lines.push(`  Chunks embedded: ${m.chunksEmbedded}`);
    lines.push(`  Chunks from cache: ${m.chunksFromCache}`);
    lines.push(`  Chunks removed: ${m.chunksRemoved}`);
    lines.push("");
    lines.push("Embedding API:");
    lines.push(`  API calls: ${m.embeddingApiCalls}`);
    lines.push(`  Tokens used: ${m.embeddingTokensUsed.toLocaleString()}`);
    lines.push(`  Errors: ${m.embeddingErrors}`);
    if (m.searchCount > 0) {
      lines.push("");
      lines.push("Search:");
      lines.push(`  Total searches: ${m.searchCount}`);
      lines.push(`  Average time: ${m.searchAvgMs.toFixed(2)}ms`);
      lines.push(`  Last search: ${m.searchLastMs.toFixed(2)}ms`);
      if (m.embeddingCallMs > 0) {
        lines.push(`    - Embedding: ${m.embeddingCallMs.toFixed(2)}ms`);
        lines.push(`    - Vector search: ${m.vectorSearchMs.toFixed(2)}ms`);
        lines.push(`    - Keyword search: ${m.keywordSearchMs.toFixed(2)}ms`);
        lines.push(`    - Fusion: ${m.fusionMs.toFixed(2)}ms`);
      }
    }
    const totalCacheOps = m.cacheHits + m.cacheMisses;
    if (totalCacheOps > 0) {
      lines.push("");
      lines.push("Cache:");
      lines.push(`  Hits: ${m.cacheHits}`);
      lines.push(`  Misses: ${m.cacheMisses}`);
      lines.push(`  Hit rate: ${(m.cacheHits / totalCacheOps * 100).toFixed(1)}%`);
    }
    if (m.gcRuns > 0) {
      lines.push("");
      lines.push("Garbage Collection:");
      lines.push(`  GC runs: ${m.gcRuns}`);
      lines.push(`  Orphans removed: ${m.gcOrphansRemoved}`);
      lines.push(`  Chunks removed: ${m.gcChunksRemoved}`);
      lines.push(`  Embeddings removed: ${m.gcEmbeddingsRemoved}`);
    }
    return lines.join("\n");
  }
  formatRecentLogs(limit = 20) {
    const logs = this.getLogs(limit);
    if (logs.length === 0) {
      return "No logs recorded.";
    }
    return logs.map((l) => {
      const dataStr = l.data ? ` ${JSON.stringify(l.data)}` : "";
      return `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.category}] ${l.message}${dataStr}`;
    }).join("\n");
  }
  isEnabled() {
    return this.config.enabled;
  }
  isMetricsEnabled() {
    return this.config.enabled && this.config.metrics;
  }
};
var globalLogger = null;
function initializeLogger(config) {
  globalLogger = new Logger(config);
  return globalLogger;
}

// src/native/index.ts
import * as path7 from "path";
import * as os4 from "os";
import * as module from "module";
import { fileURLToPath } from "url";
function getNativeBinding() {
  const platform2 = os4.platform();
  const arch2 = os4.arch();
  let bindingName;
  if (platform2 === "darwin" && arch2 === "arm64") {
    bindingName = "codebase-index-native.darwin-arm64.node";
  } else if (platform2 === "darwin" && arch2 === "x64") {
    bindingName = "codebase-index-native.darwin-x64.node";
  } else if (platform2 === "linux" && arch2 === "x64") {
    bindingName = "codebase-index-native.linux-x64-gnu.node";
  } else if (platform2 === "linux" && arch2 === "arm64") {
    bindingName = "codebase-index-native.linux-arm64-gnu.node";
  } else if (platform2 === "win32" && arch2 === "x64") {
    bindingName = "codebase-index-native.win32-x64-msvc.node";
  } else {
    throw new Error(`Unsupported platform: ${platform2}-${arch2}`);
  }
  let currentDir;
  let requireTarget;
  if (typeof import.meta !== "undefined" && import.meta.url) {
    currentDir = path7.dirname(fileURLToPath(import.meta.url));
    requireTarget = import.meta.url;
  } else if (typeof __dirname !== "undefined") {
    currentDir = __dirname;
    requireTarget = __filename;
  } else {
    currentDir = process.cwd();
    requireTarget = path7.join(currentDir, "index.js");
  }
  const normalizedDir = currentDir.replace(/\\/g, "/");
  const isDevMode = normalizedDir.includes("/src/native") || currentDir.includes(path7.join("src", "native"));
  const packageRoot = isDevMode ? path7.resolve(currentDir, "../..") : path7.resolve(currentDir, "..");
  const nativePath = path7.join(packageRoot, "native", bindingName);
  const require2 = module.createRequire(requireTarget);
  return require2(nativePath);
}
function createMockNativeBinding() {
  const error = new Error("Native module not available. Please rebuild with 'npm run build:native'.");
  return {
    parseFile: () => {
      throw error;
    },
    parseFiles: () => {
      throw error;
    },
    hashContent: () => {
      throw error;
    },
    hashFile: () => {
      throw error;
    },
    extractCalls: () => {
      throw error;
    },
    VectorStore: class {
      constructor() {
        throw error;
      }
    },
    InvertedIndex: class {
      constructor() {
        throw error;
      }
      serialize() {
        throw error;
      }
      deserialize() {
        throw error;
      }
    },
    Database: class {
      constructor() {
        throw error;
      }
      close() {
        throw error;
      }
    }
  };
}
var native;
try {
  native = getNativeBinding();
} catch (e) {
  console.error("[codebase-index] Failed to load native module:", e);
  native = createMockNativeBinding();
}
function parseFileAsText(filePath, content) {
  const result = native.parseFileAsText(filePath, content);
  return result.map(mapChunk);
}
function parseFiles(files) {
  const result = native.parseFiles(files);
  return result.map((f) => ({
    path: f.path,
    chunks: f.chunks.map(mapChunk),
    hash: f.hash
  }));
}
function mapChunk(c) {
  return {
    content: c.content,
    startLine: c.startLine ?? c.start_line,
    endLine: c.endLine ?? c.end_line,
    chunkType: c.chunkType ?? c.chunk_type,
    name: c.name ?? void 0,
    language: c.language
  };
}
function hashContent(content) {
  return native.hashContent(content);
}
function hashFile(filePath) {
  return native.hashFile(filePath);
}
function extractCalls(content, language) {
  return native.extractCalls(content, language);
}
var VectorStore = class {
  inner;
  dimensions;
  constructor(indexPath, dimensions) {
    this.inner = new native.VectorStore(indexPath, dimensions);
    this.dimensions = dimensions;
  }
  add(id, vector, metadata) {
    if (vector.length !== this.dimensions) {
      throw new Error(
        `Vector dimension mismatch: expected ${this.dimensions}, got ${vector.length}`
      );
    }
    this.inner.add(id, vector, JSON.stringify(metadata));
  }
  addBatch(items) {
    const ids = items.map((i) => i.id);
    const vectors = items.map((i) => {
      if (i.vector.length !== this.dimensions) {
        throw new Error(
          `Vector dimension mismatch for ${i.id}: expected ${this.dimensions}, got ${i.vector.length}`
        );
      }
      return i.vector;
    });
    const metadata = items.map((i) => JSON.stringify(i.metadata));
    this.inner.addBatch(ids, vectors, metadata);
  }
  search(queryVector, limit = 10) {
    if (queryVector.length !== this.dimensions) {
      throw new Error(
        `Query vector dimension mismatch: expected ${this.dimensions}, got ${queryVector.length}`
      );
    }
    const results = this.inner.search(queryVector, limit);
    return results.map((r) => ({
      id: r.id,
      score: r.score,
      metadata: JSON.parse(r.metadata)
    }));
  }
  remove(id) {
    return this.inner.remove(id);
  }
  save() {
    this.inner.save();
  }
  load() {
    this.inner.load();
  }
  count() {
    return this.inner.count();
  }
  clear() {
    this.inner.clear();
  }
  getDimensions() {
    return this.dimensions;
  }
  getAllKeys() {
    return this.inner.getAllKeys();
  }
  getAllMetadata() {
    const results = this.inner.getAllMetadata();
    return results.map((r) => ({
      key: r.key,
      metadata: JSON.parse(r.metadata)
    }));
  }
  getMetadata(id) {
    const result = this.inner.getMetadata(id);
    if (result === null || result === void 0) {
      return void 0;
    }
    return JSON.parse(result);
  }
  getMetadataBatch(ids) {
    const results = this.inner.getMetadataBatch(ids);
    const map = /* @__PURE__ */ new Map();
    for (const { key, metadata } of results) {
      map.set(key, JSON.parse(metadata));
    }
    return map;
  }
};
var CHARS_PER_TOKEN = 4;
var MAX_BATCH_TOKENS = 7500;
var MAX_SINGLE_CHUNK_TOKENS = 2e3;
function estimateTokens(text) {
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}
function getEmbeddingHeaderParts(chunk, filePath) {
  const parts = [];
  const fileName = filePath.split("/").pop() || filePath;
  const dirPath = filePath.split("/").slice(-3, -1).join("/");
  const langDescriptors = {
    typescript: "TypeScript",
    javascript: "JavaScript",
    python: "Python",
    rust: "Rust",
    go: "Go",
    java: "Java"
  };
  const typeDescriptors = {
    function_declaration: "function",
    function: "function",
    arrow_function: "arrow function",
    method_definition: "method",
    class_declaration: "class",
    interface_declaration: "interface",
    type_alias_declaration: "type alias",
    enum_declaration: "enum",
    export_statement: "export",
    lexical_declaration: "variable declaration",
    function_definition: "function",
    class_definition: "class",
    function_item: "function",
    impl_item: "implementation",
    struct_item: "struct",
    enum_item: "enum",
    trait_item: "trait"
  };
  const lang = langDescriptors[chunk.language] || chunk.language;
  const typeDesc = typeDescriptors[chunk.chunkType] || chunk.chunkType;
  if (chunk.name) {
    parts.push(`${lang} ${typeDesc} "${chunk.name}"`);
  } else {
    parts.push(`${lang} ${typeDesc}`);
  }
  if (dirPath) {
    parts.push(`in ${dirPath}/${fileName}`);
  } else {
    parts.push(`in ${fileName}`);
  }
  const semanticHints = extractSemanticHints(chunk.name || "", chunk.content);
  if (semanticHints.length > 0) {
    parts.push(`Purpose: ${semanticHints.join(", ")}`);
  }
  return parts;
}
function buildEmbeddingText(headerParts, content, partIndex, partCount) {
  const parts = [...headerParts];
  if (partCount && partCount > 1 && partIndex) {
    parts.push(`Part ${partIndex}/${partCount}`);
  }
  parts.push("");
  parts.push(content);
  return parts.join("\n");
}
function splitOversizedContent(content, maxContentChars) {
  if (content.length <= maxContentChars) {
    return [content];
  }
  const overlapChars = Math.max(CHARS_PER_TOKEN * 32, Math.min(Math.floor(maxContentChars * 0.15), CHARS_PER_TOKEN * 128));
  const stepChars = Math.max(1, maxContentChars - overlapChars);
  const segments = [];
  for (let start = 0; start < content.length; start += stepChars) {
    const end = Math.min(content.length, start + maxContentChars);
    segments.push(content.slice(start, end));
    if (end >= content.length) {
      break;
    }
  }
  return segments;
}
function createEmbeddingTexts(chunk, filePath, maxChunkTokens = MAX_SINGLE_CHUNK_TOKENS) {
  const headerParts = getEmbeddingHeaderParts(chunk, filePath);
  const headerLength = buildEmbeddingText(headerParts, "", 1, 9).length;
  const maxContentChars = Math.max(1, maxChunkTokens * CHARS_PER_TOKEN - headerLength);
  const segments = splitOversizedContent(chunk.content, maxContentChars);
  if (segments.length === 1) {
    return [buildEmbeddingText(headerParts, segments[0])];
  }
  return segments.map((segment, index) => buildEmbeddingText(headerParts, segment, index + 1, segments.length));
}
function createDynamicBatches(chunks, options = {}) {
  const batches = [];
  let currentBatch = [];
  let currentTokens = 0;
  const maxBatchTokens = Math.max(1, options.maxBatchTokens ?? MAX_BATCH_TOKENS);
  const maxBatchItems = Math.max(1, options.maxBatchItems ?? Number.MAX_SAFE_INTEGER);
  for (const chunk of chunks) {
    const chunkTokens = chunk.tokenCount ?? estimateTokens(chunk.text);
    if (currentBatch.length > 0 && (currentTokens + chunkTokens > maxBatchTokens || currentBatch.length >= maxBatchItems)) {
      batches.push(currentBatch);
      currentBatch = [];
      currentTokens = 0;
    }
    currentBatch.push(chunk);
    currentTokens += chunkTokens;
  }
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }
  return batches;
}
function extractSemanticHints(name, content) {
  const hints = [];
  const combined = `${name} ${content}`.toLowerCase();
  const signature = extractFunctionSignature(content);
  if (signature) {
    hints.push(signature);
  }
  const patterns = [
    [/auth|login|logout|signin|signout|credential/i, "authentication"],
    [/password|hash|bcrypt|argon/i, "password handling"],
    [/token|jwt|bearer|oauth/i, "token management"],
    [/user|account|profile|member/i, "user management"],
    [/permission|role|access|authorize/i, "authorization"],
    [/validate|verify|check|assert/i, "validation"],
    [/error|exception|throw|catch/i, "error handling"],
    [/log|debug|trace|info|warn/i, "logging"],
    [/cache|memoize|store/i, "caching"],
    [/fetch|request|response|api|http/i, "HTTP/API"],
    [/database|db|query|sql|mongo/i, "database"],
    [/file|read|write|stream|path/i, "file operations"],
    [/parse|serialize|json|xml/i, "data parsing"],
    [/encrypt|decrypt|crypto|secret|cipher|cryptographic/i, "encryption/cryptography"],
    [/test|spec|mock|stub|expect/i, "testing"],
    [/config|setting|option|env/i, "configuration"],
    [/route|endpoint|handler|controller|middleware/i, "routing/middleware"],
    [/render|component|view|template/i, "UI rendering"],
    [/state|redux|store|dispatch/i, "state management"],
    [/hook|effect|memo|callback/i, "React hooks"]
  ];
  for (const [pattern, hint] of patterns) {
    if (pattern.test(combined) && !hints.includes(hint)) {
      hints.push(hint);
    }
  }
  return hints.slice(0, 6);
}
function extractFunctionSignature(content) {
  const tsJsPatterns = [
    /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*(?:<[^>]+>)?\s*\(([^)]*)\)\s*(?::\s*([^{]+))?/,
    /(?:export\s+)?const\s+(\w+)\s*(?::\s*[^=]+)?\s*=\s*(?:async\s+)?\(([^)]*)\)\s*(?::\s*([^=>{]+))?\s*=>/,
    /(?:export\s+)?const\s+(\w+)\s*(?::\s*[^=]+)?\s*=\s*(?:async\s+)?function\s*\(([^)]*)\)/
  ];
  const pyPatterns = [
    /def\s+(\w+)\s*\(([^)]*)\)\s*(?:->\s*([^:]+))?:/,
    /async\s+def\s+(\w+)\s*\(([^)]*)\)\s*(?:->\s*([^:]+))?:/
  ];
  const goPatterns = [
    /func\s+(?:\([^)]+\)\s+)?(\w+)\s*\(([^)]*)\)\s*(?:\(([^)]+)\)|([^{\n]+))?/
  ];
  const rustPatterns = [
    /(?:pub\s+)?(?:async\s+)?fn\s+(\w+)\s*(?:<[^>]+>)?\s*\(([^)]*)\)\s*(?:->\s*([^{]+))?/
  ];
  for (const pattern of [...tsJsPatterns, ...pyPatterns, ...goPatterns, ...rustPatterns]) {
    const match = content.match(pattern);
    if (match) {
      const funcName = match[1];
      const params = match[2]?.trim() || "";
      const returnType = (match[3] || match[4])?.trim();
      const paramNames = extractParamNames(params);
      let sig = `${funcName}(${paramNames.join(", ")})`;
      if (returnType && returnType.length < 50) {
        sig += ` -> ${returnType.replace(/\s+/g, " ").trim()}`;
      }
      if (sig.length < 100) {
        return sig;
      }
    }
  }
  return null;
}
function extractParamNames(params) {
  if (!params.trim()) return [];
  const names = [];
  const parts = params.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const tsMatch = trimmed.match(/^(\w+)\s*[?:]?/);
    const pyMatch = trimmed.match(/^(\w+)\s*(?::|=)/);
    const goMatch = trimmed.match(/^(\w+)\s+\w/);
    const rustMatch = trimmed.match(/^(\w+)\s*:/);
    const match = tsMatch || pyMatch || goMatch || rustMatch;
    if (match && match[1] !== "self" && match[1] !== "this") {
      names.push(match[1]);
    }
  }
  return names.slice(0, 5);
}
function generateChunkId(filePath, chunk) {
  const hash = hashContent(`${filePath}:${chunk.startLine}:${chunk.endLine}:${chunk.content}`);
  return `chunk_${hash.slice(0, 16)}`;
}
function generateChunkHash(chunk) {
  return hashContent(chunk.content);
}
var InvertedIndex = class {
  inner;
  constructor(indexPath) {
    this.inner = new native.InvertedIndex(indexPath);
  }
  load() {
    this.inner.load();
  }
  save() {
    this.inner.save();
  }
  serialize() {
    return this.inner.serialize();
  }
  deserialize(json) {
    this.inner.deserialize(json);
  }
  addChunk(chunkId, content) {
    this.inner.addChunk(chunkId, content);
  }
  removeChunk(chunkId) {
    return this.inner.removeChunk(chunkId);
  }
  search(query, limit) {
    const results = this.inner.search(query, limit ?? 100);
    const map = /* @__PURE__ */ new Map();
    for (const r of results) {
      map.set(r.chunkId, r.score);
    }
    return map;
  }
  hasChunk(chunkId) {
    return this.inner.hasChunk(chunkId);
  }
  clear() {
    this.inner.clear();
  }
  getDocumentCount() {
    return this.inner.documentCount();
  }
};
var Database = class {
  inner;
  closed = false;
  constructor(dbPath) {
    this.inner = new native.Database(dbPath);
  }
  throwIfClosed() {
    if (this.closed) {
      throw new Error("Database is closed");
    }
  }
  close() {
    if (this.closed) {
      return;
    }
    if (typeof this.inner.close === "function") {
      this.inner.close();
    }
    this.closed = true;
  }
  embeddingExists(contentHash) {
    this.throwIfClosed();
    return this.inner.embeddingExists(contentHash);
  }
  getEmbedding(contentHash) {
    this.throwIfClosed();
    return this.inner.getEmbedding(contentHash) ?? null;
  }
  upsertEmbedding(contentHash, embedding, chunkText, model) {
    this.throwIfClosed();
    this.inner.upsertEmbedding(contentHash, embedding, chunkText, model);
  }
  upsertEmbeddingsBatch(items) {
    this.throwIfClosed();
    if (items.length === 0) return;
    this.inner.upsertEmbeddingsBatch(items);
  }
  getMissingEmbeddings(contentHashes) {
    this.throwIfClosed();
    return this.inner.getMissingEmbeddings(contentHashes);
  }
  upsertChunk(chunk) {
    this.throwIfClosed();
    this.inner.upsertChunk(chunk);
  }
  upsertChunksBatch(chunks) {
    this.throwIfClosed();
    if (chunks.length === 0) return;
    this.inner.upsertChunksBatch(chunks);
  }
  getChunk(chunkId) {
    this.throwIfClosed();
    return this.inner.getChunk(chunkId) ?? null;
  }
  getChunksByFile(filePath) {
    this.throwIfClosed();
    return this.inner.getChunksByFile(filePath);
  }
  getChunksByName(name) {
    this.throwIfClosed();
    return this.inner.getChunksByName(name);
  }
  getChunksByNameCi(name) {
    this.throwIfClosed();
    return this.inner.getChunksByNameCi(name);
  }
  deleteChunksByFile(filePath) {
    this.throwIfClosed();
    return this.inner.deleteChunksByFile(filePath);
  }
  deleteChunksByIds(chunkIds) {
    this.throwIfClosed();
    if (chunkIds.length === 0) return 0;
    return this.inner.deleteChunksByIds(chunkIds);
  }
  addChunksToBranch(branch, chunkIds) {
    this.throwIfClosed();
    this.inner.addChunksToBranch(branch, chunkIds);
  }
  addChunksToBranchBatch(branch, chunkIds) {
    this.throwIfClosed();
    if (chunkIds.length === 0) return;
    this.inner.addChunksToBranchBatch(branch, chunkIds);
  }
  clearBranch(branch) {
    this.throwIfClosed();
    return this.inner.clearBranch(branch);
  }
  deleteBranchChunksByChunkIds(chunkIds) {
    this.throwIfClosed();
    if (chunkIds.length === 0) return 0;
    return this.inner.deleteBranchChunksByChunkIds(chunkIds);
  }
  deleteBranchChunksForBranch(branch, chunkIds) {
    this.throwIfClosed();
    if (chunkIds.length === 0) return 0;
    return this.inner.deleteBranchChunksForBranch(branch, chunkIds);
  }
  getBranchChunkIds(branch) {
    this.throwIfClosed();
    return this.inner.getBranchChunkIds(branch);
  }
  getBranchDelta(branch, baseBranch) {
    this.throwIfClosed();
    return this.inner.getBranchDelta(branch, baseBranch);
  }
  getReferencedChunkIds(chunkIds) {
    this.throwIfClosed();
    if (chunkIds.length === 0) return [];
    return this.inner.getReferencedChunkIds(chunkIds);
  }
  chunkExistsOnBranch(branch, chunkId) {
    this.throwIfClosed();
    return this.inner.chunkExistsOnBranch(branch, chunkId);
  }
  getAllBranches() {
    this.throwIfClosed();
    return this.inner.getAllBranches();
  }
  getMetadata(key) {
    this.throwIfClosed();
    return this.inner.getMetadata(key) ?? null;
  }
  setMetadata(key, value) {
    this.throwIfClosed();
    this.inner.setMetadata(key, value);
  }
  deleteMetadata(key) {
    this.throwIfClosed();
    return this.inner.deleteMetadata(key);
  }
  clearAllIndexedData() {
    this.throwIfClosed();
    this.inner.clearAllIndexedData();
  }
  clearCallEdgeTargetsForSymbols(symbolIds) {
    this.throwIfClosed();
    if (symbolIds.length === 0) return 0;
    return this.inner.clearCallEdgeTargetsForSymbols(symbolIds);
  }
  gcOrphanEmbeddings() {
    this.throwIfClosed();
    return this.inner.gcOrphanEmbeddings();
  }
  gcOrphanChunks() {
    this.throwIfClosed();
    return this.inner.gcOrphanChunks();
  }
  getStats() {
    this.throwIfClosed();
    return this.inner.getStats();
  }
  // ── Symbol methods ──────────────────────────────────────────────
  upsertSymbol(symbol) {
    this.throwIfClosed();
    this.inner.upsertSymbol(symbol);
  }
  upsertSymbolsBatch(symbols) {
    this.throwIfClosed();
    if (symbols.length === 0) return;
    this.inner.upsertSymbolsBatch(symbols);
  }
  getSymbolsByFile(filePath) {
    this.throwIfClosed();
    return this.inner.getSymbolsByFile(filePath);
  }
  getSymbolByName(name, filePath) {
    this.throwIfClosed();
    return this.inner.getSymbolByName(name, filePath) ?? null;
  }
  getSymbolsByName(name) {
    this.throwIfClosed();
    return this.inner.getSymbolsByName(name);
  }
  getSymbolsByNameCi(name) {
    this.throwIfClosed();
    return this.inner.getSymbolsByNameCi(name);
  }
  deleteSymbolsByFile(filePath) {
    this.throwIfClosed();
    return this.inner.deleteSymbolsByFile(filePath);
  }
  // ── Call Edge methods ────────────────────────────────────────────
  upsertCallEdge(edge) {
    this.throwIfClosed();
    this.inner.upsertCallEdge(edge);
  }
  upsertCallEdgesBatch(edges) {
    this.throwIfClosed();
    if (edges.length === 0) return;
    this.inner.upsertCallEdgesBatch(edges);
  }
  getCallers(targetName, branch) {
    this.throwIfClosed();
    return this.inner.getCallers(targetName, branch);
  }
  getCallersWithContext(targetName, branch) {
    this.throwIfClosed();
    return this.inner.getCallersWithContext(targetName, branch);
  }
  getCallees(symbolId, branch) {
    this.throwIfClosed();
    return this.inner.getCallees(symbolId, branch);
  }
  deleteCallEdgesByFile(filePath) {
    this.throwIfClosed();
    return this.inner.deleteCallEdgesByFile(filePath);
  }
  resolveCallEdge(edgeId, toSymbolId) {
    this.throwIfClosed();
    this.inner.resolveCallEdge(edgeId, toSymbolId);
  }
  // ── Branch Symbol methods ────────────────────────────────────────
  addSymbolsToBranch(branch, symbolIds) {
    this.throwIfClosed();
    this.inner.addSymbolsToBranch(branch, symbolIds);
  }
  addSymbolsToBranchBatch(branch, symbolIds) {
    this.throwIfClosed();
    if (symbolIds.length === 0) return;
    this.inner.addSymbolsToBranchBatch(branch, symbolIds);
  }
  getBranchSymbolIds(branch) {
    this.throwIfClosed();
    return this.inner.getBranchSymbolIds(branch);
  }
  clearBranchSymbols(branch) {
    this.throwIfClosed();
    return this.inner.clearBranchSymbols(branch);
  }
  getReferencedSymbolIds(symbolIds) {
    this.throwIfClosed();
    if (symbolIds.length === 0) return [];
    return this.inner.getReferencedSymbolIds(symbolIds);
  }
  deleteBranchSymbolsBySymbolIds(symbolIds) {
    this.throwIfClosed();
    if (symbolIds.length === 0) return 0;
    return this.inner.deleteBranchSymbolsBySymbolIds(symbolIds);
  }
  deleteBranchSymbolsForBranch(branch, symbolIds) {
    this.throwIfClosed();
    if (symbolIds.length === 0) return 0;
    return this.inner.deleteBranchSymbolsForBranch(branch, symbolIds);
  }
  // ── GC methods for symbols/edges ─────────────────────────────────
  gcOrphanSymbols() {
    this.throwIfClosed();
    return this.inner.gcOrphanSymbols();
  }
  gcOrphanCallEdges() {
    this.throwIfClosed();
    return this.inner.gcOrphanCallEdges();
  }
};

// src/indexer/index.ts
var CALL_GRAPH_LANGUAGES = /* @__PURE__ */ new Set(["typescript", "tsx", "javascript", "jsx", "python", "go", "rust", "php", "apex", "zig", "gdscript"]);
var CASE_INSENSITIVE_LANGUAGES = /* @__PURE__ */ new Set(["apex"]);
var CALL_GRAPH_SYMBOL_CHUNK_TYPES = /* @__PURE__ */ new Set([
  "function_declaration",
  "function",
  "arrow_function",
  "method_definition",
  "class_declaration",
  "interface_declaration",
  "type_alias_declaration",
  "enum_declaration",
  "function_definition",
  "class_definition",
  "decorated_definition",
  "method_declaration",
  "type_declaration",
  "type_spec",
  "function_item",
  "impl_item",
  "struct_item",
  "enum_item",
  "trait_item",
  "mod_item",
  "trait_declaration",
  "trigger_declaration",
  "test_declaration",
  "struct_declaration",
  "union_declaration",
  // GDScript declarations whose names participate in the call graph.
  // `function_definition` and `class_definition` are already in the set
  // above (shared with Python/C/Bash and Python, respectively).
  "constructor_definition",
  "enum_definition",
  "signal_statement",
  "const_statement",
  "class_name_statement"
]);
function float32ArrayToBuffer(arr) {
  const float32 = new Float32Array(arr);
  return Buffer.from(float32.buffer);
}
function bufferToFloat32Array(buf) {
  return new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
}
function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return String(error);
}
function isRateLimitError(error) {
  const message = getErrorMessage(error);
  return message.includes("429") || message.toLowerCase().includes("rate limit") || message.toLowerCase().includes("too many requests");
}
function getSafeEmbeddingChunkTokenLimit(provider) {
  const providerMaxTokens = provider.modelInfo.maxTokens;
  const maxChunkTokens = Math.max(256, Math.floor(providerMaxTokens * 0.75));
  return Math.min(2e3, maxChunkTokens);
}
function getDynamicBatchOptions(provider) {
  if (provider.provider === "ollama") {
    return {
      maxBatchTokens: provider.modelInfo.maxTokens,
      maxBatchItems: 1
    };
  }
  return {};
}
function isSqliteCorruptionError(error) {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes("database disk image is malformed") || message.includes("file is not a database") || message.includes("database schema is corrupt") || message.includes("sqlite_corrupt");
}
var STARTUP_WARNING_METADATA_KEY = "index.startupWarning";
var INDEX_METADATA_VERSION = "1";
var EMBEDDING_STRATEGY_VERSION = "2";
var RANKING_TOKEN_CACHE_LIMIT = 4096;
var RANK_HYBRID_CACHE_LIMIT = 256;
function createPendingChunkStorageText(texts) {
  const primaryText = texts[0]?.text ?? "";
  if (texts.length <= 1) {
    return primaryText;
  }
  return `${primaryText}

... [split into ${texts.length} parts for embedding]`;
}
function normalizePendingChunk(rawChunk, maxChunkTokens) {
  if (!rawChunk || typeof rawChunk !== "object") {
    return null;
  }
  const chunk = rawChunk;
  if (typeof chunk.id !== "string" || typeof chunk.contentHash !== "string" || !chunk.metadata || typeof chunk.metadata !== "object") {
    return null;
  }
  const texts = Array.isArray(chunk.texts) ? chunk.texts.map((entry) => {
    if (!entry || typeof entry.text !== "string") {
      return null;
    }
    return {
      text: entry.text,
      tokenCount: typeof entry.tokenCount === "number" && Number.isFinite(entry.tokenCount) ? entry.tokenCount : estimateTokens(entry.text)
    };
  }).filter((entry) => entry !== null) : [];
  if (texts.length === 0 && typeof chunk.text === "string") {
    if (typeof chunk.content === "string" && chunk.content.length > 0 && chunk.metadata && typeof chunk.metadata === "object") {
      const metadata = chunk.metadata;
      const rebuiltChunk = {
        content: chunk.content,
        startLine: typeof metadata.startLine === "number" ? metadata.startLine : 1,
        endLine: typeof metadata.endLine === "number" ? metadata.endLine : 1,
        chunkType: typeof metadata.chunkType === "string" ? metadata.chunkType : "other",
        name: typeof metadata.name === "string" ? metadata.name : void 0,
        language: typeof metadata.language === "string" ? metadata.language : "text"
      };
      const filePath = typeof metadata.filePath === "string" ? metadata.filePath : "unknown";
      texts.push(
        ...createEmbeddingTexts(rebuiltChunk, filePath, maxChunkTokens).map((text) => ({
          text,
          tokenCount: estimateTokens(text)
        }))
      );
    } else {
      texts.push({
        text: chunk.text,
        tokenCount: estimateTokens(chunk.text)
      });
    }
  }
  if (texts.length === 0) {
    return null;
  }
  return {
    id: chunk.id,
    texts,
    storageText: typeof chunk.storageText === "string" ? chunk.storageText : createPendingChunkStorageText(texts),
    content: typeof chunk.content === "string" ? chunk.content : "",
    contentHash: chunk.contentHash,
    metadata: chunk.metadata
  };
}
function getPendingChunkFilePath(rawChunk) {
  if (!rawChunk || typeof rawChunk !== "object") {
    return null;
  }
  const chunk = rawChunk;
  if (!chunk.metadata || typeof chunk.metadata !== "object") {
    return null;
  }
  const metadata = chunk.metadata;
  return typeof metadata.filePath === "string" ? metadata.filePath : null;
}
function normalizeFailedBatch(batch, maxChunkTokens) {
  const chunks = batch.chunks.map((chunk) => normalizePendingChunk(chunk, maxChunkTokens)).filter((chunk) => chunk !== null);
  if (chunks.length === 0) {
    return null;
  }
  return {
    chunks,
    error: batch.error,
    attemptCount: batch.attemptCount,
    lastAttempt: batch.lastAttempt
  };
}
function createPendingEmbeddingRequests(chunks) {
  return chunks.flatMap(
    (chunk) => chunk.texts.map((textPart, partIndex) => ({
      chunk,
      partIndex,
      text: textPart.text,
      tokenCount: textPart.tokenCount
    }))
  );
}
function createPendingEmbeddingRequestBatches(chunks, options = {}) {
  return createDynamicBatches(createPendingEmbeddingRequests(chunks), options);
}
function getUniquePendingChunksFromRequests(requests) {
  const uniqueChunks = /* @__PURE__ */ new Map();
  for (const request of requests) {
    uniqueChunks.set(request.chunk.id, request.chunk);
  }
  return Array.from(uniqueChunks.values());
}
function coalesceFailedBatches(batches) {
  const grouped = /* @__PURE__ */ new Map();
  for (const batch of batches) {
    const key = `${batch.attemptCount}:${batch.lastAttempt}:${batch.error}`;
    const existing = grouped.get(key);
    if (!existing) {
      grouped.set(key, {
        ...batch,
        chunks: [...batch.chunks]
      });
      continue;
    }
    existing.chunks.push(...batch.chunks);
  }
  return Array.from(grouped.values());
}
function poolEmbeddingVectors(vectors, weights) {
  const firstVector = vectors[0];
  if (!firstVector) {
    return [];
  }
  const pooled = new Array(firstVector.length).fill(0);
  let totalWeight = 0;
  for (let index = 0; index < vectors.length; index++) {
    const vector = vectors[index];
    const weight = Math.max(1, weights[index] ?? 1);
    totalWeight += weight;
    for (let dimension = 0; dimension < vector.length; dimension++) {
      pooled[dimension] += vector[dimension] * weight;
    }
  }
  if (totalWeight === 0) {
    return firstVector;
  }
  return pooled.map((value) => value / totalWeight);
}
function hasAllEmbeddingParts(parts, expectedPartCount) {
  if (parts.length !== expectedPartCount) {
    return false;
  }
  for (let index = 0; index < expectedPartCount; index++) {
    if (parts[index] === void 0) {
      return false;
    }
  }
  return true;
}
function isPathWithinRoot(filePath, rootPath) {
  const normalizedFilePath = path8.resolve(filePath);
  const normalizedRoot = path8.resolve(rootPath);
  return normalizedFilePath === normalizedRoot || normalizedFilePath.startsWith(`${normalizedRoot}${path8.sep}`);
}
var rankingQueryTokenCache = /* @__PURE__ */ new Map();
var rankingNameTokenCache = /* @__PURE__ */ new Map();
var rankingPathTokenCache = /* @__PURE__ */ new Map();
var rankingTextTokenCache = /* @__PURE__ */ new Map();
var rankHybridResultsCache = /* @__PURE__ */ new WeakMap();
var STOPWORDS = /* @__PURE__ */ new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "that",
  "this",
  "into",
  "using",
  "where",
  "what",
  "when",
  "why",
  "how",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "find",
  "show",
  "get",
  "run",
  "use",
  "code",
  "function",
  "implementation",
  "retrieve",
  "results",
  "result",
  "search",
  "pipeline",
  "top",
  "in",
  "on",
  "of",
  "to",
  "by",
  "as",
  "or",
  "an",
  "a"
]);
var TEST_PATH_SEGMENTS = [
  "tests/",
  "__tests__/",
  "/test/",
  "fixtures/",
  "benchmark",
  "README",
  "ARCHITECTURE",
  "docs/"
];
var IMPLEMENTATION_EXCLUDE_PATH_SEGMENTS = [
  "tests/",
  "__tests__/",
  "/test/",
  "fixtures/",
  "benchmark",
  "readme",
  "architecture",
  "docs/",
  "examples/",
  "example/",
  ".github/",
  "/scripts/",
  "/migrations/",
  "/generated/"
];
var SOURCE_INTENT_HINTS = /* @__PURE__ */ new Set([
  "implement",
  "implementation",
  "function",
  "method",
  "class",
  "logic",
  "algorithm",
  "pipeline",
  "indexer",
  "where"
]);
var DOC_TEST_INTENT_HINTS = /* @__PURE__ */ new Set([
  "test",
  "tests",
  "fixture",
  "fixtures",
  "benchmark",
  "readme",
  "docs",
  "documentation"
]);
var DOC_INTENT_HINTS = /* @__PURE__ */ new Set([
  "readme",
  "docs",
  "documentation",
  "guide",
  "usage"
]);
function setBoundedCache(cache, key, value) {
  if (cache.size >= RANKING_TOKEN_CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    if (oldest !== void 0) {
      cache.delete(oldest);
    }
  }
  cache.set(key, value);
}
function tokenizeTextForRanking(text) {
  if (!text) {
    return /* @__PURE__ */ new Set();
  }
  const lowered = text.toLowerCase();
  const cache = rankingQueryTokenCache.get(lowered) ?? rankingTextTokenCache.get(lowered);
  if (cache) {
    return cache;
  }
  const tokens = new Set(
    lowered.replace(/[^\w\s]/g, " ").split(/\s+/).filter((token) => token.length > 1 && !STOPWORDS.has(token))
  );
  setBoundedCache(rankingQueryTokenCache, lowered, tokens);
  setBoundedCache(rankingTextTokenCache, lowered, tokens);
  return tokens;
}
function splitPathTokens(filePath) {
  const lowered = filePath.toLowerCase();
  const cache = rankingPathTokenCache.get(lowered);
  if (cache) {
    return cache;
  }
  const normalized = lowered.replace(/[^a-z0-9/._-]/g, " ").split(/[/._-]+/).filter((token) => token.length > 1);
  const tokens = new Set(normalized);
  setBoundedCache(rankingPathTokenCache, lowered, tokens);
  return tokens;
}
function splitNameTokens(name) {
  if (!name) {
    return /* @__PURE__ */ new Set();
  }
  const lowered = name.toLowerCase();
  const cache = rankingNameTokenCache.get(lowered);
  if (cache) {
    return cache;
  }
  const tokens = new Set(
    lowered.replace(/[^\w\s]/g, " ").split(/\s+/).filter((token) => token.length > 1)
  );
  setBoundedCache(rankingNameTokenCache, lowered, tokens);
  return tokens;
}
function chunkTypeBoost(chunkType) {
  switch (chunkType) {
    case "function":
    case "function_declaration":
    case "method":
    case "method_definition":
    case "class":
    case "class_declaration":
      return 0.2;
    case "interface":
    case "type":
    case "enum":
    case "struct":
    case "impl":
    case "trait":
    case "module":
      return 0.1;
    default:
      return 0;
  }
}
function isTestOrDocPath(filePath) {
  return TEST_PATH_SEGMENTS.some((segment) => filePath.includes(segment));
}
function isLikelyImplementationPath(filePath) {
  const lowered = filePath.toLowerCase();
  if (IMPLEMENTATION_EXCLUDE_PATH_SEGMENTS.some((segment) => lowered.includes(segment))) {
    return false;
  }
  const ext = lowered.split(".").pop() ?? "";
  if (["md", "mdx", "txt", "rst", "adoc", "snap", "json", "yaml", "yml", "lock"].includes(ext)) {
    return false;
  }
  return true;
}
function isDocumentationPath(filePath) {
  const lowered = filePath.toLowerCase();
  const ext = lowered.split(".").pop() ?? "";
  return lowered.includes("readme") || ["md", "mdx", "rst", "adoc", "txt"].includes(ext);
}
function classifyExternalRerankBand(candidate, preferSourcePaths, docIntent) {
  const isDocOrTest = isTestOrDocPath(candidate.metadata.filePath);
  const isDocumentation = isDocumentationPath(candidate.metadata.filePath);
  const isImplementation = isLikelyImplementationPath(candidate.metadata.filePath) && isImplementationChunkType(candidate.metadata.chunkType);
  if (preferSourcePaths) {
    if (isImplementation) return "implementation";
    if (isDocumentation) return "documentation";
    if (isDocOrTest) return "test";
    return "other";
  }
  if (docIntent) {
    if (isDocumentation) return "documentation";
    if (isImplementation) return "implementation";
    if (isDocOrTest) return "test";
    return "other";
  }
  if (isImplementation) return "implementation";
  if (isDocumentation) return "documentation";
  if (isDocOrTest) return "test";
  return "other";
}
function classifyQueryIntent(tokens) {
  const sourceIntentHits = tokens.filter((t) => SOURCE_INTENT_HINTS.has(t)).length;
  const docTestIntentHits = tokens.filter((t) => DOC_TEST_INTENT_HINTS.has(t)).length;
  if (sourceIntentHits === 0 && docTestIntentHits === 0) {
    return "neutral";
  }
  if (sourceIntentHits > docTestIntentHits) {
    return "source";
  }
  if (docTestIntentHits > sourceIntentHits) {
    return "doc_test";
  }
  return "neutral";
}
function classifyQueryIntentRaw(query) {
  const lowerQuery = query.toLowerCase();
  const docTestRawHits = Array.from(DOC_TEST_INTENT_HINTS).filter(
    (hint) => new RegExp(`\\b${hint}\\b`).test(lowerQuery)
  ).length;
  const sourceRawHits = [
    "implement",
    "implementation",
    "implements",
    "function",
    "method",
    "class",
    "logic",
    "algorithm",
    "pipeline",
    "indexer"
  ].filter((hint) => new RegExp(`\\b${hint}\\b`).test(lowerQuery)).length;
  if (docTestRawHits > sourceRawHits) {
    return "doc_test";
  }
  if (sourceRawHits > docTestRawHits && sourceRawHits > 0) {
    return "source";
  }
  const hasWhereIsPattern = /\bwhere\s+is\b/.test(lowerQuery);
  const hasIdentifierHints = extractIdentifierHints(query).length > 0;
  if (hasWhereIsPattern && hasIdentifierHints && docTestRawHits === 0) {
    return "source";
  }
  const queryTokens = Array.from(tokenizeTextForRanking(query));
  return classifyQueryIntent(queryTokens);
}
function classifyDocIntent(tokens) {
  const docHits = tokens.filter((t) => DOC_INTENT_HINTS.has(t)).length;
  const testHits = tokens.filter((t) => ["test", "tests", "fixture", "fixtures", "benchmark"].includes(t)).length;
  if (docHits > 0 && testHits === 0) return "docs";
  if (testHits > 0 && docHits === 0) return "test";
  if (testHits > 0 || docHits > 0) return "mixed";
  return "none";
}
function isImplementationChunkType(chunkType) {
  return [
    "export_statement",
    "function",
    "function_declaration",
    "method",
    "method_definition",
    "class",
    "class_declaration",
    "interface",
    "type",
    "enum",
    "module"
  ].includes(chunkType);
}
function extractIdentifierHints(query) {
  const identifiers = query.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [];
  return identifiers.filter((id) => id.length >= 3).filter((id) => {
    const lower = id.toLowerCase();
    if (STOPWORDS.has(lower)) return false;
    return /[A-Z]/.test(id) || id.includes("_") || id.endsWith("Results") || id.endsWith("Result");
  }).map((id) => id.toLowerCase());
}
function extractCodeTermHints(query) {
  const terms = query.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [];
  return terms.map((term) => term.toLowerCase()).filter((term) => term.length >= 3).filter((term) => !STOPWORDS.has(term));
}
function normalizeIdentifierVariants(identifier) {
  const lower = identifier.toLowerCase();
  const compact = lower.replace(/[^a-z0-9]/g, "");
  const snake = compact.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  const kebab = snake.replace(/_/g, "-");
  const variants = [lower, compact, snake, kebab].filter((value) => value.length > 0);
  return Array.from(new Set(variants));
}
function scoreIdentifierMatch(name, filePath, hints) {
  const nameLower = (name ?? "").toLowerCase();
  const pathLower = filePath.toLowerCase();
  let best = 0;
  for (const hint of hints) {
    const variants = normalizeIdentifierVariants(hint);
    for (const variant of variants) {
      if (nameLower === variant) {
        best = Math.max(best, 1);
      } else if (nameLower.includes(variant)) {
        best = Math.max(best, 0.8);
      } else if (pathLower.includes(variant)) {
        best = Math.max(best, 0.6);
      }
    }
  }
  return best;
}
function extractPrimaryIdentifierQueryHint(query) {
  const identifiers = extractIdentifierHints(query);
  if (identifiers.length > 0) {
    return identifiers[0] ?? null;
  }
  const codeTerms = extractCodeTermHints(query);
  const best = codeTerms.find((term) => term.length >= 6);
  return best ?? null;
}
var FILE_PATH_HINT_EXTENSIONS = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "mjs",
  "cjs",
  "mts",
  "cts",
  "py",
  "rs",
  "go",
  "java",
  "kt",
  "kts",
  "swift",
  "rb",
  "php",
  "c",
  "h",
  "cc",
  "cpp",
  "cxx",
  "hpp",
  "cs",
  "scala",
  "lua",
  "sh",
  "bash",
  "zsh",
  "json",
  "yaml",
  "yml",
  "toml"
];
var FILE_PATH_HINT_SUFFIX_REGEX = new RegExp(
  "\\s+\\bin\\s+[\"'`]?((?:\\.\\/)?(?:[A-Za-z0-9._-]+\\/)+[A-Za-z0-9._-]+\\.(?:" + FILE_PATH_HINT_EXTENSIONS.join("|") + "))[\"'`]?[\\])}>.,;!?]*\\s*$",
  "i"
);
function normalizeFilePathForHintMatch(filePath) {
  return filePath.replace(/\\/g, "/").toLowerCase().replace(/^\.\//, "");
}
function pathMatchesHint(filePath, hint) {
  const normalizedPath = normalizeFilePathForHintMatch(filePath);
  const normalizedHint = normalizeFilePathForHintMatch(hint);
  return normalizedPath.endsWith(normalizedHint) || normalizedPath.includes(`/${normalizedHint}`) || normalizedPath.includes(normalizedHint);
}
function extractFilePathHint(query) {
  const match = query.match(FILE_PATH_HINT_SUFFIX_REGEX);
  const rawPath = match?.[1];
  if (!rawPath) {
    return null;
  }
  return rawPath.replace(/^\.\//, "");
}
function stripFilePathHint(query) {
  const stripped = query.replace(FILE_PATH_HINT_SUFFIX_REGEX, "").trim();
  return stripped.length > 0 ? stripped : query;
}
function buildDeterministicIdentifierPass(query, candidates, limit, prioritizeSourcePaths = classifyQueryIntentRaw(query) === "source") {
  if (!prioritizeSourcePaths) {
    return [];
  }
  const primary = extractPrimaryIdentifierQueryHint(query);
  if (!primary) {
    return [];
  }
  const filePathHint = extractFilePathHint(query);
  const primaryVariants = normalizeIdentifierVariants(primary);
  const hints = [primary, ...extractIdentifierHints(query), ...extractCodeTermHints(query)].map((value) => value.toLowerCase()).filter((value, idx, arr) => value.length >= 3 && arr.indexOf(value) === idx).slice(0, 8);
  const deterministic = candidates.filter(
    (candidate) => isLikelyImplementationPath(candidate.metadata.filePath) && isImplementationChunkType(candidate.metadata.chunkType)
  ).map((candidate) => {
    const nameLower = (candidate.metadata.name ?? "").toLowerCase();
    const pathLower = candidate.metadata.filePath.toLowerCase();
    let maxMatch = 0;
    const nameMatchesPrimary = primaryVariants.some(
      (variant) => nameLower === variant || nameLower.replace(/[^a-z0-9]/g, "") === variant.replace(/[^a-z0-9]/g, "")
    );
    const pathMatchesFileHint = filePathHint ? pathMatchesHint(candidate.metadata.filePath, filePathHint) : false;
    for (const hint of hints) {
      const variants = normalizeIdentifierVariants(hint);
      for (const variant of variants) {
        if (nameLower === variant) {
          maxMatch = Math.max(maxMatch, 1);
        } else if (nameLower.includes(variant)) {
          maxMatch = Math.max(maxMatch, 0.85);
        } else if (pathLower.includes(variant)) {
          maxMatch = Math.max(maxMatch, 0.7);
        }
      }
    }
    if (pathMatchesFileHint && nameMatchesPrimary) {
      maxMatch = Math.max(maxMatch, 1);
    }
    return {
      candidate,
      maxMatch,
      pathMatchesFileHint,
      nameMatchesPrimary
    };
  }).filter((entry) => entry.maxMatch >= 0.7).sort((a, b) => {
    const aAnchored = a.pathMatchesFileHint && a.nameMatchesPrimary ? 1 : 0;
    const bAnchored = b.pathMatchesFileHint && b.nameMatchesPrimary ? 1 : 0;
    if (aAnchored !== bAnchored) return bAnchored - aAnchored;
    if (b.maxMatch !== a.maxMatch) return b.maxMatch - a.maxMatch;
    if (b.candidate.score !== a.candidate.score) return b.candidate.score - a.candidate.score;
    return a.candidate.id.localeCompare(b.candidate.id);
  }).slice(0, Math.max(limit * 2, 12));
  return deterministic.map((entry) => ({
    id: entry.candidate.id,
    score: entry.pathMatchesFileHint && entry.nameMatchesPrimary ? 0.995 : Math.min(1, 0.9 + entry.maxMatch * 0.09),
    metadata: entry.candidate.metadata
  }));
}
function fuseResultsWeighted(semanticResults, keywordResults, keywordWeight, limit) {
  const semanticWeight = 1 - keywordWeight;
  const fusedScores = /* @__PURE__ */ new Map();
  for (const r of semanticResults) {
    fusedScores.set(r.id, {
      score: r.score * semanticWeight,
      metadata: r.metadata
    });
  }
  for (const r of keywordResults) {
    const existing = fusedScores.get(r.id);
    if (existing) {
      existing.score += r.score * keywordWeight;
    } else {
      fusedScores.set(r.id, {
        score: r.score * keywordWeight,
        metadata: r.metadata
      });
    }
  }
  const results = Array.from(fusedScores.entries()).map(([id, data]) => ({
    id,
    score: data.score,
    metadata: data.metadata
  }));
  results.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return results.slice(0, limit);
}
function fuseResultsRrf(semanticResults, keywordResults, rrfK, limit) {
  const maxPossibleRaw = 2 / (rrfK + 1);
  const rankByIdSemantic = /* @__PURE__ */ new Map();
  const rankByIdKeyword = /* @__PURE__ */ new Map();
  const metadataById = /* @__PURE__ */ new Map();
  semanticResults.forEach((result, index) => {
    rankByIdSemantic.set(result.id, index + 1);
    metadataById.set(result.id, result.metadata);
  });
  keywordResults.forEach((result, index) => {
    rankByIdKeyword.set(result.id, index + 1);
    if (!metadataById.has(result.id)) {
      metadataById.set(result.id, result.metadata);
    }
  });
  const allIds = /* @__PURE__ */ new Set([...rankByIdSemantic.keys(), ...rankByIdKeyword.keys()]);
  const fused = [];
  for (const id of allIds) {
    const semanticRank = rankByIdSemantic.get(id);
    const keywordRank = rankByIdKeyword.get(id);
    const semanticScore = semanticRank ? 1 / (rrfK + semanticRank) : 0;
    const keywordScore = keywordRank ? 1 / (rrfK + keywordRank) : 0;
    const metadata = metadataById.get(id);
    if (!metadata) continue;
    fused.push({
      id,
      score: maxPossibleRaw > 0 ? (semanticScore + keywordScore) / maxPossibleRaw : 0,
      metadata
    });
  }
  fused.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return fused.slice(0, limit);
}
function rerankResults(query, candidates, rerankTopN, options) {
  if (rerankTopN <= 0 || candidates.length <= 1) {
    return candidates;
  }
  const topN = Math.min(rerankTopN, candidates.length);
  const queryTokens = tokenizeTextForRanking(query);
  if (queryTokens.size === 0) {
    return candidates;
  }
  const queryTokenList = Array.from(queryTokens);
  const docIntent = classifyDocIntent(queryTokenList);
  const preferSourcePaths = options?.prioritizeSourcePaths ?? classifyQueryIntentRaw(query) === "source";
  const identifierHints = extractIdentifierHints(query);
  const head = candidates.slice(0, topN).map((candidate, idx) => {
    const pathTokens = splitPathTokens(candidate.metadata.filePath);
    const nameTokens = splitNameTokens(candidate.metadata.name ?? "");
    const chunkTypeTokens = tokenizeTextForRanking(candidate.metadata.chunkType);
    let exactOrPrefixNameHits = 0;
    let pathOverlap = 0;
    let chunkTypeHits = 0;
    for (const token of queryTokenList) {
      if (nameTokens.has(token)) {
        exactOrPrefixNameHits += 1;
      } else {
        for (const nameToken of nameTokens) {
          if (nameToken.startsWith(token) || token.startsWith(nameToken)) {
            exactOrPrefixNameHits += 1;
            break;
          }
        }
      }
      if (pathTokens.has(token)) {
        pathOverlap += 1;
      }
      if (chunkTypeTokens.has(token)) {
        chunkTypeHits += 1;
      }
    }
    const likelyTestOrDoc = isTestOrDocPath(candidate.metadata.filePath);
    const lowerPath = candidate.metadata.filePath.toLowerCase();
    const lowerName = (candidate.metadata.name ?? "").toLowerCase();
    const hasIdentifierMatch = identifierHints.some((id) => lowerPath.includes(id) || lowerName.includes(id));
    const implementationPathBoost = preferSourcePaths && isLikelyImplementationPath(candidate.metadata.filePath) ? 0.08 : 0;
    const isReadmePath = candidate.metadata.filePath.toLowerCase().includes("readme");
    const testDocPenalty = preferSourcePaths && likelyTestOrDoc ? 0.12 : 0;
    const readmeDocBoost = !preferSourcePaths && isReadmePath ? 0.08 : 0;
    const identifierBoost = hasIdentifierMatch ? 0.12 : 0;
    const tokenCoverage = queryTokenList.length > 0 ? (exactOrPrefixNameHits + pathOverlap + chunkTypeHits) / queryTokenList.length : 0;
    const coverageBoost = Math.min(0.12, tokenCoverage * 0.06);
    const deterministicBoost = exactOrPrefixNameHits * 0.08 + pathOverlap * 0.03 + chunkTypeHits * 0.02 + coverageBoost + identifierBoost + implementationPathBoost - testDocPenalty + readmeDocBoost + chunkTypeBoost(candidate.metadata.chunkType);
    return {
      candidate,
      boostedScore: candidate.score + deterministicBoost,
      originalIndex: idx,
      hasIdentifierMatch,
      implementationChunk: isImplementationChunkType(candidate.metadata.chunkType),
      isLikelyImplementationPath: isLikelyImplementationPath(candidate.metadata.filePath),
      isTestOrDocPath: likelyTestOrDoc,
      isReadmePath
    };
  });
  head.sort((a, b) => {
    if (b.boostedScore !== a.boostedScore) return b.boostedScore - a.boostedScore;
    if (b.candidate.score !== a.candidate.score) return b.candidate.score - a.candidate.score;
    if (a.originalIndex !== b.originalIndex) return a.originalIndex - b.originalIndex;
    return a.candidate.id.localeCompare(b.candidate.id);
  });
  if (preferSourcePaths) {
    head.sort((a, b) => {
      const aId = a.hasIdentifierMatch ? 1 : 0;
      const bId = b.hasIdentifierMatch ? 1 : 0;
      if (aId !== bId) return bId - aId;
      const aImpl = a.implementationChunk ? 1 : 0;
      const bImpl = b.implementationChunk ? 1 : 0;
      if (aImpl !== bImpl) return bImpl - aImpl;
      const aImplementationPath = a.isLikelyImplementationPath ? 1 : 0;
      const bImplementationPath = b.isLikelyImplementationPath ? 1 : 0;
      if (aImplementationPath !== bImplementationPath) return bImplementationPath - aImplementationPath;
      const aTestDoc = a.isTestOrDocPath ? 1 : 0;
      const bTestDoc = b.isTestOrDocPath ? 1 : 0;
      if (aTestDoc !== bTestDoc) return aTestDoc - bTestDoc;
      return 0;
    });
  } else if (docIntent === "docs") {
    head.sort((a, b) => {
      const aReadme = a.isReadmePath ? 1 : 0;
      const bReadme = b.isReadmePath ? 1 : 0;
      if (aReadme !== bReadme) return bReadme - aReadme;
      return 0;
    });
  }
  const shouldDiversify = !(preferSourcePaths && identifierHints.length > 0);
  const diversifiedHead = diversifyEntriesByFileAndSymbol(head, (entry) => entry.candidate, shouldDiversify);
  const tail = candidates.slice(topN);
  return [...diversifiedHead.map((entry) => entry.candidate), ...tail];
}
function diversifyEntriesByFileAndSymbol(entries, getCandidate, enabled) {
  if (!enabled || entries.length <= 2) {
    return entries;
  }
  const groups = /* @__PURE__ */ new Map();
  const groupOrder = [];
  for (const entry of entries) {
    const candidate = getCandidate(entry);
    const filePath = candidate.metadata.filePath;
    if (!groups.has(filePath)) {
      groups.set(filePath, []);
      groupOrder.push(filePath);
    }
    groups.get(filePath)?.push(entry);
  }
  const diversifiedGroups = groupOrder.map((filePath) => {
    const group = groups.get(filePath) ?? [];
    return diversifyGroupBySymbol(group, getCandidate);
  });
  const result = [];
  let added = true;
  let round = 0;
  while (added) {
    added = false;
    for (const group of diversifiedGroups) {
      const entry = group[round];
      if (entry !== void 0) {
        result.push(entry);
        added = true;
      }
    }
    round += 1;
  }
  return result;
}
function diversifyCandidatesByFile(candidates, enabled) {
  return diversifyEntriesByFileAndSymbol(candidates, (candidate) => candidate, enabled);
}
function diversifyGroupBySymbol(entries, getCandidate) {
  if (entries.length <= 2) {
    return entries;
  }
  const seenKeys = /* @__PURE__ */ new Set();
  const primary = [];
  const remainder = [];
  for (const entry of entries) {
    const key = buildDiversityKey(getCandidate(entry).metadata);
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      primary.push(entry);
    } else {
      remainder.push(entry);
    }
  }
  return [...primary, ...remainder];
}
function buildDiversityKey(metadata) {
  const normalizedPath = metadata.filePath.toLowerCase();
  const normalizedName = (metadata.name ?? "").trim().toLowerCase();
  if (normalizedName.length > 0) {
    return `${normalizedPath}#${normalizedName}`;
  }
  return normalizedPath;
}
function rankHybridResults(query, semanticResults, keywordResults, options) {
  const prioritizeSourcePaths = options.prioritizeSourcePaths ?? classifyQueryIntentRaw(query) === "source";
  const cacheKey = `${query}${options.fusionStrategy}|${options.rrfK}|${options.hybridWeight}|${options.rerankTopN}|${options.limit}|${prioritizeSourcePaths ? 1 : 0}`;
  let byKeyword = rankHybridResultsCache.get(semanticResults);
  if (!byKeyword) {
    byKeyword = /* @__PURE__ */ new WeakMap();
    rankHybridResultsCache.set(semanticResults, byKeyword);
  }
  let bucket = byKeyword.get(keywordResults);
  if (!bucket) {
    bucket = /* @__PURE__ */ new Map();
    byKeyword.set(keywordResults, bucket);
  } else {
    const cached = bucket.get(cacheKey);
    if (cached) {
      return cached;
    }
  }
  const overfetchLimit = Math.max(options.limit * 4, options.limit);
  const fused = options.fusionStrategy === "rrf" ? fuseResultsRrf(semanticResults, keywordResults, options.rrfK, overfetchLimit) : fuseResultsWeighted(semanticResults, keywordResults, options.hybridWeight, overfetchLimit);
  const rerankPoolLimit = Math.max(overfetchLimit, options.rerankTopN * 3, options.limit * 6);
  const rerankPool = fused.slice(0, rerankPoolLimit);
  const ranked = rerankResults(query, rerankPool, options.rerankTopN, {
    prioritizeSourcePaths
  });
  if (bucket.size >= RANK_HYBRID_CACHE_LIMIT) {
    const oldest = bucket.keys().next().value;
    if (oldest !== void 0) {
      bucket.delete(oldest);
    }
  }
  bucket.set(cacheKey, ranked);
  return ranked;
}
function rankSemanticOnlyResults(query, semanticResults, options) {
  const overfetchLimit = Math.max(options.limit * 4, options.limit);
  const bounded = semanticResults.slice(0, overfetchLimit);
  return rerankResults(query, bounded, options.rerankTopN, {
    prioritizeSourcePaths: options.prioritizeSourcePaths ?? false
  });
}
function promoteIdentifierMatches(query, combined, semanticCandidates, keywordCandidates, database, branchChunkIds, prioritizeSourcePaths = classifyQueryIntentRaw(query) === "source") {
  if (combined.length === 0) {
    return combined;
  }
  if (!prioritizeSourcePaths) {
    return combined;
  }
  const identifierHints = extractIdentifierHints(query);
  if (identifierHints.length === 0) {
    return combined;
  }
  const combinedById = new Map(combined.map((candidate) => [candidate.id, candidate]));
  const candidateUnion = /* @__PURE__ */ new Map();
  for (const candidate of semanticCandidates) {
    candidateUnion.set(candidate.id, candidate);
  }
  for (const candidate of keywordCandidates) {
    if (!candidateUnion.has(candidate.id)) {
      candidateUnion.set(candidate.id, candidate);
    }
  }
  if (database) {
    for (const identifier of identifierHints) {
      const symbols = database.getSymbolsByName(identifier);
      for (const symbol of symbols) {
        const chunks = database.getChunksByFile(symbol.filePath);
        for (const chunk of chunks) {
          if (branchChunkIds && !branchChunkIds.has(chunk.chunkId)) {
            continue;
          }
          const chunkType = chunk.nodeType ?? "other";
          if (!isImplementationChunkType(chunkType)) {
            continue;
          }
          if (!isLikelyImplementationPath(chunk.filePath)) {
            continue;
          }
          if (chunk.startLine > symbol.startLine || chunk.endLine < symbol.endLine) {
            continue;
          }
          const existing = combinedById.get(chunk.chunkId) ?? candidateUnion.get(chunk.chunkId);
          const metadata = existing?.metadata ?? {
            filePath: chunk.filePath,
            startLine: chunk.startLine,
            endLine: chunk.endLine,
            chunkType,
            name: chunk.name ?? void 0,
            language: chunk.language,
            hash: chunk.contentHash
          };
          const baselineScore = existing?.score ?? 0.5;
          candidateUnion.set(chunk.chunkId, {
            id: chunk.chunkId,
            score: Math.min(1, baselineScore + 0.5),
            metadata
          });
        }
      }
    }
  }
  const promoted = [];
  for (const candidate of candidateUnion.values()) {
    const filePathLower = candidate.metadata.filePath.toLowerCase();
    const nameLower = (candidate.metadata.name ?? "").toLowerCase();
    const exactIdentifierMatch = identifierHints.some((hint) => nameLower === hint);
    const hasIdentifierMatch = exactIdentifierMatch || identifierHints.some(
      (hint) => nameLower.includes(hint) || filePathLower.includes(hint)
    );
    if (!hasIdentifierMatch) {
      continue;
    }
    if (!isImplementationChunkType(candidate.metadata.chunkType)) {
      continue;
    }
    if (!isLikelyImplementationPath(candidate.metadata.filePath)) {
      continue;
    }
    const existing = combinedById.get(candidate.id) ?? candidate;
    const rescueBoost = exactIdentifierMatch ? 0.45 : 0.25;
    const boostedScore = Math.min(1, Math.max(existing.score, candidate.score) + rescueBoost);
    promoted.push({
      id: existing.id,
      score: boostedScore,
      metadata: existing.metadata
    });
  }
  if (promoted.length === 0) {
    return combined;
  }
  promoted.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const promotedIds = new Set(promoted.map((candidate) => candidate.id));
  const remainder = combined.filter((candidate) => !promotedIds.has(candidate.id));
  return [...promoted, ...remainder];
}
function buildSymbolDefinitionLane(query, database, branchChunkIds, limit, fallbackCandidates, prioritizeSourcePaths = classifyQueryIntentRaw(query) === "source") {
  if (!prioritizeSourcePaths) {
    return [];
  }
  const identifierHints = extractIdentifierHints(query);
  const codeTermHints = extractCodeTermHints(query);
  if (identifierHints.length === 0 && codeTermHints.length === 0) {
    return [];
  }
  const symbolCandidates = /* @__PURE__ */ new Map();
  const filePathHint = extractFilePathHint(query);
  const primaryHint = extractPrimaryIdentifierQueryHint(query);
  const upsertChunkCandidate = (chunk, identifier, normalizedIdentifier, baseScore) => {
    if (branchChunkIds && !branchChunkIds.has(chunk.chunkId)) {
      return;
    }
    const chunkType = chunk.nodeType ?? "other";
    if (!isImplementationChunkType(chunkType)) {
      return;
    }
    if (!isLikelyImplementationPath(chunk.filePath)) {
      return;
    }
    const nameLower = (chunk.name ?? "").toLowerCase();
    const exactName = nameLower === identifier || nameLower.replace(/_/g, "") === normalizedIdentifier;
    const base = baseScore ?? (exactName ? 0.99 : 0.88);
    const existing = symbolCandidates.get(chunk.chunkId);
    if (!existing || base > existing.score) {
      symbolCandidates.set(chunk.chunkId, {
        id: chunk.chunkId,
        score: base,
        metadata: {
          filePath: chunk.filePath,
          startLine: chunk.startLine,
          endLine: chunk.endLine,
          chunkType,
          name: chunk.name ?? void 0,
          language: chunk.language,
          hash: chunk.contentHash
        }
      });
    }
  };
  const normalizedHints = identifierHints.flatMap((hint) => [
    hint,
    hint.replace(/_/g, ""),
    hint.replace(/_/g, "-")
  ]).filter((hint, idx, arr) => hint.length >= 3 && arr.indexOf(hint) === idx).slice(0, 6);
  for (const identifier of normalizedHints) {
    const symbols = [
      ...database.getSymbolsByName(identifier),
      ...database.getSymbolsByNameCi(identifier)
    ];
    const chunksByName = [
      ...database.getChunksByName(identifier),
      ...database.getChunksByNameCi(identifier)
    ];
    const normalizedIdentifier = identifier.replace(/_/g, "");
    const dedupSymbols = /* @__PURE__ */ new Map();
    for (const symbol of symbols) {
      dedupSymbols.set(symbol.id, symbol);
    }
    for (const symbol of dedupSymbols.values()) {
      const chunks = database.getChunksByFile(symbol.filePath);
      for (const chunk of chunks) {
        if (chunk.startLine > symbol.startLine || chunk.endLine < symbol.endLine) {
          continue;
        }
        upsertChunkCandidate(chunk, identifier, normalizedIdentifier);
      }
    }
    const dedupChunksByName = /* @__PURE__ */ new Map();
    for (const chunk of chunksByName) {
      dedupChunksByName.set(chunk.chunkId, chunk);
    }
    for (const chunk of dedupChunksByName.values()) {
      upsertChunkCandidate(chunk, identifier, normalizedIdentifier);
    }
  }
  if (filePathHint && primaryHint) {
    const primaryChunks = [
      ...database.getChunksByName(primaryHint),
      ...database.getChunksByNameCi(primaryHint)
    ];
    const dedupPrimaryChunks = /* @__PURE__ */ new Map();
    for (const chunk of primaryChunks) {
      dedupPrimaryChunks.set(chunk.chunkId, chunk);
    }
    for (const chunk of dedupPrimaryChunks.values()) {
      if (!pathMatchesHint(chunk.filePath, filePathHint)) {
        continue;
      }
      const normalizedPrimary = primaryHint.replace(/_/g, "");
      upsertChunkCandidate(chunk, primaryHint, normalizedPrimary, 1);
    }
  }
  const ranked = Array.from(symbolCandidates.values()).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  if (ranked.length === 0) {
    const implementationFallback = fallbackCandidates.filter(
      (candidate) => isImplementationChunkType(candidate.metadata.chunkType) && isLikelyImplementationPath(candidate.metadata.filePath)
    );
    for (const candidate of implementationFallback) {
      const nameLower = (candidate.metadata.name ?? "").toLowerCase();
      const pathLower = candidate.metadata.filePath.toLowerCase();
      const exactHintMatch = normalizedHints.some((hint) => nameLower === hint || nameLower.replace(/_/g, "") === hint.replace(/_/g, ""));
      const tokenizedName = tokenizeTextForRanking(nameLower);
      const tokenHits = codeTermHints.filter((term) => tokenizedName.has(term) || pathLower.includes(term)).length;
      if (!exactHintMatch && tokenHits === 0) {
        continue;
      }
      const laneScore = exactHintMatch ? Math.min(1, Math.max(candidate.score, 0.97)) : Math.min(0.95, Math.max(candidate.score, 0.82 + tokenHits * 0.03));
      symbolCandidates.set(candidate.id, {
        id: candidate.id,
        score: laneScore,
        metadata: candidate.metadata
      });
    }
    if (symbolCandidates.size === 0) {
      const queryTokenSet = tokenizeTextForRanking(query);
      const rankedFallback = implementationFallback.map((candidate) => {
        const nameTokens = tokenizeTextForRanking(candidate.metadata.name ?? "");
        const pathTokens = splitPathTokens(candidate.metadata.filePath);
        let overlap = 0;
        for (const token of queryTokenSet) {
          if (nameTokens.has(token) || pathTokens.has(token)) {
            overlap += 1;
          }
        }
        const overlapScore = queryTokenSet.size > 0 ? overlap / queryTokenSet.size : 0;
        return {
          candidate,
          overlapScore
        };
      }).filter((entry) => entry.overlapScore > 0).sort((a, b) => b.overlapScore - a.overlapScore || b.candidate.score - a.candidate.score).slice(0, Math.max(limit, 3));
      for (const entry of rankedFallback) {
        symbolCandidates.set(entry.candidate.id, {
          id: entry.candidate.id,
          score: Math.min(0.94, Math.max(entry.candidate.score, 0.8 + entry.overlapScore * 0.1)),
          metadata: entry.candidate.metadata
        });
      }
    }
  }
  const withFallback = Array.from(symbolCandidates.values()).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return withFallback.slice(0, Math.max(limit * 2, limit));
}
function buildIdentifierDefinitionLane(query, candidates, limit, prioritizeSourcePaths = classifyQueryIntentRaw(query) === "source") {
  if (!prioritizeSourcePaths) {
    return [];
  }
  const primaryHint = extractPrimaryIdentifierQueryHint(query);
  if (!primaryHint) {
    return [];
  }
  const hints = [primaryHint, ...extractIdentifierHints(query), ...extractCodeTermHints(query)].slice(0, 8);
  const scored = candidates.filter(
    (candidate) => isLikelyImplementationPath(candidate.metadata.filePath) && isImplementationChunkType(candidate.metadata.chunkType)
  ).map((candidate) => {
    const matchScore = scoreIdentifierMatch(candidate.metadata.name, candidate.metadata.filePath, hints);
    return {
      candidate,
      matchScore
    };
  }).filter((entry) => entry.matchScore > 0).sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    if (b.candidate.score !== a.candidate.score) return b.candidate.score - a.candidate.score;
    return a.candidate.id.localeCompare(b.candidate.id);
  }).slice(0, Math.max(limit * 2, 10));
  return scored.map((entry) => ({
    id: entry.candidate.id,
    score: Math.min(1, 0.9 + entry.matchScore * 0.09),
    metadata: entry.candidate.metadata
  }));
}
function mergeTieredResults(symbolLane, hybridLane, limit) {
  if (symbolLane.length === 0) {
    return hybridLane.slice(0, limit);
  }
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const candidate of symbolLane) {
    if (seen.has(candidate.id)) continue;
    out.push(candidate);
    seen.add(candidate.id);
    if (out.length >= limit) return out;
  }
  for (const candidate of hybridLane) {
    if (seen.has(candidate.id)) continue;
    out.push(candidate);
    seen.add(candidate.id);
    if (out.length >= limit) return out;
  }
  return out;
}
function matchesSearchFilters(candidate, options, minScore) {
  if (candidate.score < minScore) return false;
  if (options?.fileType) {
    const ext = candidate.metadata.filePath.split(".").pop()?.toLowerCase();
    if (ext !== options.fileType.toLowerCase().replace(/^\./, "")) return false;
  }
  if (options?.directory) {
    const normalizedDir = options.directory.replace(/^\/|\/$/g, "");
    if (!candidate.metadata.filePath.includes(`/${normalizedDir}/`) && !candidate.metadata.filePath.includes(`${normalizedDir}/`)) return false;
  }
  if (options?.chunkType && candidate.metadata.chunkType !== options.chunkType) {
    return false;
  }
  return true;
}
function unionCandidates(semanticCandidates, keywordCandidates) {
  const byId = /* @__PURE__ */ new Map();
  for (const candidate of semanticCandidates) {
    byId.set(candidate.id, candidate);
  }
  for (const candidate of keywordCandidates) {
    const existing = byId.get(candidate.id);
    if (!existing || candidate.score > existing.score) {
      byId.set(candidate.id, candidate);
    }
  }
  return Array.from(byId.values());
}
var Indexer = class {
  config;
  projectRoot;
  indexPath;
  store = null;
  invertedIndex = null;
  database = null;
  provider = null;
  configuredProviderInfo = null;
  reranker = null;
  fileHashCache = /* @__PURE__ */ new Map();
  fileHashCachePath = "";
  failedBatchesPath = "";
  currentBranch = "default";
  baseBranch = "main";
  logger;
  queryEmbeddingCache = /* @__PURE__ */ new Map();
  maxQueryCacheSize = 100;
  queryCacheTtlMs = 5 * 60 * 1e3;
  querySimilarityThreshold = 0.85;
  indexCompatibility = null;
  indexingLockPath = "";
  constructor(projectRoot, config) {
    this.projectRoot = projectRoot;
    this.config = config;
    this.indexPath = this.getIndexPath();
    this.fileHashCachePath = path8.join(this.indexPath, "file-hashes.json");
    this.failedBatchesPath = path8.join(this.indexPath, "failed-batches.json");
    this.indexingLockPath = path8.join(this.indexPath, "indexing.lock");
    this.logger = initializeLogger(config.debug);
  }
  getIndexPath() {
    return resolveProjectIndexPath(this.projectRoot, this.config.scope);
  }
  loadFileHashCache() {
    try {
      if (existsSync6(this.fileHashCachePath)) {
        const data = readFileSync5(this.fileHashCachePath, "utf-8");
        const parsed = JSON.parse(data);
        this.fileHashCache = new Map(Object.entries(parsed));
      }
    } catch {
      this.fileHashCache = /* @__PURE__ */ new Map();
    }
  }
  saveFileHashCache() {
    const obj = {};
    for (const [k, v] of this.fileHashCache) {
      obj[k] = v;
    }
    this.atomicWriteSync(this.fileHashCachePath, JSON.stringify(obj));
  }
  atomicWriteSync(targetPath, data) {
    const tempPath = `${targetPath}.tmp`;
    writeFileSync2(tempPath, data);
    renameSync(tempPath, targetPath);
  }
  getScopedRoots() {
    const roots = /* @__PURE__ */ new Set([path8.resolve(this.projectRoot)]);
    for (const kbRoot of this.config.knowledgeBases) {
      roots.add(path8.resolve(this.projectRoot, kbRoot));
    }
    return Array.from(roots);
  }
  getBranchCatalogKey() {
    const branchName = this.currentBranch || "default";
    if (this.config.scope !== "global") {
      return branchName;
    }
    const projectHash = hashContent(path8.resolve(this.projectRoot)).slice(0, 16);
    return `${projectHash}:${branchName}`;
  }
  getLegacyBranchCatalogKey() {
    return this.currentBranch || "default";
  }
  getLegacyMigrationMetadataKey() {
    const projectHash = hashContent(path8.resolve(this.projectRoot)).slice(0, 16);
    return `index.globalBranchMigration.${projectHash}`;
  }
  getProjectEmbeddingStrategyMetadataKey() {
    const projectHash = hashContent(path8.resolve(this.projectRoot)).slice(0, 16);
    return `index.embeddingStrategyVersion.${projectHash}`;
  }
  getProjectForceReembedMetadataKey() {
    const projectHash = hashContent(path8.resolve(this.projectRoot)).slice(0, 16);
    return `index.forceReembed.${projectHash}`;
  }
  hasProjectForceReembedPending() {
    return this.config.scope === "global" && this.database?.getMetadata(this.getProjectForceReembedMetadataKey()) === "true";
  }
  hasScopedIndexedData() {
    if (!this.store || this.config.scope !== "global") {
      return false;
    }
    if (this.hasProjectForceReembedPending()) {
      return false;
    }
    const roots = this.getScopedRoots();
    if (Array.from(this.fileHashCache.keys()).some((filePath) => this.isFileInCurrentScope(filePath, roots))) {
      return true;
    }
    if (this.loadSerializedFailedBatches().some(
      (batch) => batch.chunks.some((chunk) => {
        const filePath = getPendingChunkFilePath(chunk);
        return filePath !== null && this.isFileInCurrentScope(filePath, roots);
      })
    )) {
      return true;
    }
    if (!this.database) {
      return false;
    }
    if (this.getBranchCatalogKeys().some((branchKey) => {
      const branchChunkIds = this.database.getBranchChunkIds(branchKey);
      if (branchChunkIds.length > 0) {
        return true;
      }
      return this.database.getBranchSymbolIds(branchKey).length > 0;
    })) {
      return true;
    }
    const hasAnyBranchRows = this.database.getAllBranches().some((branchKey) => {
      const branchChunkIds = this.database.getBranchChunkIds(branchKey);
      if (branchChunkIds.length > 0) {
        return true;
      }
      return this.database.getBranchSymbolIds(branchKey).length > 0;
    });
    if (hasAnyBranchRows) {
      return false;
    }
    return this.store.getAllMetadata().some(({ metadata }) => this.isFileInCurrentScope(metadata.filePath, roots));
  }
  loadStoredEmbeddingStrategyVersion() {
    if (!this.database) {
      return null;
    }
    if (this.hasProjectForceReembedPending()) {
      return null;
    }
    if (this.config.scope !== "global") {
      return this.database.getMetadata("index.embeddingStrategyVersion") ?? "1";
    }
    const projectVersion = this.database.getMetadata(this.getProjectEmbeddingStrategyMetadataKey());
    if (projectVersion) {
      return projectVersion;
    }
    const legacySharedVersion = this.database.getMetadata("index.embeddingStrategyVersion");
    if (legacySharedVersion && this.hasScopedIndexedData()) {
      return legacySharedVersion;
    }
    return null;
  }
  getBranchCatalogKeys() {
    const primary = this.getBranchCatalogKey();
    if (this.config.scope !== "global") {
      return [primary];
    }
    if (this.database?.getMetadata(this.getLegacyMigrationMetadataKey()) === "done") {
      return [primary];
    }
    const legacy = this.getLegacyBranchCatalogKey();
    return primary === legacy ? [primary] : [primary, legacy];
  }
  getBranchCatalogCleanupKeys() {
    const primary = this.getBranchCatalogKey();
    if (this.config.scope !== "global") {
      return [primary];
    }
    const legacy = this.getLegacyBranchCatalogKey();
    return primary === legacy ? [primary] : [primary, legacy];
  }
  getProjectLocalScopedOwnershipIds(roots) {
    const chunkIds = /* @__PURE__ */ new Set();
    const symbolIds = /* @__PURE__ */ new Set();
    if (!this.database) {
      return { chunkIds, symbolIds };
    }
    const projectRootPath = path8.resolve(this.projectRoot);
    const projectLocalFilePaths = /* @__PURE__ */ new Set([
      ...Array.from(this.fileHashCache.keys()).filter(
        (filePath) => this.isFileInCurrentScope(filePath, roots) && isPathWithinRoot(filePath, projectRootPath)
      ),
      ...(this.store?.getAllMetadata() ?? []).map(({ metadata }) => metadata.filePath).filter(
        (filePath) => this.isFileInCurrentScope(filePath, roots) && isPathWithinRoot(filePath, projectRootPath)
      )
    ]);
    for (const filePath of projectLocalFilePaths) {
      for (const chunk of this.database.getChunksByFile(filePath)) {
        chunkIds.add(chunk.chunkId);
      }
      for (const symbol of this.database.getSymbolsByFile(filePath)) {
        symbolIds.add(symbol.id);
      }
    }
    return { chunkIds, symbolIds };
  }
  getProjectScopedBranchCatalogCleanupKeys(projectChunkIds, projectSymbolIds) {
    if (this.config.scope !== "global") {
      return this.getBranchCatalogCleanupKeys();
    }
    const projectHash = hashContent(path8.resolve(this.projectRoot)).slice(0, 16);
    const keys = /* @__PURE__ */ new Set();
    const projectChunkIdSet = new Set(projectChunkIds);
    const projectSymbolIdSet = new Set(projectSymbolIds);
    for (const branchKey of this.database?.getAllBranches() ?? []) {
      if (branchKey.startsWith(`${projectHash}:`)) {
        keys.add(branchKey);
        continue;
      }
      if (branchKey.includes(":")) {
        continue;
      }
      const referencesProjectChunks = this.database?.getBranchChunkIds(branchKey).some((chunkId) => projectChunkIdSet.has(chunkId)) ?? false;
      const referencesProjectSymbols = this.database?.getBranchSymbolIds(branchKey).some((symbolId) => projectSymbolIdSet.has(symbolId)) ?? false;
      if (referencesProjectChunks || referencesProjectSymbols) {
        keys.add(branchKey);
      }
    }
    for (const branchKey of this.getBranchCatalogCleanupKeys()) {
      keys.add(branchKey);
    }
    return Array.from(keys);
  }
  isFileInCurrentScope(filePath, roots) {
    return roots.some((root) => isPathWithinRoot(filePath, root));
  }
  clearScopedFileHashCache(roots) {
    for (const filePath of Array.from(this.fileHashCache.keys())) {
      if (this.isFileInCurrentScope(filePath, roots)) {
        this.fileHashCache.delete(filePath);
      }
    }
    this.saveFileHashCache();
  }
  replaceScopedFileHashCache(currentFileHashes, roots) {
    for (const filePath of Array.from(this.fileHashCache.keys())) {
      if (this.isFileInCurrentScope(filePath, roots)) {
        this.fileHashCache.delete(filePath);
      }
    }
    for (const [filePath, hash] of currentFileHashes) {
      this.fileHashCache.set(filePath, hash);
    }
    this.saveFileHashCache();
  }
  partitionFailedBatches(roots, maxChunkTokens) {
    const scoped = [];
    const retained = [];
    for (const batch of this.loadSerializedFailedBatches()) {
      const scopedChunks = batch.chunks.filter((chunk) => {
        const filePath = getPendingChunkFilePath(chunk);
        return filePath !== null && this.isFileInCurrentScope(filePath, roots);
      });
      const retainedChunks = batch.chunks.filter((chunk) => {
        const filePath = getPendingChunkFilePath(chunk);
        return filePath === null || !this.isFileInCurrentScope(filePath, roots);
      });
      if (scopedChunks.length > 0) {
        const normalizedBatch = normalizeFailedBatch({ ...batch, chunks: scopedChunks }, maxChunkTokens);
        if (normalizedBatch) {
          scoped.push(normalizedBatch);
        }
      }
      if (retainedChunks.length > 0) {
        retained.push({ ...batch, chunks: retainedChunks });
      }
    }
    return { scoped, retained };
  }
  clearScopedFailedBatches(roots) {
    const { retained: retainedBatches } = this.partitionFailedBatches(roots);
    this.saveFailedBatches(retainedBatches);
  }
  hasForeignScopedFileHashData(roots) {
    return Array.from(this.fileHashCache.keys()).some((filePath) => !this.isFileInCurrentScope(filePath, roots));
  }
  hasForeignScopedFailedBatches(roots) {
    const { retained } = this.partitionFailedBatches(roots);
    return retained.length > 0;
  }
  hasForeignScopedBranchData() {
    if (!this.database || this.config.scope !== "global") {
      return false;
    }
    const projectHash = hashContent(path8.resolve(this.projectRoot)).slice(0, 16);
    const roots = this.getScopedRoots();
    const { chunkIds: projectLocalChunkIds, symbolIds: projectLocalSymbolIds } = this.getProjectLocalScopedOwnershipIds(roots);
    return this.database.getAllBranches().some(
      (branchKey) => {
        const branchChunkIds = this.database.getBranchChunkIds(branchKey);
        const branchSymbolIds = this.database.getBranchSymbolIds(branchKey);
        const hasBranchData = branchChunkIds.length > 0 || branchSymbolIds.length > 0;
        if (!hasBranchData) {
          return false;
        }
        if (branchKey.startsWith(`${projectHash}:`)) {
          return false;
        }
        if (!branchKey.includes(":")) {
          const referencesCurrentProjectChunks = branchChunkIds.some((chunkId) => projectLocalChunkIds.has(chunkId));
          const referencesCurrentProjectSymbols = branchSymbolIds.some((symbolId) => projectLocalSymbolIds.has(symbolId));
          return !(referencesCurrentProjectChunks || referencesCurrentProjectSymbols);
        }
        return true;
      }
    );
  }
  saveScopedFailedBatches(batches, roots) {
    const { retained } = this.partitionFailedBatches(roots);
    this.saveFailedBatches([...retained, ...batches]);
  }
  clearSharedIndexProjectData(store, invertedIndex, database, roots) {
    const allMetadata = store.getAllMetadata();
    const scopedEntries = allMetadata.filter(({ metadata }) => this.isFileInCurrentScope(metadata.filePath, roots));
    const filePaths = /* @__PURE__ */ new Set([
      ...Array.from(this.fileHashCache.keys()).filter((filePath) => this.isFileInCurrentScope(filePath, roots)),
      ...scopedEntries.map(({ metadata }) => metadata.filePath)
    ]);
    const projectRootPath = path8.resolve(this.projectRoot);
    const projectLocalFilePaths = new Set(
      Array.from(filePaths).filter((filePath) => isPathWithinRoot(filePath, projectRootPath))
    );
    const removedChunkIds = new Set(scopedEntries.map(({ key }) => key));
    for (const filePath of filePaths) {
      for (const chunk of database.getChunksByFile(filePath)) {
        removedChunkIds.add(chunk.chunkId);
      }
    }
    const removedChunkIdList = Array.from(removedChunkIds);
    const projectLocalChunkIds = new Set(
      scopedEntries.filter(({ metadata }) => isPathWithinRoot(metadata.filePath, projectRootPath)).map(({ key }) => key)
    );
    for (const filePath of projectLocalFilePaths) {
      for (const chunk of database.getChunksByFile(filePath)) {
        projectLocalChunkIds.add(chunk.chunkId);
      }
    }
    const symbolIds = [];
    const projectLocalSymbolIds = /* @__PURE__ */ new Set();
    for (const filePath of filePaths) {
      for (const symbol of database.getSymbolsByFile(filePath)) {
        symbolIds.push(symbol.id);
        if (projectLocalFilePaths.has(filePath)) {
          projectLocalSymbolIds.add(symbol.id);
        }
      }
    }
    for (const branchKey of this.getProjectScopedBranchCatalogCleanupKeys(Array.from(projectLocalChunkIds), Array.from(projectLocalSymbolIds))) {
      database.deleteBranchChunksForBranch(branchKey, removedChunkIdList);
    }
    const sharedChunkIds = new Set(database.getReferencedChunkIds(removedChunkIdList));
    const removableChunkIds = removedChunkIdList.filter((chunkId) => !sharedChunkIds.has(chunkId));
    if (removableChunkIds.length > 0) {
      this.rebuildVectorStoreExcludingChunkIds(store, database, removableChunkIds);
      for (const chunkId of removableChunkIds) {
        invertedIndex.removeChunk(chunkId);
      }
    }
    for (const branchKey of this.getProjectScopedBranchCatalogCleanupKeys(Array.from(projectLocalChunkIds), Array.from(projectLocalSymbolIds))) {
      database.deleteBranchSymbolsForBranch(branchKey, symbolIds);
    }
    const sharedSymbolIds = new Set(database.getReferencedSymbolIds(symbolIds));
    const removableSymbolIds = symbolIds.filter((symbolId) => !sharedSymbolIds.has(symbolId));
    database.clearCallEdgeTargetsForSymbols(removableSymbolIds);
    for (const filePath of filePaths) {
      const fileChunkIds = database.getChunksByFile(filePath).map((chunk) => chunk.chunkId);
      const fileSymbols = database.getSymbolsByFile(filePath);
      if (fileChunkIds.every((chunkId) => !sharedChunkIds.has(chunkId))) {
        database.deleteChunksByFile(filePath);
      }
      if (fileSymbols.every((symbol) => !sharedSymbolIds.has(symbol.id))) {
        database.deleteCallEdgesByFile(filePath);
        database.deleteSymbolsByFile(filePath);
      }
    }
    database.gcOrphanCallEdges();
    database.gcOrphanSymbols();
    database.gcOrphanEmbeddings();
    database.gcOrphanChunks();
    store.save();
    invertedIndex.save();
    return {
      removedChunkIds: removedChunkIdList,
      hasForeignData: allMetadata.some(({ metadata }) => !this.isFileInCurrentScope(metadata.filePath, roots))
    };
  }
  checkForInterruptedIndexing() {
    return existsSync6(this.indexingLockPath);
  }
  acquireIndexingLock() {
    const lockData = {
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      pid: process.pid
    };
    writeFileSync2(this.indexingLockPath, JSON.stringify(lockData));
  }
  releaseIndexingLock() {
    if (existsSync6(this.indexingLockPath)) {
      unlinkSync(this.indexingLockPath);
    }
  }
  async recoverFromInterruptedIndexing() {
    this.logger.warn("Detected interrupted indexing session, recovering...");
    if (existsSync6(this.fileHashCachePath)) {
      unlinkSync(this.fileHashCachePath);
    }
    await this.healthCheck();
    this.releaseIndexingLock();
    this.logger.info("Recovery complete, next index will re-process all files");
  }
  loadFailedBatches(maxChunkTokens) {
    try {
      return this.loadSerializedFailedBatches().map((batch) => normalizeFailedBatch(batch, maxChunkTokens)).filter((batch) => batch !== null);
    } catch {
      return [];
    }
  }
  loadSerializedFailedBatches() {
    if (!existsSync6(this.failedBatchesPath)) {
      return [];
    }
    const data = readFileSync5(this.failedBatchesPath, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.map((batch) => {
      const chunks = Array.isArray(batch.chunks) ? batch.chunks : [];
      if (chunks.length === 0) {
        return null;
      }
      return {
        chunks,
        error: typeof batch.error === "string" ? batch.error : "Unknown embedding error",
        attemptCount: typeof batch.attemptCount === "number" ? batch.attemptCount : 1,
        lastAttempt: typeof batch.lastAttempt === "string" ? batch.lastAttempt : (/* @__PURE__ */ new Date()).toISOString()
      };
    }).filter((batch) => batch !== null);
  }
  saveFailedBatches(batches) {
    if (batches.length === 0) {
      if (existsSync6(this.failedBatchesPath)) {
        try {
          unlinkSync(this.failedBatchesPath);
        } catch {
        }
      }
      return;
    }
    writeFileSync2(this.failedBatchesPath, JSON.stringify(batches, null, 2));
  }
  collectRetryableFailedChunks(currentFileHashes, unchangedFilePaths, maxChunkTokens) {
    const retryableById = /* @__PURE__ */ new Map();
    for (const batch of this.loadFailedBatches(maxChunkTokens)) {
      for (const chunk of batch.chunks) {
        const filePath = chunk.metadata.filePath;
        if (!currentFileHashes.has(filePath)) {
          continue;
        }
        if (!unchangedFilePaths.has(filePath)) {
          continue;
        }
        const existing = retryableById.get(chunk.id);
        if (!existing || batch.attemptCount > existing.attemptCount) {
          retryableById.set(chunk.id, {
            chunk,
            attemptCount: batch.attemptCount
          });
        }
      }
    }
    return Array.from(retryableById.values());
  }
  getProviderRateLimits(provider) {
    switch (provider) {
      case "github-copilot":
        return { concurrency: 1, intervalMs: 4e3, minRetryMs: 5e3, maxRetryMs: 6e4 };
      case "openai":
        return { concurrency: 3, intervalMs: 500, minRetryMs: 1e3, maxRetryMs: 3e4 };
      case "google":
        return { concurrency: 5, intervalMs: 200, minRetryMs: 1e3, maxRetryMs: 3e4 };
      case "ollama":
        return { concurrency: 5, intervalMs: 0, minRetryMs: 500, maxRetryMs: 5e3 };
      case "custom": {
        const customConfig = this.config.customProvider;
        return {
          concurrency: customConfig?.concurrency ?? 3,
          intervalMs: customConfig?.requestIntervalMs ?? 1e3,
          minRetryMs: 1e3,
          maxRetryMs: 3e4
        };
      }
      default:
        return { concurrency: 3, intervalMs: 1e3, minRetryMs: 1e3, maxRetryMs: 3e4 };
    }
  }
  async rerankCandidatesWithApi(query, candidates, options) {
    const reranker = this.config.reranker;
    if (!reranker || !reranker.enabled || candidates.length <= 1) {
      return candidates;
    }
    const queryTokens = Array.from(tokenizeTextForRanking(query));
    const preferSourcePaths = classifyQueryIntentRaw(query) === "source";
    const docIntent = classifyDocIntent(queryTokens) === "docs";
    if (options?.definitionIntent === true) {
      return candidates;
    }
    if (options?.hasIdentifierHints === true && preferSourcePaths && !docIntent) {
      return candidates;
    }
    const topN = Math.min(reranker.topN, candidates.length);
    const head = candidates.slice(0, topN);
    const tail = candidates.slice(topN);
    const grouped = /* @__PURE__ */ new Map([
      ["implementation", []],
      ["documentation", []],
      ["test", []],
      ["other", []]
    ]);
    for (const candidate of head) {
      const band = classifyExternalRerankBand(candidate, preferSourcePaths, docIntent);
      grouped.get(band)?.push(candidate);
    }
    const orderedBands = preferSourcePaths ? ["implementation", "other", "documentation", "test"] : docIntent ? ["documentation", "implementation", "other", "test"] : ["implementation", "other", "documentation", "test"];
    try {
      const rerankedHead = [];
      for (const band of orderedBands) {
        const bandCandidates = grouped.get(band) ?? [];
        if (bandCandidates.length <= 1) {
          rerankedHead.push(...bandCandidates);
          continue;
        }
        const documents = await Promise.all(
          bandCandidates.map(async (candidate) => ({
            id: candidate.id,
            text: await this.createRerankerDocumentText(candidate)
          }))
        );
        const rankedIds = await this.callExternalReranker(query, documents, reranker);
        if (rankedIds.length === 0) {
          rerankedHead.push(...bandCandidates);
          continue;
        }
        const order = new Map(rankedIds.map((id, index) => [id, index]));
        const bandReranked = [...bandCandidates].sort((a, b) => {
          const aRank = order.get(a.id) ?? Number.MAX_SAFE_INTEGER;
          const bRank = order.get(b.id) ?? Number.MAX_SAFE_INTEGER;
          if (aRank !== bRank) {
            return aRank - bRank;
          }
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return a.id.localeCompare(b.id);
        });
        const shouldDiversifyBand = !options?.hasIdentifierHints;
        rerankedHead.push(...diversifyCandidatesByFile(bandReranked, shouldDiversifyBand));
      }
      this.logger.search("debug", "Applied external reranker", {
        provider: reranker.provider,
        model: reranker.model,
        candidateCount: head.length,
        bands: orderedBands
      });
      return [...rerankedHead, ...tail];
    } catch (error) {
      this.logger.search("warn", "External reranker failed; using deterministic order", {
        provider: reranker.provider,
        model: reranker.model,
        error: getErrorMessage(error)
      });
      return candidates;
    }
  }
  async callExternalReranker(query, documents, reranker) {
    const headers = {
      "Content-Type": "application/json"
    };
    if (reranker.apiKey) {
      headers.Authorization = `Bearer ${reranker.apiKey}`;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), reranker.timeoutMs);
    try {
      const response = await fetch(`${reranker.baseUrl}/rerank`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: reranker.model,
          query,
          documents: documents.map((document) => document.text),
          top_n: documents.length,
          return_documents: false
        }),
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error(`Reranker API error: ${response.status} - ${await response.text()}`);
      }
      const body = await response.json();
      if (!Array.isArray(body.results)) {
        throw new Error("Reranker API returned unexpected response format.");
      }
      return body.results.map((result) => {
        const index = typeof result.index === "number" ? result.index : -1;
        return documents[index]?.id;
      }).filter((id) => typeof id === "string");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Reranker request timed out after ${reranker.timeoutMs}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
  async createRerankerDocumentText(candidate) {
    const parts = [
      `path: ${candidate.metadata.filePath}`,
      `chunk_type: ${candidate.metadata.chunkType}`,
      `language: ${candidate.metadata.language}`,
      `lines: ${candidate.metadata.startLine}-${candidate.metadata.endLine}`
    ];
    if (candidate.metadata.name) {
      parts.push(`name: ${candidate.metadata.name}`);
    }
    const intent = isLikelyImplementationPath(candidate.metadata.filePath) ? "implementation" : "doc_or_test";
    parts.push(`intent_hint: ${intent}`);
    try {
      const fileContent = await fsPromises2.readFile(candidate.metadata.filePath, "utf-8");
      const lines = fileContent.split("\n");
      const snippetStartLine = Math.max(1, candidate.metadata.startLine - 2);
      const snippetEndLine = Math.min(lines.length, candidate.metadata.endLine + 2);
      const snippet = lines.slice(snippetStartLine - 1, snippetEndLine).join("\n").trim();
      parts.push("snippet:");
      parts.push(snippet.length > 0 ? snippet : "[empty]");
    } catch {
      parts.push("snippet:");
      parts.push("[unavailable]");
    }
    return parts.join("\n");
  }
  async initialize() {
    if (this.config.embeddingProvider === "custom") {
      if (!this.config.customProvider) {
        throw new Error("embeddingProvider is 'custom' but customProvider config is missing.");
      }
      this.configuredProviderInfo = createCustomProviderInfo(this.config.customProvider);
    } else if (this.config.embeddingProvider === "auto") {
      this.configuredProviderInfo = await tryDetectProvider();
    } else {
      this.configuredProviderInfo = await detectEmbeddingProvider(this.config.embeddingProvider, this.config.embeddingModel);
    }
    if (!this.configuredProviderInfo) {
      throw new Error(
        "No embedding provider available. Configure GitHub Copilot, OpenAI, Google, Ollama, or a custom OpenAI-compatible endpoint."
      );
    }
    this.logger.info("Initializing indexer", {
      provider: this.configuredProviderInfo.provider,
      model: this.configuredProviderInfo.modelInfo.model,
      scope: this.config.scope,
      rerankerEnabled: this.config.reranker?.enabled ?? false
    });
    this.provider = createEmbeddingProvider(this.configuredProviderInfo);
    if (this.config.reranker?.enabled) {
      this.reranker = createReranker(this.config.reranker);
      if (this.reranker.isAvailable()) {
        this.logger.info("Reranker initialized", {
          model: this.config.reranker.model,
          baseUrl: this.config.reranker.baseUrl
        });
      }
    }
    await fsPromises2.mkdir(this.indexPath, { recursive: true });
    const dimensions = this.configuredProviderInfo.modelInfo.dimensions;
    const storePath = path8.join(this.indexPath, "vectors");
    this.store = new VectorStore(storePath, dimensions);
    const indexFilePath = path8.join(this.indexPath, "vectors.usearch");
    if (existsSync6(indexFilePath)) {
      this.store.load();
    }
    const invertedIndexPath = path8.join(this.indexPath, "inverted-index.json");
    this.invertedIndex = new InvertedIndex(invertedIndexPath);
    try {
      this.invertedIndex.load();
    } catch {
      if (existsSync6(invertedIndexPath)) {
        await fsPromises2.unlink(invertedIndexPath);
      }
      this.invertedIndex = new InvertedIndex(invertedIndexPath);
    }
    const dbPath = path8.join(this.indexPath, "codebase.db");
    let dbIsNew = !existsSync6(dbPath);
    try {
      this.database = new Database(dbPath);
    } catch (error) {
      if (!await this.tryResetCorruptedIndex("initializing index database", error)) {
        throw error;
      }
      this.store = new VectorStore(storePath, dimensions);
      this.invertedIndex = new InvertedIndex(invertedIndexPath);
      this.database = new Database(dbPath);
      dbIsNew = true;
    }
    if (isGitRepo(this.projectRoot)) {
      this.currentBranch = getBranchOrDefault(this.projectRoot);
      this.baseBranch = getBaseBranch(this.projectRoot);
      this.logger.branch("info", "Detected git repository", {
        currentBranch: this.currentBranch,
        baseBranch: this.baseBranch
      });
    } else {
      this.currentBranch = "default";
      this.baseBranch = "default";
      this.logger.branch("debug", "Not a git repository, using default branch");
    }
    if (this.checkForInterruptedIndexing()) {
      await this.recoverFromInterruptedIndexing();
    }
    if (dbIsNew && this.store.count() > 0) {
      this.migrateFromLegacyIndex();
    }
    this.loadFileHashCache();
    this.indexCompatibility = this.validateIndexCompatibility(this.configuredProviderInfo);
    if (!this.indexCompatibility.compatible) {
      this.logger.warn("Index compatibility issue detected", {
        reason: this.indexCompatibility.reason,
        storedMetadata: this.indexCompatibility.storedMetadata,
        configuredProviderInfo: this.configuredProviderInfo
      });
    }
    if (this.config.indexing.autoGc) {
      await this.maybeRunAutoGc();
    }
  }
  async maybeRunAutoGc() {
    if (!this.database) return;
    const lastGcTimestamp = this.database.getMetadata("lastGcTimestamp");
    const now = Date.now();
    const intervalMs = this.config.indexing.gcIntervalDays * 24 * 60 * 60 * 1e3;
    let shouldRunGc = false;
    if (!lastGcTimestamp) {
      shouldRunGc = true;
    } else {
      const lastGcTime = parseInt(lastGcTimestamp, 10);
      if (!isNaN(lastGcTime) && now - lastGcTime > intervalMs) {
        shouldRunGc = true;
      }
    }
    if (shouldRunGc) {
      const result = await this.healthCheck();
      if (result.warning) {
        this.database.setMetadata(STARTUP_WARNING_METADATA_KEY, result.warning);
      } else {
        this.database.deleteMetadata(STARTUP_WARNING_METADATA_KEY);
      }
      this.database.setMetadata("lastGcTimestamp", now.toString());
    }
  }
  async maybeRunOrphanGc() {
    if (!this.database) return null;
    const stats = this.database.getStats();
    if (!stats) return null;
    const orphanCount = stats.embeddingCount - stats.chunkCount;
    if (orphanCount > this.config.indexing.gcOrphanThreshold) {
      try {
        this.database.gcOrphanEmbeddings();
        this.database.gcOrphanChunks();
      } catch (error) {
        if (await this.tryResetCorruptedIndex("running automatic orphan garbage collection", error)) {
          return {
            resetCorruptedIndex: true,
            warning: this.getCorruptedIndexWarning(path8.join(this.indexPath, "codebase.db"))
          };
        }
        throw error;
      }
      this.database.setMetadata("lastGcTimestamp", Date.now().toString());
    }
    return null;
  }
  rebuildVectorStoreExcludingChunkIds(store, database, excludedChunkIds) {
    const excludedSet = new Set(excludedChunkIds);
    if (excludedSet.size === 0) {
      return;
    }
    const retainedEntries = store.getAllMetadata().filter(({ key }) => !excludedSet.has(key));
    const storeBasePath = path8.join(this.indexPath, "vectors");
    const storeIndexPath = `${storeBasePath}.usearch`;
    const storeMetadataPath = `${storeBasePath}.meta.json`;
    const backupIndexPath = `${storeIndexPath}.bak`;
    const backupMetadataPath = `${storeMetadataPath}.bak`;
    let backedUpIndex = false;
    let backedUpMetadata = false;
    let rebuiltCount = 0;
    let skippedCount = 0;
    if (existsSync6(backupIndexPath)) {
      unlinkSync(backupIndexPath);
    }
    if (existsSync6(backupMetadataPath)) {
      unlinkSync(backupMetadataPath);
    }
    try {
      if (existsSync6(storeIndexPath)) {
        renameSync(storeIndexPath, backupIndexPath);
        backedUpIndex = true;
      }
      if (existsSync6(storeMetadataPath)) {
        renameSync(storeMetadataPath, backupMetadataPath);
        backedUpMetadata = true;
      }
      store.clear();
      for (const { key, metadata } of retainedEntries) {
        const chunk = database.getChunk(key);
        if (!chunk) {
          skippedCount += 1;
          continue;
        }
        const embeddingBuffer = database.getEmbedding(chunk.contentHash);
        if (!embeddingBuffer) {
          skippedCount += 1;
          continue;
        }
        const vector = bufferToFloat32Array(embeddingBuffer);
        store.add(key, Array.from(vector), metadata);
        rebuiltCount += 1;
      }
      store.save();
      if (backedUpIndex && existsSync6(backupIndexPath)) {
        unlinkSync(backupIndexPath);
      }
      if (backedUpMetadata && existsSync6(backupMetadataPath)) {
        unlinkSync(backupMetadataPath);
      }
      this.logger.gc("info", "Rebuilt vector store to avoid native remove", {
        excludedChunks: excludedSet.size,
        rebuiltChunks: rebuiltCount,
        skippedChunks: skippedCount
      });
    } catch (error) {
      try {
        store.clear();
      } catch {
      }
      if (existsSync6(storeIndexPath)) {
        unlinkSync(storeIndexPath);
      }
      if (existsSync6(storeMetadataPath)) {
        unlinkSync(storeMetadataPath);
      }
      if (backedUpIndex && existsSync6(backupIndexPath)) {
        renameSync(backupIndexPath, storeIndexPath);
      }
      if (backedUpMetadata && existsSync6(backupMetadataPath)) {
        renameSync(backupMetadataPath, storeMetadataPath);
      }
      if (backedUpIndex || backedUpMetadata) {
        store.load();
      }
      throw error;
    }
  }
  getCorruptedIndexWarning(dbPath) {
    if (this.config.scope === "global") {
      return `Detected a corrupted shared global SQLite index at ${dbPath}. Automatic repair is disabled for global scope because it may delete other projects' index data. Remove or repair the shared index manually, then rerun index_codebase with force=true.`;
    }
    return `Detected a corrupted local SQLite index at ${dbPath} and reset the local index. Run index_codebase to rebuild search data.`;
  }
  async tryResetCorruptedIndex(stage, error) {
    if (!isSqliteCorruptionError(error)) {
      return false;
    }
    const dbPath = path8.join(this.indexPath, "codebase.db");
    const warning = this.getCorruptedIndexWarning(dbPath);
    const errorMessage = getErrorMessage(error);
    if (this.config.scope === "global") {
      this.logger.error("Detected corrupted shared global index database", {
        stage,
        dbPath,
        error: errorMessage
      });
      throw new Error(`${warning} Original SQLite error: ${errorMessage}`);
    }
    this.logger.warn("Detected corrupted local index database, resetting local index", {
      stage,
      dbPath,
      error: errorMessage
    });
    this.store = null;
    this.invertedIndex = null;
    this.database?.close();
    this.database = null;
    this.indexCompatibility = null;
    this.fileHashCache.clear();
    const resetPaths = [
      path8.join(this.indexPath, "codebase.db"),
      path8.join(this.indexPath, "codebase.db-shm"),
      path8.join(this.indexPath, "codebase.db-wal"),
      path8.join(this.indexPath, "vectors.usearch"),
      path8.join(this.indexPath, "inverted-index.json"),
      path8.join(this.indexPath, "file-hashes.json"),
      path8.join(this.indexPath, "failed-batches.json"),
      path8.join(this.indexPath, "indexing.lock"),
      path8.join(this.indexPath, "vectors")
    ];
    await Promise.all(resetPaths.map(async (targetPath) => {
      try {
        await fsPromises2.rm(targetPath, { recursive: true, force: true });
      } catch {
      }
    }));
    await fsPromises2.mkdir(this.indexPath, { recursive: true });
    return true;
  }
  migrateFromLegacyIndex() {
    if (!this.store || !this.database) return;
    const allMetadata = this.store.getAllMetadata();
    const chunkIds = [];
    const chunkDataBatch = [];
    for (const { key, metadata } of allMetadata) {
      const chunkData = {
        chunkId: key,
        contentHash: metadata.hash,
        filePath: metadata.filePath,
        startLine: metadata.startLine,
        endLine: metadata.endLine,
        nodeType: metadata.chunkType,
        name: metadata.name,
        language: metadata.language
      };
      chunkDataBatch.push(chunkData);
      chunkIds.push(key);
    }
    if (chunkDataBatch.length > 0) {
      this.database.upsertChunksBatch(chunkDataBatch);
    }
    this.database.addChunksToBranchBatch(this.getBranchCatalogKey(), chunkIds);
  }
  loadIndexMetadata() {
    if (!this.database) return null;
    const version = this.database.getMetadata("index.version");
    if (!version) return null;
    return {
      indexVersion: version,
      embeddingProvider: this.database.getMetadata("index.embeddingProvider") ?? "",
      embeddingModel: this.database.getMetadata("index.embeddingModel") ?? "",
      embeddingDimensions: parseInt(this.database.getMetadata("index.embeddingDimensions") ?? "0", 10),
      embeddingStrategyVersion: this.loadStoredEmbeddingStrategyVersion() ?? EMBEDDING_STRATEGY_VERSION,
      createdAt: this.database.getMetadata("index.createdAt") ?? "",
      updatedAt: this.database.getMetadata("index.updatedAt") ?? ""
    };
  }
  saveIndexMetadata(provider) {
    if (!this.database) return;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const existingCreatedAt = this.database.getMetadata("index.createdAt");
    const completeProjectEmbeddingStrategyReset = !this.hasProjectForceReembedPending();
    this.database.setMetadata("index.version", INDEX_METADATA_VERSION);
    this.database.setMetadata("index.embeddingProvider", provider.provider);
    this.database.setMetadata("index.embeddingModel", provider.modelInfo.model);
    this.database.setMetadata("index.embeddingDimensions", provider.modelInfo.dimensions.toString());
    if (this.config.scope === "global") {
      if (completeProjectEmbeddingStrategyReset) {
        this.database.setMetadata(this.getProjectEmbeddingStrategyMetadataKey(), EMBEDDING_STRATEGY_VERSION);
      }
      this.database.setMetadata(this.getLegacyMigrationMetadataKey(), "done");
      if (completeProjectEmbeddingStrategyReset) {
        this.database.deleteMetadata(this.getProjectForceReembedMetadataKey());
      }
    } else {
      this.database.setMetadata("index.embeddingStrategyVersion", EMBEDDING_STRATEGY_VERSION);
    }
    this.database.setMetadata("index.updatedAt", now);
    if (!existingCreatedAt) {
      this.database.setMetadata("index.createdAt", now);
    }
  }
  validateIndexCompatibility(provider) {
    const storedMetadata = this.loadIndexMetadata();
    if (!storedMetadata) {
      return { compatible: true };
    }
    const currentProvider = provider.provider;
    const currentModel = provider.modelInfo.model;
    const currentDimensions = provider.modelInfo.dimensions;
    if (storedMetadata.embeddingDimensions !== currentDimensions) {
      return {
        compatible: false,
        code: "DIMENSION_MISMATCH" /* DIMENSION_MISMATCH */,
        reason: `Dimension mismatch: index has ${storedMetadata.embeddingDimensions}D vectors (${storedMetadata.embeddingProvider}/${storedMetadata.embeddingModel}), but current provider uses ${currentDimensions}D (${currentProvider}/${currentModel}). Run index_codebase with force=true to rebuild.`,
        storedMetadata
      };
    }
    if (storedMetadata.embeddingModel !== currentModel) {
      return {
        compatible: false,
        code: "MODEL_MISMATCH" /* MODEL_MISMATCH */,
        reason: `Model mismatch: index was built with "${storedMetadata.embeddingModel}", but current model is "${currentModel}". Embeddings are incompatible. Run index_codebase with force=true to rebuild.`,
        storedMetadata
      };
    }
    if (storedMetadata.embeddingStrategyVersion !== EMBEDDING_STRATEGY_VERSION) {
      return {
        compatible: false,
        code: "EMBEDDING_STRATEGY_MISMATCH" /* EMBEDDING_STRATEGY_MISMATCH */,
        reason: `Embedding strategy mismatch: index was built with embedding strategy v${storedMetadata.embeddingStrategyVersion}, but the current code requires v${EMBEDDING_STRATEGY_VERSION}. Run index_codebase with force=true to rebuild cached embeddings.`,
        storedMetadata
      };
    }
    if (storedMetadata.embeddingProvider !== currentProvider) {
      this.logger.warn("Provider changed", {
        storedProvider: storedMetadata.embeddingProvider,
        currentProvider
      });
    }
    return {
      compatible: true,
      storedMetadata
    };
  }
  checkCompatibility() {
    if (!this.indexCompatibility) {
      if (!this.configuredProviderInfo) {
        throw new Error("No embedding provider info, you must initialize the indexer first.");
      }
      this.indexCompatibility = this.validateIndexCompatibility(this.configuredProviderInfo);
    }
    return this.indexCompatibility;
  }
  async ensureInitialized() {
    if (!this.store || !this.provider || !this.invertedIndex || !this.configuredProviderInfo || !this.database) {
      await this.initialize();
    }
    return {
      store: this.store,
      provider: this.provider,
      invertedIndex: this.invertedIndex,
      configuredProviderInfo: this.configuredProviderInfo,
      database: this.database
    };
  }
  async estimateCost() {
    const { configuredProviderInfo } = await this.ensureInitialized();
    const includePatterns = [...this.config.include, ...this.config.additionalInclude];
    const { files } = await collectFiles(
      this.projectRoot,
      includePatterns,
      this.config.exclude,
      this.config.indexing.maxFileSize,
      this.config.knowledgeBases,
      { maxDepth: this.config.indexing.maxDepth, maxFilesPerDirectory: this.config.indexing.maxFilesPerDirectory }
    );
    return createCostEstimate(files, configuredProviderInfo);
  }
  async index(onProgress) {
    const { store, provider, invertedIndex, database, configuredProviderInfo } = await this.ensureInitialized();
    const scopedRoots = this.config.scope === "global" ? this.getScopedRoots() : null;
    const branchCatalogKey = this.getBranchCatalogKey();
    const forceScopedReembed = scopedRoots !== null && database.getMetadata(this.getProjectForceReembedMetadataKey()) === "true";
    const failedForcedChunkIds = /* @__PURE__ */ new Set();
    if (!this.indexCompatibility?.compatible) {
      throw new Error(
        `${this.indexCompatibility?.reason} Run index_codebase with force=true to rebuild the index.`
      );
    }
    this.acquireIndexingLock();
    this.logger.recordIndexingStart();
    this.logger.info("Starting indexing", { projectRoot: this.projectRoot });
    const startTime = Date.now();
    const stats = {
      totalFiles: 0,
      totalChunks: 0,
      indexedChunks: 0,
      failedChunks: 0,
      tokensUsed: 0,
      durationMs: 0,
      existingChunks: 0,
      removedChunks: 0,
      skippedFiles: [],
      parseFailures: []
    };
    const failedBatchesForCurrentRun = [];
    onProgress?.({
      phase: "scanning",
      filesProcessed: 0,
      totalFiles: 0,
      chunksProcessed: 0,
      totalChunks: 0
    });
    this.loadFileHashCache();
    const includePatterns = [...this.config.include, ...this.config.additionalInclude];
    const { files, skipped } = await collectFiles(
      this.projectRoot,
      includePatterns,
      this.config.exclude,
      this.config.indexing.maxFileSize,
      this.config.knowledgeBases,
      { maxDepth: this.config.indexing.maxDepth, maxFilesPerDirectory: this.config.indexing.maxFilesPerDirectory }
    );
    stats.totalFiles = files.length;
    stats.skippedFiles = skipped;
    this.logger.recordFilesScanned(files.length);
    this.logger.cache("debug", "Scanning files for changes", {
      totalFiles: files.length,
      skippedFiles: skipped.length
    });
    const changedFiles = [];
    const unchangedFilePaths = /* @__PURE__ */ new Set();
    const currentFileHashes = /* @__PURE__ */ new Map();
    for (const f of files) {
      const currentHash = hashFile(f.path);
      currentFileHashes.set(f.path, currentHash);
      if (this.fileHashCache.get(f.path) === currentHash) {
        unchangedFilePaths.add(f.path);
        this.logger.recordCacheHit();
      } else {
        const content = await fsPromises2.readFile(f.path, "utf-8");
        changedFiles.push({ path: f.path, content, hash: currentHash });
        this.logger.recordCacheMiss();
      }
    }
    this.logger.cache("info", "File hash cache results", {
      unchanged: unchangedFilePaths.size,
      changed: changedFiles.length
    });
    onProgress?.({
      phase: "parsing",
      filesProcessed: 0,
      totalFiles: files.length,
      chunksProcessed: 0,
      totalChunks: 0
    });
    const parseStartTime = performance2.now();
    const parsedFiles = parseFiles(changedFiles);
    const parseMs = performance2.now() - parseStartTime;
    this.logger.recordFilesParsed(parsedFiles.length);
    this.logger.recordParseDuration(parseMs);
    this.logger.debug("Parsed changed files", { parsedCount: parsedFiles.length, parseMs: parseMs.toFixed(2) });
    const existingChunks = /* @__PURE__ */ new Map();
    const existingChunksByFile = /* @__PURE__ */ new Map();
    for (const { key, metadata } of store.getAllMetadata()) {
      if (scopedRoots && !this.isFileInCurrentScope(metadata.filePath, scopedRoots)) {
        continue;
      }
      if (forceScopedReembed && scopedRoots && this.isFileInCurrentScope(metadata.filePath, scopedRoots)) {
        continue;
      }
      existingChunks.set(key, metadata.hash);
      const fileChunks = existingChunksByFile.get(metadata.filePath) || /* @__PURE__ */ new Set();
      fileChunks.add(key);
      existingChunksByFile.set(metadata.filePath, fileChunks);
    }
    const currentChunkIds = /* @__PURE__ */ new Set();
    const currentFilePaths = /* @__PURE__ */ new Set();
    const pendingChunks = [];
    for (const filePath of unchangedFilePaths) {
      currentFilePaths.add(filePath);
      const fileChunks = existingChunksByFile.get(filePath);
      if (fileChunks) {
        for (const chunkId of fileChunks) {
          currentChunkIds.add(chunkId);
        }
      }
    }
    const chunkDataBatch = [];
    for (const parsed of parsedFiles) {
      currentFilePaths.add(parsed.path);
      if (parsed.chunks.length === 0) {
        const relativePath = path8.relative(this.projectRoot, parsed.path);
        stats.parseFailures.push(relativePath);
      }
      let fileChunkCount = 0;
      let chunksToProcess = parsed.chunks;
      if (this.config.indexing.fallbackToTextOnMaxChunks && chunksToProcess.length > this.config.indexing.maxChunksPerFile) {
        const changedFile = changedFiles.find((f) => f.path === parsed.path);
        if (changedFile) {
          const textChunks = parseFileAsText(parsed.path, changedFile.content);
          chunksToProcess = textChunks;
        }
      }
      for (const chunk of chunksToProcess) {
        if (fileChunkCount >= this.config.indexing.maxChunksPerFile) {
          break;
        }
        if (this.config.indexing.semanticOnly && chunk.chunkType === "other") {
          continue;
        }
        const id = generateChunkId(parsed.path, chunk);
        const contentHash = generateChunkHash(chunk);
        currentChunkIds.add(id);
        chunkDataBatch.push({
          chunkId: id,
          contentHash,
          filePath: parsed.path,
          startLine: chunk.startLine,
          endLine: chunk.endLine,
          nodeType: chunk.chunkType,
          name: chunk.name,
          language: chunk.language
        });
        if (existingChunks.get(id) === contentHash) {
          fileChunkCount++;
          continue;
        }
        const texts = createEmbeddingTexts(chunk, parsed.path, getSafeEmbeddingChunkTokenLimit(configuredProviderInfo)).map((text) => ({
          text,
          tokenCount: estimateTokens(text)
        }));
        const metadata = {
          filePath: parsed.path,
          startLine: chunk.startLine,
          endLine: chunk.endLine,
          chunkType: chunk.chunkType,
          name: chunk.name,
          language: chunk.language,
          hash: contentHash
        };
        pendingChunks.push({
          id,
          texts,
          storageText: createPendingChunkStorageText(texts),
          content: chunk.content,
          contentHash,
          metadata
        });
        fileChunkCount++;
      }
    }
    const retryableFailedChunks = this.collectRetryableFailedChunks(
      currentFileHashes,
      unchangedFilePaths,
      getSafeEmbeddingChunkTokenLimit(configuredProviderInfo)
    );
    const retryableFailedAttemptCounts = /* @__PURE__ */ new Map();
    const retryableChunksWithExistingData = /* @__PURE__ */ new Set();
    if (retryableFailedChunks.length > 0) {
      const pendingChunkIds = new Set(pendingChunks.map((chunk) => chunk.id));
      for (const { chunk, attemptCount } of retryableFailedChunks) {
        retryableFailedAttemptCounts.set(chunk.id, attemptCount);
        if (existingChunks.has(chunk.id)) {
          retryableChunksWithExistingData.add(chunk.id);
        }
        if (!pendingChunkIds.has(chunk.id)) {
          pendingChunks.push(chunk);
          pendingChunkIds.add(chunk.id);
          currentChunkIds.add(chunk.id);
        }
      }
    }
    if (chunkDataBatch.length > 0) {
      database.upsertChunksBatch(chunkDataBatch);
    }
    const allSymbolIds = /* @__PURE__ */ new Set();
    const symbolsByFile = /* @__PURE__ */ new Map();
    for (let i = 0; i < parsedFiles.length; i++) {
      const parsed = parsedFiles[i];
      const changedFile = changedFiles[i];
      database.deleteCallEdgesByFile(parsed.path);
      database.deleteSymbolsByFile(parsed.path);
      const fileSymbols = [];
      for (const chunk of parsed.chunks) {
        if (!chunk.name || !CALL_GRAPH_SYMBOL_CHUNK_TYPES.has(chunk.chunkType)) continue;
        const symbolId = `sym_${hashContent(parsed.path + ":" + chunk.name + ":" + chunk.chunkType + ":" + chunk.startLine).slice(0, 16)}`;
        const symbol = {
          id: symbolId,
          filePath: parsed.path,
          name: chunk.name,
          kind: chunk.chunkType,
          startLine: chunk.startLine,
          startCol: 0,
          endLine: chunk.endLine,
          endCol: 0,
          language: chunk.language
        };
        fileSymbols.push(symbol);
        allSymbolIds.add(symbolId);
      }
      const fileLanguage = parsed.chunks[0]?.language;
      const isCaseInsensitiveLanguage = !!fileLanguage && CASE_INSENSITIVE_LANGUAGES.has(fileLanguage);
      const normalizeSymbolKey = (name) => isCaseInsensitiveLanguage ? name.toLowerCase() : name;
      const symbolsByName = /* @__PURE__ */ new Map();
      for (const symbol of fileSymbols) {
        const key = normalizeSymbolKey(symbol.name);
        const existing = symbolsByName.get(key) ?? [];
        existing.push(symbol);
        symbolsByName.set(key, existing);
      }
      if (fileSymbols.length > 0) {
        database.upsertSymbolsBatch(fileSymbols);
        symbolsByFile.set(parsed.path, fileSymbols);
      }
      if (!fileLanguage || !CALL_GRAPH_LANGUAGES.has(fileLanguage)) continue;
      const callSites = extractCalls(changedFile.content, fileLanguage);
      if (callSites.length === 0) continue;
      const edges = [];
      for (const site of callSites) {
        const enclosingSymbol = fileSymbols.find(
          (sym) => site.line >= sym.startLine && site.line <= sym.endLine
        );
        if (!enclosingSymbol) continue;
        const edgeId = `edge_${hashContent(enclosingSymbol.id + ":" + site.calleeName + ":" + site.line + ":" + site.column).slice(0, 16)}`;
        edges.push({
          id: edgeId,
          fromSymbolId: enclosingSymbol.id,
          targetName: site.calleeName,
          toSymbolId: void 0,
          callType: site.callType,
          line: site.line,
          col: site.column,
          isResolved: false
        });
      }
      if (edges.length > 0) {
        database.upsertCallEdgesBatch(edges);
        for (const edge of edges) {
          const candidates = symbolsByName.get(normalizeSymbolKey(edge.targetName));
          if (candidates && candidates.length === 1) {
            database.resolveCallEdge(edge.id, candidates[0].id);
          }
        }
      }
    }
    for (const filePath of unchangedFilePaths) {
      const existingSymbols = database.getSymbolsByFile(filePath);
      for (const sym of existingSymbols) {
        allSymbolIds.add(sym.id);
      }
    }
    const removedChunkIds = [];
    for (const [chunkId] of existingChunks) {
      if (!currentChunkIds.has(chunkId)) {
        removedChunkIds.push(chunkId);
      }
    }
    if (removedChunkIds.length > 0) {
      this.rebuildVectorStoreExcludingChunkIds(store, database, removedChunkIds);
      for (const chunkId of removedChunkIds) {
        invertedIndex.removeChunk(chunkId);
      }
      database.deleteChunksByIds(removedChunkIds);
    }
    const removedCount = removedChunkIds.length;
    stats.totalChunks = pendingChunks.length;
    stats.existingChunks = currentChunkIds.size - pendingChunks.length;
    stats.removedChunks = removedCount;
    this.logger.recordChunksProcessed(currentChunkIds.size);
    this.logger.recordChunksRemoved(removedCount);
    this.logger.info("Chunk analysis complete", {
      pending: pendingChunks.length,
      existing: stats.existingChunks,
      removed: removedCount
    });
    if (pendingChunks.length === 0 && removedCount === 0) {
      database.clearBranch(branchCatalogKey);
      database.addChunksToBranchBatch(branchCatalogKey, Array.from(currentChunkIds));
      database.clearBranchSymbols(branchCatalogKey);
      database.addSymbolsToBranchBatch(branchCatalogKey, Array.from(allSymbolIds));
      if (scopedRoots) {
        this.replaceScopedFileHashCache(currentFileHashes, scopedRoots);
        this.clearScopedFailedBatches(scopedRoots);
      } else {
        this.fileHashCache = currentFileHashes;
        this.saveFileHashCache();
        this.saveFailedBatches([]);
      }
      this.saveIndexMetadata(configuredProviderInfo);
      this.indexCompatibility = { compatible: true };
      stats.durationMs = Date.now() - startTime;
      onProgress?.({
        phase: "complete",
        filesProcessed: files.length,
        totalFiles: files.length,
        chunksProcessed: 0,
        totalChunks: 0
      });
      this.releaseIndexingLock();
      return stats;
    }
    if (pendingChunks.length === 0) {
      database.clearBranch(branchCatalogKey);
      database.addChunksToBranchBatch(branchCatalogKey, Array.from(currentChunkIds));
      database.clearBranchSymbols(branchCatalogKey);
      database.addSymbolsToBranchBatch(branchCatalogKey, Array.from(allSymbolIds));
      store.save();
      invertedIndex.save();
      if (scopedRoots) {
        this.replaceScopedFileHashCache(currentFileHashes, scopedRoots);
        this.clearScopedFailedBatches(scopedRoots);
      } else {
        this.fileHashCache = currentFileHashes;
        this.saveFileHashCache();
        this.saveFailedBatches([]);
      }
      this.saveIndexMetadata(configuredProviderInfo);
      this.indexCompatibility = { compatible: true };
      stats.durationMs = Date.now() - startTime;
      onProgress?.({
        phase: "complete",
        filesProcessed: files.length,
        totalFiles: files.length,
        chunksProcessed: 0,
        totalChunks: 0
      });
      this.releaseIndexingLock();
      return stats;
    }
    onProgress?.({
      phase: "embedding",
      filesProcessed: files.length,
      totalFiles: files.length,
      chunksProcessed: 0,
      totalChunks: pendingChunks.length
    });
    const allContentHashes = pendingChunks.map((c) => c.contentHash);
    const missingHashes = new Set(database.getMissingEmbeddings(allContentHashes));
    const forcedReembedChunkIds = forceScopedReembed ? new Set(pendingChunks.map((chunk) => chunk.id)) : /* @__PURE__ */ new Set();
    const chunksNeedingEmbedding = pendingChunks.filter((c) => forcedReembedChunkIds.has(c.id) || missingHashes.has(c.contentHash));
    const chunksWithExistingEmbedding = pendingChunks.filter((c) => !forcedReembedChunkIds.has(c.id) && !missingHashes.has(c.contentHash));
    this.logger.cache("info", "Embedding cache lookup", {
      needsEmbedding: chunksNeedingEmbedding.length,
      fromCache: chunksWithExistingEmbedding.length
    });
    this.logger.recordChunksFromCache(chunksWithExistingEmbedding.length);
    for (const chunk of chunksWithExistingEmbedding) {
      const embeddingBuffer = database.getEmbedding(chunk.contentHash);
      if (embeddingBuffer) {
        const vector = bufferToFloat32Array(embeddingBuffer);
        store.add(chunk.id, Array.from(vector), chunk.metadata);
        invertedIndex.removeChunk(chunk.id);
        invertedIndex.addChunk(chunk.id, chunk.content);
        stats.indexedChunks++;
      }
    }
    const providerRateLimits = this.getProviderRateLimits(configuredProviderInfo.provider);
    const queue = new PQueue({
      concurrency: providerRateLimits.concurrency,
      interval: providerRateLimits.intervalMs,
      intervalCap: providerRateLimits.concurrency
    });
    const pendingChunksById = new Map(chunksNeedingEmbedding.map((chunk) => [chunk.id, chunk]));
    const embeddingPartsByChunk = /* @__PURE__ */ new Map();
    const completedChunkIds = /* @__PURE__ */ new Set();
    const failedChunkIds = /* @__PURE__ */ new Set();
    const requestBatches = createPendingEmbeddingRequestBatches(
      chunksNeedingEmbedding,
      getDynamicBatchOptions(configuredProviderInfo)
    );
    let rateLimitBackoffMs = 0;
    for (const requestBatch of requestBatches) {
      queue.add(async () => {
        if (rateLimitBackoffMs > 0) {
          await new Promise((resolve9) => setTimeout(resolve9, rateLimitBackoffMs));
        }
        try {
          const result = await pRetry(
            async () => {
              const texts = requestBatch.map((request) => request.text);
              return provider.embedBatch(texts);
            },
            {
              retries: this.config.indexing.retries,
              minTimeout: Math.max(this.config.indexing.retryDelayMs, providerRateLimits.minRetryMs),
              maxTimeout: providerRateLimits.maxRetryMs,
              factor: 2,
              shouldRetry: (error) => !(error.error instanceof CustomProviderNonRetryableError),
              onFailedAttempt: (error) => {
                const message = getErrorMessage(error);
                if (isRateLimitError(error)) {
                  rateLimitBackoffMs = Math.min(providerRateLimits.maxRetryMs, (rateLimitBackoffMs || providerRateLimits.minRetryMs) * 2);
                  this.logger.embedding("warn", `Rate limited, backing off`, {
                    attempt: error.attemptNumber,
                    retriesLeft: error.retriesLeft,
                    backoffMs: rateLimitBackoffMs
                  });
                } else {
                  this.logger.embedding("error", `Embedding batch failed`, {
                    attempt: error.attemptNumber,
                    error: message
                  });
                }
              }
            }
          );
          if (rateLimitBackoffMs > 0) {
            rateLimitBackoffMs = Math.max(0, rateLimitBackoffMs - 2e3);
          }
          const touchedChunkIds = /* @__PURE__ */ new Set();
          requestBatch.forEach((request, idx) => {
            if (failedChunkIds.has(request.chunk.id) || completedChunkIds.has(request.chunk.id)) {
              return;
            }
            const vector = result.embeddings[idx];
            if (!vector) {
              throw new Error(`Embedding API returned too few vectors for chunk ${request.chunk.id}`);
            }
            const parts = embeddingPartsByChunk.get(request.chunk.id) ?? [];
            parts[request.partIndex] = {
              vector,
              tokenCount: request.tokenCount
            };
            embeddingPartsByChunk.set(request.chunk.id, parts);
            touchedChunkIds.add(request.chunk.id);
          });
          const pooledResults = [];
          for (const chunkId of touchedChunkIds) {
            if (failedChunkIds.has(chunkId) || completedChunkIds.has(chunkId)) {
              continue;
            }
            const chunk = pendingChunksById.get(chunkId);
            if (!chunk) {
              continue;
            }
            const parts = embeddingPartsByChunk.get(chunk.id) ?? [];
            if (!hasAllEmbeddingParts(parts, chunk.texts.length)) {
              continue;
            }
            const orderedParts = parts;
            pooledResults.push({
              chunk,
              vector: poolEmbeddingVectors(
                orderedParts.map((part) => part.vector),
                orderedParts.map((part) => part.tokenCount)
              )
            });
          }
          if (pooledResults.length > 0) {
            const items = pooledResults.map(({ chunk, vector }) => ({
              id: chunk.id,
              vector,
              metadata: chunk.metadata
            }));
            store.addBatch(items);
            const embeddingBatchItems = pooledResults.map(({ chunk, vector }) => ({
              contentHash: chunk.contentHash,
              embedding: float32ArrayToBuffer(vector),
              chunkText: chunk.storageText,
              model: configuredProviderInfo.modelInfo.model
            }));
            try {
              database.upsertEmbeddingsBatch(embeddingBatchItems);
            } catch (dbError) {
              this.rebuildVectorStoreExcludingChunkIds(
                store,
                database,
                pooledResults.map(({ chunk }) => chunk.id)
              );
              throw dbError;
            }
            for (const { chunk } of pooledResults) {
              invertedIndex.removeChunk(chunk.id);
              invertedIndex.addChunk(chunk.id, chunk.content);
              completedChunkIds.add(chunk.id);
              embeddingPartsByChunk.delete(chunk.id);
            }
            stats.indexedChunks += pooledResults.length;
            this.logger.recordChunksEmbedded(pooledResults.length);
          }
          stats.tokensUsed += result.totalTokensUsed;
          this.logger.recordEmbeddingApiCall(result.totalTokensUsed);
          this.logger.embedding("debug", `Embedded batch`, {
            batchSize: pooledResults.length,
            requestCount: requestBatch.length,
            tokens: result.totalTokensUsed
          });
          onProgress?.({
            phase: "embedding",
            filesProcessed: files.length,
            totalFiles: files.length,
            chunksProcessed: stats.indexedChunks,
            totalChunks: pendingChunks.length
          });
        } catch (error) {
          const failedChunks = getUniquePendingChunksFromRequests(requestBatch).filter((chunk) => !completedChunkIds.has(chunk.id));
          const failureMessage = getErrorMessage(error);
          const failureTimestamp = (/* @__PURE__ */ new Date()).toISOString();
          for (const chunk of failedChunks) {
            if (!failedChunkIds.has(chunk.id)) {
              failedChunkIds.add(chunk.id);
              stats.failedChunks += 1;
            }
            if (forceScopedReembed) {
              failedForcedChunkIds.add(chunk.id);
            }
            embeddingPartsByChunk.delete(chunk.id);
            const existingFailedBatchIndex = failedBatchesForCurrentRun.findIndex(
              (failedBatch2) => failedBatch2.chunks[0]?.id === chunk.id
            );
            const existingFailedBatch = existingFailedBatchIndex === -1 ? void 0 : failedBatchesForCurrentRun[existingFailedBatchIndex];
            const failedBatch = {
              chunks: [chunk],
              error: failureMessage,
              attemptCount: (existingFailedBatch?.attemptCount ?? retryableFailedAttemptCounts.get(chunk.id) ?? 0) + 1,
              lastAttempt: failureTimestamp
            };
            if (existingFailedBatchIndex === -1) {
              failedBatchesForCurrentRun.push(failedBatch);
            } else {
              failedBatchesForCurrentRun[existingFailedBatchIndex] = failedBatch;
            }
          }
          this.logger.recordEmbeddingError();
          this.logger.embedding("error", `Failed to embed batch after retries`, {
            batchSize: failedChunks.length,
            requestCount: requestBatch.length,
            error: failureMessage
          });
        }
      });
    }
    await queue.onIdle();
    if (scopedRoots) {
      this.saveScopedFailedBatches(coalesceFailedBatches(failedBatchesForCurrentRun), scopedRoots);
    } else {
      this.saveFailedBatches(coalesceFailedBatches(failedBatchesForCurrentRun));
    }
    onProgress?.({
      phase: "storing",
      filesProcessed: files.length,
      totalFiles: files.length,
      chunksProcessed: stats.indexedChunks,
      totalChunks: pendingChunks.length
    });
    const branchChunkIds = Array.from(currentChunkIds).filter(
      (chunkId) => {
        const isNewlyFailed = failedChunkIds.has(chunkId) && !retryableChunksWithExistingData.has(chunkId);
        const isForcedFailed = forceScopedReembed && failedForcedChunkIds.has(chunkId);
        return !isNewlyFailed && !isForcedFailed;
      }
    );
    database.clearBranch(branchCatalogKey);
    database.addChunksToBranchBatch(branchCatalogKey, branchChunkIds);
    database.clearBranchSymbols(branchCatalogKey);
    database.addSymbolsToBranchBatch(branchCatalogKey, Array.from(allSymbolIds));
    store.save();
    invertedIndex.save();
    if (scopedRoots) {
      this.replaceScopedFileHashCache(currentFileHashes, scopedRoots);
    } else {
      this.fileHashCache = currentFileHashes;
      this.saveFileHashCache();
    }
    if (this.config.indexing.autoGc && stats.removedChunks > 0) {
      const gcReset = await this.maybeRunOrphanGc();
      if (gcReset) {
        stats.durationMs = Date.now() - startTime;
        stats.warning = gcReset.warning;
        stats.resetCorruptedIndex = true;
        this.logger.recordIndexingEnd();
        this.logger.warn("Indexing ended after resetting corrupted local index during automatic GC", {
          files: stats.totalFiles,
          indexed: stats.indexedChunks,
          existing: stats.existingChunks,
          removed: stats.removedChunks,
          failed: stats.failedChunks,
          tokens: stats.tokensUsed,
          durationMs: stats.durationMs
        });
        return stats;
      }
    }
    stats.durationMs = Date.now() - startTime;
    if (forceScopedReembed && failedForcedChunkIds.size === 0) {
      database.deleteMetadata(this.getProjectForceReembedMetadataKey());
    }
    this.saveIndexMetadata(configuredProviderInfo);
    this.indexCompatibility = { compatible: true };
    this.logger.recordIndexingEnd();
    this.logger.info("Indexing complete", {
      files: stats.totalFiles,
      indexed: stats.indexedChunks,
      existing: stats.existingChunks,
      removed: stats.removedChunks,
      failed: stats.failedChunks,
      tokens: stats.tokensUsed,
      durationMs: stats.durationMs
    });
    if (stats.failedChunks > 0) {
      stats.failedBatchesPath = this.failedBatchesPath;
    }
    onProgress?.({
      phase: "complete",
      filesProcessed: files.length,
      totalFiles: files.length,
      chunksProcessed: stats.indexedChunks,
      totalChunks: pendingChunks.length
    });
    this.releaseIndexingLock();
    return stats;
  }
  async getQueryEmbedding(query, provider) {
    const now = Date.now();
    const cached = this.queryEmbeddingCache.get(query);
    if (cached && now - cached.timestamp < this.queryCacheTtlMs) {
      this.logger.cache("debug", "Query embedding cache hit (exact)", { query: query.slice(0, 50) });
      this.logger.recordQueryCacheHit();
      return cached.embedding;
    }
    const similarMatch = this.findSimilarCachedQuery(query, now);
    if (similarMatch) {
      this.logger.cache("debug", "Query embedding cache hit (similar)", {
        query: query.slice(0, 50),
        similarTo: similarMatch.key.slice(0, 50),
        similarity: similarMatch.similarity.toFixed(3)
      });
      this.logger.recordQueryCacheSimilarHit();
      return similarMatch.embedding;
    }
    this.logger.cache("debug", "Query embedding cache miss", { query: query.slice(0, 50) });
    this.logger.recordQueryCacheMiss();
    const { embedding, tokensUsed } = await provider.embedQuery(query);
    this.logger.recordEmbeddingApiCall(tokensUsed);
    if (this.queryEmbeddingCache.size >= this.maxQueryCacheSize) {
      const oldestKey = this.queryEmbeddingCache.keys().next().value;
      if (oldestKey) {
        this.queryEmbeddingCache.delete(oldestKey);
      }
    }
    this.queryEmbeddingCache.set(query, { embedding, timestamp: now });
    return embedding;
  }
  findSimilarCachedQuery(query, now) {
    const queryTokens = this.tokenize(query);
    if (queryTokens.size === 0) return null;
    let bestMatch = null;
    for (const [cachedQuery, { embedding, timestamp }] of this.queryEmbeddingCache) {
      if (now - timestamp >= this.queryCacheTtlMs) continue;
      const cachedTokens = this.tokenize(cachedQuery);
      const similarity = this.jaccardSimilarity(queryTokens, cachedTokens);
      if (similarity >= this.querySimilarityThreshold) {
        if (!bestMatch || similarity > bestMatch.similarity) {
          bestMatch = { key: cachedQuery, embedding, similarity };
        }
      }
    }
    return bestMatch;
  }
  tokenize(text) {
    return new Set(
      text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((t) => t.length > 1)
    );
  }
  jaccardSimilarity(a, b) {
    if (a.size === 0 && b.size === 0) return 1;
    if (a.size === 0 || b.size === 0) return 0;
    let intersection = 0;
    for (const token of a) {
      if (b.has(token)) intersection++;
    }
    const union = a.size + b.size - intersection;
    return intersection / union;
  }
  async search(query, limit, options) {
    const { store, provider, database } = await this.ensureInitialized();
    const compatibility = this.checkCompatibility();
    if (!compatibility.compatible) {
      throw new Error(
        `${compatibility.reason ?? "Index is incompatible with current embedding provider."} A possible solution is to run index_codebase with force=true to rebuild the index.`
      );
    }
    const searchStartTime = performance2.now();
    if (store.count() === 0) {
      this.logger.search("debug", "Search on empty index", { query });
      return [];
    }
    const maxResults = limit ?? this.config.search.maxResults;
    const hybridWeight = options?.hybridWeight ?? this.config.search.hybridWeight;
    const fusionStrategy = this.config.search.fusionStrategy;
    const rrfK = this.config.search.rrfK;
    const rerankTopN = this.config.search.rerankTopN;
    const filterByBranch = options?.filterByBranch ?? true;
    const sourceIntent = options?.definitionIntent === true || classifyQueryIntentRaw(query) === "source";
    const identifierHints = extractIdentifierHints(query);
    this.logger.search("debug", "Starting search", {
      query,
      maxResults,
      hybridWeight,
      fusionStrategy,
      rrfK,
      rerankTopN,
      filterByBranch
    });
    const embeddingStartTime = performance2.now();
    const embeddingQuery = stripFilePathHint(query);
    const embedding = await this.getQueryEmbedding(embeddingQuery, provider);
    const embeddingMs = performance2.now() - embeddingStartTime;
    const vectorStartTime = performance2.now();
    const semanticResults = store.search(embedding, maxResults * 4);
    const vectorMs = performance2.now() - vectorStartTime;
    const keywordStartTime = performance2.now();
    const keywordResults = await this.keywordSearch(query, maxResults * 4);
    const keywordMs = performance2.now() - keywordStartTime;
    let branchChunkIds = null;
    if (filterByBranch && (this.config.scope === "global" || this.currentBranch !== "default")) {
      branchChunkIds = new Set(
        this.getBranchCatalogKeys().flatMap((branchKey) => database.getBranchChunkIds(branchKey))
      );
    }
    const prefilterStartTime = performance2.now();
    const shouldPrefilterByBranch = branchChunkIds !== null && (this.config.scope === "global" || branchChunkIds.size > 0);
    const allowBranchPrefilterFallback = this.config.scope !== "global";
    const prefilteredSemantic = shouldPrefilterByBranch && branchChunkIds ? semanticResults.filter((r) => branchChunkIds.has(r.id)) : semanticResults;
    const prefilteredKeyword = shouldPrefilterByBranch && branchChunkIds ? keywordResults.filter((r) => branchChunkIds.has(r.id)) : keywordResults;
    const semanticCandidates = allowBranchPrefilterFallback && shouldPrefilterByBranch && semanticResults.length > 0 && prefilteredSemantic.length === 0 ? semanticResults : prefilteredSemantic;
    const keywordCandidates = allowBranchPrefilterFallback && shouldPrefilterByBranch && keywordResults.length > 0 && prefilteredKeyword.length === 0 ? keywordResults : prefilteredKeyword;
    const prefilterMs = performance2.now() - prefilterStartTime;
    if (this.config.scope !== "global" && branchChunkIds && branchChunkIds.size === 0) {
      this.logger.search("warn", "Branch prefilter skipped because branch catalog is empty", {
        branch: this.currentBranch
      });
    }
    if (allowBranchPrefilterFallback && shouldPrefilterByBranch && semanticResults.length > 0 && prefilteredSemantic.length === 0) {
      this.logger.search("warn", "Branch prefilter produced no semantic overlap, using unfiltered semantic candidates", {
        branch: this.currentBranch
      });
    }
    if (allowBranchPrefilterFallback && shouldPrefilterByBranch && keywordResults.length > 0 && prefilteredKeyword.length === 0) {
      this.logger.search("warn", "Branch prefilter produced no keyword overlap, using unfiltered keyword candidates", {
        branch: this.currentBranch
      });
    }
    const fusionStartTime = performance2.now();
    const combined = rankHybridResults(query, semanticCandidates, keywordCandidates, {
      fusionStrategy,
      rrfK,
      rerankTopN,
      limit: maxResults,
      hybridWeight,
      prioritizeSourcePaths: sourceIntent
    });
    const rerankedCombined = await this.rerankCandidatesWithApi(query, combined, {
      definitionIntent: options?.definitionIntent === true,
      hasIdentifierHints: identifierHints.length > 0
    });
    const fusionMs = performance2.now() - fusionStartTime;
    const rescued = promoteIdentifierMatches(
      query,
      rerankedCombined,
      semanticCandidates,
      keywordCandidates,
      database,
      branchChunkIds,
      sourceIntent
    );
    const union = unionCandidates(semanticCandidates, keywordCandidates);
    const deterministicIdentifierLane = buildDeterministicIdentifierPass(
      query,
      union,
      maxResults,
      sourceIntent
    );
    const identifierLane = buildIdentifierDefinitionLane(
      query,
      union,
      maxResults,
      sourceIntent
    );
    const symbolLane = buildSymbolDefinitionLane(
      query,
      database,
      branchChunkIds,
      maxResults,
      union,
      sourceIntent
    );
    const prePrimaryLane = mergeTieredResults(deterministicIdentifierLane, identifierLane, maxResults * 4);
    const primaryLane = mergeTieredResults(prePrimaryLane, symbolLane, maxResults * 4);
    const tiered = mergeTieredResults(primaryLane, rescued, maxResults * 4);
    const hasCodeHints = extractCodeTermHints(query).length > 0 || identifierHints.length > 0;
    const baseFiltered = tiered.filter((r) => matchesSearchFilters(r, options, this.config.search.minScore));
    const implementationOnly = baseFiltered.filter(
      (r) => isLikelyImplementationPath(r.metadata.filePath) && isImplementationChunkType(r.metadata.chunkType)
    );
    const filtered = (sourceIntent && hasCodeHints && implementationOnly.length > 0 ? implementationOnly : baseFiltered).slice(0, maxResults);
    const identifierFallback = !options?.definitionIntent && filtered.length === 0 && identifierHints.length > 0 ? buildSymbolDefinitionLane(query, database, branchChunkIds, maxResults, union, true).filter((r) => matchesSearchFilters(r, options, this.config.search.minScore)).slice(0, maxResults) : [];
    const finalResults = filtered.length > 0 ? filtered : identifierFallback;
    const totalSearchMs = performance2.now() - searchStartTime;
    this.logger.recordSearch(totalSearchMs, {
      embeddingMs,
      vectorMs,
      keywordMs,
      fusionMs
    });
    this.logger.search("info", "Search complete", {
      query,
      results: finalResults.length,
      totalMs: Math.round(totalSearchMs * 100) / 100,
      embeddingMs: Math.round(embeddingMs * 100) / 100,
      vectorMs: Math.round(vectorMs * 100) / 100,
      keywordMs: Math.round(keywordMs * 100) / 100,
      prefilterMs: Math.round(prefilterMs * 100) / 100,
      fusionMs: Math.round(fusionMs * 100) / 100
    });
    const metadataOnly = options?.metadataOnly ?? false;
    return Promise.all(
      finalResults.map(async (r) => {
        let content = "";
        let contextStartLine = r.metadata.startLine;
        let contextEndLine = r.metadata.endLine;
        if (!metadataOnly && this.config.search.includeContext) {
          try {
            const fileContent = await fsPromises2.readFile(
              r.metadata.filePath,
              "utf-8"
            );
            const lines = fileContent.split("\n");
            const contextLines = options?.contextLines ?? this.config.search.contextLines;
            contextStartLine = Math.max(1, r.metadata.startLine - contextLines);
            contextEndLine = Math.min(lines.length, r.metadata.endLine + contextLines);
            content = lines.slice(contextStartLine - 1, contextEndLine).join("\n");
          } catch {
            content = "[File not accessible]";
          }
        }
        return {
          filePath: r.metadata.filePath,
          startLine: contextStartLine,
          endLine: contextEndLine,
          content,
          score: r.score,
          chunkType: r.metadata.chunkType,
          name: r.metadata.name
        };
      })
    );
  }
  async keywordSearch(query, limit) {
    const { store, invertedIndex } = await this.ensureInitialized();
    const scores = invertedIndex.search(query);
    if (scores.size === 0) {
      return [];
    }
    const chunkIds = Array.from(scores.keys());
    const metadataMap = store.getMetadataBatch(chunkIds);
    const results = [];
    for (const [chunkId, score] of scores) {
      const metadata = metadataMap.get(chunkId);
      if (metadata && score > 0) {
        results.push({ id: chunkId, score, metadata });
      }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
  }
  async getStatus() {
    const { store, configuredProviderInfo, database } = await this.ensureInitialized();
    const failedBatchesCount = this.getFailedBatchesCount();
    return {
      indexed: store.count() > 0,
      vectorCount: store.count(),
      provider: configuredProviderInfo.provider,
      model: configuredProviderInfo.modelInfo.model,
      indexPath: this.indexPath,
      currentBranch: this.currentBranch,
      baseBranch: this.baseBranch,
      compatibility: this.indexCompatibility,
      failedBatchesCount,
      failedBatchesPath: failedBatchesCount > 0 ? this.failedBatchesPath : void 0,
      warning: database.getMetadata(STARTUP_WARNING_METADATA_KEY) ?? void 0
    };
  }
  async clearIndex() {
    const { store, invertedIndex, database } = await this.ensureInitialized();
    if (this.config.scope === "global") {
      store.load();
      invertedIndex.load();
      this.loadFileHashCache();
      const roots = this.getScopedRoots();
      const compatibility = this.checkCompatibility();
      const allMetadata = store.getAllMetadata();
      const hasForeignData = allMetadata.some(({ metadata }) => !this.isFileInCurrentScope(metadata.filePath, roots)) || this.hasForeignScopedBranchData() || this.hasForeignScopedFileHashData(roots) || this.hasForeignScopedFailedBatches(roots);
      if (!compatibility.compatible && hasForeignData) {
        if (compatibility.code === "EMBEDDING_STRATEGY_MISMATCH" /* EMBEDDING_STRATEGY_MISMATCH */) {
          this.clearSharedIndexProjectData(store, invertedIndex, database, roots);
          this.clearScopedFileHashCache(roots);
          this.clearScopedFailedBatches(roots);
          database.setMetadata(this.getProjectForceReembedMetadataKey(), "true");
          database.deleteMetadata(this.getProjectEmbeddingStrategyMetadataKey());
          this.indexCompatibility = { compatible: true };
          return;
        }
        throw new Error(
          `Global index compatibility reset is unsafe because the shared index contains files from other projects. The current global index cannot be force-rebuilt for ${this.projectRoot} without deleting other repositories' indexed data. Use scope="project" for isolated rebuilds, or manually delete the shared global index if you intend to rebuild all projects.`
        );
      }
      if (!hasForeignData) {
        store.clear();
        store.save();
        invertedIndex.clear();
        invertedIndex.save();
        this.fileHashCache.clear();
        this.saveFileHashCache();
        database.clearAllIndexedData();
        this.saveFailedBatches([]);
        database.deleteMetadata("index.version");
        database.deleteMetadata("index.embeddingProvider");
        database.deleteMetadata("index.embeddingModel");
        database.deleteMetadata("index.embeddingDimensions");
        database.deleteMetadata("index.embeddingStrategyVersion");
        database.deleteMetadata(this.getProjectEmbeddingStrategyMetadataKey());
        database.deleteMetadata(this.getProjectForceReembedMetadataKey());
        database.deleteMetadata(this.getLegacyMigrationMetadataKey());
        database.deleteMetadata("index.createdAt");
        database.deleteMetadata("index.updatedAt");
        this.indexCompatibility = this.validateIndexCompatibility(this.configuredProviderInfo);
        return;
      }
      this.clearSharedIndexProjectData(store, invertedIndex, database, roots);
      this.clearScopedFileHashCache(roots);
      this.clearScopedFailedBatches(roots);
      this.indexCompatibility = compatibility;
      return;
    }
    const localProjectIndexPath = path8.join(this.projectRoot, ".opencode", "index");
    if (path8.resolve(this.indexPath) !== path8.resolve(localProjectIndexPath)) {
      throw new Error(
        "Project-scoped force rebuild is unsafe while using an inherited worktree index. Create a local project config boundary before clearing the index."
      );
    }
    store.clear();
    store.save();
    invertedIndex.clear();
    invertedIndex.save();
    this.fileHashCache.clear();
    this.saveFileHashCache();
    database.clearAllIndexedData();
    this.saveFailedBatches([]);
    database.deleteMetadata("index.version");
    database.deleteMetadata("index.embeddingProvider");
    database.deleteMetadata("index.embeddingModel");
    database.deleteMetadata("index.embeddingDimensions");
    database.deleteMetadata("index.embeddingStrategyVersion");
    database.deleteMetadata(this.getProjectEmbeddingStrategyMetadataKey());
    database.deleteMetadata(this.getProjectForceReembedMetadataKey());
    database.deleteMetadata(this.getLegacyMigrationMetadataKey());
    database.deleteMetadata("index.createdAt");
    database.deleteMetadata("index.updatedAt");
    this.indexCompatibility = this.validateIndexCompatibility(this.configuredProviderInfo);
  }
  async healthCheck() {
    const { store, invertedIndex, database } = await this.ensureInitialized();
    this.logger.gc("info", "Starting health check");
    const allMetadata = store.getAllMetadata();
    const filePathsToChunkKeys = /* @__PURE__ */ new Map();
    for (const { key, metadata } of allMetadata) {
      const existing = filePathsToChunkKeys.get(metadata.filePath) || [];
      existing.push(key);
      filePathsToChunkKeys.set(metadata.filePath, existing);
    }
    const removedFilePaths = [];
    const removedChunkKeys = [];
    const chunkKeysByRemovedFile = /* @__PURE__ */ new Map();
    for (const [filePath, chunkKeys] of filePathsToChunkKeys) {
      if (!existsSync6(filePath)) {
        chunkKeysByRemovedFile.set(filePath, chunkKeys);
        for (const key of chunkKeys) {
          removedChunkKeys.push(key);
        }
        removedFilePaths.push(filePath);
      }
    }
    if (removedChunkKeys.length > 0) {
      this.rebuildVectorStoreExcludingChunkIds(store, database, removedChunkKeys);
      for (const key of removedChunkKeys) {
        invertedIndex.removeChunk(key);
      }
    }
    for (const filePath of removedFilePaths) {
      const fileChunkKeys = chunkKeysByRemovedFile.get(filePath) ?? [];
      if (fileChunkKeys.length > 0) {
        database.deleteChunksByIds(fileChunkKeys);
      }
      database.deleteCallEdgesByFile(filePath);
      database.deleteSymbolsByFile(filePath);
    }
    const removedCount = removedChunkKeys.length;
    if (removedCount > 0) {
      store.save();
      invertedIndex.save();
    }
    let gcOrphanEmbeddings;
    let gcOrphanChunks;
    let gcOrphanSymbols;
    let gcOrphanCallEdges;
    try {
      gcOrphanEmbeddings = database.gcOrphanEmbeddings();
      gcOrphanChunks = database.gcOrphanChunks();
      gcOrphanSymbols = database.gcOrphanSymbols();
      gcOrphanCallEdges = database.gcOrphanCallEdges();
    } catch (error) {
      if (!await this.tryResetCorruptedIndex("running index health check", error)) {
        throw error;
      }
      await this.ensureInitialized();
      return {
        removed: 0,
        filePaths: [],
        gcOrphanEmbeddings: 0,
        gcOrphanChunks: 0,
        gcOrphanSymbols: 0,
        gcOrphanCallEdges: 0,
        resetCorruptedIndex: true,
        warning: this.getCorruptedIndexWarning(path8.join(this.indexPath, "codebase.db"))
      };
    }
    this.logger.recordGc(removedCount, gcOrphanChunks, gcOrphanEmbeddings);
    this.logger.gc("info", "Health check complete", {
      removedStale: removedCount,
      orphanEmbeddings: gcOrphanEmbeddings,
      orphanChunks: gcOrphanChunks,
      removedFiles: removedFilePaths.length
    });
    return { removed: removedCount, filePaths: removedFilePaths, gcOrphanEmbeddings, gcOrphanChunks, gcOrphanSymbols, gcOrphanCallEdges };
  }
  async retryFailedBatches() {
    const { store, provider, invertedIndex, database, configuredProviderInfo } = await this.ensureInitialized();
    const maxChunkTokens = getSafeEmbeddingChunkTokenLimit(configuredProviderInfo);
    const providerRateLimits = this.getProviderRateLimits(configuredProviderInfo.provider);
    const roots = this.config.scope === "global" ? this.getScopedRoots() : null;
    const { scoped: scopedFailedBatches, retained: retainedFailedBatches } = roots ? this.partitionFailedBatches(roots, maxChunkTokens) : { scoped: this.loadFailedBatches(maxChunkTokens), retained: [] };
    const failedBatches = scopedFailedBatches;
    if (failedBatches.length === 0) {
      return { succeeded: 0, failed: 0, remaining: 0 };
    }
    let succeeded = 0;
    let failed = 0;
    const stillFailing = [];
    for (const batch of failedBatches) {
      const batchChunksById = new Map(batch.chunks.map((chunk) => [chunk.id, chunk]));
      const embeddingPartsByChunk = /* @__PURE__ */ new Map();
      const completedChunkIds = /* @__PURE__ */ new Set();
      const failedChunkIds = /* @__PURE__ */ new Set();
      const failedChunksForBatch = /* @__PURE__ */ new Map();
      const pooledResults = [];
      try {
        const requestBatches = createPendingEmbeddingRequestBatches(
          batch.chunks,
          getDynamicBatchOptions(configuredProviderInfo)
        );
        for (const requestBatch of requestBatches) {
          try {
            const result = await pRetry(
              async () => {
                const texts = requestBatch.map((request) => request.text);
                return provider.embedBatch(texts);
              },
              {
                retries: this.config.indexing.retries,
                minTimeout: Math.max(this.config.indexing.retryDelayMs, providerRateLimits.minRetryMs),
                maxTimeout: providerRateLimits.maxRetryMs,
                factor: 2,
                shouldRetry: (error) => !(error.error instanceof CustomProviderNonRetryableError)
              }
            );
            const touchedChunkIds = /* @__PURE__ */ new Set();
            requestBatch.forEach((request, idx) => {
              if (failedChunkIds.has(request.chunk.id) || completedChunkIds.has(request.chunk.id)) {
                return;
              }
              const vector = result.embeddings[idx];
              if (!vector) {
                throw new Error(`Embedding API returned too few vectors for chunk ${request.chunk.id}`);
              }
              const parts = embeddingPartsByChunk.get(request.chunk.id) ?? [];
              parts[request.partIndex] = {
                vector,
                tokenCount: request.tokenCount
              };
              embeddingPartsByChunk.set(request.chunk.id, parts);
              touchedChunkIds.add(request.chunk.id);
            });
            for (const chunkId of touchedChunkIds) {
              if (failedChunkIds.has(chunkId) || completedChunkIds.has(chunkId)) {
                continue;
              }
              const chunk = batchChunksById.get(chunkId);
              if (!chunk) {
                continue;
              }
              const parts = embeddingPartsByChunk.get(chunk.id) ?? [];
              if (!hasAllEmbeddingParts(parts, chunk.texts.length)) {
                continue;
              }
              const orderedParts = parts;
              pooledResults.push({
                chunk,
                vector: poolEmbeddingVectors(
                  orderedParts.map((part) => part.vector),
                  orderedParts.map((part) => part.tokenCount)
                )
              });
            }
            this.logger.recordEmbeddingApiCall(result.totalTokensUsed);
          } catch (error) {
            const failureMessage = String(error);
            const failureTimestamp = (/* @__PURE__ */ new Date()).toISOString();
            const failedChunks = getUniquePendingChunksFromRequests(requestBatch).filter((chunk) => !completedChunkIds.has(chunk.id) && !failedChunkIds.has(chunk.id));
            for (const chunk of failedChunks) {
              failedChunkIds.add(chunk.id);
              embeddingPartsByChunk.delete(chunk.id);
              failedChunksForBatch.set(chunk.id, {
                chunks: [chunk],
                attemptCount: batch.attemptCount + 1,
                lastAttempt: failureTimestamp,
                error: failureMessage
              });
            }
            failed += failedChunks.length;
            this.logger.recordEmbeddingError();
          }
        }
        const successfulResults = pooledResults.filter(({ chunk }) => !failedChunkIds.has(chunk.id));
        const items = successfulResults.map(({ chunk, vector }) => ({
          id: chunk.id,
          vector,
          metadata: chunk.metadata
        }));
        if (items.length > 0) {
          store.addBatch(items);
        }
        if (successfulResults.length > 0) {
          try {
            database.upsertEmbeddingsBatch(
              successfulResults.map(({ chunk, vector }) => ({
                contentHash: chunk.contentHash,
                embedding: float32ArrayToBuffer(vector),
                chunkText: chunk.storageText,
                model: configuredProviderInfo.modelInfo.model
              }))
            );
          } catch (dbError) {
            this.rebuildVectorStoreExcludingChunkIds(
              store,
              database,
              successfulResults.map(({ chunk }) => chunk.id)
            );
            throw dbError;
          }
        }
        for (const { chunk } of successfulResults) {
          invertedIndex.removeChunk(chunk.id);
          invertedIndex.addChunk(chunk.id, chunk.content);
          completedChunkIds.add(chunk.id);
          embeddingPartsByChunk.delete(chunk.id);
        }
        database.addChunksToBranchBatch(
          this.getBranchCatalogKey(),
          successfulResults.map(({ chunk }) => chunk.id)
        );
        this.logger.recordChunksEmbedded(successfulResults.length);
        succeeded += successfulResults.length;
        stillFailing.push(...failedChunksForBatch.values());
      } catch (error) {
        const failureMessage = getErrorMessage(error);
        const failureTimestamp = (/* @__PURE__ */ new Date()).toISOString();
        const unaccountedChunks = batch.chunks.filter(
          (chunk) => !failedChunksForBatch.has(chunk.id) && !completedChunkIds.has(chunk.id)
        );
        for (const chunk of unaccountedChunks) {
          failedChunksForBatch.set(chunk.id, {
            chunks: [chunk],
            attemptCount: batch.attemptCount + 1,
            lastAttempt: failureTimestamp,
            error: failureMessage
          });
        }
        failed += unaccountedChunks.length;
        this.logger.recordEmbeddingError();
        stillFailing.push(...coalesceFailedBatches(Array.from(failedChunksForBatch.values())));
      }
    }
    const persistedStillFailing = coalesceFailedBatches(stillFailing);
    if (roots) {
      this.saveFailedBatches([...retainedFailedBatches, ...persistedStillFailing]);
    } else {
      this.saveFailedBatches(persistedStillFailing);
    }
    if (succeeded > 0) {
      store.save();
      invertedIndex.save();
    }
    if (roots && succeeded > 0 && persistedStillFailing.length === 0 && this.hasProjectForceReembedPending()) {
      database.deleteMetadata(this.getProjectForceReembedMetadataKey());
      this.saveIndexMetadata(configuredProviderInfo);
      this.indexCompatibility = { compatible: true };
    }
    return { succeeded, failed, remaining: persistedStillFailing.length };
  }
  getFailedBatchesCount() {
    if (this.config.scope === "global") {
      return this.partitionFailedBatches(this.getScopedRoots()).scoped.length;
    }
    return this.loadFailedBatches().length;
  }
  getCurrentBranch() {
    return this.currentBranch;
  }
  getBaseBranch() {
    return this.baseBranch;
  }
  refreshBranchInfo() {
    if (isGitRepo(this.projectRoot)) {
      this.currentBranch = getBranchOrDefault(this.projectRoot);
      this.baseBranch = getBaseBranch(this.projectRoot);
    }
  }
  async getDatabaseStats() {
    const { database } = await this.ensureInitialized();
    return database.getStats();
  }
  getLogger() {
    return this.logger;
  }
  async findSimilar(code, limit = this.config.search.maxResults, options) {
    const { store, provider, database } = await this.ensureInitialized();
    const compatibility = this.checkCompatibility();
    if (!compatibility.compatible) {
      throw new Error(
        `${compatibility.reason ?? "Index is incompatible with current embedding provider."} Run index_codebase with force=true to rebuild the index.`
      );
    }
    const searchStartTime = performance2.now();
    if (store.count() === 0) {
      this.logger.search("debug", "Find similar on empty index");
      return [];
    }
    const filterByBranch = options?.filterByBranch ?? true;
    this.logger.search("debug", "Starting find similar", {
      codeLength: code.length,
      limit,
      filterByBranch
    });
    const embeddingStartTime = performance2.now();
    const { embedding, tokensUsed } = await provider.embedDocument(code);
    const embeddingMs = performance2.now() - embeddingStartTime;
    this.logger.recordEmbeddingApiCall(tokensUsed);
    const vectorStartTime = performance2.now();
    const semanticResults = store.search(embedding, limit * 2);
    const vectorMs = performance2.now() - vectorStartTime;
    let branchChunkIds = null;
    if (filterByBranch && (this.config.scope === "global" || this.currentBranch !== "default")) {
      branchChunkIds = new Set(
        this.getBranchCatalogKeys().flatMap((branchKey) => database.getBranchChunkIds(branchKey))
      );
    }
    const prefilterStartTime = performance2.now();
    const shouldPrefilterByBranch = branchChunkIds !== null && (this.config.scope === "global" || branchChunkIds.size > 0);
    const allowBranchPrefilterFallback = this.config.scope !== "global";
    const prefilteredSemantic = shouldPrefilterByBranch && branchChunkIds ? semanticResults.filter((r) => branchChunkIds.has(r.id)) : semanticResults;
    const semanticCandidates = allowBranchPrefilterFallback && shouldPrefilterByBranch && semanticResults.length > 0 && prefilteredSemantic.length === 0 ? semanticResults : prefilteredSemantic;
    const prefilterMs = performance2.now() - prefilterStartTime;
    if (this.config.scope !== "global" && branchChunkIds && branchChunkIds.size === 0) {
      this.logger.search("warn", "Branch prefilter skipped because branch catalog is empty", {
        branch: this.currentBranch
      });
    }
    if (allowBranchPrefilterFallback && shouldPrefilterByBranch && semanticResults.length > 0 && prefilteredSemantic.length === 0) {
      this.logger.search("warn", "Branch prefilter produced no semantic overlap, using unfiltered semantic candidates", {
        branch: this.currentBranch
      });
    }
    const rerankTopN = this.config.search.rerankTopN;
    const ranked = rankSemanticOnlyResults(code, semanticCandidates, {
      rerankTopN,
      limit,
      prioritizeSourcePaths: false
    });
    const filtered = ranked.filter((r) => {
      if (r.score < this.config.search.minScore) return false;
      if (options?.excludeFile) {
        if (r.metadata.filePath === options.excludeFile) return false;
      }
      if (options?.fileType) {
        const ext = r.metadata.filePath.split(".").pop()?.toLowerCase();
        if (ext !== options.fileType.toLowerCase().replace(/^\./, "")) return false;
      }
      if (options?.directory) {
        const normalizedDir = options.directory.replace(/^\/|\/$/g, "");
        if (!r.metadata.filePath.includes(`/${normalizedDir}/`) && !r.metadata.filePath.includes(`${normalizedDir}/`)) return false;
      }
      if (options?.chunkType) {
        if (r.metadata.chunkType !== options.chunkType) return false;
      }
      return true;
    }).slice(0, limit);
    const totalSearchMs = performance2.now() - searchStartTime;
    this.logger.recordSearch(totalSearchMs, {
      embeddingMs,
      vectorMs,
      keywordMs: 0,
      fusionMs: 0
    });
    this.logger.search("info", "Find similar complete", {
      codeLength: code.length,
      results: filtered.length,
      totalMs: Math.round(totalSearchMs * 100) / 100,
      embeddingMs: Math.round(embeddingMs * 100) / 100,
      vectorMs: Math.round(vectorMs * 100) / 100,
      prefilterMs: Math.round(prefilterMs * 100) / 100
    });
    return Promise.all(
      filtered.map(async (r) => {
        let content = "";
        if (this.config.search.includeContext) {
          try {
            const fileContent = await fsPromises2.readFile(
              r.metadata.filePath,
              "utf-8"
            );
            const lines = fileContent.split("\n");
            content = lines.slice(r.metadata.startLine - 1, r.metadata.endLine).join("\n");
          } catch {
            content = "[File not accessible]";
          }
        }
        return {
          filePath: r.metadata.filePath,
          startLine: r.metadata.startLine,
          endLine: r.metadata.endLine,
          content,
          score: r.score,
          chunkType: r.metadata.chunkType,
          name: r.metadata.name
        };
      })
    );
  }
  async getCallers(targetName) {
    const { database } = await this.ensureInitialized();
    const seen = /* @__PURE__ */ new Set();
    const results = [];
    for (const branchKey of this.getBranchCatalogKeys()) {
      for (const edge of database.getCallersWithContext(targetName, branchKey)) {
        if (!seen.has(edge.id)) {
          seen.add(edge.id);
          results.push(edge);
        }
      }
    }
    return results;
  }
  async getCallees(symbolId) {
    const { database } = await this.ensureInitialized();
    const seen = /* @__PURE__ */ new Set();
    const results = [];
    for (const branchKey of this.getBranchCatalogKeys()) {
      for (const edge of database.getCallees(symbolId, branchKey)) {
        if (!seen.has(edge.id)) {
          seen.add(edge.id);
          results.push(edge);
        }
      }
    }
    return results;
  }
  async close() {
    await this.database?.close();
    this.database = null;
    this.store = null;
    this.invertedIndex = null;
    this.provider = null;
    this.reranker = null;
  }
};

// src/tools/utils.ts
var MAX_CONTENT_LINES = 30;
function truncateContent(content) {
  const lines = content.split("\n");
  if (lines.length <= MAX_CONTENT_LINES) return content;
  return lines.slice(0, MAX_CONTENT_LINES).join("\n") + `
// ... (${lines.length - MAX_CONTENT_LINES} more lines)`;
}
function formatIndexStats(stats, verbose = false) {
  if (stats.resetCorruptedIndex) {
    return stats.warning ?? "Detected a corrupted local index and reset it during indexing. Run index_codebase again to rebuild search data.";
  }
  const lines = [];
  if (stats.failedChunks > 0) {
    lines.push(`INDEXING WARNING: ${stats.failedChunks} chunks failed to embed.`);
    if (stats.failedBatchesPath) {
      lines.push(`Inspect failed batches at: ${stats.failedBatchesPath}`);
    }
    lines.push("");
  }
  if (stats.indexedChunks === 0 && stats.removedChunks === 0) {
    lines.push(`${stats.totalFiles} files processed, ${stats.existingChunks} code chunks already up to date.`);
  } else if (stats.indexedChunks === 0) {
    lines.push(`${stats.totalFiles} files, removed ${stats.removedChunks} stale chunks, ${stats.existingChunks} chunks remain.`);
  } else {
    let main = `${stats.totalFiles} files processed, ${stats.indexedChunks} new chunks embedded.`;
    if (stats.existingChunks > 0) {
      main += ` ${stats.existingChunks} unchanged chunks skipped.`;
    }
    lines.push(main);
    if (stats.removedChunks > 0) {
      lines.push(`Removed ${stats.removedChunks} stale chunks.`);
    }
    if (stats.failedChunks > 0) {
      lines.push(`Failed: ${stats.failedChunks} chunks.`);
    }
    lines.push(`Tokens: ${stats.tokensUsed.toLocaleString()}, Duration: ${(stats.durationMs / 1e3).toFixed(1)}s`);
  }
  if (verbose) {
    if (stats.skippedFiles.length > 0) {
      const tooLarge = stats.skippedFiles.filter((f) => f.reason === "too_large");
      const excluded = stats.skippedFiles.filter((f) => f.reason === "excluded");
      const gitignored = stats.skippedFiles.filter((f) => f.reason === "gitignore");
      lines.push("");
      lines.push(`Skipped files: ${stats.skippedFiles.length}`);
      if (tooLarge.length > 0) {
        lines.push(`  Too large (${tooLarge.length}): ${tooLarge.slice(0, 5).map((f) => f.path).join(", ")}${tooLarge.length > 5 ? "..." : ""}`);
      }
      if (excluded.length > 0) {
        lines.push(`  Excluded (${excluded.length}): ${excluded.slice(0, 5).map((f) => f.path).join(", ")}${excluded.length > 5 ? "..." : ""}`);
      }
      if (gitignored.length > 0) {
        lines.push(`  Gitignored (${gitignored.length}): ${gitignored.slice(0, 5).map((f) => f.path).join(", ")}${gitignored.length > 5 ? "..." : ""}`);
      }
    }
    if (stats.parseFailures.length > 0) {
      lines.push("");
      lines.push(`Files with no extractable chunks (${stats.parseFailures.length}): ${stats.parseFailures.slice(0, 10).join(", ")}${stats.parseFailures.length > 10 ? "..." : ""}`);
    }
  }
  return lines.join("\n");
}
function formatStatus(status) {
  if (!status.indexed) {
    if (status.warning) {
      return status.warning;
    }
    if (status.failedBatchesCount > 0) {
      const lines2 = [
        "Codebase is not indexed. The last indexing run left failed embedding batches.",
        "Fix the provider/model configuration, then rerun index_codebase normally to retry the saved failed batches. Use force=true only for a full rebuild or compatibility reset."
      ];
      if (status.failedBatchesPath) {
        lines2.push(`Failed batches: ${status.failedBatchesPath}`);
      }
      return lines2.join("\n");
    }
    return "Codebase is not indexed. Run index_codebase to create an index.";
  }
  const lines = [
    `Indexed chunks: ${status.vectorCount.toLocaleString()}`,
    `Provider: ${status.provider}`,
    `Model: ${status.model}`,
    `Location: ${status.indexPath}`
  ];
  if (status.currentBranch !== "default") {
    lines.push(`Current branch: ${status.currentBranch}`);
    lines.push(`Base branch: ${status.baseBranch}`);
  }
  if (status.failedBatchesCount > 0) {
    lines.push("");
    lines.push(`INDEXING WARNING: ${status.failedBatchesCount} failed embedding batch${status.failedBatchesCount === 1 ? " remains" : "es remain"}.`);
    if (status.failedBatchesPath) {
      lines.push(`Failed batches: ${status.failedBatchesPath}`);
    }
  }
  if (status.compatibility && !status.compatibility.compatible) {
    lines.push("");
    lines.push(`COMPATIBILITY WARNING: ${status.compatibility.reason}`);
    if (status.compatibility.storedMetadata) {
      const stored = status.compatibility.storedMetadata;
      lines.push(`Index was built with: ${stored.embeddingProvider}/${stored.embeddingModel} (${stored.embeddingDimensions}D)`);
      lines.push(`Current config:       ${status.provider}/${status.model}`);
    }
  } else if (!status.compatibility) {
    lines.push(`Compatibility: No compatibility information found. Maybe the index is not initialized yet, try running index_codebase.`);
  } else {
    lines.push(`Compatibility: Index is compatible with the current provider and model.`);
  }
  return lines.join("\n");
}
function formatProgressTitle(progress) {
  switch (progress.phase) {
    case "scanning":
      return "Scanning files...";
    case "parsing":
      return `Parsing: ${progress.filesProcessed}/${progress.totalFiles} files`;
    case "embedding":
      return `Embedding: ${progress.chunksProcessed}/${progress.totalChunks} chunks`;
    case "storing":
      return "Storing index...";
    case "complete":
      return "Indexing complete";
    default:
      return "Indexing...";
  }
}
function calculatePercentage(progress) {
  if (progress.phase === "scanning") return 0;
  if (progress.phase === "complete") return 100;
  if (progress.phase === "parsing") {
    if (progress.totalFiles === 0) return 5;
    return Math.round(5 + progress.filesProcessed / progress.totalFiles * 15);
  }
  if (progress.phase === "embedding") {
    if (progress.totalChunks === 0) return 20;
    return Math.round(20 + progress.chunksProcessed / progress.totalChunks * 70);
  }
  if (progress.phase === "storing") return 95;
  return 0;
}
function formatCodebasePeek(results) {
  if (results.length === 0) {
    return "No matching code found. Try a different query or run index_codebase first.";
  }
  const formatted = results.map((r, idx) => {
    const location = `${r.filePath}:${r.startLine}-${r.endLine}`;
    const name = r.name ? `"${r.name}"` : "(anonymous)";
    return `[${idx + 1}] ${r.chunkType} ${name} at ${location} (score: ${r.score.toFixed(2)})`;
  });
  return formatted.join("\n");
}
function formatHealthCheck(result) {
  if (result.resetCorruptedIndex) {
    return result.warning ?? "Detected a corrupted local index and reset it. Run index_codebase to rebuild search data.";
  }
  if (result.removed === 0 && result.gcOrphanEmbeddings === 0 && result.gcOrphanChunks === 0 && result.gcOrphanSymbols === 0 && result.gcOrphanCallEdges === 0) {
    return "Index is healthy. No stale entries found.";
  }
  const lines = [];
  if (result.removed > 0) {
    lines.push(`Removed stale entries: ${result.removed}`);
  }
  if (result.gcOrphanEmbeddings > 0) {
    lines.push(`Garbage collected orphan embeddings: ${result.gcOrphanEmbeddings}`);
  }
  if (result.gcOrphanChunks > 0) {
    lines.push(`Garbage collected orphan chunks: ${result.gcOrphanChunks}`);
  }
  if (result.gcOrphanSymbols > 0) {
    lines.push(`Garbage collected orphan symbols: ${result.gcOrphanSymbols}`);
  }
  if (result.gcOrphanCallEdges > 0) {
    lines.push(`Garbage collected orphan call edges: ${result.gcOrphanCallEdges}`);
  }
  if (result.filePaths.length > 0) {
    lines.push(`Cleaned paths: ${result.filePaths.join(", ")}`);
  }
  return lines.join("\n");
}
function formatLogs(logs) {
  if (logs.length === 0) {
    return "No logs recorded yet. Logs are captured during indexing and search operations.";
  }
  return logs.map((l) => {
    const dataStr = l.data ? ` ${JSON.stringify(l.data)}` : "";
    return `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.category}] ${l.message}${dataStr}`;
  }).join("\n");
}
function formatDefinitionLookup(results, query) {
  if (results.length === 0) {
    return `No definition found for "${query}". Try codebase_search for broader discovery, or verify the symbol name.`;
  }
  const formatted = results.map((r, idx) => {
    const header = r.name ? `[${idx + 1}] ${r.chunkType} "${r.name}" in ${r.filePath}:${r.startLine}-${r.endLine}` : `[${idx + 1}] ${r.chunkType} in ${r.filePath}:${r.startLine}-${r.endLine}`;
    return `${header} (score: ${r.score.toFixed(2)})
\`\`\`
${truncateContent(r.content)}
\`\`\``;
  });
  return formatted.join("\n\n");
}
function formatSearchResults(results, scoreFormat = "similarity") {
  const formatted = results.map((r, idx) => {
    const header = r.name ? `[${idx + 1}] ${r.chunkType} "${r.name}" in ${r.filePath}:${r.startLine}-${r.endLine}` : `[${idx + 1}] ${r.chunkType} in ${r.filePath}:${r.startLine}-${r.endLine}`;
    const scoreLabel = scoreFormat === "similarity" ? `(similarity: ${(r.score * 100).toFixed(1)}%)` : `(score: ${r.score.toFixed(2)})`;
    return `${header} ${scoreLabel}
\`\`\`
${truncateContent(r.content)}
\`\`\``;
  });
  return formatted.join("\n\n");
}

// src/tools/index.ts
import { existsSync as existsSync7, writeFileSync as writeFileSync3, mkdirSync as mkdirSync2, statSync as statSync2 } from "fs";
import * as path9 from "path";
var z = tool.schema;
var sharedIndexer = null;
var sharedProjectRoot = "";
function initializeTools(projectRoot, config) {
  sharedProjectRoot = projectRoot;
  sharedIndexer = new Indexer(projectRoot, config);
}
function getSharedIndexer() {
  return getIndexer();
}
function refreshIndexerFromConfig() {
  if (!sharedProjectRoot) {
    throw new Error("Codebase index tools not initialized. Plugin may not be loaded correctly.");
  }
  sharedIndexer = new Indexer(sharedProjectRoot, parseConfig(loadRuntimeConfig()));
}
function shouldForceLocalizeProjectIndex() {
  const currentConfig = parseConfig(loadRuntimeConfig());
  if (currentConfig.scope !== "project") {
    return false;
  }
  const localIndexPath = path9.join(sharedProjectRoot, ".opencode", "index");
  const mainRepoRoot = resolveWorktreeMainRepoRoot(sharedProjectRoot);
  if (!mainRepoRoot) {
    return false;
  }
  const inheritedIndexPath = path9.join(mainRepoRoot, ".opencode", "index");
  return !existsSync7(localIndexPath) && existsSync7(inheritedIndexPath);
}
function getIndexer() {
  if (!sharedIndexer) {
    throw new Error("Codebase index tools not initialized. Plugin may not be loaded correctly.");
  }
  return sharedIndexer;
}
function getConfigPath() {
  return resolveWritableProjectConfigPath(sharedProjectRoot);
}
function normalizeConfigPathValue(value, baseDir) {
  const trimmed = value.trim();
  if (!trimmed) {
    return trimmed;
  }
  const absolutePath = path9.isAbsolute(trimmed) ? trimmed : path9.resolve(baseDir, trimmed);
  return path9.normalize(absolutePath);
}
function serializeConfigPathValue(value, baseDir) {
  const trimmed = value.trim();
  if (!trimmed) {
    return trimmed;
  }
  const normalizeRelativePath = (candidate) => candidate.replace(/\\/g, "/");
  if (!path9.isAbsolute(trimmed)) {
    return normalizeRelativePath(path9.normalize(trimmed));
  }
  const relativePath = path9.relative(baseDir, trimmed);
  if (!relativePath || !relativePath.startsWith("..") && !path9.isAbsolute(relativePath)) {
    return normalizeRelativePath(path9.normalize(relativePath || "."));
  }
  return path9.normalize(trimmed);
}
function normalizeKnowledgeBasePaths(config) {
  const normalized = { ...config };
  if (Array.isArray(normalized.knowledgeBases)) {
    normalized.knowledgeBases = normalized.knowledgeBases.map((kb) => {
      return normalizeConfigPathValue(kb, sharedProjectRoot);
    });
  }
  return normalized;
}
function loadRuntimeConfig() {
  const rawConfig = loadMergedConfig(sharedProjectRoot);
  const config = {};
  if (rawConfig && typeof rawConfig === "object") {
    for (const key of Object.keys(rawConfig)) {
      config[key] = rawConfig[key];
    }
  }
  return normalizeKnowledgeBasePaths(config);
}
function loadEditableConfig() {
  const rawConfig = loadProjectConfigLayer(sharedProjectRoot);
  const config = {};
  if (rawConfig && typeof rawConfig === "object") {
    for (const key of Object.keys(rawConfig)) {
      config[key] = rawConfig[key];
    }
  }
  return normalizeKnowledgeBasePaths(config);
}
function saveConfig(config) {
  const configPath = getConfigPath();
  const configDir = path9.dirname(configPath);
  const configBaseDir = path9.dirname(configDir);
  if (!existsSync7(configDir)) {
    mkdirSync2(configDir, { recursive: true });
  }
  const serializableConfig = { ...config };
  if (Array.isArray(serializableConfig.knowledgeBases)) {
    serializableConfig.knowledgeBases = serializableConfig.knowledgeBases.map(
      (kb) => serializeConfigPathValue(kb, configBaseDir)
    );
  }
  writeFileSync3(configPath, JSON.stringify(serializableConfig, null, 2) + "\n", "utf-8");
}
var codebase_peek = tool({
  description: "Quick lookup of code locations by meaning. Returns only metadata (file, line, name, type) WITHOUT code content. Use this first to find WHERE code is, then use Read tool to examine specific files. Saves tokens by not returning full code blocks. Best for: discovery, navigation, finding multiple related locations.",
  args: {
    query: z.string().describe("Natural language description of what code you're looking for."),
    limit: z.number().optional().default(10).describe("Maximum number of results to return"),
    fileType: z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py', 'rs')"),
    directory: z.string().optional().describe("Filter by directory path (e.g., 'src/utils', 'lib')"),
    chunkType: z.enum(["function", "class", "method", "interface", "type", "enum", "struct", "impl", "trait", "module", "other"]).optional().describe("Filter by code chunk type")
  },
  async execute(args) {
    const indexer = getIndexer();
    const results = await indexer.search(args.query, args.limit ?? 10, {
      fileType: args.fileType,
      directory: args.directory,
      chunkType: args.chunkType,
      metadataOnly: true
    });
    return formatCodebasePeek(results);
  }
});
var index_codebase = tool({
  description: "Index the codebase for semantic search. Creates vector embeddings of code chunks. Incremental - only re-indexes changed files (~50ms when nothing changed). Run before first codebase_search.",
  args: {
    force: z.boolean().optional().default(false).describe("Force reindex even if already indexed"),
    estimateOnly: z.boolean().optional().default(false).describe("Only show cost estimate without indexing"),
    verbose: z.boolean().optional().default(false).describe("Show detailed info about skipped files and parsing failures")
  },
  async execute(args, context) {
    let indexer = getIndexer();
    if (args.estimateOnly) {
      const estimate = await indexer.estimateCost();
      return formatCostEstimate(estimate);
    }
    if (args.force) {
      if (shouldForceLocalizeProjectIndex()) {
        materializeLocalProjectConfig(sharedProjectRoot, loadProjectConfigLayer(sharedProjectRoot));
        refreshIndexerFromConfig();
        indexer = getIndexer();
      }
      await indexer.clearIndex();
    }
    const stats = await indexer.index((progress) => {
      context.metadata({
        title: formatProgressTitle(progress),
        metadata: {
          phase: progress.phase,
          filesProcessed: progress.filesProcessed,
          totalFiles: progress.totalFiles,
          chunksProcessed: progress.chunksProcessed,
          totalChunks: progress.totalChunks,
          percentage: calculatePercentage(progress)
        }
      });
    });
    return formatIndexStats(stats, args.verbose ?? false);
  }
});
var index_status = tool({
  description: "Check the status of the codebase index. Shows whether the codebase is indexed, how many chunks are stored, and the embedding provider being used.",
  args: {},
  async execute() {
    const indexer = getIndexer();
    const status = await indexer.getStatus();
    return formatStatus(status);
  }
});
var index_health_check = tool({
  description: "Check index health and remove stale entries from deleted files. Run this to clean up the index after files have been deleted.",
  args: {},
  async execute() {
    const indexer = getIndexer();
    const result = await indexer.healthCheck();
    return formatHealthCheck(result);
  }
});
var index_metrics = tool({
  description: "Get metrics and performance statistics for the codebase index. Shows indexing stats, search timings, cache hit rates, and API usage. Requires debug.enabled=true and debug.metrics=true in config.",
  args: {},
  async execute() {
    const indexer = getIndexer();
    const logger = indexer.getLogger();
    if (!logger.isEnabled()) {
      return 'Debug mode is disabled. Enable it in your config:\n\n```json\n{\n  "debug": {\n    "enabled": true,\n    "metrics": true\n  }\n}\n```';
    }
    if (!logger.isMetricsEnabled()) {
      return 'Metrics collection is disabled. Enable it in your config:\n\n```json\n{\n  "debug": {\n    "enabled": true,\n    "metrics": true\n  }\n}\n```';
    }
    return logger.formatMetrics();
  }
});
var index_logs = tool({
  description: "Get recent debug logs from the codebase indexer. Shows timestamped log entries with level and category. Requires debug.enabled=true in config.",
  args: {
    limit: z.number().optional().default(20).describe("Maximum number of log entries to return"),
    category: z.enum(["search", "embedding", "cache", "gc", "branch", "general"]).optional().describe("Filter by log category"),
    level: z.enum(["error", "warn", "info", "debug"]).optional().describe("Filter by minimum log level")
  },
  async execute(args) {
    const indexer = getIndexer();
    const logger = indexer.getLogger();
    if (!logger.isEnabled()) {
      return 'Debug mode is disabled. Enable it in your config:\n\n```json\n{\n  "debug": {\n    "enabled": true\n  }\n}\n```';
    }
    let logs;
    if (args.category) {
      logs = logger.getLogsByCategory(args.category, args.limit);
    } else if (args.level) {
      logs = logger.getLogsByLevel(args.level, args.limit);
    } else {
      logs = logger.getLogs(args.limit);
    }
    return formatLogs(logs);
  }
});
var find_similar = tool({
  description: "Find code similar to a given snippet. Use for duplicate detection, pattern discovery, or refactoring prep. Paste code and find semantically similar implementations elsewhere in the codebase.",
  args: {
    code: z.string().describe("The code snippet to find similar code for"),
    limit: z.number().optional().default(10).describe("Maximum number of results to return"),
    fileType: z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py', 'rs')"),
    directory: z.string().optional().describe("Filter by directory path (e.g., 'src/utils', 'lib')"),
    chunkType: z.enum(["function", "class", "method", "interface", "type", "enum", "struct", "impl", "trait", "module", "other"]).optional().describe("Filter by code chunk type"),
    excludeFile: z.string().optional().describe("Exclude results from this file path (useful when searching for duplicates of code from a specific file)")
  },
  async execute(args) {
    const indexer = getIndexer();
    const results = await indexer.findSimilar(args.code, args.limit, {
      fileType: args.fileType,
      directory: args.directory,
      chunkType: args.chunkType,
      excludeFile: args.excludeFile
    });
    if (results.length === 0) {
      return "No similar code found. Try a different snippet or run index_codebase first.";
    }
    return formatSearchResults(results);
  }
});
var codebase_search = tool({
  description: "Search codebase by MEANING, not keywords. Returns full code content. Use when you need to see actual implementation. For just finding WHERE code is (saves ~90% tokens), use codebase_peek instead. For known identifiers like 'validateToken', use grep - it's faster.",
  args: {
    query: z.string().describe("Natural language description of what code you're looking for. Describe behavior, not syntax."),
    limit: z.number().optional().default(5).describe("Maximum number of results to return"),
    fileType: z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py', 'rs')"),
    directory: z.string().optional().describe("Filter by directory path (e.g., 'src/utils', 'lib')"),
    chunkType: z.enum(["function", "class", "method", "interface", "type", "enum", "struct", "impl", "trait", "module", "other"]).optional().describe("Filter by code chunk type"),
    contextLines: z.number().optional().describe("Number of extra lines to include before/after each match (default: 0)")
  },
  async execute(args) {
    const indexer = getIndexer();
    const results = await indexer.search(args.query, args.limit ?? 5, {
      fileType: args.fileType,
      directory: args.directory,
      chunkType: args.chunkType,
      contextLines: args.contextLines
    });
    if (results.length === 0) {
      return "No matching code found. Try a different query or run index_codebase first.";
    }
    return formatSearchResults(results, "score");
  }
});
var implementation_lookup = tool({
  description: "Jump to symbol definition. Find WHERE something is defined. Returns the authoritative source location(s) for a function, class, method, type, or variable. Prefers real implementation files over tests, docs, examples, and fixtures. Use when you need the definition site, not all usages.",
  args: {
    query: z.string().describe("Symbol name or natural language description (e.g., 'validateToken', 'where is the payment handler defined')"),
    limit: z.number().optional().default(5).describe("Maximum number of results"),
    fileType: z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py')"),
    directory: z.string().optional().describe("Filter by directory path (e.g., 'src/utils')")
  },
  async execute(args) {
    const indexer = getIndexer();
    const results = await indexer.search(args.query, args.limit ?? 5, {
      fileType: args.fileType,
      directory: args.directory,
      definitionIntent: true
    });
    return formatDefinitionLookup(results, args.query);
  }
});
var call_graph = tool({
  description: "Query the call graph to find callers or callees of a function/method. Use to understand code flow and dependencies between functions.",
  args: {
    name: z.string().describe("Function or method name to query"),
    direction: z.enum(["callers", "callees"]).default("callers").describe("Direction: 'callers' finds who calls this function, 'callees' finds what this function calls"),
    symbolId: z.string().optional().describe("Symbol ID (required for 'callees' direction, returned by previous call_graph queries)")
  },
  async execute(args) {
    const indexer = getIndexer();
    if (args.direction === "callees") {
      if (!args.symbolId) {
        return "Error: 'symbolId' is required when direction is 'callees'. First use direction='callers' to find the symbol ID.";
      }
      const callees = await indexer.getCallees(args.symbolId);
      if (callees.length === 0) {
        return `No callees found for symbol ${args.symbolId}. The function may not call any other tracked functions.`;
      }
      const formatted2 = callees.map(
        (e, i) => `[${i + 1}] \u2192 ${e.targetName} (${e.callType}) at line ${e.line}${e.isResolved ? ` [resolved: ${e.toSymbolId}]` : " [unresolved]"}`
      );
      return formatted2.join("\n");
    }
    const callers = await indexer.getCallers(args.name);
    if (callers.length === 0) {
      return `No callers found for "${args.name}". It may not be called by any tracked function, or the index needs updating.`;
    }
    const formatted = callers.map(
      (e, i) => `[${i + 1}] \u2190 from ${e.fromSymbolName ?? "<unknown>"} in ${e.fromSymbolFilePath ?? "<unknown file>"} [${e.fromSymbolId}] (${e.callType}) at line ${e.line}${e.isResolved ? " [resolved]" : " [unresolved]"}`
    );
    return formatted.join("\n");
  }
});
var add_knowledge_base = tool({
  description: "Add a folder as a knowledge base to the semantic search index. The folder will be indexed alongside the main project code. Supports absolute paths or relative paths (relative to the project root).",
  args: {
    path: z.string().describe("Path to the folder to add as a knowledge base (absolute or relative to project root)")
  },
  async execute(args) {
    const inputPath = args.path.trim();
    const resolvedPath = path9.isAbsolute(inputPath) ? inputPath : path9.resolve(sharedProjectRoot, inputPath);
    if (!existsSync7(resolvedPath)) {
      return `Error: Directory does not exist: ${resolvedPath}`;
    }
    try {
      const stat4 = statSync2(resolvedPath);
      if (!stat4.isDirectory()) {
        return `Error: Path is not a directory: ${resolvedPath}`;
      }
    } catch (error) {
      return `Error: Cannot access directory: ${resolvedPath} - ${error instanceof Error ? error.message : String(error)}`;
    }
    const config = loadEditableConfig();
    const knowledgeBases = Array.isArray(config.knowledgeBases) ? config.knowledgeBases : [];
    const normalizedPath = path9.normalize(resolvedPath);
    const alreadyExists = knowledgeBases.some(
      (kb) => path9.normalize(path9.isAbsolute(kb) ? kb : path9.resolve(sharedProjectRoot, kb)) === normalizedPath
    );
    if (alreadyExists) {
      return `Knowledge base already configured: ${resolvedPath}`;
    }
    knowledgeBases.push(resolvedPath);
    config.knowledgeBases = knowledgeBases;
    saveConfig(config);
    refreshIndexerFromConfig();
    let result = `${resolvedPath}
`;
    result += `Total knowledge bases: ${knowledgeBases.length}
`;
    result += `Config saved to: ${getConfigPath()}
`;
    result += `
Run /index to rebuild the index with the new knowledge base.`;
    return result;
  }
});
var list_knowledge_bases = tool({
  description: "List all configured knowledge base folders that are indexed alongside the main project.",
  args: {},
  async execute() {
    const config = loadRuntimeConfig();
    const knowledgeBases = Array.isArray(config.knowledgeBases) ? config.knowledgeBases : [];
    if (knowledgeBases.length === 0) {
      return "No knowledge bases configured. Use add_knowledge_base to add folders.";
    }
    let result = `Knowledge Bases (${knowledgeBases.length}):

`;
    for (let i = 0; i < knowledgeBases.length; i++) {
      const kb = knowledgeBases[i];
      const resolvedPath = path9.isAbsolute(kb) ? kb : path9.resolve(sharedProjectRoot, kb);
      const exists = existsSync7(resolvedPath);
      result += `[${i + 1}] ${kb}
`;
      result += `    Resolved: ${resolvedPath}
`;
      result += `    Status: ${exists ? "Exists" : "NOT FOUND"}
`;
      if (exists) {
        try {
          const stat4 = statSync2(resolvedPath);
          result += `    Type: ${stat4.isDirectory() ? "Directory" : "File"}
`;
        } catch {
        }
      }
      result += "\n";
    }
    result += `Config file: ${getConfigPath()}`;
    return result;
  }
});
var remove_knowledge_base = tool({
  description: "Remove a knowledge base folder from the semantic search index.",
  args: {
    path: z.string().describe("Path of the knowledge base to remove (must match the configured path exactly)")
  },
  async execute(args) {
    const inputPath = args.path.trim();
    const config = loadEditableConfig();
    const knowledgeBases = Array.isArray(config.knowledgeBases) ? config.knowledgeBases : [];
    if (knowledgeBases.length === 0) {
      return "No knowledge bases configured.";
    }
    const normalizedInput = path9.normalize(inputPath);
    const index = knowledgeBases.findIndex(
      (kb) => path9.normalize(kb) === normalizedInput || path9.normalize(path9.isAbsolute(kb) ? kb : path9.resolve(sharedProjectRoot, kb)) === normalizedInput
    );
    if (index === -1) {
      let result2 = `Knowledge base not found: ${inputPath}

`;
      result2 += `Currently configured:
`;
      for (const kb of knowledgeBases) {
        result2 += `  - ${kb}
`;
      }
      return result2;
    }
    const removed = knowledgeBases.splice(index, 1)[0];
    config.knowledgeBases = knowledgeBases;
    saveConfig(config);
    refreshIndexerFromConfig();
    let result = `Removed: ${removed}

`;
    result += `Remaining knowledge bases: ${knowledgeBases.length}
`;
    result += `Config saved to: ${getConfigPath()}
`;
    result += `
Run /index to rebuild the index without the removed knowledge base.`;
    return result;
  }
});

// src/commands/loader.ts
import { existsSync as existsSync8, readdirSync as readdirSync2, readFileSync as readFileSync6 } from "fs";
import * as path10 from "path";
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  if (!match) {
    return { frontmatter: {}, body: content.trim() };
  }
  const frontmatterLines = match[1].split("\n");
  const frontmatter = {};
  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }
  return { frontmatter, body: match[2].trim() };
}
function loadCommandsFromDirectory(commandsDir) {
  const commands = /* @__PURE__ */ new Map();
  if (!existsSync8(commandsDir)) {
    return commands;
  }
  const files = readdirSync2(commandsDir).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const filePath = path10.join(commandsDir, file);
    const content = readFileSync6(filePath, "utf-8");
    const { frontmatter, body } = parseFrontmatter(content);
    const name = path10.basename(file, ".md");
    const description = frontmatter.description || `Run the ${name} command`;
    commands.set(name, {
      description,
      template: body
    });
  }
  return commands;
}

// src/routing-hints.ts
var EXTERNAL_HINTS = [
  "docs",
  "documentation",
  "official docs",
  "github example",
  "github examples",
  "github repo",
  "github repository",
  "web search",
  "website",
  "url",
  "npm",
  "pypi",
  "crate",
  "library",
  "package",
  "framework",
  "context7",
  "stackoverflow"
];
var NON_DISCOVERY_HINTS = [
  "commit",
  "rebase",
  "push",
  "pull request",
  "pr",
  "lint",
  "typecheck",
  "build",
  "test",
  "release",
  "deploy",
  "screenshot",
  "browser",
  "open the website"
];
var CONCEPTUAL_DISCOVERY_HINTS = [
  "where is",
  "where are",
  "which file",
  "what file",
  "how does",
  "how do we",
  "how is",
  "find the code",
  "find code",
  "find where",
  "find logic",
  "implementation",
  "implements",
  "handler",
  "flow",
  "logic",
  "middleware",
  "parser",
  "validation",
  "rate limiting",
  "error handling",
  "auth flow",
  "responsible for",
  "similar code",
  "pattern",
  "code that"
];
var DEFINITION_HINTS = [
  "defined",
  "definition",
  "jump to",
  "definition site",
  "authoritative definition"
];
var EXACT_MATCH_HINTS = [
  "exact",
  "all references",
  "all occurrences",
  "literal",
  "regex",
  "grep",
  "identifier",
  "symbol",
  "named",
  "definition of"
];
var FILE_PATH_PATTERN = /(?:^|\s)(?:\.?\.?\/)?[\w.-]+(?:\/[\w.-]+)+/;
var URL_PATTERN = /https?:\/\//;
var CAMEL_OR_PASCAL_PATTERN = /\b[A-Za-z_$][A-Za-z0-9_$]*\b/g;
var SNAKE_PATTERN = /\b[a-z0-9]+_[a-z0-9_]+\b/g;
var KEBAB_PATTERN = /\b[a-z0-9]+-[a-z0-9-]+\b/g;
var BACKTICK_IDENTIFIER_PATTERN = /`([^`]+)`/g;
var BACKTICK_IDENTIFIER_PRESENCE_PATTERN = /`([^`]+)`/;
function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}
function includesHint(text, hints) {
  return hints.some((hint) => text.includes(hint));
}
function countWords(text) {
  if (!text) {
    return 0;
  }
  return text.split(/\s+/).filter(Boolean).length;
}
function hasIdentifierShape(text) {
  const matches = [
    ...text.match(CAMEL_OR_PASCAL_PATTERN) ?? [],
    ...text.match(SNAKE_PATTERN) ?? [],
    ...text.match(KEBAB_PATTERN) ?? [],
    ...Array.from(text.matchAll(BACKTICK_IDENTIFIER_PATTERN), (match) => match[1])
  ];
  return matches.some((match) => {
    if (match.length < 3) {
      return false;
    }
    return /[A-Z]/.test(match) || match.includes("_") || match.includes("-") || /`/.test(match);
  });
}
function containsQuotedIdentifier(text) {
  return BACKTICK_IDENTIFIER_PRESENCE_PATTERN.test(text) || /"[^"]+"/.test(text) || /'[^']+'/.test(text);
}
function looksLikeDirectPath(text) {
  return FILE_PATH_PATTERN.test(text) || /\b[a-z0-9_-]+\.(ts|tsx|js|jsx|rs|py|go|java|json|md|yaml|yml)\b/i.test(text);
}
function extractUserText(parts) {
  return normalizeText(
    parts.filter((part) => part.type === "text" && typeof part.text === "string").map((part) => part.text ?? "").join(" ")
  );
}
function assessRoutingIntent(text) {
  const normalizedText = normalizeText(text);
  const lowered = normalizedText.toLowerCase();
  if (!lowered) {
    return {
      intent: "other",
      text: normalizedText,
      reason: "empty_text"
    };
  }
  if (URL_PATTERN.test(lowered) || includesHint(lowered, EXTERNAL_HINTS)) {
    return {
      intent: "external",
      text: normalizedText,
      reason: "external_lookup"
    };
  }
  const hasConceptualHint = includesHint(lowered, CONCEPTUAL_DISCOVERY_HINTS);
  const hasDefinitionHint = includesHint(lowered, DEFINITION_HINTS);
  const hasExactMatchHint = includesHint(lowered, EXACT_MATCH_HINTS);
  const hasNonDiscoveryHint = includesHint(lowered, NON_DISCOVERY_HINTS);
  const hasIdentifier = hasIdentifierShape(normalizedText);
  const hasQuotedIdentifier = containsQuotedIdentifier(normalizedText);
  const shortQuery = countWords(lowered) <= 10;
  if (hasNonDiscoveryHint && !hasConceptualHint) {
    return {
      intent: "other",
      text: normalizedText,
      reason: "non_discovery_task"
    };
  }
  if (looksLikeDirectPath(normalizedText)) {
    return {
      intent: "direct_path",
      text: normalizedText,
      reason: "direct_path_reference"
    };
  }
  if ((hasDefinitionHint || lowered.includes("where is") || lowered.includes("where are")) && (lowered.includes("defined") || lowered.includes("definition"))) {
    return {
      intent: "definition_lookup",
      text: normalizedText,
      reason: "definition_lookup_request"
    };
  }
  if ((hasExactMatchHint || hasQuotedIdentifier || hasIdentifier) && !hasConceptualHint && shortQuery) {
    return {
      intent: "exact_identifier",
      text: normalizedText,
      reason: hasExactMatchHint || hasQuotedIdentifier ? "exact_match_request" : "identifier_shaped_query"
    };
  }
  if (hasConceptualHint) {
    return {
      intent: "local_conceptual",
      text: normalizedText,
      reason: "conceptual_local_discovery"
    };
  }
  return {
    intent: "other",
    text: normalizedText,
    reason: "no_local_discovery_signal"
  };
}
function buildRoutingHint(assessment, status) {
  if (assessment.intent === "definition_lookup") {
    if (!status || !status.indexed || status.compatibility?.compatible === false) {
      return "For this turn, if you need a symbol definition, check `index_status` first and run `index_codebase` if the index is missing or incompatible. Then use `implementation_lookup` for the definition site. Use `grep` for exhaustive literal matches.";
    }
    return "For this turn, prefer `implementation_lookup` to find the authoritative definition site. Use `codebase_search` only if no definition is found, and use `grep` for exhaustive literal matches.";
  }
  if (assessment.intent !== "local_conceptual") {
    return null;
  }
  if (!status || !status.indexed || status.compatibility?.compatible === false) {
    return "For this turn, if local code discovery by behavior is needed, check `index_status` first and run `index_codebase` if the index is missing or incompatible. Use `grep` for exact identifiers or exhaustive matches.";
  }
  return "For this turn, prefer `codebase_peek` for local code discovery by behavior or likely location, then use `codebase_search` when you need implementation content. Use `grep` for exact identifiers or exhaustive matches.";
}
var RoutingHintController = class {
  constructor(getStatus, maxSessions = 200) {
    this.getStatus = getStatus;
    this.maxSessions = maxSessions;
  }
  sessionState = /* @__PURE__ */ new Map();
  observeUserMessage(sessionID, parts) {
    const assessment = assessRoutingIntent(extractUserText(parts));
    this.compactSessions();
    this.sessionState.set(sessionID, {
      assessment,
      pendingHint: assessment.intent === "local_conceptual" || assessment.intent === "definition_lookup",
      updatedAt: Date.now()
    });
    return assessment;
  }
  async getSystemHints(sessionID) {
    if (!sessionID) {
      return [];
    }
    const state = this.sessionState.get(sessionID);
    if (!state || !state.pendingHint) {
      return [];
    }
    const status = await this.safeGetStatus();
    const hint = buildRoutingHint(state.assessment, status);
    return hint ? [hint] : [];
  }
  markToolUsed(sessionID, toolName) {
    const state = this.sessionState.get(sessionID);
    if (!state || !state.pendingHint) {
      return;
    }
    if (toolName === "codebase_peek" || toolName === "codebase_search" || toolName === "implementation_lookup" || toolName === "index_status" || toolName === "index_codebase") {
      state.pendingHint = false;
      state.updatedAt = Date.now();
      this.sessionState.set(sessionID, state);
    }
  }
  getSessionState(sessionID) {
    return this.sessionState.get(sessionID);
  }
  async safeGetStatus() {
    try {
      return await this.getStatus();
    } catch {
      return null;
    }
  }
  compactSessions() {
    if (this.sessionState.size < this.maxSessions) {
      return;
    }
    const oldestSession = [...this.sessionState.entries()].sort((left, right) => left[1].updatedAt - right[1].updatedAt).at(0);
    if (oldestSession) {
      this.sessionState.delete(oldestSession[0]);
    }
  }
};

// src/index.ts
var activeWatcher = null;
function replaceActiveWatcher(nextWatcher) {
  activeWatcher?.stop();
  activeWatcher = nextWatcher;
}
function getCommandsDir() {
  let currentDir = process.cwd();
  if (typeof import.meta !== "undefined" && import.meta.url) {
    currentDir = path11.dirname(fileURLToPath2(import.meta.url));
  }
  return path11.join(currentDir, "..", "commands");
}
var plugin = async ({ directory }) => {
  try {
    const projectRoot = directory;
    const rawConfig = loadMergedConfig(projectRoot);
    const config = parseConfig(rawConfig);
    initializeTools(projectRoot, config);
    const indexer = getSharedIndexer();
    const routingHints = config.search.routingHints ? new RoutingHintController(() => indexer.getStatus()) : null;
    const isValidProject = !config.indexing.requireProjectMarker || hasProjectMarker(projectRoot);
    if (!isValidProject) {
      console.warn(
        `[codebase-index] Skipping file watching and auto-indexing: no project marker found in "${projectRoot}". Set "indexing.requireProjectMarker": false in config to override.`
      );
    }
    if (config.indexing.autoIndex && isValidProject) {
      indexer.initialize().then(() => {
        indexer.index().catch(() => {
        });
      }).catch(() => {
      });
    }
    if (config.indexing.watchFiles && isValidProject) {
      replaceActiveWatcher(createWatcherWithIndexer(getSharedIndexer, projectRoot, config));
    } else {
      replaceActiveWatcher(null);
    }
    return {
      tool: {
        codebase_search,
        codebase_peek,
        index_codebase,
        index_status,
        index_health_check,
        index_metrics,
        index_logs,
        find_similar,
        call_graph,
        implementation_lookup,
        add_knowledge_base,
        list_knowledge_bases,
        remove_knowledge_base
      },
      async "chat.message"(input, output) {
        routingHints?.observeUserMessage(input.sessionID, output.parts);
      },
      async "experimental.chat.system.transform"(input, output) {
        const hints = await routingHints?.getSystemHints(input.sessionID) ?? [];
        output.system.push(...hints);
      },
      async "tool.execute.after"(input) {
        routingHints?.markToolUsed(input.sessionID, input.tool);
      },
      async config(cfg) {
        cfg.command = cfg.command ?? {};
        const commandsDir = getCommandsDir();
        const commands = loadCommandsFromDirectory(commandsDir);
        for (const [name, definition] of commands) {
          cfg.command[name] = definition;
        }
      }
    };
  } catch (error) {
    console.error("[codebase-index] Failed to initialize plugin:", error);
    return {
      tool: void 0,
      async config() {
      }
    };
  }
};
var index_default = plugin;
export {
  index_default as default
};
/*! Bundled license information:

chokidar/index.js:
  (*! chokidar - MIT License (c) 2012 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=index.js.map