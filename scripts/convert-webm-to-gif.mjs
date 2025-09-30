import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'node:child_process';
import path from 'node:path';

const videos = {
  'home-scroll': path.resolve('tmp/darby_videos/home-scroll.webm'),
  'artwork-browse': path.resolve('tmp/darby_videos/artwork-browse.webm'),
  'posters-browse': path.resolve('tmp/darby_videos/posters-browse.webm'),
};

const outDir = path.resolve('public/darby/gifs');

async function convert(name, input) {
  const output = path.join(outDir, `${name}.gif`);
  await new Promise((resolve, reject) => {
    const args = [
      '-y',
      '-i',
      input,
      '-vf',
      'fps=12,scale=640:-1:flags=lanczos',
      '-loop',
      '0',
      output,
    ];
    const proc = spawn(ffmpegPath, args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with ${code}`));
    });
  });
  return output;
}

for (const [name, input] of Object.entries(videos)) {
  await convert(name, input);
}
