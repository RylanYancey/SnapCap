
use neon::prelude::*;

use artano::{Position, Annotation};
use image::open;
use rusttype::Font;
use std::fs::read;

use super::Caption;
use super::super::captionator::process_caption;

pub fn process_skeletonwaiting(mut cx: FunctionContext) -> JsResult<JsString> {

    let caption1: Handle<JsString> = cx.argument(0)?;

    let caption = Caption {
        pos: Position::Bottom,
        caption: caption1.value(&mut cx),
        c_width: 100,
        c_height: 115,
        scale: 12.0,
    };

    let captions_vec: Vec<Caption> = vec![caption];

    let result: String = process_caption(
        "skeletonwaiting.jpeg".to_string(), 
        "fonts/impact.ttf".to_string(), 
        "templates/skeletonwaiting.jpeg".to_string(), 
        captions_vec
    );

    Ok(cx.string(result))
}