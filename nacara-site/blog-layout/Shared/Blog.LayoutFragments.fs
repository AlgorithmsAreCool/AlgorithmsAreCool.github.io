namespace Blog.LayoutFragments

open System

open Fable.Core.JsInterop
open Nacara.Core.Types

open Feliz
open Feliz.Bulma

open Blog.Shared 

// type NavigationContext = {
//     Pages : PageViewModel[]
// }




module Head =
    let defaultHeadElement = 
        Html.head [
            Html.meta [prop.name "viewport"; prop.content "width=device-width, initial-scale=1" ]
            Html.title "Alfred's Blog"
            Html.link [ prop.rel "stylesheet"; prop.href "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" ]
            Html.link [ prop.rel "stylesheet"; prop.type' "text/css"; prop.href "/style.css" ]
        ]
    


