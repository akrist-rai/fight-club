import fs from 'fs';
import path from 'path';
import https from 'https';

const mangas = [
  "20th century boys", "monster", "berserk", "vinland saga", "dandadan", 
  "blue box", "kagurabachi", "one piece", "one punch man", "chainsaw man", 
  "dororo", "act age", "great teacher Onizuka", "real", "zom 100", "veil", 
  "blue period", "climber", "choujin x"
];

const query = `
query ($search: String) {
  Media (search: $search, type: MANGA) {
    title {
      romaji
    }
    coverImage {
      extraLarge
    }
    bannerImage
  }
}
`;

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const fetchMangaData = async () => {
  for (const manga of mangas) {
    console.log(`Searching for: ${manga}`);
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: { search: manga }
        })
      });

      const data = await response.json();
      if (data.data && data.data.Media) {
        const media = data.data.Media;
        const dirName = manga.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const dirPath = path.join(process.cwd(), 'public', 'assets', dirName);
        
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        if (media.coverImage && media.coverImage.extraLarge) {
          const coverUrl = media.coverImage.extraLarge;
          const ext = path.extname(new URL(coverUrl).pathname) || '.jpg';
          const coverPath = path.join(dirPath, `cover${ext}`);
          await downloadImage(coverUrl, coverPath);
          console.log(`Downloaded cover for ${manga}`);
        }

        if (media.bannerImage) {
          const bannerUrl = media.bannerImage;
          const ext = path.extname(new URL(bannerUrl).pathname) || '.jpg';
          const bannerPath = path.join(dirPath, `banner${ext}`);
          await downloadImage(bannerUrl, bannerPath);
          console.log(`Downloaded banner for ${manga}`);
        }
        
        // Wait a bit to avoid rate limits
        await new Promise(r => setTimeout(r, 1000));
      } else {
        console.log(`No results found for ${manga}`);
      }
    } catch (e) {
      console.error(`Error fetching ${manga}:`, e.message);
    }
  }
};

fetchMangaData().then(() => console.log("Done fetching images."));
