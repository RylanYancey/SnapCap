
use neon::prelude::*;

use artano::{Position, Annotation};
use image::open;
use rusttype::Font;
use std::fs::read;

use super::Caption;
use super::super::captionator::process_caption;

pub fn process_berniesasking(mut cx: FunctionContext) -> JsResult<JsString> {

    let text: Handle<JsString> = cx.argument(0)?;

    let caption1 = Caption {
        pos: Position::Bottom,
        caption: text.value(&mut cx),
        c_width: 220,
        c_height: 195,
        scale: 18.0,
    };

    let caption2 = Caption { 
        pos: Position::Bottom, 
        caption: "i am once again asking".to_string(), 
        c_width: 220, 
        c_height: 155, 
        scale: 18.0 
    };

    let captions_vec: Vec<Caption> = vec![caption1, caption2];

    let result: String = process_caption(
        "berniesasking.jpeg".to_string(), 
        "fonts/impact.ttf".to_string(), 
        "templates/berniesasking.jpeg".to_string(), 
        captions_vec
    );

    Ok(cx.string(result))
}