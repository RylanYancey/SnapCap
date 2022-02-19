
use neon::prelude::*;

use artano::{Position, Annotation};
use image::open;
use rusttype::Font;
use std::fs::read;

use super::Caption;
use super::super::captionator::process_caption;

pub fn process_gigachad(mut cx: FunctionContext) -> JsResult<JsString> {

    let caption1: Handle<JsString> = cx.argument(0)?;

    let caption = Caption {
        pos: Position::Bottom,
        caption: caption1.value(&mut cx),
        c_width: 215,
        c_height: 225,
        scale: 20.0,
    };

    let captions_vec: Vec<Caption> = vec![caption];

    let result: String = process_caption(
        "gigachad.jpeg".to_string(), 
        "fonts/impact.ttf".to_string(), 
        "templates/gigachad.jpeg".to_string(), 
        captions_vec
    );

    Ok(cx.string(result))
}