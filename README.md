[![Netlify Status](https://api.netlify.com/api/v1/badges/a731ba80-19b1-4218-a2c2-b569b3811787/deploy-status)](https://app.netlify.com/sites/same-basket/deploys)

## Generate assets list

### 1. Add SVG icons to `public/icons`

https://github.com/monzanifabio/cryptoicons/releases

### 2. Convert icons to PNG

```sh
rm -Rf .icons
mkdir .icons
mogrify -background none -resize 64 -path .icons -format png -trim public/icons/*.svg
```

### 3. Extract colors and write assets list

```sh
yarn generate:assets
```
