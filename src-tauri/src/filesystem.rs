use std::path::PathBuf;

use tauri::AppHandle;
use tauri_plugin_android_fs::{AndroidFs, AndroidFsExt, FileUri};

#[tauri::command]
pub fn copy_file(
    app: AppHandle,
    source: String,
    destination: String,
) -> Result<(), String> {
    let src: FileUri = PathBuf::from(source).into();
    let dest: FileUri = PathBuf::from(destination).into();

    app.android_fs()
        .copy_via_kotlin(&src, &dest)
        .map_err(|e| e.to_string())?;

    Ok(())
}
