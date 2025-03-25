import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const BlockLayout = ({ children, title = "Block Title", subtitle }) => {
    return (_jsxs("div", { className: "md:flex md:gap-4 pb-6 border-b mb-6", children: [_jsxs("section", { className: "w-full max-w-96", children: [title && _jsx("h1", { className: "text-3xl font-bold", children: title }), subtitle && _jsx("p", { className: "text-base", children: subtitle })] }), _jsx("section", { className: "md:flex-1", children: children })] }));
};
//# sourceMappingURL=BlockLayout.js.map