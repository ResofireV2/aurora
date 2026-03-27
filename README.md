# Aurora Cream — Flarum 2.x Theme

A modern, rounded theme for Flarum 2.x by resofire. Warm ivory surfaces, generous border radii, and Sora typography — with **all accent colors driven by your admin-configured primary and secondary colors**.

## Design philosophy

- **Surfaces are theme-owned**: page background (`#FBF8F3`), control surfaces (`#F5F1EA`), and borders (`#EDE9E1`) are hardcoded to the Aurora Cream aesthetic.
- **Accents are admin-owned**: every button, active state, badge tint, link, and focus ring pulls from Flarum's `@primary-color` and `@secondary-color` set in **Admin → Appearance**. No accent hex values are hardcoded.
- **Shape**: 18–20px card radius, 50px pill buttons, 12px inner chips throughout.
- **Font**: Sora, loaded from Google Fonts.

## Installation

```bash
composer require resofire/aurora
php flarum extension:enable resofire-aurora
php flarum cache:clear
```

Pre-built JS is included in `js/dist/` — no build step required.

### Development install

```bash
git clone https://github.com/resofire/aurora packages/resofire/aurora
```

Add to your root `composer.json`:

```json
{
    "repositories": [
        { "type": "path", "url": "packages/resofire/aurora" }
    ]
}
```

Then:

```bash
composer require resofire/aurora
php flarum extension:enable resofire-aurora
php flarum cache:clear
```

## Rebuilding JS (contributors)

Only needed if you modify `js/src/`:

```bash
cd js
npm install
npm run build
```

## Admin settings

Go to **Admin → Appearance** to set Primary and Secondary accent colors — these cascade automatically throughout the theme.

Go to **Admin → Extensions → Aurora Cream** to optionally override surfaces:

| Setting | Default | Purpose |
|---|---|---|
| Page background | `#FBF8F3` | Warm ivory page background |
| Surface / control bg | `#F5F1EA` | Inputs, pills, sidebar |
| Card border radius | `18` | Roundness of thread cards (px) |
| Custom Google Font URL | *(empty)* | Replace Sora with any Google Font |

## Compatibility

Flarum 2.0.x — supported. Flarum 1.x — not supported.

## License

MIT
