(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/rajeswar.tech/src/components/ui/Loader.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "box": "Loader-module__RwZ6wq__box",
  "box1": "Loader-module__RwZ6wq__box1",
  "box2": "Loader-module__RwZ6wq__box2",
  "box3": "Loader-module__RwZ6wq__box3",
  "box4": "Loader-module__RwZ6wq__box4",
  "box5": "Loader-module__RwZ6wq__box5",
  "colorChange": "Loader-module__RwZ6wq__colorChange",
  "loader": "Loader-module__RwZ6wq__loader",
  "logo": "Loader-module__RwZ6wq__logo",
  "overlay": "Loader-module__RwZ6wq__overlay",
  "ripple": "Loader-module__RwZ6wq__ripple",
});
}),
"[project]/rajeswar.tech/src/components/LoaderProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoaderProvider",
    ()=>LoaderProvider,
    "useLoader",
    ()=>useLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/src/components/ui/Loader.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const LoaderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useLoader = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LoaderContext);
    if (!context) throw new Error("useLoader must be used within LoaderProvider");
    return context;
};
_s(useLoader, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function LoaderProvider({ children }) {
    _s1();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const startLoading = (callback)=>{
        setIsLoading(true);
        // Global 3 seconds wait time as requested
        setTimeout(()=>{
            setIsLoading(false);
            callback();
        }, 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoaderContext.Provider, {
        value: {
            startLoading
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box1}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box2}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box3}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box4}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].box5}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 2L2 7l10 5 10-5-10-5z"
                                        }, void 0, false, {
                                            fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M2 17l10 5 10-5"
                                        }, void 0, false, {
                                            fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                            lineNumber: 52,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M2 12l10 5 10-5"
                                        }, void 0, false, {
                                            fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                            lineNumber: 53,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                    lineNumber: 50,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                        lineNumber: 42,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s1(LoaderProvider, "EmvgwIb3cHpoFpeP+WmEDbjx4y4=");
_c = LoaderProvider;
var _c;
__turbopack_context__.k.register(_c, "LoaderProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=rajeswar_tech_src_components_535d9e3e._.js.map