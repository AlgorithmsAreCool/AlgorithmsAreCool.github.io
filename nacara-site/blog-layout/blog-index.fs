module Blog.Layout.IndexLayout

open System
open Fable.Core.JsInterop
open Nacara.Core.Types

// open Fable.React
// open Fable.React.Props

open Feliz
open Feliz.Bulma

open Blog.Shared
open Blog.LayoutFragments


type PageViewModel = {
    Context : PageContext
    Title : string
    Link  : string
    Date : string
}
// with 
//     member this.NiceDate = this.Date.Year
 
type BlogSectionContext = {
    AllPages : PageViewModel []
    ContentPages : PageViewModel []
}

module PageViewModelFactory=
    let private getLink(page:PageContext) = $"/{page.PageId}.html" 
    let private getTitle(page:PageContext) = page.Title |> Option.defaultValue "<Default>"

    let create (page : PageContext) = 
        let date : DateTime = page.Attributes?date
        {
            Context = page
            Title =  getTitle page
            Link  = getLink page
            Date = date.ToLongDateString()
        }

module BlogSectionContext =
    let private blogSectionName = "blog"
    let private getBlogPages (rendererContext : RendererContext) =
        rendererContext.Pages
        |> Array.filter (fun page -> page.Section = blogSectionName)
        |> Array.map (fun pageContext -> PageViewModelFactory.create pageContext)

        

    let private getBlogContentPages (rendererContext : RendererContext) =
        rendererContext
        |> getBlogPages 
        |> Array.filter (fun page -> page.Context.RelativePath.StartsWith("content") )

    let create (rendererContext : RendererContext) = {
        AllPages = getBlogPages rendererContext
        ContentPages = getBlogContentPages rendererContext
    }

module Navigation =
    let getNavbar (context : BlogSectionContext) = 
        Bulma.navbar [
            Bulma.navbar.isSpaced
            prop.children [
                Bulma.navbarBrand.div [ 
                    Bulma.navbarItem.a [
                        prop.href "/"
                        prop.children [
                            Bulma.title [
                                column.is4
                                prop.text "Applied Analytics"
                            ] 
                        ] 
                    ]
                ]
            ]
        ]
        

// Your render function, it is responsible to transform a page into HTML
let render (rendererContext : RendererContext) (pageContext : PageContext) =
    promise {
        let blogSectionContext = 
            
            BlogSectionContext.create rendererContext
        let postListSection = Bulma.section [
            Bulma.table [
                Html.thead [
                    Html.tr [
                        Html.th "Date"
                        Html.th "Title"
                        Html.th "Page Id"
                    ]
                ]
                Html.tbody [
                    for post in blogSectionContext.AllPages do
                        Html.tr [
                            Html.td post.Date
                            Html.td [
                                Html.a [
                                    prop.href post.Link
                                    prop.children [
                                        Bulma.subtitle post.Title
                                    ]
                                ]
                            ] 
                            Html.td post.Context.PageId
                        ]
                    //end for
                ]
            ]
        ]

        let! pageContent =
            rendererContext.MarkdownToHtml(
                pageContext.Content,
                pageContext.RelativePath
            )
  
        let body =
            Html.body [
                Navigation.getNavbar (blogSectionContext)

                Bulma.section [
                    Bulma.container [
                       prop.dangerouslySetInnerHTML pageContent
                    ]
                ]

                postListSection
            ]

        return 
            Html.html [
                Head.defaultHeadElement
                body
            ]
    }


// This is how we expose layouts to Nacara
exportDefault {
    Renderers = [|
        {
            Name = "blog-index"
            Func = render
        }
    |]
    Dependencies = [| |]
}