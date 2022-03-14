// For more information about the config, please visit:
// https://mangelmaxime.github.io/Nacara/nacara/configuration.html
export default {
    "siteMetadata": {
        "url": "https://your-nacara-test-site.com",
        "baseUrl": "/",
        // Please change this to your repo
        //"editUrl" : "https://github.com/MangelMaxime/Nacara/edit/master/docs",
        "title": "Applied Algorithms"
    },
    "navbar": {
        "start": [
            {
                "section": "documentation",
                "url": "/documentation/introduction.html",
                "label": "Documentation"
            },
            {
                "section": "blog",
                "url": "/blog/introduction.html",
                "label": "Blog"
            }
        ],
        "end": [
            {
                "url": "https://github.com/AlgorithmsAreCool",
                "icon": "fab fa-github",
                "label": "Github"
            }
        ]
    },
    "remarkPlugins": [
        {
            "resolve": "gatsby-remark-vscode",
            "property": "remarkPlugin",
            "options": {
                "theme": "Atom One Light",
                "extensions": [
                    "vscode-theme-onelight"
                ]
            }
        }
    ],
    "layouts": [
        "nacara-layout-standard",
        "./blog-layout/dist/blog-index.js",
        "./blog-layout/dist/blog-post.js"
    ]
}