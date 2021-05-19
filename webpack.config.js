const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
  "entry": "index.js",
  plugins: [
    new GoogleFontsPlugin({
      fonts: [
        { family: "Noto Sans JP" },
      ]
    })
  ]
}
