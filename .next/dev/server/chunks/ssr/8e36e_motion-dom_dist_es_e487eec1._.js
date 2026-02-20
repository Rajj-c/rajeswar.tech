module.exports = [
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Generate a list of every possible transform key.
 */ __turbopack_context__.s([
    "transformPropOrder",
    ()=>transformPropOrder,
    "transformProps",
    ()=>transformProps
]);
const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
];
/**
 * A quick lookup for transform props.
 */ const transformProps = /*@__PURE__*/ (()=>new Set(transformPropOrder))();
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultTransformValue",
    ()=>defaultTransformValue,
    "parseValueFromTransform",
    ()=>parseValueFromTransform,
    "readTransformValue",
    ()=>readTransformValue
]);
const radToDeg = (rad)=>rad * 180 / Math.PI;
const rotate = (v)=>{
    const angle = radToDeg(Math.atan2(v[1], v[0]));
    return rebaseAngle(angle);
};
const matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v)=>(Math.abs(v[0]) + Math.abs(v[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v)=>radToDeg(Math.atan(v[1])),
    skewY: (v)=>radToDeg(Math.atan(v[2])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[2])) / 2
};
const rebaseAngle = (angle)=>{
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle;
};
const rotateZ = rotate;
const scaleX = (v)=>Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v)=>Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v)=>(scaleX(v) + scaleY(v)) / 2,
    rotateX: (v)=>rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
    rotateY: (v)=>rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v)=>radToDeg(Math.atan(v[4])),
    skewY: (v)=>radToDeg(Math.atan(v[1])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
        return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
        parsers = matrix3dParsers;
        match = matrix3dMatch;
    } else {
        const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        parsers = matrix2dParsers;
        match = matrix2dMatch;
    }
    if (!match) {
        return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
const readTransformValue = (instance, name)=>{
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
    return parseFloat(value.trim());
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/utils/keys-position.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "positionalKeys",
    ()=>positionalKeys
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
;
const positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformPropOrder"]
]);
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/auto.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ValueType for "auto"
 */ __turbopack_context__.s([
    "auto",
    ()=>auto
]);
const auto = {
    test: (v)=>v === "auto",
    parse: (v)=>v
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/test.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Tests a provided value against a ValueType
 */ __turbopack_context__.s([
    "testValueType",
    ()=>testValueType
]);
const testValueType = (v)=>(type)=>type.test(v);
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dimensionValueTypes",
    ()=>dimensionValueTypes,
    "findDimensionValueType",
    ()=>findDimensionValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$auto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/auto.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/test.mjs [app-ssr] (ecmascript)");
;
;
;
;
/**
 * A list of value types commonly used for dimensions
 */ const dimensionValueTypes = [
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percent"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vw"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vh"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$auto$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auto"]
];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */ const findDimensionValueType = (v)=>dimensionValueTypes.find((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["testValueType"])(v));
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getVariableValue",
    ()=>getVariableValue,
    "parseCSSVariable",
    ()=>parseCSSVariable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-ssr] (ecmascript)");
;
;
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */ const splitCSSVariableRegex = // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match) return [
        , 
    ];
    const [, token1, token2, fallback] = match;
    return [
        `--${token1 ?? token2}`,
        fallback
    ];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invariant"])(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [token, fallback] = parseCSSVariable(current);
    // No CSS variable detected
    if (!token) return;
    // Attempt to read this CSS variable off the element
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        const trimmed = resolved.trim();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNumericalString"])(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCSSVariableToken"])(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fillWildcards",
    ()=>fillWildcards
]);
function fillWildcards(keyframes) {
    for(let i = 1; i < keyframes.length; i++){
        keyframes[i] ?? (keyframes[i] = keyframes[i - 1]);
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNumOrPxType",
    ()=>isNumOrPxType,
    "positionalValues",
    ()=>positionalValues,
    "removeNonTranslationalTransform",
    ()=>removeNonTranslationalTransform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-ssr] (ecmascript)");
;
;
;
;
const isNumOrPxType = (v)=>v === __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"] || v === __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"];
const transformKeys = new Set([
    "x",
    "y",
    "z"
]);
const nonTranslationalTransformKeys = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformPropOrder"].filter((key)=>!transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key)=>{
        const value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([
                key,
                value.get()
            ]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    return removedTransforms;
}
const positionalValues = {
    // Dimensions
    width: ({ x }, { paddingLeft = "0", paddingRight = "0" })=>x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
    height: ({ y }, { paddingTop = "0", paddingBottom = "0" })=>y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
    top: (_bbox, { top })=>parseFloat(top),
    left: (_bbox, { left })=>parseFloat(left),
    bottom: ({ y }, { top })=>parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left })=>parseFloat(left) + (x.max - x.min),
    // Transform
    x: (_bbox, { transform })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseValueFromTransform"])(transform, "x"),
    y: (_bbox, { transform })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseValueFromTransform"])(transform, "y")
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyframeResolver",
    ()=>KeyframeResolver,
    "flushKeyframeResolvers",
    ()=>flushKeyframeResolvers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$fill$2d$wildcards$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)");
;
;
;
const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const resolversToMeasure = Array.from(toResolve).filter((resolver)=>resolver.needsMeasurement);
        const elementsToMeasure = new Set(resolversToMeasure.map((resolver)=>resolver.element));
        const transformsToRestore = new Map();
        /**
         * Write pass
         * If we're measuring elements we want to remove bounding box-changing transforms.
         */ elementsToMeasure.forEach((element)=>{
            const removedTransforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeNonTranslationalTransform"])(element);
            if (!removedTransforms.length) return;
            transformsToRestore.set(element, removedTransforms);
            element.render();
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureInitialState());
        // Write
        elementsToMeasure.forEach((element)=>{
            element.render();
            const restore = transformsToRestore.get(element);
            if (restore) {
                restore.forEach(([key, value])=>{
                    element.getValue(key)?.set(value);
                });
            }
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureEndState());
        // Write
        resolversToMeasure.forEach((resolver)=>{
            if (resolver.suspendedScrollY !== undefined) {
                window.scrollTo(0, resolver.suspendedScrollY);
            }
        });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver)=>resolver.complete(isForced));
    toResolve.clear();
}
function readAllKeyframes() {
    toResolve.forEach((resolver)=>{
        resolver.readKeyframes();
        if (resolver.needsMeasurement) {
            anyNeedsMeasurement = true;
        }
    });
}
function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
}
class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false){
        this.state = "pending";
        /**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */ this.isAsync = false;
        /**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */ this.needsMeasurement = false;
        this.unresolvedKeyframes = [
            ...unresolvedKeyframes
        ];
        this.onComplete = onComplete;
        this.name = name;
        this.motionValue = motionValue;
        this.element = element;
        this.isAsync = isAsync;
    }
    scheduleResolve() {
        this.state = "scheduled";
        if (this.isAsync) {
            toResolve.add(this);
            if (!isScheduled) {
                isScheduled = true;
                __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].read(readAllKeyframes);
                __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].resolveKeyframes(measureAllKeyframes);
            }
        } else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        const { unresolvedKeyframes, name, element, motionValue } = this;
        // If initial keyframe is null we need to read it from the DOM
        if (unresolvedKeyframes[0] === null) {
            const currentValue = motionValue?.get();
            // TODO: This doesn't work if the final keyframe is a wildcard
            const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (currentValue !== undefined) {
                unresolvedKeyframes[0] = currentValue;
            } else if (element && name) {
                const valueAsRead = element.readValue(name, finalKeyframe);
                if (valueAsRead !== undefined && valueAsRead !== null) {
                    unresolvedKeyframes[0] = valueAsRead;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = finalKeyframe;
            }
            if (motionValue && currentValue === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$fill$2d$wildcards$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fillWildcards"])(unresolvedKeyframes);
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(isForcedComplete = false) {
        this.state = "complete";
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
        toResolve.delete(this);
    }
    cancel() {
        if (this.state === "scheduled") {
            toResolve.delete(this);
            this.state = "pending";
        }
    }
    resume() {
        if (this.state === "pending") this.scheduleResolve();
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNone",
    ()=>isNone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-ssr] (ecmascript)");
;
function isNone(value) {
    if (typeof value === "number") {
        return value === 0;
    } else if (value !== null) {
        return value === "none" || value === "0" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isZeroValueString"])(value);
    } else {
        return true;
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filter",
    ()=>filter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-ssr] (ecmascript)");
;
;
/**
 * Properties that should default to 1 or 100%
 */ const maxDefaults = new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity"
]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow") return v;
    const [number] = value.match(__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["floatRegex"]) || [];
    if (!number) return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value) defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["complex"],
    getAnimatableNone: (v)=>{
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    }
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/int.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "int",
    ()=>int
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)");
;
const int = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
    transform: Math.round
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformValueTypes",
    ()=>transformValueTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-ssr] (ecmascript)");
;
;
const transformValueTypes = {
    rotate: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    rotateX: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    rotateY: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    rotateZ: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    scale: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scale"],
    scaleX: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scale"],
    scaleY: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scale"],
    scaleZ: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scale"],
    skew: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    skewX: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    skewY: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"],
    distance: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    translateX: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    translateY: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    translateZ: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    x: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    y: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    z: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    perspective: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    transformPerspective: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    opacity: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"],
    originX: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["progressPercentage"],
    originY: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["progressPercentage"],
    originZ: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"]
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "numberValueTypes",
    ()=>numberValueTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/int.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs [app-ssr] (ecmascript)");
;
;
;
;
const numberValueTypes = {
    // Border props
    borderWidth: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderTopWidth: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderRightWidth: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderBottomWidth: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderLeftWidth: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    radius: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderTopLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderTopRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderBottomRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    borderBottomLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    // Positioning props
    width: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    maxWidth: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    height: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    maxHeight: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    top: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    right: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    bottom: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    left: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    // Spacing props
    padding: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    paddingTop: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    paddingRight: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    paddingBottom: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    paddingLeft: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    margin: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    marginTop: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    marginRight: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    marginLeft: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    // Misc
    backgroundPositionX: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    backgroundPositionY: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformValueTypes"],
    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["int"],
    // SVG
    fillOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"],
    strokeOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"],
    numOctaves: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["int"]
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultValueTypes",
    ()=>defaultValueTypes,
    "getDefaultValueType",
    ()=>getDefaultValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-ssr] (ecmascript)");
;
;
;
/**
 * A map of default value types for common values
 */ const defaultValueTypes = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["numberValueTypes"],
    // Color props
    color: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    outlineColor: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    fill: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    stroke: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    // Border props
    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    borderTopColor: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    borderRightColor: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    borderBottomColor: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    borderLeftColor: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    filter: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filter"],
    WebkitFilter: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filter"]
};
/**
 * Gets the default ValueType for the provided value key
 */ const getDefaultValueType = (key)=>defaultValueTypes[key];
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAnimatableNone",
    ()=>getAnimatableNone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-ssr] (ecmascript)");
;
;
;
function getAnimatableNone(key, value) {
    let defaultValueType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultValueType"])(key);
    if (defaultValueType !== __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filter"]) defaultValueType = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["complex"];
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : undefined;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeNoneKeyframesAnimatable",
    ()=>makeNoneKeyframesAnimatable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-ssr] (ecmascript)");
;
;
/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */ const invalidTemplates = new Set([
    "auto",
    "none",
    "0"
]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i = 0;
    let animatableTemplate = undefined;
    while(i < unresolvedKeyframes.length && !animatableTemplate){
        const keyframe = unresolvedKeyframes[i];
        if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["analyseComplexValue"])(keyframe).values.length) {
            animatableTemplate = unresolvedKeyframes[i];
        }
        i++;
    }
    if (animatableTemplate && name) {
        for (const noneIndex of noneKeyframeIndexes){
            unresolvedKeyframes[noneIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAnimatableNone"])(name, animatableTemplate);
        }
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DOMKeyframesResolver",
    ()=>DOMKeyframesResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$position$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/utils/keys-position.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$css$2d$variables$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$is$2d$none$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$make$2d$none$2d$animatable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
class DOMKeyframesResolver extends __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyframeResolver"] {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element){
        super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
    }
    readKeyframes() {
        const { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current) return;
        super.readKeyframes();
        /**
         * If any keyframe is a CSS variable, we need to find its value by sampling the element
         */ for(let i = 0; i < unresolvedKeyframes.length; i++){
            let keyframe = unresolvedKeyframes[i];
            if (typeof keyframe === "string") {
                keyframe = keyframe.trim();
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCSSVariableToken"])(keyframe)) {
                    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$css$2d$variables$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVariableValue"])(keyframe, element.current);
                    if (resolved !== undefined) {
                        unresolvedKeyframes[i] = resolved;
                    }
                    if (i === unresolvedKeyframes.length - 1) {
                        this.finalKeyframe = keyframe;
                    }
                }
            }
        }
        /**
         * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
         * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
         * have a far bigger performance impact.
         */ this.resolveNoneKeyframes();
        /**
         * Check to see if unit type has changed. If so schedule jobs that will
         * temporarily set styles to the destination keyframes.
         * Skip if we have more than two keyframes or this isn't a positional value.
         * TODO: We can throw if there are multiple keyframes and the value type changes.
         */ if (!__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$position$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["positionalKeys"].has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        const [origin, target] = unresolvedKeyframes;
        const originType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findDimensionValueType"])(origin);
        const targetType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findDimensionValueType"])(target);
        /**
         * Either we don't recognise these value types or we can animate between them.
         */ if (originType === targetType) return;
        /**
         * If both values are numbers or pixels, we can animate between them by
         * converting them to numbers.
         */ if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNumOrPxType"])(originType) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNumOrPxType"])(targetType)) {
            for(let i = 0; i < unresolvedKeyframes.length; i++){
                const value = unresolvedKeyframes[i];
                if (typeof value === "string") {
                    unresolvedKeyframes[i] = parseFloat(value);
                }
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["positionalValues"][name]) {
            /**
             * Else, the only way to resolve this is by measuring the element.
             */ this.needsMeasurement = true;
        }
    }
    resolveNoneKeyframes() {
        const { unresolvedKeyframes, name } = this;
        const noneKeyframeIndexes = [];
        for(let i = 0; i < unresolvedKeyframes.length; i++){
            if (unresolvedKeyframes[i] === null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$is$2d$none$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNone"])(unresolvedKeyframes[i])) {
                noneKeyframeIndexes.push(i);
            }
        }
        if (noneKeyframeIndexes.length) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$make$2d$none$2d$animatable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeNoneKeyframesAnimatable"])(unresolvedKeyframes, noneKeyframeIndexes, name);
        }
    }
    measureInitialState() {
        const { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current) return;
        if (name === "height") {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["positionalValues"][name](element.measureViewportBox(), window.getComputedStyle(element.current));
        unresolvedKeyframes[0] = this.measuredOrigin;
        // Set final key frame to measure after next render
        const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (measureKeyframe !== undefined) {
            element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
        }
    }
    measureEndState() {
        const { element, name, unresolvedKeyframes } = this;
        if (!element || !element.current) return;
        const value = element.getValue(name);
        value && value.jump(this.measuredOrigin, false);
        const finalKeyframeIndex = unresolvedKeyframes.length - 1;
        const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
        unresolvedKeyframes[finalKeyframeIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["positionalValues"][name](element.measureViewportBox(), window.getComputedStyle(element.current));
        if (finalKeyframe !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = finalKeyframe;
        }
        // If we removed transform values, reapply them before the next render
        if (this.removedTransforms?.length) {
            this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue])=>{
                element.getValue(unsetTransformName).set(unsetTransformValue);
            });
        }
        this.resolveNoneKeyframes();
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/utils/find.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findValueType",
    ()=>findValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/test.mjs [app-ssr] (ecmascript)");
;
;
;
;
/**
 * A list of all ValueTypes
 */ const valueTypes = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dimensionValueTypes"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"],
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["complex"]
];
/**
 * Tests a value against the list of ValueTypes
 */ const findValueType = (v)=>valueTypes.find((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["testValueType"])(v));
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelMicrotask",
    ()=>cancelMicrotask,
    "microtask",
    ()=>microtask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-ssr] (ecmascript)");
;
const { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRenderBatcher"])(queueMicrotask, false);
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Provided a value and a ValueType, returns the value as that value type.
 */ __turbopack_context__.s([
    "getValueAsType",
    ()=>getValueAsType
]);
const getValueAsType = (value, type)=>{
    return type && typeof value === "number" ? type.transform(value) : value;
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getValueTransition",
    ()=>getValueTransition
]);
function getValueTransition(transition, key) {
    return transition?.[key] ?? transition?.["default"] ?? transition;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeAnimationInstant",
    ()=>makeAnimationInstant
]);
function makeAnimationInstant(options) {
    options.duration = 0;
    options.type = "keyframes";
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isCSSVar",
    ()=>isCSSVar
]);
const isCSSVar = (name)=>name.startsWith("--");
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/dom/style-set.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setStyle",
    ()=>setStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$is$2d$css$2d$var$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs [app-ssr] (ecmascript)");
;
function setStyle(element, name, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$is$2d$css$2d$var$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCSSVar"])(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsScrollTimeline",
    ()=>supportsScrollTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/memo.mjs [app-ssr] (ecmascript)");
;
const supportsScrollTimeline = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(()=>window.ScrollTimeline !== undefined);
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */ __turbopack_context__.s([
    "supportsFlags",
    ()=>supportsFlags
]);
const supportsFlags = {};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memoSupports",
    ()=>memoSupports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/memo.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-ssr] (ecmascript)");
;
;
function memoSupports(callback, supportsFlag) {
    const memoized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(callback);
    return ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportsFlags"][supportsFlag] ?? memoized();
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsLinearEasing",
    ()=>supportsLinearEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-ssr] (ecmascript)");
;
const supportsLinearEasing = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memoSupports"])(()=>{
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        });
    } catch (e) {
        return false;
    }
    return true;
}, "linearEasing");
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cubicBezierAsString",
    ()=>cubicBezierAsString
]);
const cubicBezierAsString = ([a, b, c, d])=>`cubic-bezier(${a}, ${b}, ${c}, ${d})`;
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportedWaapiEasing",
    ()=>supportedWaapiEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
;
const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0,
        0.65,
        0.55,
        1
    ]),
    circOut: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.55,
        0,
        1,
        0.45
    ]),
    backIn: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.31,
        0.01,
        0.66,
        -0.59
    ]),
    backOut: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.33,
        1.53,
        0.69,
        0.99
    ])
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapEasingToNativeEasing",
    ()=>mapEasingToNativeEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    } else if (typeof easing === "function") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportsLinearEasing"])() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateLinearEasing"])(easing, duration) : "ease-out";
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBezierDefinition"])(easing)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezierAsString"])(easing);
    } else if (Array.isArray(easing)) {
        return easing.map((segmentEasing)=>mapEasingToNativeEasing(segmentEasing, duration) || __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportedWaapiEasing"].easeOut);
    } else {
        return __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportedWaapiEasing"][easing];
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startWaapiAnimation",
    ()=>startWaapiAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/stats/animation-count.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$map$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs [app-ssr] (ecmascript)");
;
;
;
function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times } = {}, pseudoElement = undefined) {
    const keyframeOptions = {
        [valueName]: keyframes
    };
    if (times) keyframeOptions.offset = times;
    const easing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$map$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapEasingToNativeEasing"])(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */ if (Array.isArray(easing)) keyframeOptions.easing = easing;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeAnimations"].waapi++;
    }
    const options = {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal"
    };
    if (pseudoElement) options.pseudoElement = pseudoElement;
    const animation = element.animate(keyframeOptions, options);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
        animation.finished.finally(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeAnimations"].waapi--;
        });
    }
    return animation;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isGenerator",
    ()=>isGenerator
]);
function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyGeneratorOptions",
    ()=>applyGeneratorOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-ssr] (ecmascript)");
;
;
function applyGeneratorOptions({ type, ...options }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isGenerator"])(type) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportsLinearEasing"])()) {
        return type.applyToOptions(options);
    } else {
        options.duration ?? (options.duration = 300);
        options.ease ?? (options.ease = "easeOut");
    }
    return options;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NativeAnimation",
    ()=>NativeAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/time-conversion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/noop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$style$2d$set$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/render/dom/style-set.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$start$2d$waapi$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$apply$2d$generator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
/**
 * NativeAnimation implements AnimationPlaybackControls for the browser's Web Animations API.
 */ class NativeAnimation extends __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WithPromise"] {
    constructor(options){
        super();
        this.finishedTime = null;
        this.isStopped = false;
        if (!options) return;
        const { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
        this.isPseudoElement = Boolean(pseudoElement);
        this.allowFlatten = allowFlatten;
        this.options = options;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invariant"])(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const transition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$apply$2d$generator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyGeneratorOptions"])(options);
        this.animation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$start$2d$waapi$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startWaapiAnimation"])(element, name, keyframes, transition, pseudoElement);
        if (transition.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = ()=>{
            this.finishedTime = this.time;
            if (!pseudoElement) {
                const keyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFinalKeyframe"])(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(keyframe);
                } else {
                    /**
                     * If we can, we want to commit the final style as set by the user,
                     * rather than the computed keyframe value supplied by the animation.
                     */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$style$2d$set$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setStyle"])(element, name, keyframe);
                }
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
    }
    play() {
        if (this.isStopped) return;
        this.animation.play();
        if (this.state === "finished") {
            this.updateFinished();
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        } catch (e) {}
    }
    stop() {
        if (this.isStopped) return;
        this.isStopped = true;
        const { state } = this;
        if (state === "idle" || state === "finished") {
            return;
        }
        if (this.updateMotionValue) {
            this.updateMotionValue();
        } else {
            this.commitStyles();
        }
        if (!this.isPseudoElement) this.cancel();
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * In this method, we commit styles back to the DOM before cancelling
     * the animation.
     *
     * This is designed to be overridden by NativeAnimationExtended, which
     * will create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to also correctly calculate velocity for any subsequent animation
     * while deferring the commit until the next animation frame.
     */ commitStyles() {
        if (!this.isPseudoElement) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Number(duration));
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(delay);
    }
    get time() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
        this.finishedTime = null;
        this.animation.currentTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(newTime);
    }
    /**
     * The playback speed of the animation.
     * 1 = normal speed, 2 = double speed, 0.5 = half speed.
     */ get speed() {
        return this.animation.playbackRate;
    }
    set speed(newSpeed) {
        // Allow backwards playback after finishing
        if (newSpeed < 0) this.finishedTime = null;
        this.animation.playbackRate = newSpeed;
    }
    get state() {
        return this.finishedTime !== null ? "finished" : this.animation.playState;
    }
    get startTime() {
        return Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
        this.animation.startTime = newStartTime;
    }
    /**
     * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
     */ attachTimeline({ timeline, observe }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({
                easing: "linear"
            });
        }
        this.animation.onfinish = null;
        if (timeline && (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportsScrollTimeline"])()) {
            this.animation.timeline = timeline;
            return __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"];
        } else {
            return observe(this);
        }
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "replaceStringEasing",
    ()=>replaceStringEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/easing/anticipate.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/easing/back.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/easing/circ.mjs [app-ssr] (ecmascript)");
;
const unsupportedEasingFunctions = {
    anticipate: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anticipate"],
    backInOut: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["backInOut"],
    circInOut: __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["circInOut"]
};
function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
    if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
        transition.ease = unsupportedEasingFunctions[transition.ease];
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NativeAnimationExtended",
    ()=>NativeAnimationExtended
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/time-conversion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/JSAnimation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$replace$2d$transition$2d$type$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$unsupported$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
/**
 * 10ms is chosen here as it strikes a balance between smooth
 * results (more than one keyframe per frame at 60fps) and
 * keyframe quantity.
 */ const sampleDelta = 10; //ms
class NativeAnimationExtended extends __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NativeAnimation"] {
    constructor(options){
        /**
         * The base NativeAnimation function only supports a subset
         * of Motion easings, and WAAPI also only supports some
         * easing functions via string/cubic-bezier definitions.
         *
         * This function replaces those unsupported easing functions
         * with a JS easing function. This will later get compiled
         * to a linear() easing function.
         */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$unsupported$2d$easing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["replaceStringEasing"])(options);
        /**
         * Ensure we replace the transition type with a generator function
         * before passing to WAAPI.
         *
         * TODO: Does this have a better home? It could be shared with
         * JSAnimation.
         */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$replace$2d$transition$2d$type$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["replaceTransitionType"])(options);
        super(options);
        if (options.startTime) {
            this.startTime = options.startTime;
        }
        this.options = options;
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * Rather than read commited styles back out of the DOM, we can
     * create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to calculate velocity for any subsequent animation.
     */ updateMotionValue(value) {
        const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
        if (!motionValue) return;
        if (value !== undefined) {
            motionValue.set(value);
            return;
        }
        const sampleAnimation = new __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JSAnimation"]({
            ...options,
            autoplay: false
        });
        const sampleTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(this.finishedTime ?? this.time);
        motionValue.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
        sampleAnimation.stop();
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAnimatable",
    ()=>isAnimatable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
;
/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */ const isAnimatable = (value, name)=>{
    // If the list of keys that might be non-animatable grows, replace with Set
    if (name === "zIndex") return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value)) return true;
    if (typeof value === "string" && // It's animatable if we have a string
    (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["complex"].test(value) || value === "0") && // And it contains numbers and/or colors
    !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canAnimate",
    ()=>canAnimate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animatable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs [app-ssr] (ecmascript)");
;
;
;
function hasKeyframesChanged(keyframes) {
    const current = keyframes[0];
    if (keyframes.length === 1) return true;
    for(let i = 0; i < keyframes.length; i++){
        if (keyframes[i] !== current) return true;
    }
}
function canAnimate(keyframes, name, type, velocity) {
    /**
     * Check if we're able to animate between the start and end keyframes,
     * and throw a warning if we're attempting to animate between one that's
     * animatable and another that isn't.
     */ const originKeyframe = keyframes[0];
    if (originKeyframe === null) return false;
    /**
     * These aren't traditionally animatable but we do support them.
     * In future we could look into making this more generic or replacing
     * this function with mix() === mixImmediate
     */ if (name === "display" || name === "visibility") return true;
    const targetKeyframe = keyframes[keyframes.length - 1];
    const isOriginAnimatable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animatable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAnimatable"])(originKeyframe, name);
    const isTargetAnimatable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animatable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAnimatable"])(targetKeyframe, name);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warning"])(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
    // Always skip if any of these are true
    if (!isOriginAnimatable || !isTargetAnimatable) {
        return false;
    }
    return hasKeyframesChanged(keyframes) || (type === "spring" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isGenerator"])(type)) && velocity;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsBrowserAnimation",
    ()=>supportsBrowserAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/memo.mjs [app-ssr] (ecmascript)");
;
/**
 * A list of values that can be hardware-accelerated.
 */ const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform"
]);
const supportsWaapi = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(()=>Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
    const { motionValue, name, repeatDelay, repeatType, damping, type } = options;
    const subject = motionValue?.owner?.current;
    /**
     * We use this check instead of isHTMLElement() because we explicitly
     * **don't** want elements in different timing contexts (i.e. popups)
     * to be accelerated, as it's not possible to sync these animations
     * properly with those driven from the main window frameloop.
     */ if (!(subject instanceof HTMLElement)) {
        return false;
    }
    const { onUpdate, transformTemplate } = motionValue.owner.getProps();
    return supportsWaapi() && name && acceleratedValues.has(name) && (name !== "transform" || !transformTemplate) && /**
         * If we're outputting values to onUpdate then we can't use WAAPI as there's
         * no way to read the value from WAAPI every frame.
         */ !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsyncMotionValueAnimation",
    ()=>AsyncMotionValueAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/global-config.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/noop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/JSAnimation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimationExtended$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$can$2d$animate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$make$2d$animation$2d$instant$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$supports$2f$waapi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
/**
 * Maximum time allowed between an animation being created and it being
 * resolved for us to use the latter as the start time.
 *
 * This is to ensure that while we prefer to "start" an animation as soon
 * as it's triggered, we also want to avoid a visual jump if there's a big delay
 * between these two moments.
 */ const MAX_RESOLVE_DELAY = 40;
class AsyncMotionValueAnimation extends __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WithPromise"] {
    constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes, name, motionValue, element, ...options }){
        super();
        /**
         * Bound to support return animation.stop pattern
         */ this.stop = ()=>{
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["time"].now();
        const optionsWithDefaults = {
            autoplay,
            delay,
            type,
            repeat,
            repeatDelay,
            repeatType,
            name,
            motionValue,
            element,
            ...options
        };
        const KeyframeResolver$1 = element?.KeyframeResolver || __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyframeResolver"];
        this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced)=>this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
        this.keyframeResolver = undefined;
        const { name, type, velocity, delay, isHandoff, onUpdate } = options;
        this.resolvedAt = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["time"].now();
        /**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */ if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$can$2d$animate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canAnimate"])(keyframes, name, type, velocity)) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].instantAnimations || !delay) {
                onUpdate?.((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFinalKeyframe"])(keyframes, options, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$make$2d$animation$2d$instant$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeAnimationInstant"])(options);
            options.repeat = 0;
        }
        /**
         * Resolve startTime for the animation.
         *
         * This method uses the createdAt and resolvedAt to calculate the
         * animation startTime. *Ideally*, we would use the createdAt time as t=0
         * as the following frame would then be the first frame of the animation in
         * progress, which would feel snappier.
         *
         * However, if there's a delay (main thread work) between the creation of
         * the animation and the first commited frame, we prefer to use resolvedAt
         * to avoid a sudden jump into the animation.
         */ const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : undefined;
        const resolvedOptions = {
            startTime,
            finalKeyframe,
            ...options,
            keyframes
        };
        /**
         * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
         * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
         * optimised animation.
         */ const animation = !isHandoff && (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$supports$2f$waapi$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportsBrowserAnimation"])(resolvedOptions) ? new __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimationExtended$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NativeAnimationExtended"]({
            ...resolvedOptions,
            element: resolvedOptions.motionValue.owner.current
        }) : new __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JSAnimation"](resolvedOptions);
        animation.finished.then(()=>this.notifyFinished()).catch(__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"]);
        if (this.pendingTimeline) {
            this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        this._animation = animation;
    }
    get finished() {
        if (!this._animation) {
            return this._finished;
        } else {
            return this.animation.finished;
        }
    }
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(()=>{});
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushKeyframeResolvers"])();
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(newTime) {
        this.animation.time = newTime;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(newSpeed) {
        this.animation.speed = newSpeed;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(timeline) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(timeline);
        } else {
            this.pendingTimeline = timeline;
        }
        return ()=>this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDragActive",
    ()=>isDragActive,
    "isDragging",
    ()=>isDragging
]);
const isDragging = {
    x: false,
    y: false
};
function isDragActive() {
    return isDragging.x || isDragging.y;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setDragLock",
    ()=>setDragLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-ssr] (ecmascript)");
;
function setDragLock(axis) {
    if (axis === "x" || axis === "y") {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"][axis]) {
            return null;
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"][axis] = true;
            return ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"][axis] = false;
            };
        }
    } else {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"].x || __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"].y) {
            return null;
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"].x = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"].y = true;
            return ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"].x = __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragging"].y = false;
            };
        }
    }
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPrimaryPointer",
    ()=>isPrimaryPointer
]);
const isPrimaryPointer = (event)=>{
    if (event.pointerType === "mouse") {
        return typeof event.button !== "number" || event.button <= 0;
    } else {
        /**
         * isPrimary is true for all mice buttons, whereas every touch point
         * is regarded as its own input. So subsequent concurrent touch points
         * will be false.
         *
         * Specifically match against false here as incomplete versions of
         * PointerEvents in very old browser might have it set as undefined.
         */ return event.isPrimary !== false;
    }
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/is-svg-element.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSVGElement",
    ()=>isSVGElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/is-object.mjs [app-ssr] (ecmascript)");
;
/**
 * Checks if an element is an SVG element in a way
 * that works across iframes
 */ function isSVGElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isObject"])(element) && "ownerSVGElement" in element;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSVGSVGElement",
    ()=>isSVGSVGElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/is-svg-element.mjs [app-ssr] (ecmascript)");
;
/**
 * Checks if an element is specifically an SVGSVGElement (the root SVG element)
 * in a way that works across iframes
 */ function isSVGSVGElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSVGElement"])(element) && element.tagName === "svg";
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveElements",
    ()=>resolveElements
]);
function resolveElements(elementOrSelector, scope, selectorCache) {
    if (elementOrSelector instanceof EventTarget) {
        return [
            elementOrSelector
        ];
    } else if (typeof elementOrSelector === "string") {
        let root = document;
        if (scope) {
            root = scope.current;
        }
        const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
        return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector);
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/utils/setup.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupGesture",
    ()=>setupGesture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-ssr] (ecmascript)");
;
function setupGesture(elementOrSelector, options) {
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveElements"])(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
        passive: true,
        ...options,
        signal: gestureAbortController.signal
    };
    const cancel = ()=>gestureAbortController.abort();
    return [
        elements,
        eventOptions,
        cancel
    ];
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/hover.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hover",
    ()=>hover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/utils/setup.mjs [app-ssr] (ecmascript)");
;
;
function isValidHover(event) {
    return !(event.pointerType === "touch" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragActive"])());
}
/**
 * Create a hover gesture. hover() is different to .addEventListener("pointerenter")
 * in that it has an easier syntax, filters out polyfilled touch events, interoperates
 * with drag gestures, and automatically removes the "pointerennd" event listener when the hover ends.
 *
 * @public
 */ function hover(elementOrSelector, onHoverStart, options = {}) {
    const [elements, eventOptions, cancel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setupGesture"])(elementOrSelector, options);
    const onPointerEnter = (enterEvent)=>{
        if (!isValidHover(enterEvent)) return;
        const { target } = enterEvent;
        const onHoverEnd = onHoverStart(target, enterEvent);
        if (typeof onHoverEnd !== "function" || !target) return;
        const onPointerLeave = (leaveEvent)=>{
            if (!isValidHover(leaveEvent)) return;
            onHoverEnd(leaveEvent);
            target.removeEventListener("pointerleave", onPointerLeave);
        };
        target.addEventListener("pointerleave", onPointerLeave, eventOptions);
    };
    elements.forEach((element)=>{
        element.addEventListener("pointerenter", onPointerEnter, eventOptions);
    });
    return cancel;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/is-html-element.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHTMLElement",
    ()=>isHTMLElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-utils/dist/es/is-object.mjs [app-ssr] (ecmascript)");
;
/**
 * Checks if an element is an HTML element in a way
 * that works across iframes
 */ function isHTMLElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isObject"])(element) && "offsetHeight" in element;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */ __turbopack_context__.s([
    "isNodeOrChild",
    ()=>isNodeOrChild
]);
const isNodeOrChild = (parent, child)=>{
    if (!child) {
        return false;
    } else if (parent === child) {
        return true;
    } else {
        return isNodeOrChild(parent, child.parentElement);
    }
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isElementKeyboardAccessible",
    ()=>isElementKeyboardAccessible
]);
const focusableElements = new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A"
]);
function isElementKeyboardAccessible(element) {
    return focusableElements.has(element.tagName) || element.tabIndex !== -1;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPressing",
    ()=>isPressing
]);
const isPressing = new WeakSet();
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enableKeyboardPress",
    ()=>enableKeyboardPress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs [app-ssr] (ecmascript)");
;
/**
 * Filter out events that are not "Enter" keys.
 */ function filterEvents(callback) {
    return (event)=>{
        if (event.key !== "Enter") return;
        callback(event);
    };
}
function firePointerEvent(target, type) {
    target.dispatchEvent(new PointerEvent("pointer" + type, {
        isPrimary: true,
        bubbles: true
    }));
}
const enableKeyboardPress = (focusEvent, eventOptions)=>{
    const element = focusEvent.currentTarget;
    if (!element) return;
    const handleKeydown = filterEvents(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPressing"].has(element)) return;
        firePointerEvent(element, "down");
        const handleKeyup = filterEvents(()=>{
            firePointerEvent(element, "up");
        });
        const handleBlur = ()=>firePointerEvent(element, "cancel");
        element.addEventListener("keyup", handleKeyup, eventOptions);
        element.addEventListener("blur", handleBlur, eventOptions);
    });
    element.addEventListener("keydown", handleKeydown, eventOptions);
    /**
     * Add an event listener that fires on blur to remove the keydown events.
     */ element.addEventListener("blur", ()=>element.removeEventListener("keydown", handleKeydown), eventOptions);
};
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "press",
    ()=>press
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/is-html-element.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$node$2d$or$2d$child$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/utils/setup.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$is$2d$keyboard$2d$accessible$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Filter out events that are not primary pointer events, or are triggering
 * while a Motion gesture is active.
 */ function isValidPressEvent(event) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPrimaryPointer"])(event) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDragActive"])();
}
/**
 * Create a press gesture.
 *
 * Press is different to `"pointerdown"`, `"pointerup"` in that it
 * automatically filters out secondary pointer events like right
 * click and multitouch.
 *
 * It also adds accessibility support for keyboards, where
 * an element with a press gesture will receive focus and
 *  trigger on Enter `"keydown"` and `"keyup"` events.
 *
 * This is different to a browser's `"click"` event, which does
 * respond to keyboards but only for the `"click"` itself, rather
 * than the press start and end/cancel. The element also needs
 * to be focusable for this to work, whereas a press gesture will
 * make an element focusable by default.
 *
 * @public
 */ function press(targetOrSelector, onPressStart, options = {}) {
    const [targets, eventOptions, cancelEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setupGesture"])(targetOrSelector, options);
    const startPress = (startEvent)=>{
        const target = startEvent.currentTarget;
        if (!isValidPressEvent(startEvent)) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPressing"].add(target);
        const onPressEnd = onPressStart(target, startEvent);
        const onPointerEnd = (endEvent, success)=>{
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerCancel);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPressing"].has(target)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPressing"].delete(target);
            }
            if (!isValidPressEvent(endEvent)) {
                return;
            }
            if (typeof onPressEnd === "function") {
                onPressEnd(endEvent, {
                    success
                });
            }
        };
        const onPointerUp = (upEvent)=>{
            onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$node$2d$or$2d$child$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNodeOrChild"])(target, upEvent.target));
        };
        const onPointerCancel = (cancelEvent)=>{
            onPointerEnd(cancelEvent, false);
        };
        window.addEventListener("pointerup", onPointerUp, eventOptions);
        window.addEventListener("pointercancel", onPointerCancel, eventOptions);
    };
    targets.forEach((target)=>{
        const pointerDownTarget = options.useGlobalTarget ? window : target;
        pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(target)) {
            target.addEventListener("focus", (event)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enableKeyboardPress"])(event, eventOptions));
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$is$2d$keyboard$2d$accessible$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElementKeyboardAccessible"])(target) && !target.hasAttribute("tabindex")) {
                target.tabIndex = 0;
            }
        }
    });
    return cancelEvents;
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/scroll/observe.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "observeTimeline",
    ()=>observeTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)");
;
function observeTimeline(update, timeline) {
    let prevProgress;
    const onFrame = ()=>{
        const { currentTime } = timeline;
        const percentage = currentTime === null ? 0 : currentTime.value;
        const progress = percentage / 100;
        if (prevProgress !== progress) {
            update(progress);
        }
        prevProgress = progress;
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].preUpdate(onFrame, true);
    return ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelFrame"])(onFrame);
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/resize/handle-element.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resizeElement",
    ()=>resizeElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/is-svg-element.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-ssr] (ecmascript)");
;
;
const resizeHandlers = new WeakMap();
let observer;
const getSize = (borderBoxAxis, svgAxis, htmlAxis)=>(target, borderBoxSize)=>{
        if (borderBoxSize && borderBoxSize[0]) {
            return borderBoxSize[0][borderBoxAxis + "Size"];
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSVGElement"])(target) && "getBBox" in target) {
            return target.getBBox()[svgAxis];
        } else {
            return target[htmlAxis];
        }
    };
const getWidth = /*@__PURE__*/ getSize("inline", "width", "offsetWidth");
const getHeight = /*@__PURE__*/ getSize("block", "height", "offsetHeight");
function notifyTarget({ target, borderBoxSize }) {
    resizeHandlers.get(target)?.forEach((handler)=>{
        handler(target, {
            get width () {
                return getWidth(target, borderBoxSize);
            },
            get height () {
                return getHeight(target, borderBoxSize);
            }
        });
    });
}
function notifyAll(entries) {
    entries.forEach(notifyTarget);
}
function createResizeObserver() {
    if (typeof ResizeObserver === "undefined") return;
    observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
    if (!observer) createResizeObserver();
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveElements"])(target);
    elements.forEach((element)=>{
        let elementHandlers = resizeHandlers.get(element);
        if (!elementHandlers) {
            elementHandlers = new Set();
            resizeHandlers.set(element, elementHandlers);
        }
        elementHandlers.add(handler);
        observer?.observe(element);
    });
    return ()=>{
        elements.forEach((element)=>{
            const elementHandlers = resizeHandlers.get(element);
            elementHandlers?.delete(handler);
            if (!elementHandlers?.size) {
                observer?.unobserve(element);
            }
        });
    };
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/resize/handle-window.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resizeWindow",
    ()=>resizeWindow
]);
const windowCallbacks = new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
    windowResizeHandler = ()=>{
        const info = {
            get width () {
                return window.innerWidth;
            },
            get height () {
                return window.innerHeight;
            }
        };
        windowCallbacks.forEach((callback)=>callback(info));
    };
    window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
    windowCallbacks.add(callback);
    if (!windowResizeHandler) createWindowResizeHandler();
    return ()=>{
        windowCallbacks.delete(callback);
        if (!windowCallbacks.size && typeof windowResizeHandler === "function") {
            window.removeEventListener("resize", windowResizeHandler);
            windowResizeHandler = undefined;
        }
    };
}
;
}),
"[project]/rajeswar.tech/node_modules/motion-dom/dist/es/resize/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resize",
    ()=>resize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$handle$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/resize/handle-element.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$handle$2d$window$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rajeswar.tech/node_modules/motion-dom/dist/es/resize/handle-window.mjs [app-ssr] (ecmascript)");
;
;
function resize(a, b) {
    return typeof a === "function" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$handle$2d$window$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resizeWindow"])(a) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$rajeswar$2e$tech$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$handle$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resizeElement"])(a, b);
}
;
}),
];

//# sourceMappingURL=8e36e_motion-dom_dist_es_e487eec1._.js.map