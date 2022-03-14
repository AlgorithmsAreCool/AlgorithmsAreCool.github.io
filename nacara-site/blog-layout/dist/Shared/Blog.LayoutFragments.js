import { createElement } from "react";
import { ofArray } from "../fable_modules/fable-library.3.7.5/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.1.61.0/Interop.fs.js";

export const defaultHeadElement = (() => {
    const children = ofArray([createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
    }), createElement("title", {
        children: ["Alfred\u0027s Blog"],
    }), createElement("link", {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css",
    }), createElement("link", {
        rel: "stylesheet",
        type: "text/css",
        href: "/style.css",
    })]);
    return createElement("head", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
})();

