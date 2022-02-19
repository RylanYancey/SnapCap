
use artano::{Position, Annotation};
use chrono::Utc;
use image::open;
use rusttype::Font;
use std::fs::read;

use crate::modules::Caption;


pub fn process_caption(img_name: String, font_path: String, image_path: String, captions_vec: Vec<Caption> ) -> String {

    let font = Font::try_from_vec(read(font_path).unwrap()).unwrap();
    let mut image = open(&image_path).unwrap();

    for cap in captions_vec.iter() {
        let _annotation = Annotation {
            text: cap.caption.to_owned(),
            position: cap.pos,
        }
            .render_text(
                &mut image,
                &font,
                cap.scale,
                cap.c_width,
                cap.c_height,
            );
    }

    let path = "output/proc_".to_string() + &img_name;
    image.save(&path).expect(("Error Processing Template: ".to_string() + &image_path).as_str());

    path

}