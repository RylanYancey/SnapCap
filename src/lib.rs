
#![allow(unused_imports)]

use neon::prelude::*;

pub mod modules;
use modules::{ 
    gigachad::process_gigachad,
    skepticalkid::process_skepticalkid,
    everywhere::process_everywhere,
    skeletonwaiting::process_skeletonwaiting,
    berniesasking::process_berniesasking,
    disastergirl::process_disastergirl
};

pub mod captionator;
use captionator::process_caption;

extern crate imageproc;
extern crate image;
extern crate rusttype;
extern crate artano;

// - Exports - //

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("process_gigachad", process_gigachad)?;
    cx.export_function("process_skepticalkid", process_skepticalkid)?;
    cx.export_function("process_everywhere", process_everywhere)?;
    cx.export_function("process_skeletonwaiting", process_skeletonwaiting)?;
    cx.export_function("process_berniesasking", process_berniesasking)?;
    cx.export_function("process_disastergirl", process_disastergirl)?;
    Ok(())
}
