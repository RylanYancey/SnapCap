
pub mod gigachad;
pub mod skepticalkid;
pub mod everywhere;
pub mod skeletonwaiting;
pub mod berniesasking;
pub mod disastergirl;

// Input for Captionator

use artano::Position;

pub struct Caption {
    pub pos: Position,
    pub caption: String,
    pub c_width: u32,
    pub c_height: u32,
    pub scale: f32,
}
