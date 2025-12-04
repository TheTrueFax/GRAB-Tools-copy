# GRAB Tools

GRAB Tools website and app

Built using Vue 3

## Project Structure

```sh
.
├─ meta/             # tools for development
├─ public/           # public website assets
│  ├─ fonts/           # fonts
│  ├─ images/          # images
│  ├─ levels/          # levels for editor templates
│  └─ favicon.png      # website icon
├─ src/              # website sources
│  ├─ assets/          # website assets (included in build)
│  │  ├─ bookmarklets/   # javasctript bookmarklet sources
│  │  ├─ models/         # level models
│  │  ├─ proto/          # level protobuf definition
│  │  ├─ shaders/        # editor shaders
│  │  ├─ textures/       # level textures
│  │  ├─ tools/          # javascript tool modules
│  │  ├─ *.css           # global css
│  │  └─ *.js            # js utils
│  ├─ components/      # vue general components
│  │  └─ EditorPanels/   # components for the json editor
│  ├─ icons/           # vue svg icon components
│  ├─ layouts/         # vue layout components
│  ├─ pages/           # vue page components
│  ├─ requests/        # javascript fetch requests
│  ├─ stores/          # vue session stores
│  ├─ tools/           # vue tool components
│  ├─ App.vue          # vue app structure
│  ├─ config.js        # general config / globals
│  ├─ main.js          # website javascript entrypoint
│  └─ router.js        # vue router config
├─ src-tauri/        # tauri rust application sources
├─ .eslintrc.cjs     # eslint linting config
├─ .gitignore        # gitignore
├─ .nvim.lua         # optional nvim config
├─ .prettierrc.json  # prettier formatting config
├─ CONTRIBUTING.md   # contribution guide
├─ README.md         # this file
├─ index.html        # mountable app html
├─ jsconfig.json     # javascript config
├─ package-lock.json # npm packages lock file
├─ package.json      # npm config and packages
└─ vite.config.js    # vite config
```

### Setup
```sh
npm install
```

### Test website
```sh
npm run dev
```
