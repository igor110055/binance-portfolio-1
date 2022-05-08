yarn add @cryptofonts/cryptofont
rm -Rf public/icons
cp -r node_modules/@cryptofonts/cryptofont/SVG public/icons
yarn remove @cryptofonts/cryptofont