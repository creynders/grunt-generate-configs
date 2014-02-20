module.exports = {
  "docs": {
    "files": [
      "README.md"
    ],
    "tasks": [
      "clean:tmp",
      "markdown:docs"
    ],
    "options": {
      "livereload": true
    }
  },
  "livereload": {
    "options": {
      "livereload": "<%= connect.options.livereload %>"
    },
    "files": [
      ".tmp/{,*/}*.html"
    ]
  }
}