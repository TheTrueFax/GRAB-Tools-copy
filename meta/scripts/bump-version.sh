#!/usr/bin/env bash

old_version=$(node -p "require('./package.json').version")
npm version "$1" --no-git-tag-version
new_version=$(node -p "require('./package.json').version")
sed -i '' "s/^version = \"$old_version\"/version = \"$new_version\"/" src-tauri/Cargo.toml
cd src-tauri
cargo check
cd ..
git add package.json package-lock.json src-tauri/Cargo.toml src-tauri/Cargo.lock
git commit -m "chore: bump version to $new_version"
