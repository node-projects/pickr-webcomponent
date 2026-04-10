# Examples

## Inline, declarative

```html
<script type="module">
  import '@node-projects/pickr-webcomponent';
</script>

<pickr-classic
    default="#42445a"
    swatches="#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #2196f3">
</pickr-classic>
```

## Modal popup via native `<dialog>`

```html
<button id="open">Pick color</button>
<dialog id="dlg">
    <pickr-classic id="pkr" default="#42445a"></pickr-classic>
</dialog>

<script type="module">
    import '@node-projects/pickr-webcomponent';

    const dlg = document.getElementById('dlg');
    const pkr = document.getElementById('pkr');

    document.getElementById('open').onclick = () => dlg.showModal();
    pkr.addEventListener('save',   () => dlg.close());
    pkr.addEventListener('cancel', () => dlg.close());
</script>
```

## Save and close on `Enter`

```js
import '@node-projects/pickr-webcomponent';

const pkr = document.querySelector('pickr-classic');

pkr.addEventListener('init', () => {
    const {result} = pkr.getRoot().interaction;
    result.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            pkr.applyColor();
            e.target.blur();
        }
    }, {capture: true});
});
```

## Sync with a hidden `<input>` in a form

```html
<form>
    <input type="hidden" name="color" id="color">
    <pickr-classic id="pkr" default="#42445a"></pickr-classic>
    <button type="submit">Submit</button>
</form>

<script type="module">
    import '@node-projects/pickr-webcomponent';

    const pkr = document.getElementById('pkr');
    const input = document.getElementById('color');

    pkr.addEventListener('change', e => {
        input.value = e.detail.value.color.toHEXA().toString();
    });
</script>
```

## Add / remove all swatches

```js
function getSwatches(el) {
    return el._swatchColors.map(s => s.color.toRGBA().toString(0));
}

function setSwatches(el, swatches) {
    for (let i = el._swatchColors.length - 1; i >= 0; i--) {
        el.removeSwatch(i);
    }
    swatches.forEach(c => el.addSwatch(c));
}
```

## Multiple instances via a loop

```html
<div class="grid"></div>

<script type="module">
    import '@node-projects/pickr-webcomponent';

    const container = document.querySelector('.grid');
    for (const color of ['#ff3366', '#22cc88', '#3388ff', '#ffaa22']) {
        const el = document.createElement('pickr-classic');
        el.setAttribute('default', color);
        el.addEventListener('save', e => {
            console.log(color, '->', e.detail.value.toHEXA().toString());
        });
        container.appendChild(el);
    }
</script>
```

## Reactively reconfigure

The `config` property deep-merges, so you can patch a live instance:

```js
pkr.config = {components: {interaction: {cmyk: true}}};
pkr.config = {lockOpacity: true};
```

Changing an observed attribute has the same effect:

```js
pkr.setAttribute('lock-opacity', '');
pkr.setAttribute('default', '#ffaa00');
```

---

> Feel free to submit a [PR](https://github.com/@node-projects/pickr-webcomponent/compare) or
> open an [issue](https://github.com/@node-projects/pickr-webcomponent/issues/new) if you have
> more ideas.
