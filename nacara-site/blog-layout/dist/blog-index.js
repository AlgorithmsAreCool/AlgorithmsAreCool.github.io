import { Record } from "./fable_modules/fable-library.3.7.5/Types.js";
import { LayoutInfo, LayoutRenderer, PageContext$reflection } from "./fable_modules/Nacara.Core.1.2.1/Types.fs.js";
import { array_type, record_type, string_type } from "./fable_modules/fable-library.3.7.5/Reflection.js";
import { defaultArg } from "./fable_modules/fable-library.3.7.5/Option.js";
import { toLongDateString } from "./fable_modules/fable-library.3.7.5/Date.js";
import { map } from "./fable_modules/fable-library.3.7.5/Array.js";
import { createElement } from "react";
import { createObj } from "./fable_modules/fable-library.3.7.5/Util.js";
import { Helpers_combineClasses } from "./fable_modules/Feliz.Bulma.2.18.0/ElementBuilders.fs.js";
import { singleton, ofArray } from "./fable_modules/fable-library.3.7.5/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.1.61.0/Interop.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./fable_modules/Fable.Promise.2.2.2/Promise.fs.js";
import { map as map_1, delay, toList } from "./fable_modules/fable-library.3.7.5/Seq.js";
import { promise } from "./fable_modules/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { defaultHeadElement } from "./Shared/Blog.LayoutFragments.js";

export class PageViewModel extends Record {
    constructor(Context, Title, Link, Date$) {
        super();
        this.Context = Context;
        this.Title = Title;
        this.Link = Link;
        this.Date = Date$;
    }
}

export function PageViewModel$reflection() {
    return record_type("Blog.Layout.IndexLayout.PageViewModel", [], PageViewModel, () => [["Context", PageContext$reflection()], ["Title", string_type], ["Link", string_type], ["Date", string_type]]);
}

export class BlogSectionContext extends Record {
    constructor(AllPages, ContentPages) {
        super();
        this.AllPages = AllPages;
        this.ContentPages = ContentPages;
    }
}

export function BlogSectionContext$reflection() {
    return record_type("Blog.Layout.IndexLayout.BlogSectionContext", [], BlogSectionContext, () => [["AllPages", array_type(PageViewModel$reflection())], ["ContentPages", array_type(PageViewModel$reflection())]]);
}

function PageViewModelFactory_getLink(page) {
    return `/${page.PageId}.html`;
}

function PageViewModelFactory_getTitle(page) {
    return defaultArg(page.Title, "\u003cDefault\u003e");
}

export function PageViewModelFactory_create(page) {
    const date = page.Attributes.date;
    return new PageViewModel(page, PageViewModelFactory_getTitle(page), PageViewModelFactory_getLink(page), toLongDateString(date));
}

const BlogSectionContextModule_blogSectionName = "blog";

function BlogSectionContextModule_getBlogPages(rendererContext) {
    return map(PageViewModelFactory_create, rendererContext.Pages.filter((page) => (page.Section === BlogSectionContextModule_blogSectionName)));
}

function BlogSectionContextModule_getBlogContentPages(rendererContext) {
    const array = BlogSectionContextModule_getBlogPages(rendererContext);
    return array.filter((page) => (page.Context.RelativePath.indexOf("content") === 0));
}

export function BlogSectionContextModule_create(rendererContext) {
    return new BlogSectionContext(BlogSectionContextModule_getBlogPages(rendererContext), BlogSectionContextModule_getBlogContentPages(rendererContext));
}

export function Navigation_getNavbar(context) {
    let elems_2, elms, props_2, elems;
    const props_5 = ofArray([["className", "is-spaced"], (elems_2 = [(elms = singleton((props_2 = ofArray([["href", "/"], (elems = [createElement("h1", createObj(Helpers_combineClasses("title", ofArray([["className", "is-4"], ["children", "Applied Analytics"]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]), createElement("a", createObj(Helpers_combineClasses("navbar-item", props_2))))), createElement("div", {
        className: "navbar-brand",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]);
    return createElement("nav", createObj(Helpers_combineClasses("navbar", props_5)));
}

export function render(rendererContext, pageContext) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let elms, children_2, children, children_8;
        const blogSectionContext = BlogSectionContextModule_create(rendererContext);
        let postListSection;
        const elms_1 = singleton((elms = ofArray([(children_2 = singleton((children = ofArray([createElement("th", {
            children: ["Date"],
        }), createElement("th", {
            children: ["Title"],
        }), createElement("th", {
            children: ["Page Id"],
        })]), createElement("tr", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        }))), createElement("thead", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        })), (children_8 = toList(delay(() => map_1((post) => {
            let children_4, elems;
            const children_6 = ofArray([createElement("td", {
                children: [post.Date],
            }), (children_4 = singleton(createElement("a", createObj(ofArray([["href", post.Link], (elems = [createElement("h2", {
                className: "subtitle",
                children: post.Title,
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("td", {
                children: Interop_reactApi.Children.toArray(Array.from(children_4)),
            })), createElement("td", {
                children: [post.Context.PageId],
            })]);
            return createElement("tr", {
                children: Interop_reactApi.Children.toArray(Array.from(children_6)),
            });
        }, blogSectionContext.AllPages))), createElement("tbody", {
            children: Interop_reactApi.Children.toArray(Array.from(children_8)),
        }))]), createElement("table", {
            className: "table",
            children: Interop_reactApi.Children.toArray(Array.from(elms)),
        })));
        postListSection = createElement("section", {
            className: "section",
            children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
        });
        return rendererContext.MarkdownToHtml(pageContext.Content, pageContext.RelativePath).then((_arg1) => {
            let elms_2, props_14;
            const pageContent = _arg1;
            let body;
            const children_13 = ofArray([Navigation_getNavbar(blogSectionContext), (elms_2 = singleton((props_14 = singleton(["dangerouslySetInnerHTML", {
                __html: pageContent,
            }]), createElement("div", createObj(Helpers_combineClasses("container", props_14))))), createElement("section", {
                className: "section",
                children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
            })), postListSection]);
            body = createElement("body", {
                children: Interop_reactApi.Children.toArray(Array.from(children_13)),
            });
            return Promise.resolve(createElement("html", {
                children: Interop_reactApi.Children.toArray([defaultHeadElement, body]),
            }));
        });
    }));
}

export default (new LayoutInfo([], [new LayoutRenderer("blog-index", render)]));

