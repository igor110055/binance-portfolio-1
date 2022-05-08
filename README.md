## Icons

https://github.com/monzanifabio/cryptoicons/releases

```
rm -Rf .icons
mkdir .icons
mogrify -background none -resize 64 -path .icons -format png -trim public/icons/*.svg

## Colors
```

node ./scripts/generate-colors.js

```

```
