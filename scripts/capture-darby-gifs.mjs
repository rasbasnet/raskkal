import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const baseUrl = 'https://darbymitchell.art';
const videoDir = path.resolve('tmp/darby_videos');
await fs.mkdir(videoDir, { recursive: true });

async function withContext(recordingName, actions) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();
  try {
    await actions(page);
    const videoPath = await page.video().path();
    await context.close();
    await browser.close();
    const targetPath = path.join(videoDir, `${recordingName}.webm`);
    await fs.rename(videoPath, targetPath);
    return targetPath;
  } catch (error) {
    await context.close();
    await browser.close();
    throw error;
  }
}

const videos = {};

videos.home = await withContext('home-scroll', async (page) => {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(1200);
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(1200);
});

videos.artwork = await withContext('artwork-browse', async (page) => {
  await page.goto(`${baseUrl}/artwork`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const firstCard = page.locator('a[href^="/artwork/"]').first();
  await firstCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await firstCard.hover();
  await page.waitForTimeout(600);
  await firstCard.click();
  await page.waitForTimeout(1800);
});

videos.posters = await withContext('posters-browse', async (page) => {
  await page.goto(`${baseUrl}/posters`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(600);
  const firstPoster = page.locator('a[href^="/posters/"]').first();
  await firstPoster.click();
  await page.waitForTimeout(1800);
});

console.log(JSON.stringify(videos, null, 2));
