import {
  __commonJS
} from "./chunk-5WRI5ZAA.js";

// ../../node_modules/.pnpm/@baileyherbert+events@1.0.1/node_modules/@baileyherbert/events/dist/EventEmitter.js
var require_EventEmitter = __commonJS({
  "../../node_modules/.pnpm/@baileyherbert+events@1.0.1/node_modules/@baileyherbert/events/dist/EventEmitter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventEmitter = void 0;
    var EventEmitter = class {
      /**
       * Constructs a new `EventEmitter` instance.
       *
       * @param throwUncaughtErrors Whether or not uncaught events sent to the `error` channel should be thrown instead.
       */
      constructor(throwUncaughtErrors = true) {
        this._onListeners = /* @__PURE__ */ new Map();
        this._onceListeners = /* @__PURE__ */ new Map();
        this._throwUncaughtErrors = throwUncaughtErrors;
      }
      /**
       * Listens for an event.
       *
       * @param event
       * @param callback
       */
      on(event, callback) {
        if (!this._onListeners.has(event)) {
          this._onListeners.set(event, /* @__PURE__ */ new Set());
        }
        this._onListeners.get(event).add(callback);
        return this;
      }
      /**
       * Listens for an event once.
       *
       * @param event
       * @param callback
       */
      once(event, callback) {
        if (!this._onceListeners.has(event)) {
          this._onceListeners.set(event, /* @__PURE__ */ new Set());
        }
        this._onceListeners.get(event).add(callback);
        return this;
      }
      /**
       * Removes the listener for an event.
       *
       * @param event
       * @param callback
       */
      removeListener(event, callback) {
        if (this._onListeners.has(event)) {
          this._onListeners.get(event).delete(callback);
        }
        if (this._onceListeners.has(event)) {
          this._onceListeners.get(event).delete(callback);
        }
      }
      /**
       * Removes all listeners for an event, or all listeners on the entire object if an event is not provided.
       *
       * @param event
       */
      removeAllListeners(event) {
        if (typeof event === "string") {
          this._onListeners.delete(event);
          this._onceListeners.delete(event);
        } else if (typeof event === "undefined" || event === null) {
          this._onListeners.clear();
          this._onceListeners.clear();
        } else {
          throw new Error("Expected string or undefined, got " + typeof event);
        }
      }
      /**
       * Emits an event to listeners.
       *
       * @param event
       * @param args
       */
      emit(event, ...args) {
        const callbacks = [
          ...this._onListeners.has(event) ? this._onListeners.get(event) : [],
          ...this._onceListeners.has(event) ? this._onceListeners.get(event) : []
        ];
        this._onceListeners.delete(event);
        for (const callback of callbacks) {
          callback.apply(this, args);
        }
        if (this._throwUncaughtErrors && callbacks.length === 0 && event === "error") {
          throw args[0];
        }
      }
    };
    exports.EventEmitter = EventEmitter;
  }
});

// ../../node_modules/.pnpm/@baileyherbert+events@1.0.1/node_modules/@baileyherbert/events/dist/main.js
var require_main = __commonJS({
  "../../node_modules/.pnpm/@baileyherbert+events@1.0.1/node_modules/@baileyherbert/events/dist/main.js"(exports) {
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_EventEmitter(), exports);
  }
});
export default require_main();
//# sourceMappingURL=@baileyherbert_events.js.map
