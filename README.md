# Icons

https://github.com/monzanifabio/cryptoicons/releases

```
rm -Rf .icons
mkdir .icons
mogrify -background none -resize 64 -path .icons -format png public/icons/*.svg
node ./scripts/generate-colors.js
```
