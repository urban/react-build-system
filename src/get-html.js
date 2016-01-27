/* @flow */

export default function customTemplate (assets: Object): string {
  const data = {
    charset: 'utf-8',
    title: 'RBS Template',
    html: '',
    css: '',
    ...assets
  }

  return (
`<!doctype html>
<html>
  <head>
    <title>${data.title}</title>
    <link rel="stylesheet" href="${data.css}"/>
  </head>
  <body>
    <div id="root">${data.html}</div>
    <script src="${data.main}"></script>
  </body>
</html>`
)
}
