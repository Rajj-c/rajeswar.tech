module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/rajeswar.tech/src/components/ui/Loader.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/rajeswar.tech/src/components/LoaderProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoaderProvider",
    ()=>LoaderProvider,
    "useLoader",
    ()=>useLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/src/components/ui/Loader.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
const LoaderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useLoader = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LoaderContext);
    if (!context) throw new Error("useLoader must be used within LoaderProvider");
    return context;
};
function LoaderProvider({ children }) {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const startLoading = (callback)=>{
        setIsLoading(true);
        // Global 3 seconds wait time as requested
        setTimeout(()=>{
            setIsLoading(false);
            callback();
        }, 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoaderContext.Provider, {
        value: {
            startLoading
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].overlay,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box1}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box2}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box3}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box4}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box} ${__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].box5}`
                            }, void 0, false, {
                                fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$src$2f$components$2f$ui$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logo,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 2L2 7l10 5 10-5-10-5z"
                                        }, void 0, false, {
                                            fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M2 17l10 5 10-5"
                                        }, void 0, false, {
                                            fileName: "[project]/rajeswar.tech/src/components/LoaderProvider.tsx",
                                            lineNumber: 52,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fa83e12f._.js.map