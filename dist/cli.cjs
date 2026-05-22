#!/usr/bin/env node
// opencode-codebase-index - Semantic codebase search for OpenCode
"use strict";
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

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports2, module3) {
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
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
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
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
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
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
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
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
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
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module3) {
      module3.exports = EventEmitter2;
    }
  }
});

// node_modules/ignore/index.js
var require_ignore = __commonJS({
  "node_modules/ignore/index.js"(exports2, module3) {
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
    var SLASH = "/";
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
      test(path13, checkUnignored, mode) {
        let ignored = false;
        let unignored = false;
        let matchedRule;
        this._rules.forEach((rule) => {
          const { negative } = rule;
          if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
            return;
          }
          const matched = rule[mode].test(path13);
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
    var checkPath = (path13, originalPath, doThrow) => {
      if (!isString(path13)) {
        return doThrow(
          `path must be a string, but got \`${originalPath}\``,
          TypeError
        );
      }
      if (!path13) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path13)) {
        const r = "`path.relative()`d";
        return doThrow(
          `path should be a ${r} string, but got "${originalPath}"`,
          RangeError
        );
      }
      return true;
    };
    var isNotRelative = (path13) => REGEX_TEST_INVALID_PATH.test(path13);
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
        const path13 = originalPath && checkPath.convert(originalPath);
        checkPath(
          path13,
          originalPath,
          this._strictPathCheck ? throwError : RETURN_FALSE
        );
        return this._t(path13, cache, checkUnignored, slices);
      }
      checkIgnore(path13) {
        if (!REGEX_TEST_TRAILING_SLASH.test(path13)) {
          return this.test(path13);
        }
        const slices = path13.split(SLASH).filter(Boolean);
        slices.pop();
        if (slices.length) {
          const parent = this._t(
            slices.join(SLASH) + SLASH,
            this._testCache,
            true,
            slices
          );
          if (parent.ignored) {
            return parent;
          }
        }
        return this._rules.test(path13, false, MODE_CHECK_IGNORE);
      }
      _t(path13, cache, checkUnignored, slices) {
        if (path13 in cache) {
          return cache[path13];
        }
        if (!slices) {
          slices = path13.split(SLASH).filter(Boolean);
        }
        slices.pop();
        if (!slices.length) {
          return cache[path13] = this._rules.test(path13, checkUnignored, MODE_IGNORE);
        }
        const parent = this._t(
          slices.join(SLASH) + SLASH,
          cache,
          checkUnignored,
          slices
        );
        return cache[path13] = parent.ignored ? parent : this._rules.test(path13, checkUnignored, MODE_IGNORE);
      }
      ignores(path13) {
        return this._test(path13, this._ignoreCache, false).ignored;
      }
      createFilter() {
        return (path13) => !this.ignores(path13);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path13) {
        return this._test(path13, this._testCache, true);
      }
    };
    var factory = (options) => new Ignore2(options);
    var isPathValid = (path13) => checkPath(path13 && checkPath.convert(path13), path13, RETURN_FALSE);
    var setupWindows = () => {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGEX_TEST_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path13) => REGEX_TEST_WINDOWS_PATH_ABSOLUTE.test(path13) || isNotRelative(path13);
    };
    if (
      // Detect `process` so that it can run in browsers.
      typeof process !== "undefined" && process.platform === "win32"
    ) {
      setupWindows();
    }
    module3.exports = factory;
    factory.default = factory;
    module3.exports.isPathValid = isPathValid;
    define(module3.exports, /* @__PURE__ */ Symbol.for("setupWindows"), setupWindows);
  }
});

// src/cli.ts
var import_stdio = require("@modelcontextprotocol/sdk/server/stdio.js");
var path12 = __toESM(require("path"), 1);

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

// src/eval/cli.ts
var path10 = __toESM(require("path"), 1);

// src/eval/compare.ts
function metricDelta(current, baseline) {
  const absolute = current - baseline;
  const relativePct = baseline === 0 ? current === 0 ? 0 : 100 : absolute / baseline * 100;
  return {
    current,
    baseline,
    absolute,
    relativePct
  };
}
function compareSummaries(current, baseline, againstPath) {
  return {
    againstPath,
    deltas: {
      hitAt1: metricDelta(current.metrics.hitAt1, baseline.metrics.hitAt1),
      hitAt3: metricDelta(current.metrics.hitAt3, baseline.metrics.hitAt3),
      hitAt5: metricDelta(current.metrics.hitAt5, baseline.metrics.hitAt5),
      hitAt10: metricDelta(current.metrics.hitAt10, baseline.metrics.hitAt10),
      mrrAt10: metricDelta(current.metrics.mrrAt10, baseline.metrics.mrrAt10),
      ndcgAt10: metricDelta(current.metrics.ndcgAt10, baseline.metrics.ndcgAt10),
      distinctTop3Ratio: metricDelta(current.metrics.distinctTop3Ratio, baseline.metrics.distinctTop3Ratio),
      rawDistinctTop3Ratio: metricDelta(current.metrics.rawDistinctTop3Ratio, baseline.metrics.rawDistinctTop3Ratio),
      latencyP50Ms: metricDelta(current.metrics.latencyMs.p50, baseline.metrics.latencyMs.p50),
      latencyP95Ms: metricDelta(current.metrics.latencyMs.p95, baseline.metrics.latencyMs.p95),
      latencyP99Ms: metricDelta(current.metrics.latencyMs.p99, baseline.metrics.latencyMs.p99),
      embeddingCallCount: metricDelta(
        current.metrics.embedding.callCount,
        baseline.metrics.embedding.callCount
      ),
      estimatedCostUsd: metricDelta(
        current.metrics.embedding.estimatedCostUsd,
        baseline.metrics.embedding.estimatedCostUsd
      )
    }
  };
}

// src/eval/reports.ts
var import_fs = require("fs");
var path = __toESM(require("path"), 1);
function assertFiniteNumber(value, path13) {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    throw new Error(`${path13} must be a finite number`);
  }
  return value;
}
function validateSummary(summary, summaryPath, options) {
  assertFiniteNumber(summary.metrics.hitAt1, `${summaryPath}.metrics.hitAt1`);
  assertFiniteNumber(summary.metrics.hitAt3, `${summaryPath}.metrics.hitAt3`);
  assertFiniteNumber(summary.metrics.hitAt5, `${summaryPath}.metrics.hitAt5`);
  assertFiniteNumber(summary.metrics.hitAt10, `${summaryPath}.metrics.hitAt10`);
  assertFiniteNumber(summary.metrics.mrrAt10, `${summaryPath}.metrics.mrrAt10`);
  assertFiniteNumber(summary.metrics.ndcgAt10, `${summaryPath}.metrics.ndcgAt10`);
  const metrics = summary.metrics;
  if (metrics.distinctTop3Ratio === void 0 && options?.allowLegacyDiversityMetrics) {
    metrics.distinctTop3Ratio = 0;
  }
  if (metrics.rawDistinctTop3Ratio === void 0 && options?.allowLegacyDiversityMetrics) {
    metrics.rawDistinctTop3Ratio = 0;
  }
  assertFiniteNumber(metrics.distinctTop3Ratio, `${summaryPath}.metrics.distinctTop3Ratio`);
  assertFiniteNumber(metrics.rawDistinctTop3Ratio, `${summaryPath}.metrics.rawDistinctTop3Ratio`);
  assertFiniteNumber(summary.metrics.latencyMs.p50, `${summaryPath}.metrics.latencyMs.p50`);
  assertFiniteNumber(summary.metrics.latencyMs.p95, `${summaryPath}.metrics.latencyMs.p95`);
  assertFiniteNumber(summary.metrics.latencyMs.p99, `${summaryPath}.metrics.latencyMs.p99`);
  assertFiniteNumber(summary.metrics.embedding.callCount, `${summaryPath}.metrics.embedding.callCount`);
  assertFiniteNumber(summary.metrics.embedding.estimatedCostUsd, `${summaryPath}.metrics.embedding.estimatedCostUsd`);
  return summary;
}
function formatPct(value) {
  return `${(value * 100).toFixed(2)}%`;
}
function formatMs(value) {
  return `${value.toFixed(3)}ms`;
}
function formatUsd(value) {
  return `$${value.toFixed(6)}`;
}
function signed(value, digits = 4) {
  const formatted = value.toFixed(digits);
  return value > 0 ? `+${formatted}` : formatted;
}
function loadSummary(summaryPath, options) {
  const raw = (0, import_fs.readFileSync)(summaryPath, "utf-8");
  return validateSummary(JSON.parse(raw), summaryPath, options);
}
function createRunDirectory(outputRoot, timestampOverride) {
  const timestamp = (timestampOverride ?? (/* @__PURE__ */ new Date()).toISOString()).replace(/[:.]/g, "-");
  const dir = path.join(outputRoot, timestamp);
  (0, import_fs.mkdirSync)(dir, { recursive: true });
  return dir;
}
function writeJson(filePath, value) {
  (0, import_fs.writeFileSync)(filePath, JSON.stringify(value, null, 2), "utf-8");
}
function writeText(filePath, value) {
  (0, import_fs.writeFileSync)(filePath, value, "utf-8");
}
function createSummaryMarkdown(summary, comparison, gate, sweep) {
  const lines = [];
  lines.push("# Evaluation Summary");
  lines.push("");
  lines.push(`- Generated: ${summary.generatedAt}`);
  lines.push(`- Dataset: ${summary.datasetName} (v${summary.datasetVersion})`);
  lines.push(`- Query count: ${summary.queryCount}`);
  lines.push(
    `- Search config: fusion=${summary.searchConfig.fusionStrategy}, hybridWeight=${summary.searchConfig.hybridWeight}, rrfK=${summary.searchConfig.rrfK}, rerankTopN=${summary.searchConfig.rerankTopN}`
  );
  lines.push("");
  lines.push("## Metrics");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("|---|---:|");
  lines.push(`| Hit@1 | ${formatPct(summary.metrics.hitAt1)} |`);
  lines.push(`| Hit@3 | ${formatPct(summary.metrics.hitAt3)} |`);
  lines.push(`| Hit@5 | ${formatPct(summary.metrics.hitAt5)} |`);
  lines.push(`| Hit@10 | ${formatPct(summary.metrics.hitAt10)} |`);
  lines.push(`| MRR@10 | ${summary.metrics.mrrAt10.toFixed(4)} |`);
  lines.push(`| nDCG@10 | ${summary.metrics.ndcgAt10.toFixed(4)} |`);
  lines.push(`| Distinct Top@3 | ${formatPct(summary.metrics.distinctTop3Ratio)} |`);
  lines.push(`| Raw Distinct Top@3 | ${formatPct(summary.metrics.rawDistinctTop3Ratio)} |`);
  lines.push(`| Latency p50 | ${formatMs(summary.metrics.latencyMs.p50)} |`);
  lines.push(`| Latency p95 | ${formatMs(summary.metrics.latencyMs.p95)} |`);
  lines.push(`| Latency p99 | ${formatMs(summary.metrics.latencyMs.p99)} |`);
  lines.push(`| Embedding calls | ${summary.metrics.embedding.callCount} |`);
  lines.push(`| Embedding tokens | ${summary.metrics.tokenEstimate.embeddingTokensUsed} |`);
  lines.push(`| Estimated embedding cost | ${formatUsd(summary.metrics.embedding.estimatedCostUsd)} |`);
  lines.push("");
  lines.push("## Failure Buckets");
  lines.push("");
  lines.push("| Bucket | Count |");
  lines.push("|---|---:|");
  lines.push(
    `| wrong-file | ${summary.metrics.failureBuckets["wrong-file"]} |`
  );
  lines.push(
    `| wrong-symbol | ${summary.metrics.failureBuckets["wrong-symbol"]} |`
  );
  lines.push(
    `| docs/tests outranking source | ${summary.metrics.failureBuckets["docs-tests-outranking-source"]} |`
  );
  lines.push(
    `| no relevant hit in top-k | ${summary.metrics.failureBuckets["no-relevant-hit-top-k"]} |`
  );
  lines.push("");
  if (comparison) {
    lines.push("## Comparison vs Baseline");
    lines.push("");
    lines.push(`- Against: ${comparison.againstPath}`);
    lines.push("");
    lines.push("| Metric | Baseline | Current | Delta |");
    lines.push("|---|---:|---:|---:|");
    lines.push(
      `| Hit@5 | ${formatPct(comparison.deltas.hitAt5.baseline)} | ${formatPct(comparison.deltas.hitAt5.current)} | ${signed(comparison.deltas.hitAt5.absolute)} |`
    );
    lines.push(
      `| MRR@10 | ${comparison.deltas.mrrAt10.baseline.toFixed(4)} | ${comparison.deltas.mrrAt10.current.toFixed(4)} | ${signed(comparison.deltas.mrrAt10.absolute)} |`
    );
    lines.push(
      `| nDCG@10 | ${comparison.deltas.ndcgAt10.baseline.toFixed(4)} | ${comparison.deltas.ndcgAt10.current.toFixed(4)} | ${signed(comparison.deltas.ndcgAt10.absolute)} |`
    );
    lines.push(
      `| Distinct Top@3 | ${formatPct(comparison.deltas.distinctTop3Ratio.baseline)} | ${formatPct(comparison.deltas.distinctTop3Ratio.current)} | ${signed(comparison.deltas.distinctTop3Ratio.absolute)} |`
    );
    lines.push(
      `| Raw Distinct Top@3 | ${formatPct(comparison.deltas.rawDistinctTop3Ratio.baseline)} | ${formatPct(comparison.deltas.rawDistinctTop3Ratio.current)} | ${signed(comparison.deltas.rawDistinctTop3Ratio.absolute)} |`
    );
    lines.push(
      `| p95 latency (ms) | ${comparison.deltas.latencyP95Ms.baseline.toFixed(3)} | ${comparison.deltas.latencyP95Ms.current.toFixed(3)} | ${signed(comparison.deltas.latencyP95Ms.absolute, 3)} |`
    );
    lines.push("");
  }
  if (gate) {
    lines.push("## CI Gate");
    lines.push("");
    lines.push(`- Result: ${gate.passed ? "PASS \u2705" : "FAIL \u274C"}`);
    if (gate.violations.length > 0) {
      lines.push("- Violations:");
      for (const violation of gate.violations) {
        lines.push(`  - ${violation.metric}: ${violation.message}`);
      }
    }
    lines.push("");
  }
  if (sweep) {
    lines.push("## Parameter Sweep");
    lines.push("");
    lines.push(`- Run count: ${sweep.runCount}`);
    if (sweep.bestByHitAt5) {
      lines.push(
        `- Best Hit@5: ${formatPct(sweep.bestByHitAt5.summary.metrics.hitAt5)} with fusion=${sweep.bestByHitAt5.searchConfig.fusionStrategy}, hybridWeight=${sweep.bestByHitAt5.searchConfig.hybridWeight}, rrfK=${sweep.bestByHitAt5.searchConfig.rrfK}, rerankTopN=${sweep.bestByHitAt5.searchConfig.rerankTopN}`
      );
    }
    if (sweep.bestByMrrAt10) {
      lines.push(
        `- Best MRR@10: ${sweep.bestByMrrAt10.summary.metrics.mrrAt10.toFixed(4)} with fusion=${sweep.bestByMrrAt10.searchConfig.fusionStrategy}, hybridWeight=${sweep.bestByMrrAt10.searchConfig.hybridWeight}, rrfK=${sweep.bestByMrrAt10.searchConfig.rrfK}, rerankTopN=${sweep.bestByMrrAt10.searchConfig.rerankTopN}`
      );
    }
    if (sweep.bestByP95Latency) {
      lines.push(
        `- Best p95 latency: ${formatMs(sweep.bestByP95Latency.summary.metrics.latencyMs.p95)} with fusion=${sweep.bestByP95Latency.searchConfig.fusionStrategy}, hybridWeight=${sweep.bestByP95Latency.searchConfig.hybridWeight}, rrfK=${sweep.bestByP95Latency.searchConfig.rrfK}, rerankTopN=${sweep.bestByP95Latency.searchConfig.rerankTopN}`
      );
    }
    lines.push("");
  }
  return `${lines.join("\n")}
`;
}
function buildPerQueryArtifact(perQuery) {
  return {
    queryCount: perQuery.length,
    queries: [...perQuery].sort((a, b) => a.id.localeCompare(b.id))
  };
}

// src/eval/runner.ts
var import_fs9 = require("fs");
var import_fs10 = require("fs");
var import_fs11 = require("fs");
var import_fs12 = require("fs");
var import_fs13 = require("fs");
var os5 = __toESM(require("os"), 1);
var path9 = __toESM(require("path"), 1);
var import_perf_hooks2 = require("perf_hooks");

// src/config/merger.ts
var import_fs4 = require("fs");
var os2 = __toESM(require("os"), 1);
var path4 = __toESM(require("path"), 1);

// src/config/paths.ts
var import_fs3 = require("fs");
var os = __toESM(require("os"), 1);
var path3 = __toESM(require("path"), 1);

// src/git/index.ts
var import_fs2 = require("fs");
var path2 = __toESM(require("path"), 1);
function readPackedRefs(gitDir) {
  const packedRefsPath = path2.join(gitDir, "packed-refs");
  if (!(0, import_fs2.existsSync)(packedRefsPath)) {
    return [];
  }
  try {
    return (0, import_fs2.readFileSync)(packedRefsPath, "utf-8").split("\n").map((line) => line.trim()).filter((line) => line.length > 0 && !line.startsWith("#") && !line.startsWith("^"));
  } catch {
    return [];
  }
}
function resolveCommonGitDir(gitDir) {
  const commonDirPath = path2.join(gitDir, "commondir");
  if (!(0, import_fs2.existsSync)(commonDirPath)) {
    return gitDir;
  }
  try {
    const raw = (0, import_fs2.readFileSync)(commonDirPath, "utf-8").trim();
    if (!raw) {
      return gitDir;
    }
    const resolved = path2.isAbsolute(raw) ? raw : path2.resolve(gitDir, raw);
    if ((0, import_fs2.existsSync)(resolved)) {
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
  if (commonGitDir === gitDir || path2.basename(commonGitDir) !== ".git") {
    return null;
  }
  const mainRepoRoot = path2.dirname(commonGitDir);
  if (!(0, import_fs2.existsSync)(mainRepoRoot)) {
    return null;
  }
  return path2.resolve(mainRepoRoot) === path2.resolve(repoRoot) ? null : mainRepoRoot;
}
function resolveGitDir(repoRoot) {
  const gitPath = path2.join(repoRoot, ".git");
  if (!(0, import_fs2.existsSync)(gitPath)) {
    return null;
  }
  try {
    const stat = (0, import_fs2.statSync)(gitPath);
    if (stat.isDirectory()) {
      return gitPath;
    }
    if (stat.isFile()) {
      const content = (0, import_fs2.readFileSync)(gitPath, "utf-8").trim();
      const match = content.match(/^gitdir:\s*(.+)$/);
      if (match) {
        const gitdir = match[1];
        const resolvedPath = path2.isAbsolute(gitdir) ? gitdir : path2.resolve(repoRoot, gitdir);
        if ((0, import_fs2.existsSync)(resolvedPath)) {
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
  const headPath = path2.join(gitDir, "HEAD");
  if (!(0, import_fs2.existsSync)(headPath)) {
    return null;
  }
  try {
    const headContent = (0, import_fs2.readFileSync)(headPath, "utf-8").trim();
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
      const refPath = path2.join(refStoreDir, "refs", "heads", candidate);
      if ((0, import_fs2.existsSync)(refPath)) {
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

// src/config/paths.ts
var PROJECT_CONFIG_RELATIVE_PATH = path3.join(".opencode", "codebase-index.json");
var PROJECT_INDEX_RELATIVE_PATH = path3.join(".opencode", "index");
function resolveWorktreeFallbackPath(projectRoot, relativePath) {
  const mainRepoRoot = resolveWorktreeMainRepoRoot(projectRoot);
  if (!mainRepoRoot) {
    return null;
  }
  const fallbackPath = path3.join(mainRepoRoot, relativePath);
  return (0, import_fs3.existsSync)(fallbackPath) ? fallbackPath : null;
}
function hasProjectConfig(projectRoot) {
  return (0, import_fs3.existsSync)(path3.join(projectRoot, PROJECT_CONFIG_RELATIVE_PATH));
}
function getGlobalIndexPath() {
  return path3.join(os.homedir(), ".opencode", "global-index");
}
function resolveProjectConfigPath(projectRoot) {
  const localConfigPath = path3.join(projectRoot, PROJECT_CONFIG_RELATIVE_PATH);
  if ((0, import_fs3.existsSync)(localConfigPath)) {
    return localConfigPath;
  }
  return resolveWorktreeFallbackPath(projectRoot, PROJECT_CONFIG_RELATIVE_PATH) ?? localConfigPath;
}
function resolveProjectIndexPath(projectRoot, scope) {
  if (scope === "global") {
    return getGlobalIndexPath();
  }
  const localIndexPath = path3.join(projectRoot, PROJECT_INDEX_RELATIVE_PATH);
  if ((0, import_fs3.existsSync)(localIndexPath)) {
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
    if ((0, import_fs4.existsSync)(filePath)) {
      const content = (0, import_fs4.readFileSync)(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch {
  }
  return null;
}
function normalizeRelativeConfigPath(candidate) {
  return candidate.replace(/\\/g, "/");
}
function rebasePathEntries(values, fromDir, toDir) {
  if (!Array.isArray(values)) {
    return [];
  }
  return values.filter((value) => typeof value === "string").map((value) => {
    const trimmed = value.trim();
    if (!trimmed || path4.isAbsolute(trimmed)) {
      return trimmed;
    }
    return normalizeRelativeConfigPath(path4.normalize(path4.relative(toDir, path4.resolve(fromDir, trimmed))));
  }).filter(Boolean);
}
function isWithinRoot(rootDir, targetPath) {
  const relativePath = path4.relative(rootDir, targetPath);
  return relativePath === "" || !relativePath.startsWith("..") && !path4.isAbsolute(relativePath);
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
    if (path4.isAbsolute(trimmed)) {
      if (isWithinRoot(sourceRoot, trimmed)) {
        return normalizeRelativeConfigPath(path4.normalize(path4.relative(sourceRoot, trimmed) || "."));
      }
      return path4.normalize(trimmed);
    }
    const resolvedFromSource = path4.resolve(sourceRoot, trimmed);
    if (isWithinRoot(sourceRoot, resolvedFromSource)) {
      return normalizeRelativeConfigPath(path4.normalize(trimmed));
    }
    return normalizeRelativeConfigPath(path4.normalize(path4.relative(targetRoot, resolvedFromSource)));
  }).filter(Boolean);
}
function materializeLocalProjectConfig(projectRoot, config) {
  const localConfigPath = path4.join(projectRoot, ".opencode", "codebase-index.json");
  (0, import_fs4.mkdirSync)(path4.dirname(localConfigPath), { recursive: true });
  (0, import_fs4.writeFileSync)(localConfigPath, JSON.stringify(config, null, 2), "utf-8");
  return localConfigPath;
}
function loadProjectConfigLayer(projectRoot) {
  const projectConfigPath = resolveProjectConfigPath(projectRoot);
  const projectConfig = loadJsonFile(projectConfigPath);
  if (!projectConfig) {
    return {};
  }
  const normalizedConfig = { ...projectConfig };
  const projectConfigBaseDir = path4.dirname(path4.dirname(projectConfigPath));
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

// src/indexer/index.ts
var import_fs7 = require("fs");
var path8 = __toESM(require("path"), 1);
var import_perf_hooks = require("perf_hooks");

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
  const wrappedPromise = new Promise((resolve8, reject) => {
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
    promise.then(resolve8, reject);
    if (milliseconds === Number.POSITIVE_INFINITY) {
      return;
    }
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve8(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve8();
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
    return new Promise((resolve8, reject) => {
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
          resolve8(result);
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
    return new Promise((resolve8) => {
      const listener = () => {
        if (filter && !filter()) {
          return;
        }
        this.off(event, listener);
        resolve8();
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
    await new Promise((resolve8, reject) => {
      const onAbort = () => {
        clearTimeout(timeoutToken);
        options.signal?.removeEventListener("abort", onAbort);
        reject(options.signal.reason);
      };
      const timeoutToken = setTimeout(() => {
        options.signal?.removeEventListener("abort", onAbort);
        resolve8();
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
var import_fs5 = require("fs");
var path5 = __toESM(require("path"), 1);
var os3 = __toESM(require("os"), 1);
function getOpenCodeAuthPath() {
  return path5.join(os3.homedir(), ".local", "share", "opencode", "auth.json");
}
function loadOpenCodeAuth() {
  const authPath = getOpenCodeAuthPath();
  try {
    if ((0, import_fs5.existsSync)(authPath)) {
      return JSON.parse((0, import_fs5.readFileSync)(authPath, "utf-8"));
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

// src/utils/files.ts
var import_ignore = __toESM(require_ignore(), 1);
var import_fs6 = require("fs");
var path6 = __toESM(require("path"), 1);
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
  const gitignorePath = path6.join(projectRoot, ".gitignore");
  if ((0, import_fs6.existsSync)(gitignorePath)) {
    const gitignoreContent = (0, import_fs6.readFileSync)(gitignorePath, "utf-8");
    ig.add(gitignoreContent);
  }
  return ig;
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
  const entries = await import_fs6.promises.readdir(dir, { withFileTypes: true });
  const filesInDir = [];
  const subdirs = [];
  for (const entry of entries) {
    const fullPath = path6.join(dir, entry.name);
    const relativePath = path6.relative(projectRoot, fullPath);
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
      const stat = await import_fs6.promises.stat(fullPath);
      if (stat.size > maxFileSize) {
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
        filesInDir.push({ path: fullPath, size: stat.size });
      }
    }
  }
  filesInDir.sort((a, b) => a.size - b.size);
  const limitedFiles = filesInDir.slice(0, options.maxFilesPerDirectory);
  for (const f of limitedFiles) {
    yield f;
  }
  for (let i = options.maxFilesPerDirectory; i < filesInDir.length; i++) {
    skipped.push({ path: path6.relative(projectRoot, filesInDir[i].path), reason: "excluded" });
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
      const resolved = path6.normalize(
        path6.isAbsolute(kbRoot) ? kbRoot : path6.resolve(projectRoot, kbRoot)
      );
      normalizedRoots.add(resolved);
    }
    for (const resolvedKbRoot of normalizedRoots) {
      try {
        const stat = await import_fs6.promises.stat(resolvedKbRoot);
        if (!stat.isDirectory()) {
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

// src/utils/cost.ts
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}
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
var path7 = __toESM(require("path"), 1);
var os4 = __toESM(require("os"), 1);
var module2 = __toESM(require("module"), 1);
var import_url = require("url");
var import_meta = {};
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
  if (typeof import_meta !== "undefined" && import_meta.url) {
    currentDir = path7.dirname((0, import_url.fileURLToPath)(import_meta.url));
    requireTarget = import_meta.url;
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
  const require2 = module2.createRequire(requireTarget);
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
function estimateTokens2(text) {
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
    const chunkTokens = chunk.tokenCount ?? estimateTokens2(chunk.text);
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
      tokenCount: typeof entry.tokenCount === "number" && Number.isFinite(entry.tokenCount) ? entry.tokenCount : estimateTokens2(entry.text)
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
          tokenCount: estimateTokens2(text)
        }))
      );
    } else {
      texts.push({
        text: chunk.text,
        tokenCount: estimateTokens2(chunk.text)
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
      if ((0, import_fs7.existsSync)(this.fileHashCachePath)) {
        const data = (0, import_fs7.readFileSync)(this.fileHashCachePath, "utf-8");
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
    (0, import_fs7.writeFileSync)(tempPath, data);
    (0, import_fs7.renameSync)(tempPath, targetPath);
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
    return (0, import_fs7.existsSync)(this.indexingLockPath);
  }
  acquireIndexingLock() {
    const lockData = {
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      pid: process.pid
    };
    (0, import_fs7.writeFileSync)(this.indexingLockPath, JSON.stringify(lockData));
  }
  releaseIndexingLock() {
    if ((0, import_fs7.existsSync)(this.indexingLockPath)) {
      (0, import_fs7.unlinkSync)(this.indexingLockPath);
    }
  }
  async recoverFromInterruptedIndexing() {
    this.logger.warn("Detected interrupted indexing session, recovering...");
    if ((0, import_fs7.existsSync)(this.fileHashCachePath)) {
      (0, import_fs7.unlinkSync)(this.fileHashCachePath);
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
    if (!(0, import_fs7.existsSync)(this.failedBatchesPath)) {
      return [];
    }
    const data = (0, import_fs7.readFileSync)(this.failedBatchesPath, "utf-8");
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
      if ((0, import_fs7.existsSync)(this.failedBatchesPath)) {
        try {
          (0, import_fs7.unlinkSync)(this.failedBatchesPath);
        } catch {
        }
      }
      return;
    }
    (0, import_fs7.writeFileSync)(this.failedBatchesPath, JSON.stringify(batches, null, 2));
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
      const fileContent = await import_fs7.promises.readFile(candidate.metadata.filePath, "utf-8");
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
    await import_fs7.promises.mkdir(this.indexPath, { recursive: true });
    const dimensions = this.configuredProviderInfo.modelInfo.dimensions;
    const storePath = path8.join(this.indexPath, "vectors");
    this.store = new VectorStore(storePath, dimensions);
    const indexFilePath = path8.join(this.indexPath, "vectors.usearch");
    if ((0, import_fs7.existsSync)(indexFilePath)) {
      this.store.load();
    }
    const invertedIndexPath = path8.join(this.indexPath, "inverted-index.json");
    this.invertedIndex = new InvertedIndex(invertedIndexPath);
    try {
      this.invertedIndex.load();
    } catch {
      if ((0, import_fs7.existsSync)(invertedIndexPath)) {
        await import_fs7.promises.unlink(invertedIndexPath);
      }
      this.invertedIndex = new InvertedIndex(invertedIndexPath);
    }
    const dbPath = path8.join(this.indexPath, "codebase.db");
    let dbIsNew = !(0, import_fs7.existsSync)(dbPath);
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
    if ((0, import_fs7.existsSync)(backupIndexPath)) {
      (0, import_fs7.unlinkSync)(backupIndexPath);
    }
    if ((0, import_fs7.existsSync)(backupMetadataPath)) {
      (0, import_fs7.unlinkSync)(backupMetadataPath);
    }
    try {
      if ((0, import_fs7.existsSync)(storeIndexPath)) {
        (0, import_fs7.renameSync)(storeIndexPath, backupIndexPath);
        backedUpIndex = true;
      }
      if ((0, import_fs7.existsSync)(storeMetadataPath)) {
        (0, import_fs7.renameSync)(storeMetadataPath, backupMetadataPath);
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
      if (backedUpIndex && (0, import_fs7.existsSync)(backupIndexPath)) {
        (0, import_fs7.unlinkSync)(backupIndexPath);
      }
      if (backedUpMetadata && (0, import_fs7.existsSync)(backupMetadataPath)) {
        (0, import_fs7.unlinkSync)(backupMetadataPath);
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
      if ((0, import_fs7.existsSync)(storeIndexPath)) {
        (0, import_fs7.unlinkSync)(storeIndexPath);
      }
      if ((0, import_fs7.existsSync)(storeMetadataPath)) {
        (0, import_fs7.unlinkSync)(storeMetadataPath);
      }
      if (backedUpIndex && (0, import_fs7.existsSync)(backupIndexPath)) {
        (0, import_fs7.renameSync)(backupIndexPath, storeIndexPath);
      }
      if (backedUpMetadata && (0, import_fs7.existsSync)(backupMetadataPath)) {
        (0, import_fs7.renameSync)(backupMetadataPath, storeMetadataPath);
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
        await import_fs7.promises.rm(targetPath, { recursive: true, force: true });
      } catch {
      }
    }));
    await import_fs7.promises.mkdir(this.indexPath, { recursive: true });
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
        const content = await import_fs7.promises.readFile(f.path, "utf-8");
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
    const parseStartTime = import_perf_hooks.performance.now();
    const parsedFiles = parseFiles(changedFiles);
    const parseMs = import_perf_hooks.performance.now() - parseStartTime;
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
          tokenCount: estimateTokens2(text)
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
          await new Promise((resolve8) => setTimeout(resolve8, rateLimitBackoffMs));
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
    const searchStartTime = import_perf_hooks.performance.now();
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
    const embeddingStartTime = import_perf_hooks.performance.now();
    const embeddingQuery = stripFilePathHint(query);
    const embedding = await this.getQueryEmbedding(embeddingQuery, provider);
    const embeddingMs = import_perf_hooks.performance.now() - embeddingStartTime;
    const vectorStartTime = import_perf_hooks.performance.now();
    const semanticResults = store.search(embedding, maxResults * 4);
    const vectorMs = import_perf_hooks.performance.now() - vectorStartTime;
    const keywordStartTime = import_perf_hooks.performance.now();
    const keywordResults = await this.keywordSearch(query, maxResults * 4);
    const keywordMs = import_perf_hooks.performance.now() - keywordStartTime;
    let branchChunkIds = null;
    if (filterByBranch && (this.config.scope === "global" || this.currentBranch !== "default")) {
      branchChunkIds = new Set(
        this.getBranchCatalogKeys().flatMap((branchKey) => database.getBranchChunkIds(branchKey))
      );
    }
    const prefilterStartTime = import_perf_hooks.performance.now();
    const shouldPrefilterByBranch = branchChunkIds !== null && (this.config.scope === "global" || branchChunkIds.size > 0);
    const allowBranchPrefilterFallback = this.config.scope !== "global";
    const prefilteredSemantic = shouldPrefilterByBranch && branchChunkIds ? semanticResults.filter((r) => branchChunkIds.has(r.id)) : semanticResults;
    const prefilteredKeyword = shouldPrefilterByBranch && branchChunkIds ? keywordResults.filter((r) => branchChunkIds.has(r.id)) : keywordResults;
    const semanticCandidates = allowBranchPrefilterFallback && shouldPrefilterByBranch && semanticResults.length > 0 && prefilteredSemantic.length === 0 ? semanticResults : prefilteredSemantic;
    const keywordCandidates = allowBranchPrefilterFallback && shouldPrefilterByBranch && keywordResults.length > 0 && prefilteredKeyword.length === 0 ? keywordResults : prefilteredKeyword;
    const prefilterMs = import_perf_hooks.performance.now() - prefilterStartTime;
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
    const fusionStartTime = import_perf_hooks.performance.now();
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
    const fusionMs = import_perf_hooks.performance.now() - fusionStartTime;
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
    const totalSearchMs = import_perf_hooks.performance.now() - searchStartTime;
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
            const fileContent = await import_fs7.promises.readFile(
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
      if (!(0, import_fs7.existsSync)(filePath)) {
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
    const searchStartTime = import_perf_hooks.performance.now();
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
    const embeddingStartTime = import_perf_hooks.performance.now();
    const { embedding, tokensUsed } = await provider.embedDocument(code);
    const embeddingMs = import_perf_hooks.performance.now() - embeddingStartTime;
    this.logger.recordEmbeddingApiCall(tokensUsed);
    const vectorStartTime = import_perf_hooks.performance.now();
    const semanticResults = store.search(embedding, limit * 2);
    const vectorMs = import_perf_hooks.performance.now() - vectorStartTime;
    let branchChunkIds = null;
    if (filterByBranch && (this.config.scope === "global" || this.currentBranch !== "default")) {
      branchChunkIds = new Set(
        this.getBranchCatalogKeys().flatMap((branchKey) => database.getBranchChunkIds(branchKey))
      );
    }
    const prefilterStartTime = import_perf_hooks.performance.now();
    const shouldPrefilterByBranch = branchChunkIds !== null && (this.config.scope === "global" || branchChunkIds.size > 0);
    const allowBranchPrefilterFallback = this.config.scope !== "global";
    const prefilteredSemantic = shouldPrefilterByBranch && branchChunkIds ? semanticResults.filter((r) => branchChunkIds.has(r.id)) : semanticResults;
    const semanticCandidates = allowBranchPrefilterFallback && shouldPrefilterByBranch && semanticResults.length > 0 && prefilteredSemantic.length === 0 ? semanticResults : prefilteredSemantic;
    const prefilterMs = import_perf_hooks.performance.now() - prefilterStartTime;
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
    const totalSearchMs = import_perf_hooks.performance.now() - searchStartTime;
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
            const fileContent = await import_fs7.promises.readFile(
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

// src/eval/budget.ts
function evaluateBudgetGate(budget, summary, comparison) {
  const BASELINE_P95_EPSILON_MS = 1e-3;
  const violations = [];
  const { thresholds } = budget;
  if (thresholds.minHitAt5 !== void 0 && summary.metrics.hitAt5 < thresholds.minHitAt5) {
    violations.push({
      metric: "minHitAt5",
      message: `Hit@5 ${summary.metrics.hitAt5.toFixed(4)} is below minimum ${thresholds.minHitAt5.toFixed(4)}`
    });
  }
  if (thresholds.minMrrAt10 !== void 0 && summary.metrics.mrrAt10 < thresholds.minMrrAt10) {
    violations.push({
      metric: "minMrrAt10",
      message: `MRR@10 ${summary.metrics.mrrAt10.toFixed(4)} is below minimum ${thresholds.minMrrAt10.toFixed(4)}`
    });
  }
  if (thresholds.minRawDistinctTop3Ratio !== void 0 && summary.metrics.rawDistinctTop3Ratio < thresholds.minRawDistinctTop3Ratio) {
    violations.push({
      metric: "minRawDistinctTop3Ratio",
      message: `Raw Distinct Top@3 ${summary.metrics.rawDistinctTop3Ratio.toFixed(4)} is below minimum ${thresholds.minRawDistinctTop3Ratio.toFixed(4)}`
    });
  }
  if (comparison) {
    if (thresholds.hitAt5MaxDrop !== void 0 && comparison.deltas.hitAt5.absolute < -thresholds.hitAt5MaxDrop) {
      violations.push({
        metric: "hitAt5MaxDrop",
        message: `Hit@5 drop ${comparison.deltas.hitAt5.absolute.toFixed(4)} exceeds allowed -${thresholds.hitAt5MaxDrop.toFixed(4)}`
      });
    }
    if (thresholds.mrrAt10MaxDrop !== void 0 && comparison.deltas.mrrAt10.absolute < -thresholds.mrrAt10MaxDrop) {
      violations.push({
        metric: "mrrAt10MaxDrop",
        message: `MRR@10 drop ${comparison.deltas.mrrAt10.absolute.toFixed(4)} exceeds allowed -${thresholds.mrrAt10MaxDrop.toFixed(4)}`
      });
    }
    if (thresholds.rawDistinctTop3RatioMaxDrop !== void 0 && comparison.deltas.rawDistinctTop3Ratio.absolute < -thresholds.rawDistinctTop3RatioMaxDrop) {
      violations.push({
        metric: "rawDistinctTop3RatioMaxDrop",
        message: `Raw Distinct Top@3 drop ${comparison.deltas.rawDistinctTop3Ratio.absolute.toFixed(4)} exceeds allowed -${thresholds.rawDistinctTop3RatioMaxDrop.toFixed(4)}`
      });
    }
    if (thresholds.p95LatencyMaxMultiplier !== void 0) {
      const baselineP95 = comparison.deltas.latencyP95Ms.baseline;
      if (baselineP95 > BASELINE_P95_EPSILON_MS) {
        const allowed = baselineP95 * thresholds.p95LatencyMaxMultiplier;
        if (summary.metrics.latencyMs.p95 > allowed) {
          violations.push({
            metric: "p95LatencyMaxMultiplier",
            message: `p95 latency ${summary.metrics.latencyMs.p95.toFixed(3)}ms exceeds allowed ${allowed.toFixed(3)}ms (${thresholds.p95LatencyMaxMultiplier.toFixed(2)}x baseline)`
          });
        }
      }
    }
  }
  if (thresholds.p95LatencyMaxAbsoluteMs !== void 0 && summary.metrics.latencyMs.p95 > thresholds.p95LatencyMaxAbsoluteMs) {
    violations.push({
      metric: "p95LatencyMaxAbsoluteMs",
      message: `p95 latency ${summary.metrics.latencyMs.p95.toFixed(3)}ms exceeds absolute maximum ${thresholds.p95LatencyMaxAbsoluteMs.toFixed(3)}ms`
    });
  }
  return {
    passed: violations.length === 0,
    budgetName: budget.name,
    violations
  };
}

// src/eval/metrics.ts
function percentile(values, p) {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0];
  const sorted = [...values].sort((a, b) => a - b);
  const x = p * (sorted.length - 1);
  const lowerIndex = Math.floor(x);
  const upperIndex = Math.ceil(x);
  if (lowerIndex === upperIndex) {
    return sorted[lowerIndex];
  }
  const fraction = x - lowerIndex;
  return sorted[lowerIndex] + fraction * (sorted[upperIndex] - sorted[lowerIndex]);
}
function normalizePath(input) {
  return input.replace(/\\/g, "/");
}
function uniqueResultsByPath(results) {
  const seen = /* @__PURE__ */ new Set();
  const unique = [];
  for (const result of results) {
    const normalized = normalizePath(result.filePath);
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(result);
  }
  return unique;
}
function distinctTopKRatio(results, k) {
  const top = results.slice(0, k);
  if (top.length === 0) return 0;
  const distinct = new Set(top.map((result) => normalizePath(result.filePath))).size;
  return distinct / top.length;
}
function pathMatchesExpected(actualPath, expectedPath) {
  const actual = normalizePath(actualPath);
  const expected = normalizePath(expectedPath);
  if (actual === expected) return true;
  return actual.endsWith(`/${expected}`) || expected.endsWith(`/${actual}`);
}
function getRelevantPaths(query) {
  const fromExact = query.expected.filePath ? [query.expected.filePath] : [];
  const fromAcceptable = query.expected.acceptableFiles ?? [];
  return Array.from(/* @__PURE__ */ new Set([...fromExact, ...fromAcceptable]));
}
function isRelevantResult(filePath, relevantPaths) {
  return relevantPaths.some((expected) => pathMatchesExpected(filePath, expected));
}
function reciprocalRankAtK(results, relevantPaths, k) {
  const top = uniqueResultsByPath(results).slice(0, k);
  for (let i = 0; i < top.length; i += 1) {
    if (isRelevantResult(top[i].filePath, relevantPaths)) {
      return 1 / (i + 1);
    }
  }
  return 0;
}
function ndcgAtK(results, relevantPaths, k) {
  const top = uniqueResultsByPath(results).slice(0, k);
  const dcg = top.reduce((sum, result, i) => {
    const rel = isRelevantResult(result.filePath, relevantPaths) ? 1 : 0;
    return sum + rel / Math.log2(i + 2);
  }, 0);
  const idealLen = Math.min(k, relevantPaths.length);
  const idcg = Array.from({ length: idealLen }, (_, i) => 1 / Math.log2(i + 2)).reduce(
    (sum, value) => sum + value,
    0
  );
  return idcg === 0 ? 0 : dcg / idcg;
}
function isDocsOrTestsPath(filePath) {
  const lowered = normalizePath(filePath).toLowerCase();
  return lowered.includes("/docs/") || lowered.includes("/test/") || lowered.includes("/tests/") || lowered.includes("readme") || lowered.includes("/benchmarks/");
}
function classifyFailureBucket(query, results, k) {
  const relevantPaths = getRelevantPaths(query);
  const top = uniqueResultsByPath(results).slice(0, k);
  const hasRelevantTopK = top.some((result) => isRelevantResult(result.filePath, relevantPaths));
  if (!hasRelevantTopK) {
    return "no-relevant-hit-top-k";
  }
  if (query.expected.symbol) {
    const hasSymbol = top.some(
      (result) => isRelevantResult(result.filePath, relevantPaths) && result.name === query.expected.symbol
    );
    if (!hasSymbol) return "wrong-symbol";
  }
  const top1 = top[0];
  if (top1 && !isRelevantResult(top1.filePath, relevantPaths) && isDocsOrTestsPath(top1.filePath)) {
    return "docs-tests-outranking-source";
  }
  if (top1 && !isRelevantResult(top1.filePath, relevantPaths)) {
    return "wrong-file";
  }
  return void 0;
}
function buildPerQueryResult(query, results, latencyMs, k) {
  const relevantPaths = getRelevantPaths(query);
  const deduped = uniqueResultsByPath(results);
  const hitAt = (cutoff) => deduped.slice(0, cutoff).some((result) => isRelevantResult(result.filePath, relevantPaths));
  const perQuery = {
    id: query.id,
    query: query.query,
    queryType: query.queryType,
    latencyMs,
    hitAt1: hitAt(1),
    hitAt3: hitAt(3),
    hitAt5: hitAt(5),
    hitAt10: hitAt(10),
    reciprocalRankAt10: reciprocalRankAtK(deduped, relevantPaths, 10),
    ndcgAt10: ndcgAtK(deduped, relevantPaths, 10),
    failureBucket: classifyFailureBucket(query, results, k),
    rawTop3DistinctRatio: distinctTopKRatio(results, 3),
    results: deduped
  };
  return perQuery;
}
function computeEvalMetrics(queries, perQuery, embeddingCallCount, embeddingTokensUsed, costPer1MTokensUsd) {
  const count = perQuery.length;
  const safeDiv = (value) => count === 0 ? 0 : value / count;
  const sum = {
    hitAt1: 0,
    hitAt3: 0,
    hitAt5: 0,
    hitAt10: 0,
    mrrAt10: 0,
    ndcgAt10: 0,
    distinctTop3Ratio: 0,
    rawDistinctTop3Ratio: 0
  };
  const failureBuckets = {
    "wrong-file": 0,
    "wrong-symbol": 0,
    "docs-tests-outranking-source": 0,
    "no-relevant-hit-top-k": 0
  };
  const latencies = perQuery.map((item) => item.latencyMs);
  for (const query of perQuery) {
    if (query.hitAt1) sum.hitAt1 += 1;
    if (query.hitAt3) sum.hitAt3 += 1;
    if (query.hitAt5) sum.hitAt5 += 1;
    if (query.hitAt10) sum.hitAt10 += 1;
    sum.mrrAt10 += query.reciprocalRankAt10;
    sum.ndcgAt10 += query.ndcgAt10;
    sum.distinctTop3Ratio += distinctTopKRatio(query.results, 3);
    sum.rawDistinctTop3Ratio += query.rawTop3DistinctRatio;
    if (query.failureBucket) {
      failureBuckets[query.failureBucket] += 1;
    }
  }
  const queryTokens = queries.reduce((acc, q) => acc + estimateTokens(q.query), 0);
  return {
    hitAt1: safeDiv(sum.hitAt1),
    hitAt3: safeDiv(sum.hitAt3),
    hitAt5: safeDiv(sum.hitAt5),
    hitAt10: safeDiv(sum.hitAt10),
    mrrAt10: safeDiv(sum.mrrAt10),
    ndcgAt10: safeDiv(sum.ndcgAt10),
    distinctTop3Ratio: safeDiv(sum.distinctTop3Ratio),
    rawDistinctTop3Ratio: safeDiv(sum.rawDistinctTop3Ratio),
    latencyMs: {
      p50: percentile(latencies, 0.5),
      p95: percentile(latencies, 0.95),
      p99: percentile(latencies, 0.99)
    },
    tokenEstimate: {
      queryTokens,
      embeddingTokensUsed
    },
    embedding: {
      callCount: embeddingCallCount,
      estimatedCostUsd: embeddingTokensUsed / 1e6 * costPer1MTokensUsd,
      costPer1MTokensUsd
    },
    failureBuckets
  };
}

// src/eval/schema.ts
var import_fs8 = require("fs");
function parseJsonFile(filePath) {
  const content = (0, import_fs8.readFileSync)(filePath, "utf-8");
  return JSON.parse(content);
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function isStringArray2(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function asPositiveNumber(value, path13) {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
    throw new Error(`${path13} must be a non-negative number`);
  }
  return value;
}
function parseQueryType(value, path13) {
  if (value === "definition" || value === "implementation-intent" || value === "similarity" || value === "keyword-heavy") {
    return value;
  }
  throw new Error(
    `${path13} must be one of: definition, implementation-intent, similarity, keyword-heavy`
  );
}
function parseExpected(input, path13) {
  if (!isRecord(input)) {
    throw new Error(`${path13} must be an object`);
  }
  const filePathRaw = input.filePath;
  const acceptableFilesRaw = input.acceptableFiles;
  const symbolRaw = input.symbol;
  const branchRaw = input.branch;
  const filePath = typeof filePathRaw === "string" ? filePathRaw : void 0;
  const acceptableFiles = isStringArray2(acceptableFilesRaw) ? acceptableFilesRaw : void 0;
  if (!filePath && (!acceptableFiles || acceptableFiles.length === 0)) {
    throw new Error(`${path13} must include either expected.filePath or expected.acceptableFiles`);
  }
  if (acceptableFilesRaw !== void 0 && !isStringArray2(acceptableFilesRaw)) {
    throw new Error(`${path13}.acceptableFiles must be an array of strings`);
  }
  if (symbolRaw !== void 0 && typeof symbolRaw !== "string") {
    throw new Error(`${path13}.symbol must be a string when provided`);
  }
  if (branchRaw !== void 0 && typeof branchRaw !== "string") {
    throw new Error(`${path13}.branch must be a string when provided`);
  }
  return {
    filePath,
    acceptableFiles,
    symbol: typeof symbolRaw === "string" ? symbolRaw : void 0,
    branch: typeof branchRaw === "string" ? branchRaw : void 0
  };
}
function parseQuery(input, index) {
  const path13 = `queries[${index}]`;
  if (!isRecord(input)) {
    throw new Error(`${path13} must be an object`);
  }
  const id = input.id;
  const query = input.query;
  const queryType = input.queryType;
  const expected = input.expected;
  if (typeof id !== "string" || id.trim().length === 0) {
    throw new Error(`${path13}.id must be a non-empty string`);
  }
  if (typeof query !== "string" || query.trim().length === 0) {
    throw new Error(`${path13}.query must be a non-empty string`);
  }
  return {
    id,
    query,
    queryType: parseQueryType(queryType, `${path13}.queryType`),
    expected: parseExpected(expected, `${path13}.expected`)
  };
}
function parseGoldenDataset(raw, sourceLabel) {
  if (!isRecord(raw)) {
    throw new Error(`${sourceLabel} must be a JSON object`);
  }
  const version = raw.version;
  const name = raw.name;
  const description = raw.description;
  const queriesRaw = raw.queries;
  if (typeof version !== "string" || version.trim().length === 0) {
    throw new Error(`${sourceLabel}.version must be a non-empty string`);
  }
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error(`${sourceLabel}.name must be a non-empty string`);
  }
  if (description !== void 0 && typeof description !== "string") {
    throw new Error(`${sourceLabel}.description must be a string when provided`);
  }
  if (!Array.isArray(queriesRaw)) {
    throw new Error(`${sourceLabel}.queries must be an array`);
  }
  if (queriesRaw.length === 0) {
    throw new Error(`${sourceLabel}.queries must contain at least one query`);
  }
  const queries = queriesRaw.map((query, idx) => parseQuery(query, idx));
  const idSet = /* @__PURE__ */ new Set();
  for (const query of queries) {
    if (idSet.has(query.id)) {
      throw new Error(`${sourceLabel}.queries has duplicate id: ${query.id}`);
    }
    idSet.add(query.id);
  }
  return {
    version,
    name,
    description: typeof description === "string" ? description : void 0,
    queries
  };
}
function loadGoldenDataset(datasetPath) {
  const parsed = parseJsonFile(datasetPath);
  return parseGoldenDataset(parsed, datasetPath);
}
function parseBudget(raw, sourceLabel) {
  if (!isRecord(raw)) {
    throw new Error(`${sourceLabel} must be a JSON object`);
  }
  const name = raw.name;
  const baselinePath = raw.baselinePath;
  const failOnMissingBaseline = raw.failOnMissingBaseline;
  const thresholds = raw.thresholds;
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error(`${sourceLabel}.name must be a non-empty string`);
  }
  if (baselinePath !== void 0 && typeof baselinePath !== "string") {
    throw new Error(`${sourceLabel}.baselinePath must be a string when provided`);
  }
  if (!isRecord(thresholds)) {
    throw new Error(`${sourceLabel}.thresholds must be an object`);
  }
  return {
    name,
    baselinePath: typeof baselinePath === "string" ? baselinePath : void 0,
    failOnMissingBaseline: typeof failOnMissingBaseline === "boolean" ? failOnMissingBaseline : true,
    thresholds: {
      hitAt5MaxDrop: thresholds.hitAt5MaxDrop === void 0 ? void 0 : asPositiveNumber(thresholds.hitAt5MaxDrop, `${sourceLabel}.thresholds.hitAt5MaxDrop`),
      mrrAt10MaxDrop: thresholds.mrrAt10MaxDrop === void 0 ? void 0 : asPositiveNumber(thresholds.mrrAt10MaxDrop, `${sourceLabel}.thresholds.mrrAt10MaxDrop`),
      rawDistinctTop3RatioMaxDrop: thresholds.rawDistinctTop3RatioMaxDrop === void 0 ? void 0 : asPositiveNumber(
        thresholds.rawDistinctTop3RatioMaxDrop,
        `${sourceLabel}.thresholds.rawDistinctTop3RatioMaxDrop`
      ),
      p95LatencyMaxMultiplier: thresholds.p95LatencyMaxMultiplier === void 0 ? void 0 : asPositiveNumber(
        thresholds.p95LatencyMaxMultiplier,
        `${sourceLabel}.thresholds.p95LatencyMaxMultiplier`
      ),
      p95LatencyMaxAbsoluteMs: thresholds.p95LatencyMaxAbsoluteMs === void 0 ? void 0 : asPositiveNumber(
        thresholds.p95LatencyMaxAbsoluteMs,
        `${sourceLabel}.thresholds.p95LatencyMaxAbsoluteMs`
      ),
      minHitAt5: thresholds.minHitAt5 === void 0 ? void 0 : asPositiveNumber(thresholds.minHitAt5, `${sourceLabel}.thresholds.minHitAt5`),
      minMrrAt10: thresholds.minMrrAt10 === void 0 ? void 0 : asPositiveNumber(thresholds.minMrrAt10, `${sourceLabel}.thresholds.minMrrAt10`),
      minRawDistinctTop3Ratio: thresholds.minRawDistinctTop3Ratio === void 0 ? void 0 : asPositiveNumber(
        thresholds.minRawDistinctTop3Ratio,
        `${sourceLabel}.thresholds.minRawDistinctTop3Ratio`
      )
    }
  };
}
function loadBudget(budgetPath) {
  const parsed = parseJsonFile(budgetPath);
  return parseBudget(parsed, budgetPath);
}

// src/eval/runner.ts
function toAbsolute(projectRoot, maybeRelative) {
  return path9.isAbsolute(maybeRelative) ? maybeRelative : path9.join(projectRoot, maybeRelative);
}
function isProjectScopedConfigPath(configPath) {
  return path9.basename(configPath) === "codebase-index.json" && path9.basename(path9.dirname(configPath)) === ".opencode";
}
function normalizeEvalConfigKnowledgeBases(rawConfig, projectRoot, resolvedConfigPath) {
  const config = rawConfig && typeof rawConfig === "object" ? { ...rawConfig } : {};
  if (!Array.isArray(config.knowledgeBases)) {
    return config;
  }
  config.knowledgeBases = isProjectScopedConfigPath(resolvedConfigPath) ? resolveInheritedKnowledgeBaseEntries(
    config.knowledgeBases,
    path9.dirname(path9.dirname(resolvedConfigPath)),
    projectRoot
  ) : rebasePathEntries(
    config.knowledgeBases,
    path9.dirname(resolvedConfigPath),
    projectRoot
  );
  return config;
}
function loadRawConfig(projectRoot, configPath) {
  const fromPath = configPath ? toAbsolute(projectRoot, configPath) : null;
  if (fromPath && (0, import_fs9.existsSync)(fromPath)) {
    return normalizeEvalConfigKnowledgeBases(
      JSON.parse((0, import_fs11.readFileSync)(fromPath, "utf-8")),
      projectRoot,
      fromPath
    );
  }
  const projectConfig = resolveProjectConfigPath(projectRoot);
  if ((0, import_fs9.existsSync)(projectConfig)) {
    return normalizeEvalConfigKnowledgeBases(
      JSON.parse((0, import_fs11.readFileSync)(projectConfig, "utf-8")),
      projectRoot,
      projectConfig
    );
  }
  const globalConfig = path9.join(os5.homedir(), ".config", "opencode", "codebase-index.json");
  if ((0, import_fs9.existsSync)(globalConfig)) {
    return JSON.parse((0, import_fs11.readFileSync)(globalConfig, "utf-8"));
  }
  return {};
}
function getIndexRootPath(projectRoot, scope) {
  return scope === "global" ? getGlobalIndexPath() : resolveProjectIndexPath(projectRoot, scope);
}
function getLocalProjectIndexRoot(projectRoot) {
  return path9.join(projectRoot, ".opencode", "index");
}
function getLocalProjectConfigPath(projectRoot) {
  return path9.join(projectRoot, ".opencode", "codebase-index.json");
}
function clearIndexRoot(projectRoot, scope) {
  const indexRoot = scope === "global" ? getIndexRootPath(projectRoot, scope) : getLocalProjectIndexRoot(projectRoot);
  if ((0, import_fs9.existsSync)(indexRoot)) {
    (0, import_fs12.rmSync)(indexRoot, { recursive: true, force: true });
  }
}
function ensureLocalEvalProjectConfig(projectRoot, configPath) {
  const localConfigPath = getLocalProjectConfigPath(projectRoot);
  const resolvedConfigPath = configPath ? toAbsolute(projectRoot, configPath) : resolveProjectConfigPath(projectRoot);
  if (!configPath && (0, import_fs9.existsSync)(localConfigPath)) {
    return localConfigPath;
  }
  if (!(0, import_fs9.existsSync)(resolvedConfigPath) || resolvedConfigPath === localConfigPath) {
    return resolvedConfigPath;
  }
  const sourceConfig = normalizeEvalConfigKnowledgeBases(
    JSON.parse((0, import_fs11.readFileSync)(resolvedConfigPath, "utf-8")),
    projectRoot,
    resolvedConfigPath
  );
  (0, import_fs10.mkdirSync)(path9.dirname(localConfigPath), { recursive: true });
  (0, import_fs13.writeFileSync)(localConfigPath, JSON.stringify(sourceConfig, null, 2), "utf-8");
  return localConfigPath;
}
function loadParsedConfig(projectRoot, configPath) {
  const raw = loadRawConfig(projectRoot, configPath);
  return parseConfig(raw);
}
function resolveSearchConfig(parsedConfig, overrides) {
  const nextSearch = {
    ...parsedConfig.search
  };
  if (overrides?.fusionStrategy !== void 0) {
    nextSearch.fusionStrategy = overrides.fusionStrategy;
  }
  if (overrides?.hybridWeight !== void 0) {
    nextSearch.hybridWeight = overrides.hybridWeight;
  }
  if (overrides?.rrfK !== void 0) {
    nextSearch.rrfK = overrides.rrfK;
  }
  if (overrides?.rerankTopN !== void 0) {
    nextSearch.rerankTopN = overrides.rerankTopN;
  }
  return {
    ...parsedConfig,
    search: nextSearch
  };
}
async function runEvaluation(options) {
  const datasetPath = toAbsolute(options.projectRoot, options.datasetPath);
  const againstPath = options.againstPath ? toAbsolute(options.projectRoot, options.againstPath) : void 0;
  const budgetPath = options.budgetPath ? toAbsolute(options.projectRoot, options.budgetPath) : void 0;
  const dataset = loadGoldenDataset(datasetPath);
  const resolvedEvalConfigPath = options.reindex ? ensureLocalEvalProjectConfig(options.projectRoot, options.configPath) : options.configPath;
  const parsedConfig = loadParsedConfig(options.projectRoot, resolvedEvalConfigPath);
  const effectiveConfig = resolveSearchConfig(parsedConfig, options.searchOverrides);
  if (options.reindex) {
    clearIndexRoot(options.projectRoot, effectiveConfig.scope);
  }
  const indexer = new Indexer(options.projectRoot, effectiveConfig);
  try {
    await indexer.index();
    const perQuery = [];
    for (const query of dataset.queries) {
      if (query.expected.branch && query.expected.branch !== indexer.getCurrentBranch()) {
        throw new Error(
          `Query '${query.id}' expects branch '${query.expected.branch}', but current branch is '${indexer.getCurrentBranch()}'. Switch branch before running this dataset.`
        );
      }
      const start = import_perf_hooks2.performance.now();
      const result = await indexer.search(query.query, 10, {
        metadataOnly: true,
        filterByBranch: query.expected.branch ? true : false
      });
      const elapsed = import_perf_hooks2.performance.now() - start;
      const materialized = result.map((item) => ({
        filePath: item.filePath,
        startLine: item.startLine,
        endLine: item.endLine,
        score: item.score,
        chunkType: item.chunkType,
        name: item.name
      }));
      perQuery.push(buildPerQueryResult(query, materialized, elapsed, 10));
    }
    const logger = indexer.getLogger();
    const metricSnapshot = logger.getMetrics();
    const costPer1MTokensUsd = effectiveConfig.embeddingProvider === "custom" || effectiveConfig.embeddingProvider === "auto" ? 0 : getDefaultModelForProvider(effectiveConfig.embeddingProvider).costPer1MTokens;
    const summary = {
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      projectRoot: options.projectRoot,
      datasetPath,
      datasetName: dataset.name,
      datasetVersion: dataset.version,
      queryCount: dataset.queries.length,
      topK: 10,
      searchConfig: {
        fusionStrategy: effectiveConfig.search.fusionStrategy,
        hybridWeight: effectiveConfig.search.hybridWeight,
        rrfK: effectiveConfig.search.rrfK,
        rerankTopN: effectiveConfig.search.rerankTopN
      },
      metrics: computeEvalMetrics(
        dataset.queries,
        perQuery,
        metricSnapshot.embeddingApiCalls,
        metricSnapshot.embeddingTokensUsed,
        costPer1MTokensUsd
      )
    };
    const outputDir = createRunDirectory(toAbsolute(options.projectRoot, options.outputRoot));
    const perQueryArtifact = buildPerQueryArtifact(perQuery);
    writeJson(path9.join(outputDir, "summary.json"), summary);
    writeJson(path9.join(outputDir, "per-query.json"), perQueryArtifact);
    let comparison;
    if (againstPath) {
      const baseline = loadSummary(againstPath);
      comparison = compareSummaries(summary, baseline, againstPath);
      writeJson(path9.join(outputDir, "compare.json"), comparison);
    }
    let gate;
    if (options.ciMode) {
      if (!budgetPath) {
        throw new Error("CI mode requires --budget path");
      }
      const budget = loadBudget(budgetPath);
      if (!comparison && budget.baselinePath) {
        const resolvedBaseline = toAbsolute(options.projectRoot, budget.baselinePath);
        if ((0, import_fs9.existsSync)(resolvedBaseline)) {
          const baselineSummary = loadSummary(resolvedBaseline);
          comparison = compareSummaries(summary, baselineSummary, resolvedBaseline);
          writeJson(path9.join(outputDir, "compare.json"), comparison);
        } else if (budget.failOnMissingBaseline) {
          throw new Error(
            `Budget baseline is missing: ${resolvedBaseline}. Set failOnMissingBaseline=false to allow CI run without baseline.`
          );
        }
      }
      gate = evaluateBudgetGate(budget, summary, comparison);
    }
    const markdown = createSummaryMarkdown(summary, comparison, gate);
    writeText(path9.join(outputDir, "summary.md"), markdown);
    return { outputDir, summary, perQuery, comparison, gate };
  } finally {
    await indexer.close();
  }
}
async function runSweep(options, sweep) {
  const fusionValues = sweep.fusionStrategy && sweep.fusionStrategy.length > 0 ? [...sweep.fusionStrategy] : [void 0];
  const weightValues = sweep.hybridWeight && sweep.hybridWeight.length > 0 ? [...sweep.hybridWeight] : [void 0];
  const rrfValues = sweep.rrfK && sweep.rrfK.length > 0 ? [...sweep.rrfK] : [void 0];
  const rerankValues = sweep.rerankTopN && sweep.rerankTopN.length > 0 ? [...sweep.rerankTopN] : [void 0];
  const runs = [];
  for (const fusion of fusionValues) {
    for (const hybridWeight of weightValues) {
      for (const rrfK of rrfValues) {
        for (const rerankTopN of rerankValues) {
          const run = await runEvaluation({
            ...options,
            searchOverrides: {
              ...fusion !== void 0 ? { fusionStrategy: fusion } : {},
              ...hybridWeight !== void 0 ? { hybridWeight } : {},
              ...rrfK !== void 0 ? { rrfK } : {},
              ...rerankTopN !== void 0 ? { rerankTopN } : {}
            }
          });
          runs.push({
            searchConfig: run.summary.searchConfig,
            summary: run.summary,
            comparison: run.comparison,
            gate: run.gate
          });
        }
      }
    }
  }
  const bestByHitAt5 = [...runs].sort(
    (a, b) => b.summary.metrics.hitAt5 - a.summary.metrics.hitAt5
  )[0];
  const bestByMrrAt10 = [...runs].sort(
    (a, b) => b.summary.metrics.mrrAt10 - a.summary.metrics.mrrAt10
  )[0];
  const bestByP95Latency = [...runs].sort(
    (a, b) => a.summary.metrics.latencyMs.p95 - b.summary.metrics.latencyMs.p95
  )[0];
  const outputDir = createRunDirectory(toAbsolute(options.projectRoot, options.outputRoot));
  const failedGateRuns = runs.filter((run) => run.gate && !run.gate.passed).length;
  const gatePassed = failedGateRuns === 0;
  const aggregate = {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    againstPath: options.againstPath,
    runCount: runs.length,
    runs,
    gatePassed,
    failedGateRuns,
    bestByHitAt5,
    bestByMrrAt10,
    bestByP95Latency
  };
  writeJson(path9.join(outputDir, "compare.json"), aggregate);
  const md = createSummaryMarkdown(
    bestByHitAt5?.summary ?? runs[0].summary,
    bestByHitAt5?.comparison,
    void 0,
    aggregate
  );
  writeText(path9.join(outputDir, "summary.md"), md);
  writeJson(path9.join(outputDir, "summary.json"), bestByHitAt5?.summary ?? runs[0].summary);
  return { outputDir, aggregate };
}

// src/eval/cli.ts
function printUsage() {
  console.log(`
Usage:
  opencode-codebase-index-mcp eval run [options]
  opencode-codebase-index-mcp eval compare --against <summary.json> [options]
  opencode-codebase-index-mcp eval diff --current <summary.json> --against <summary.json> [options]

Options:
  --project <path>                 Project root (default: cwd)
  --config <path>                  Config JSON path
  --dataset <path>                 Golden dataset path (default: benchmarks/golden/small.json)
  --current <path>                 Current summary.json path (required for eval diff)
  --output <path>                  Output root dir (default: benchmarks/results)
  --against <path>                 Baseline summary.json to compare against
  --budget <path>                  Budget file for CI mode (default: benchmarks/budgets/default.json)
  --ci                             Enable CI gate mode
  --reindex                        Force reindex before eval

Search overrides:
  --fusionStrategy <rrf|weighted>
  --hybridWeight <0-1>
  --rrfK <number>
  --rerankTopN <number>

Sweep options (comma-separated values):
  --sweepFusionStrategy <rrf,weighted>
  --sweepHybridWeight <0.3,0.5,0.7>
  --sweepRrfK <30,60,90>
  --sweepRerankTopN <10,20,40>
`);
}
function parseNumber(value, flag) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`${flag} must be a number`);
  }
  return parsed;
}
function parseCsvNumbers(value, flag) {
  return value.split(",").map((item) => item.trim()).filter((item) => item.length > 0).map((item) => parseNumber(item, flag));
}
function parseCsvFusion(value) {
  const values = value.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
  const parsed = [];
  for (const candidate of values) {
    if (candidate !== "rrf" && candidate !== "weighted") {
      throw new Error("--sweepFusionStrategy accepts only rrf,weighted");
    }
    parsed.push(candidate);
  }
  return parsed;
}
function hasSweepOptions(sweep) {
  return Boolean(
    sweep.fusionStrategy && sweep.fusionStrategy.length > 0 || sweep.hybridWeight && sweep.hybridWeight.length > 0 || sweep.rrfK && sweep.rrfK.length > 0 || sweep.rerankTopN && sweep.rerankTopN.length > 0
  );
}
function parseEvalArgs(argv, cwd) {
  const parsed = {
    projectRoot: cwd,
    datasetPath: "benchmarks/golden/small.json",
    outputRoot: "benchmarks/results",
    budgetPath: "benchmarks/budgets/default.json",
    ciMode: false,
    reindex: false,
    sweep: {}
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--project" && next) {
      parsed.projectRoot = path10.resolve(cwd, next);
      i += 1;
      continue;
    }
    if (arg === "--config" && next) {
      parsed.configPath = path10.resolve(cwd, next);
      i += 1;
      continue;
    }
    if (arg === "--dataset" && next) {
      parsed.datasetPath = next;
      i += 1;
      continue;
    }
    if (arg === "--current" && next) {
      parsed.currentPath = next;
      i += 1;
      continue;
    }
    if (arg === "--output" && next) {
      parsed.outputRoot = next;
      i += 1;
      continue;
    }
    if (arg === "--against" && next) {
      parsed.againstPath = next;
      i += 1;
      continue;
    }
    if (arg === "--budget" && next) {
      parsed.budgetPath = next;
      i += 1;
      continue;
    }
    if (arg === "--ci") {
      parsed.ciMode = true;
      continue;
    }
    if (arg === "--reindex") {
      parsed.reindex = true;
      continue;
    }
    if (arg === "--fusionStrategy" && next) {
      if (next !== "rrf" && next !== "weighted") {
        throw new Error("--fusionStrategy must be rrf or weighted");
      }
      parsed.fusionStrategy = next;
      i += 1;
      continue;
    }
    if (arg === "--hybridWeight" && next) {
      parsed.hybridWeight = parseNumber(next, "--hybridWeight");
      i += 1;
      continue;
    }
    if (arg === "--rrfK" && next) {
      parsed.rrfK = parseNumber(next, "--rrfK");
      i += 1;
      continue;
    }
    if (arg === "--rerankTopN" && next) {
      parsed.rerankTopN = parseNumber(next, "--rerankTopN");
      i += 1;
      continue;
    }
    if (arg === "--sweepFusionStrategy" && next) {
      parsed.sweep.fusionStrategy = parseCsvFusion(next);
      i += 1;
      continue;
    }
    if (arg === "--sweepHybridWeight" && next) {
      parsed.sweep.hybridWeight = parseCsvNumbers(next, "--sweepHybridWeight");
      i += 1;
      continue;
    }
    if (arg === "--sweepRrfK" && next) {
      parsed.sweep.rrfK = parseCsvNumbers(next, "--sweepRrfK");
      i += 1;
      continue;
    }
    if (arg === "--sweepRerankTopN" && next) {
      parsed.sweep.rerankTopN = parseCsvNumbers(next, "--sweepRerankTopN");
      i += 1;
      continue;
    }
  }
  return parsed;
}
function parseEvalSubcommandOptions(argv, cwd) {
  let explicitAgainst;
  const filtered = [];
  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    const next = argv[i + 1];
    if (current === "--against" && next) {
      explicitAgainst = next;
      i += 1;
      continue;
    }
    filtered.push(current);
  }
  return {
    parsed: parseEvalArgs(filtered, cwd),
    explicitAgainst
  };
}
function toRunOptions(parsed) {
  return {
    projectRoot: parsed.projectRoot,
    configPath: parsed.configPath,
    datasetPath: parsed.datasetPath,
    outputRoot: parsed.outputRoot,
    againstPath: parsed.againstPath,
    budgetPath: parsed.budgetPath,
    ciMode: parsed.ciMode,
    reindex: parsed.reindex,
    searchOverrides: {
      ...parsed.fusionStrategy !== void 0 ? { fusionStrategy: parsed.fusionStrategy } : {},
      ...parsed.hybridWeight !== void 0 ? { hybridWeight: parsed.hybridWeight } : {},
      ...parsed.rrfK !== void 0 ? { rrfK: parsed.rrfK } : {},
      ...parsed.rerankTopN !== void 0 ? { rerankTopN: parsed.rerankTopN } : {}
    }
  };
}
async function handleEvalCommand(args, cwd) {
  const subcommand = args[0];
  if (!subcommand || subcommand === "--help" || subcommand === "-h") {
    printUsage();
    return 0;
  }
  if (subcommand === "run") {
    const { parsed, explicitAgainst } = parseEvalSubcommandOptions(args.slice(1), cwd);
    if (explicitAgainst) {
      parsed.againstPath = explicitAgainst;
    }
    const runOptions = toRunOptions(parsed);
    if (hasSweepOptions(parsed.sweep)) {
      const sweep = await runSweep(runOptions, parsed.sweep);
      console.log(`Eval sweep complete. Artifacts: ${sweep.outputDir}`);
      console.log(`Sweep runs: ${sweep.aggregate.runCount}`);
      if (parsed.ciMode && sweep.aggregate.gatePassed === false) {
        console.error(
          `[CI-GATE] Sweep failed: ${sweep.aggregate.failedGateRuns ?? 0} run(s) violated budget/baseline gates`
        );
        return 1;
      }
      return 0;
    }
    const result = await runEvaluation(runOptions);
    console.log(`Eval run complete. Artifacts: ${result.outputDir}`);
    console.log(
      `Hit@5=${(result.summary.metrics.hitAt5 * 100).toFixed(2)}% MRR@10=${result.summary.metrics.mrrAt10.toFixed(4)} p95=${result.summary.metrics.latencyMs.p95.toFixed(3)}ms`
    );
    if (result.gate && !result.gate.passed) {
      for (const violation of result.gate.violations) {
        console.error(`[CI-GATE] ${violation.metric}: ${violation.message}`);
      }
      return 1;
    }
    return 0;
  }
  if (subcommand === "compare") {
    const { parsed, explicitAgainst } = parseEvalSubcommandOptions(args.slice(1), cwd);
    if (!explicitAgainst) {
      throw new Error("eval compare requires --against <baseline summary.json>");
    }
    parsed.againstPath = explicitAgainst;
    const runOptions = toRunOptions(parsed);
    if (hasSweepOptions(parsed.sweep)) {
      const sweep = await runSweep(runOptions, parsed.sweep);
      console.log(`Eval compare sweep complete. Artifacts: ${sweep.outputDir}`);
      if (parsed.ciMode && sweep.aggregate.gatePassed === false) {
        console.error(
          `[CI-GATE] Sweep failed: ${sweep.aggregate.failedGateRuns ?? 0} run(s) violated budget/baseline gates`
        );
        return 1;
      }
      return 0;
    }
    const result = await runEvaluation(runOptions);
    console.log(`Eval compare complete. Artifacts: ${result.outputDir}`);
    return 0;
  }
  if (subcommand === "diff") {
    const { parsed, explicitAgainst } = parseEvalSubcommandOptions(args.slice(1), cwd);
    if (!explicitAgainst) {
      throw new Error("eval diff requires --against <baseline summary.json>");
    }
    if (!parsed.currentPath) {
      throw new Error("eval diff requires --current <current summary.json>");
    }
    parsed.againstPath = explicitAgainst;
    const currentPath = parsed.currentPath;
    if (!currentPath.endsWith(".json")) {
      throw new Error("eval diff --current must point to a summary JSON file");
    }
    if (!parsed.againstPath.endsWith(".json")) {
      throw new Error("eval diff --against must point to a summary JSON file");
    }
    const currentSummary = loadSummary(path10.resolve(parsed.projectRoot, currentPath), {
      allowLegacyDiversityMetrics: true
    });
    const baselineSummary = loadSummary(path10.resolve(parsed.projectRoot, parsed.againstPath), {
      allowLegacyDiversityMetrics: true
    });
    const comparison = compareSummaries(
      currentSummary,
      baselineSummary,
      path10.resolve(parsed.projectRoot, parsed.againstPath)
    );
    const outputDir = createRunDirectory(path10.resolve(parsed.projectRoot, parsed.outputRoot));
    const summaryMd = createSummaryMarkdown(currentSummary, comparison);
    writeJson(path10.join(outputDir, "compare.json"), comparison);
    writeText(path10.join(outputDir, "summary.md"), summaryMd);
    writeJson(path10.join(outputDir, "summary.json"), currentSummary);
    console.log(`Eval diff complete. Artifacts: ${outputDir}`);
    return 0;
  }
  throw new Error(`Unknown eval subcommand: ${subcommand}`);
}

// src/mcp-server.ts
var import_mcp = require("@modelcontextprotocol/sdk/server/mcp.js");
var import_zod = require("zod");
var path11 = __toESM(require("path"), 1);
var import_fs14 = require("fs");

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
    let main2 = `${stats.totalFiles} files processed, ${stats.indexedChunks} new chunks embedded.`;
    if (stats.existingChunks > 0) {
      main2 += ` ${stats.existingChunks} unchanged chunks skipped.`;
    }
    lines.push(main2);
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

// src/mcp-server.ts
var MAX_CONTENT_LINES2 = 30;
function truncateContent2(content) {
  const lines = content.split("\n");
  if (lines.length <= MAX_CONTENT_LINES2) return content;
  return lines.slice(0, MAX_CONTENT_LINES2).join("\n") + `
// ... (${lines.length - MAX_CONTENT_LINES2} more lines)`;
}
var CHUNK_TYPE_ENUM = [
  "function",
  "class",
  "method",
  "interface",
  "type",
  "enum",
  "struct",
  "impl",
  "trait",
  "module",
  "other"
];
function createMcpServer(projectRoot, config) {
  const server = new import_mcp.McpServer({
    name: "opencode-codebase-index",
    version: "0.5.1"
  });
  const runtimeConfig = config;
  let indexer = new Indexer(projectRoot, runtimeConfig);
  let initialized = false;
  function refreshIndexerFromConfig() {
    indexer = new Indexer(projectRoot, runtimeConfig);
    initialized = false;
  }
  function shouldForceLocalizeProjectIndex() {
    if (runtimeConfig.scope !== "project") {
      return false;
    }
    const localIndexPath = path11.join(projectRoot, ".opencode", "index");
    const mainRepoRoot = resolveWorktreeMainRepoRoot(projectRoot);
    if (!mainRepoRoot) {
      return false;
    }
    const inheritedIndexPath = path11.join(mainRepoRoot, ".opencode", "index");
    return !(0, import_fs14.existsSync)(localIndexPath) && (0, import_fs14.existsSync)(inheritedIndexPath);
  }
  async function ensureInitialized() {
    if (!initialized) {
      await indexer.initialize();
      initialized = true;
    }
  }
  server.tool(
    "codebase_search",
    "Search codebase by MEANING, not keywords. Returns full code content. For just finding WHERE code is (saves ~90% tokens), use codebase_peek instead.",
    {
      query: import_zod.z.string().describe("Natural language description of what code you're looking for. Describe behavior, not syntax."),
      limit: import_zod.z.number().optional().default(5).describe("Maximum number of results to return"),
      fileType: import_zod.z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py', 'rs')"),
      directory: import_zod.z.string().optional().describe("Filter by directory path (e.g., 'src/utils', 'lib')"),
      chunkType: import_zod.z.enum(CHUNK_TYPE_ENUM).optional().describe("Filter by code chunk type"),
      contextLines: import_zod.z.number().optional().describe("Number of extra lines to include before/after each match (default: 0)")
    },
    async (args) => {
      await ensureInitialized();
      const results = await indexer.search(args.query, args.limit ?? 5, {
        fileType: args.fileType,
        directory: args.directory,
        chunkType: args.chunkType,
        contextLines: args.contextLines
      });
      if (results.length === 0) {
        return { content: [{ type: "text", text: "No matching code found. Try a different query or run index_codebase first." }] };
      }
      const formatted = results.map((r, idx) => {
        const header = r.name ? `[${idx + 1}] ${r.chunkType} "${r.name}" in ${r.filePath}:${r.startLine}-${r.endLine}` : `[${idx + 1}] ${r.chunkType} in ${r.filePath}:${r.startLine}-${r.endLine}`;
        return `${header} (score: ${r.score.toFixed(2)})
\`\`\`
${truncateContent2(r.content)}
\`\`\``;
      });
      return { content: [{ type: "text", text: `Found ${results.length} results for "${args.query}":

${formatted.join("\n\n")}` }] };
    }
  );
  server.tool(
    "codebase_peek",
    "Quick lookup of code locations by meaning. Returns only metadata (file, line, name, type) WITHOUT code content. Saves ~90% tokens vs codebase_search.",
    {
      query: import_zod.z.string().describe("Natural language description of what code you're looking for."),
      limit: import_zod.z.number().optional().default(10).describe("Maximum number of results to return"),
      fileType: import_zod.z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py', 'rs')"),
      directory: import_zod.z.string().optional().describe("Filter by directory path (e.g., 'src/utils', 'lib')"),
      chunkType: import_zod.z.enum(CHUNK_TYPE_ENUM).optional().describe("Filter by code chunk type")
    },
    async (args) => {
      await ensureInitialized();
      const results = await indexer.search(args.query, args.limit ?? 10, {
        fileType: args.fileType,
        directory: args.directory,
        chunkType: args.chunkType,
        metadataOnly: true
      });
      if (results.length === 0) {
        return { content: [{ type: "text", text: "No matching code found. Try a different query or run index_codebase first." }] };
      }
      const formatted = results.map((r, idx) => {
        const location = `${r.filePath}:${r.startLine}-${r.endLine}`;
        const name = r.name ? `"${r.name}"` : "(anonymous)";
        return `[${idx + 1}] ${r.chunkType} ${name} at ${location} (score: ${r.score.toFixed(2)})`;
      });
      return { content: [{ type: "text", text: `Found ${results.length} locations for "${args.query}":

${formatted.join("\n")}

Use Read tool to examine specific files.` }] };
    }
  );
  server.tool(
    "index_codebase",
    "Index the codebase for semantic search. Creates vector embeddings of code chunks. Incremental - only re-indexes changed files. Run before first codebase_search.",
    {
      force: import_zod.z.boolean().optional().default(false).describe("Force reindex even if already indexed"),
      estimateOnly: import_zod.z.boolean().optional().default(false).describe("Only show cost estimate without indexing"),
      verbose: import_zod.z.boolean().optional().default(false).describe("Show detailed info about skipped files and parsing failures")
    },
    async (args) => {
      if (args.estimateOnly) {
        await ensureInitialized();
        const estimate = await indexer.estimateCost();
        return { content: [{ type: "text", text: formatCostEstimate(estimate) }] };
      }
      if (args.force) {
        if (shouldForceLocalizeProjectIndex()) {
          materializeLocalProjectConfig(projectRoot, loadProjectConfigLayer(projectRoot));
          refreshIndexerFromConfig();
        }
        await ensureInitialized();
        await indexer.clearIndex();
        refreshIndexerFromConfig();
        await ensureInitialized();
      } else {
        await ensureInitialized();
      }
      const stats = await indexer.index();
      return { content: [{ type: "text", text: formatIndexStats(stats, args.verbose ?? false) }] };
    }
  );
  server.tool(
    "index_status",
    "Check the status of the codebase index. Shows whether the codebase is indexed, how many chunks are stored, and the embedding provider being used.",
    {},
    async () => {
      await ensureInitialized();
      const status = await indexer.getStatus();
      return { content: [{ type: "text", text: formatStatus(status) }] };
    }
  );
  server.tool(
    "index_health_check",
    "Check index health and remove stale entries from deleted files. Run this to clean up the index after files have been deleted.",
    {},
    async () => {
      await ensureInitialized();
      const result = await indexer.healthCheck();
      return { content: [{ type: "text", text: formatHealthCheck(result) }] };
    }
  );
  server.tool(
    "index_metrics",
    "Get metrics and performance statistics for the codebase index. Requires debug.enabled=true and debug.metrics=true in config.",
    {},
    async () => {
      await ensureInitialized();
      const logger = indexer.getLogger();
      if (!logger.isEnabled()) {
        return { content: [{ type: "text", text: 'Debug mode is disabled. Enable it in your config:\n\n```json\n{\n  "debug": {\n    "enabled": true,\n    "metrics": true\n  }\n}\n```' }] };
      }
      if (!logger.isMetricsEnabled()) {
        return { content: [{ type: "text", text: 'Metrics collection is disabled. Enable it in your config:\n\n```json\n{\n  "debug": {\n    "enabled": true,\n    "metrics": true\n  }\n}\n```' }] };
      }
      return { content: [{ type: "text", text: logger.formatMetrics() }] };
    }
  );
  server.tool(
    "index_logs",
    "Get recent debug logs from the codebase indexer. Requires debug.enabled=true in config.",
    {
      limit: import_zod.z.number().optional().default(20).describe("Maximum number of log entries to return"),
      category: import_zod.z.enum(["search", "embedding", "cache", "gc", "branch", "general"]).optional().describe("Filter by log category"),
      level: import_zod.z.enum(["error", "warn", "info", "debug"]).optional().describe("Filter by minimum log level")
    },
    async (args) => {
      await ensureInitialized();
      const logger = indexer.getLogger();
      if (!logger.isEnabled()) {
        return { content: [{ type: "text", text: 'Debug mode is disabled. Enable it in your config:\n\n```json\n{\n  "debug": {\n    "enabled": true\n  }\n}\n```' }] };
      }
      let logs;
      if (args.category) {
        logs = logger.getLogsByCategory(args.category, args.limit);
      } else if (args.level) {
        logs = logger.getLogsByLevel(args.level, args.limit);
      } else {
        logs = logger.getLogs(args.limit);
      }
      if (logs.length === 0) {
        return { content: [{ type: "text", text: "No logs recorded yet. Logs are captured during indexing and search operations." }] };
      }
      const text = logs.map((l) => {
        const dataStr = l.data ? ` ${JSON.stringify(l.data)}` : "";
        return `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.category}] ${l.message}${dataStr}`;
      }).join("\n");
      return { content: [{ type: "text", text }] };
    }
  );
  server.tool(
    "find_similar",
    "Find code similar to a given snippet. Use for duplicate detection, pattern discovery, or refactoring prep.",
    {
      code: import_zod.z.string().describe("The code snippet to find similar code for"),
      limit: import_zod.z.number().optional().default(10).describe("Maximum number of results to return"),
      fileType: import_zod.z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py', 'rs')"),
      directory: import_zod.z.string().optional().describe("Filter by directory path (e.g., 'src/utils', 'lib')"),
      chunkType: import_zod.z.enum(CHUNK_TYPE_ENUM).optional().describe("Filter by code chunk type"),
      excludeFile: import_zod.z.string().optional().describe("Exclude results from this file path")
    },
    async (args) => {
      await ensureInitialized();
      const results = await indexer.findSimilar(args.code, args.limit ?? 10, {
        fileType: args.fileType,
        directory: args.directory,
        chunkType: args.chunkType,
        excludeFile: args.excludeFile
      });
      if (results.length === 0) {
        return { content: [{ type: "text", text: "No similar code found. Try a different snippet or run index_codebase first." }] };
      }
      const formatted = results.map((r, idx) => {
        const header = r.name ? `[${idx + 1}] ${r.chunkType} "${r.name}" in ${r.filePath}:${r.startLine}-${r.endLine}` : `[${idx + 1}] ${r.chunkType} in ${r.filePath}:${r.startLine}-${r.endLine}`;
        return `${header} (similarity: ${(r.score * 100).toFixed(1)}%)
\`\`\`
${truncateContent2(r.content)}
\`\`\``;
      });
      return { content: [{ type: "text", text: `Found ${results.length} similar code blocks:

${formatted.join("\n\n")}` }] };
    }
  );
  server.tool(
    "implementation_lookup",
    "Jump to symbol definition. Find WHERE something is defined. Returns the authoritative source location(s). Prefers real implementation files over tests, docs, examples, and fixtures.",
    {
      query: import_zod.z.string().describe("Symbol name or natural language description (e.g., 'validateToken', 'where is the payment handler defined')"),
      limit: import_zod.z.number().optional().default(5).describe("Maximum number of results"),
      fileType: import_zod.z.string().optional().describe("Filter by file extension (e.g., 'ts', 'py')"),
      directory: import_zod.z.string().optional().describe("Filter by directory path (e.g., 'src/utils')")
    },
    async (args) => {
      await ensureInitialized();
      const results = await indexer.search(args.query, args.limit ?? 5, {
        fileType: args.fileType,
        directory: args.directory,
        definitionIntent: true
      });
      return { content: [{ type: "text", text: formatDefinitionLookup(results, args.query) }] };
    }
  );
  server.tool(
    "call_graph",
    "Query the call graph to find callers or callees of a function/method. Use to understand code flow and dependencies.",
    {
      name: import_zod.z.string().describe("Function or method name to query"),
      direction: import_zod.z.enum(["callers", "callees"]).default("callers").describe("Direction: 'callers' finds who calls this function, 'callees' finds what this function calls"),
      symbolId: import_zod.z.string().optional().describe("Symbol ID (required for 'callees' direction)")
    },
    async (args) => {
      await ensureInitialized();
      if (args.direction === "callees") {
        if (!args.symbolId) {
          return { content: [{ type: "text", text: "Error: 'symbolId' is required when direction is 'callees'." }] };
        }
        const callees = await indexer.getCallees(args.symbolId);
        if (callees.length === 0) {
          return { content: [{ type: "text", text: `No callees found for symbol ${args.symbolId}.` }] };
        }
        const formatted2 = callees.map(
          (e, i) => `[${i + 1}] \u2192 ${e.targetName} (${e.callType}) at line ${e.line}${e.isResolved ? ` [resolved: ${e.toSymbolId}]` : " [unresolved]"}`
        );
        return { content: [{ type: "text", text: `Callees (${callees.length}):

${formatted2.join("\n")}` }] };
      }
      const callers = await indexer.getCallers(args.name);
      if (callers.length === 0) {
        return { content: [{ type: "text", text: `No callers found for "${args.name}".` }] };
      }
      const formatted = callers.map(
        (e, i) => `[${i + 1}] \u2190 from ${e.fromSymbolName ?? "<unknown>"} in ${e.fromSymbolFilePath ?? "<unknown file>"} [${e.fromSymbolId}] (${e.callType}) at line ${e.line}${e.isResolved ? " [resolved]" : " [unresolved]"}`
      );
      return { content: [{ type: "text", text: `"${args.name}" is called by ${callers.length} function(s):

${formatted.join("\n")}` }] };
    }
  );
  server.prompt(
    "search",
    "Search codebase by meaning using semantic search",
    { query: import_zod.z.string().describe("What to search for in the codebase") },
    (args) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Search the codebase for: "${args.query}"

Use the codebase_search tool with this query. If you need just locations first, use codebase_peek instead to save tokens.`
        }
      }]
    })
  );
  server.prompt(
    "find",
    "Find code using hybrid approach (semantic + grep)",
    { query: import_zod.z.string().describe("What to find in the codebase") },
    (args) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Find code related to: "${args.query}"

Use a hybrid approach:
1. First use codebase_peek to find semantic matches by meaning
2. Then use grep for exact identifier matches
3. Combine results for comprehensive coverage`
        }
      }]
    })
  );
  server.prompt(
    "index",
    "Index the codebase for semantic search",
    { options: import_zod.z.string().optional().describe("Options: 'force' to rebuild, 'estimate' to check costs") },
    (args) => {
      const opts = args.options?.toLowerCase() ?? "";
      let instruction = "Use the index_codebase tool to index the codebase for semantic search.";
      if (opts.includes("force")) {
        instruction = "Use the index_codebase tool with force=true to rebuild the entire index from scratch.";
      } else if (opts.includes("estimate")) {
        instruction = "Use the index_codebase tool with estimateOnly=true to check the cost estimate before indexing.";
      }
      return {
        messages: [{
          role: "user",
          content: { type: "text", text: instruction }
        }]
      };
    }
  );
  server.prompt(
    "status",
    "Check if the codebase is indexed and ready",
    {},
    () => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: "Use the index_status tool to check if the codebase index is ready and show its current state."
        }
      }]
    })
  );
  server.prompt(
    "definition",
    "Find where a symbol is defined in the codebase",
    { query: import_zod.z.string().describe("Symbol name or description to find the definition of") },
    (args) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Find the definition of: "${args.query}"

Use the implementation_lookup tool to find where this symbol is defined. This prioritizes real implementation files over tests, docs, and examples. If no definition is found, fall back to codebase_search for broader discovery.`
        }
      }]
    })
  );
  return server;
}

// src/cli.ts
function parseArgs(argv) {
  let project = process.cwd();
  let config;
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--project" && argv[i + 1]) {
      project = path12.resolve(argv[++i]);
    } else if (argv[i] === "--config" && argv[i + 1]) {
      config = path12.resolve(argv[++i]);
    }
  }
  return { project, config };
}
async function main() {
  if (process.argv[2] === "eval") {
    const exitCode = await handleEvalCommand(process.argv.slice(3), process.cwd());
    process.exit(exitCode);
  }
  const args = parseArgs(process.argv);
  const rawConfig = loadMergedConfig(args.project);
  const config = parseConfig(rawConfig);
  const server = createMcpServer(args.project, config);
  const transport = new import_stdio.StdioServerTransport();
  await server.connect(transport);
  const shutdown = () => {
    server.close().catch(() => {
    });
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Fatal: ${message}`);
  process.exit(1);
});
//# sourceMappingURL=cli.cjs.map