# getSizePercent
Get an element's width or height in percentage

## Usage
```html
<style>
.my-element {
  width: 85%
}
</style>
<body>
  <div class="my-element"></div>
</body>
```
```javascript
const width = getSizePercent({ selector: '.my-element', property: 'width' });
// width === '85%'
```

## Thanks
Borrowed a nice trick from this [answer](https://stackoverflow.com/a/19873734/4119772), implementation is more stable (on some widths the calculations weren't completely accurate).

So big thanks to [timofey](https://stackoverflow.com/users/477496/timofey)
