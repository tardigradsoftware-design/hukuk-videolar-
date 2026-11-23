// VID_003 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "KREDİ SİGORTASI",
    "PARANI GERİ AL"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     17,
     "notr",
     "anlat"
    ],
    [
     28,
     "korkmus",
     "eller_yukari"
    ],
    [
     30,
     "korkmus",
     "eller_yukari"
    ],
    [
     35,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 520,
     "y": 560,
     "tip": "nesne",
     "k": 23,
     "ad": "kitap",
     "yazi": "YASA",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 980,
     "y": 360,
     "tip": "ikon",
     "k": 0,
     "e": "🏦",
     "yazi": "BANKA",
     "rot": 5,
     "firlat": "el"
    },
    {
     "x": 980,
     "y": 700,
     "tip": "ikon",
     "k": 4,
     "e": "🏠",
     "yazi": "KONUT",
     "rot": -4
    },
    {
     "tip": "damga",
     "k": 30,
     "x": 520,
     "y": 620,
     "yazi": "✗ İPTAL",
     "rot": -8
    }
   ]
  },
  {
   "k": 43,
   "baslik": [
    "1. ADIM",
    "30 GÜN CAYMA HAKKI"
   ],
   "mimik": [
    [
     43,
     "emin",
     "anlat"
    ],
    [
     51,
     "notr",
     "anlat"
    ],
    [
     60,
     "korkmus",
     "eller_yukari"
    ],
    [
     62,
     "korkmus",
     "eller_yukari"
    ],
    [
     77,
     "emin",
     "anlat"
    ],
    [
     89,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "x": 520,
     "y": 560,
     "tip": "nesne",
     "k": 63,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    },
    {
     "x": 980,
     "y": 360,
     "tip": "ikon",
     "k": 51,
     "e": "💳",
     "yazi": "KREDİ",
     "rot": 5
    },
    {
     "x": 980,
     "y": 700,
     "tip": "ikon",
     "k": 70,
     "e": "🛡️",
     "yazi": "SİGORTA",
     "rot": -4
    },
    {
     "tip": "damga",
     "k": 62,
     "x": 520,
     "y": 620,
     "yazi": "✗ İPTAL",
     "rot": -8
    }
   ],
   "adim": 1
  },
  {
   "k": 93,
   "baslik": [
    "2. ADIM",
    "POLİÇE NUMARANI BUL"
   ],
   "mimik": [
    [
     93,
     "notr",
     "isaret"
    ],
    [
     101,
     "emin",
     "isaret"
    ],
    [
     118,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 95,
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "kullanici": "Hoş geldiniz",
     "ekranlar": {
      "ara0": {
       "tur": "arama",
       "alan": "ara0",
       "sonuclar": [
        {
         "t": "Hayat Sigortası Poliçe Sorgulama",
         "s": "e-Devlet hizmeti"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 101,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 104,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Hayat Sigortası Poliçe Sorgulama",
       "hiz": 15
      },
      {
       "k": 115,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      }
     ]
    },
    {
     "x": 980,
     "y": 330,
     "tip": "ikon",
     "k": 98,
     "e": "🏢",
     "yazi": "ŞİRKET",
     "rot": 5
    }
   ],
   "adim": 2
  },
  {
   "k": 133,
   "baslik": [
    "3. ADIM",
    "YAZILI İPTAL TALEBİ"
   ],
   "mimik": [
    [
     133,
     "notr",
     "anlat"
    ],
    [
     134,
     "korkmus",
     "eller_yukari"
    ],
    [
     136,
     "korkmus",
     "eller_yukari"
    ],
    [
     141,
     "emin",
     "anlat"
    ],
    [
     147,
     "notr",
     "isaret"
    ],
    [
     165,
     "emin",
     "isaret"
    ],
    [
     167,
     "notr",
     "anlat"
    ],
    [
     175,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 520,
     "y": 560,
     "tip": "liste",
     "k": 133,
     "ogeler": [
      {
       "e": "•",
       "t": "Üçüncü adım"
      },
      {
       "e": "•",
       "t": "Yazılı iptal"
      },
      {
       "e": "↩️",
       "t": "İade talebi göndermek"
      }
     ],
     "alt": [
      133,
      135,
      138
     ]
    },
    {
     "x": 980,
     "y": 360,
     "tip": "nesne",
     "k": 163,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    },
    {
     "x": 980,
     "y": 700,
     "tip": "ikon",
     "k": 138,
     "e": "↩️",
     "yazi": "İADE",
     "rot": 5
    },
    {
     "tip": "damga",
     "k": 136,
     "x": 520,
     "y": 620,
     "yazi": "✗ İPTAL",
     "rot": -8
    }
   ],
   "adim": 3
  },
  {
   "k": 195,
   "baslik": [
    "4. ADIM",
    "FAİZ ARTIŞINA DİKKAT"
   ],
   "mimik": [
    [
     195,
     "notr",
     "anlat"
    ],
    [
     204,
     "notr",
     "anlat"
    ],
    [
     204,
     "korkmus",
     "eller_yukari"
    ],
    [
     205,
     "korkmus",
     "eller_yukari"
    ],
    [
     223,
     "notr",
     "anlat"
    ],
    [
     227,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 520,
     "y": 560,
     "tip": "ikon",
     "k": 197,
     "e": "🏦",
     "yazi": "BANKA",
     "rot": 5
    },
    {
     "x": 980,
     "y": 360,
     "tip": "ikon",
     "k": 207,
     "e": "💳",
     "yazi": "KREDİ",
     "rot": -4
    },
    {
     "tip": "damga",
     "k": 205,
     "x": 520,
     "y": 620,
     "yazi": "✗ İPTAL",
     "rot": -8
    }
   ],
   "adim": 4
  },
  {
   "k": 248,
   "baslik": [
    "5. ADIM",
    "B PLANI"
   ],
   "mimik": [
    [
     248,
     "emin",
     "anlat"
    ],
    [
     252,
     "notr",
     "anlat"
    ],
    [
     262,
     "korkmus",
     "eller_yukari"
    ],
    [
     264,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 520,
     "y": 560,
     "tip": "edevlet",
     "k": 269,
     "satirlar": [
      {
       "t": "Giriş",
       "sag": "yapıldı"
      },
      {
       "t": "İşlem durumu",
       "rozet": "HAZIR ✓"
      }
     ],
     "alt": [
      269,
      272
     ],
     "rozetK": [
      273
     ]
    },
    {
     "x": 980,
     "y": 360,
     "tip": "ikon",
     "k": 252,
     "e": "🛡️",
     "yazi": "SİGORTA",
     "rot": 5
    },
    {
     "x": 980,
     "y": 700,
     "tip": "ikon",
     "k": 253,
     "e": "🏢",
     "yazi": "ŞİRKET",
     "rot": -4
    },
    {
     "tip": "damga",
     "k": 264,
     "x": 520,
     "y": 620,
     "yazi": "✗ İPTAL",
     "rot": -8
    }
   ],
   "adim": 5
  },
  {
   "k": 285,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     285,
     "mutlu",
     "yukari"
    ],
    [
     290,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 286,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 290,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    286
   ]
  }
 ],
 "son": {
  "ifade": "mutlu",
  "jest": "selam",
  "uzat": 2.5
 }
};
