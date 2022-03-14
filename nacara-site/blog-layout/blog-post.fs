module Blog.Layout.PostLayout

open Fable.Core.JsInterop
open Nacara.Core.Types

// open Fable.React
// open Fable.React.Props

open System

open Feliz
open Feliz.Bulma

open Blog.Shared
open Blog.LayoutFragments

 
// Your render function, it is responsible to transform a page into HTML
let render (rendererContext : RendererContext) (pageContext : PageContext) =
    promise {
        //let blogSectionContext = BlogSectionContext.create rendererContext
        let! pageContent =
            rendererContext.MarkdownToHtml(
                pageContext.Content,
                pageContext.RelativePath
            )

        // let body =
        //     Html.body [
        //         Bulma.section [
        //             Bulma.container [
        //                 Bulma.title "Hello! 😀"
        //                 Bulma.subtitle [
        //                     Html.text "My first website "
        //                     Html.strong "with bulma"
        //                     Html.text "!"
        //                 ]
        //             ]
        //         ]
        //         Bulma.section [
        //             prop.dangerouslySetInnerHTML pageContent
        //         ]
        //     ]

        return 
            Html.html [ 
                // Head.defaultHeadElement
                // body
            ]
            
    }


// This is how we expose layouts to Nacara
exportDefault {
    Renderers = [|
        {
            Name = "blog-post"
            Func = render
        }
    |]
    Dependencies = [| |]
}