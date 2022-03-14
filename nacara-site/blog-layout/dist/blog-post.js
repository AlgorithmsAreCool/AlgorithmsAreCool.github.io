import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./fable_modules/Fable.Promise.2.2.2/Promise.fs.js";
import { promise } from "./fable_modules/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { createElement } from "react";
import { LayoutInfo, LayoutRenderer } from "./fable_modules/Nacara.Core.1.2.1/Types.fs.js";

export function render(rendererContext, pageContext) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => (rendererContext.MarkdownToHtml(pageContext.Content, pageContext.RelativePath).then((_arg1) => {
        const pageContent = _arg1;
        return Promise.resolve(createElement("html", {}));
    }))));
}

export default (new LayoutInfo([], [new LayoutRenderer("blog-post", render)]));

