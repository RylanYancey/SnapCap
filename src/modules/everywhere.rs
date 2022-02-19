
use neon::prelude::*;

use artano::{Position, Annotation};
use image::open;
use rusttype::Font;
use std::fs::read;

use super::Caption;
use super::super::captionator::process_caption;

pub fn process_everywhere(mut cx: FunctionContext) -> JsResult<JsString> {

    let top: Handle<JsString> = cx.argument(0)?;
    let bottom: Handle<JsString> = cx.argument(1)?;

    let caption1 = Caption {
        pos: Position::Top,
        caption: top.value(&mut cx),
        c_width: 700,
        c_height: 0,
        scale: 60.0,
    };

    let caption2 = Caption { 
        pos: Position::Bottom, 
        caption: bottom.value(&mut cx), 
        c_width: 700, 
        c_height: 500, 
        scale: 60.0 
    };

    let captions_vec: Vec<Caption> = vec![caption1, caption2];

    let result: String = process_caption(
        "everywhere.jpeg".to_string(), 
        "fonts/impact.ttf".to_string(), 
        "templates/everywhere.jpeg".to_string(), 
        captions_vec
    );

    Ok(cx.string(result))
}