
import 'later' from later;
import request from 'request';
import fs from 'fs';

const text = 'every 20 seconds';
const s = later.parse.text(text);

const timer2 = later.setInterval(logTime, s);

const params = {
  rotation: 0,
  vflip: false,
  hflip: false,
  awb_mode: 'auto',
  image_effect: 'none',
  metering_mode: 'average',
  drc_strength: 'low',
  quality: 90,
  width: 2300,
  height: 1280,
  iso: 0, // auto
  saturation: 0,
  sharpness: 0,
  shutter_speed: 0,
  brightness: 50, 
  contrast: 0
};

let i = 0;

function logTime() {
  
  i += 1;
  console.log(new Date() + " "+i);
  request({url: 'http://lama.local:5000/still', qs: params})
  .pipe(fs.createWriteStream('frames/frame_'+i+'.jpg'))
}

// ffmpeg -r 12 -i frame%03d.jpg -sameq -s hd720 -vcodec libx264 -vpre hq -crf 25 out.MP4


