import fs from 'fs';
import path from 'path';
import https from 'https';

const mangas = [
  "20th century boys", "monster", "berserk", "vinland saga", "dandadan", 
  "blue box", "kagurabachi", "one piece", "one punch man", "chainsaw man", 
  "dororo", "act age", "great teacher Onizuka", "real", "zom 100", "veil", 
  "climber", "choujin x"
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode} for ${url}`));
      }
    }).on('error', reject);
  });
};

const fetchMangadexCovers = async () => {
  for (const manga of mangas) {
    console.log(`\nSearching MangaDex for: ${manga}`);
    try {
      // 1. Search for the manga
      const searchRes = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(manga)}&limit=5`);
      const searchData = await searchRes.json();
      
      if (searchData.data && searchData.data.length > 0) {
        // Find the best match (often the first one, but let's try to match exactly or closest)
        let mangaObj = searchData.data[0];
        // Special case for 'real' to avoid picking up generic words
        if (manga.toLowerCase() === 'real') {
           mangaObj = searchData.data.find(m => m.attributes.title.en === 'Real' || m.attributes.title.ja === 'リアル') || mangaObj;
        }

        const mangaId = mangaObj.id;
        console.log(`Found ID: ${mangaId} for ${manga}`);

        // 2. Fetch cover art for this manga (get the latest volume)
        const coverRes = await fetch(`https://api.mangadex.org/cover?manga[]=${mangaId}&order[volume]=desc&limit=5`);
        const coverData = await coverRes.json();

        if (coverData.data && coverData.data.length > 0) {
          // Get a cover that actually has a volume number if possible, or just the first one
          const coverObj = coverData.data.find(c => c.attributes.volume) || coverData.data[0];
          const fileName = coverObj.attributes.fileName;
          
          const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
          console.log(`Cover URL: ${coverUrl}`);

          const dirName = manga.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const dirPath = path.join(process.cwd(), 'public', 'assets', dirName);
          
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          const ext = path.extname(fileName) || '.jpg';
          const coverPath = path.join(dirPath, `cover${ext}`);
          
          await downloadImage(coverUrl, coverPath);
          console.log(`✅ Downloaded Volume Cover for ${manga}`);
        } else {
          console.log(`❌ No covers found for ${manga}`);
        }
      } else {
        console.log(`❌ No results found on MangaDex for ${manga}`);
      }
      
      // Wait to respect API limits (MangaDex allows 5 req/s)
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.error(`Error fetching ${manga}:`, e.message);
    }
  }
};

fetchMangadexCovers().then(() => console.log("Done fetching covers."));
