// VID_016 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "GİZLİ BORÇ VE DAVA",
    "NASIL SORGULANIR"
   ],
   "mimik": [
    [
     0,
     "notr",
     "anlat"
    ],
    [
     0,
     "saskin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "edevlet",
     "k": 23,
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
      23,
      26
     ],
     "rozetK": [
      27
     ]
    },
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 5,
     "ad": "tokmak",
     "yazi": "DAVA",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 8,
     "e": "⚠️",
     "yazi": "İCRA",
     "rot": 5,
     "firlat": "el"
    }
   ]
  },
  {
   "k": 32,
   "baslik": [
    "1. ADIM",
    "UYAP DAVA TARAMASI"
   ],
   "mimik": [
    [
     32,
     "emin",
     "isaret"
    ],
    [
     38,
     "notr",
     "anlat"
    ],
    [
     51,
     "notr",
     "anlat"
    ],
    [
     59,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 34,
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
         "t": "Dava Dosyası Sorgulama",
         "s": "e-Devlet hizmeti"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 38,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 41,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Dava Dosyası Sorgulama",
       "hiz": 15
      },
      {
       "k": 48,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      }
     ]
    },
    {
     "x": 980,
     "y": 330,
     "tip": "nesne",
     "k": 35,
     "ad": "tokmak",
     "yazi": "DAVA",
     "rot": 6
    }
   ],
   "adim": 1
  },
  {
   "k": 80,
   "baslik": [
    "2. ADIM",
    "İCRA DOSYALARI"
   ],
   "mimik": [
    [
     80,
     "notr",
     "anlat"
    ],
    [
     80,
     "korkmus",
     "eller_yukari"
    ],
    [
     86,
     "notr",
     "anlat"
    ],
    [
     86,
     "korkmus",
     "eller_yukari"
    ],
    [
     92,
     "notr",
     "anlat"
    ],
    [
     94,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 82,
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
         "t": "İcra Dosyası Sorgulama",
         "s": "e-Devlet hizmeti"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 84,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 87,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "İcra Dosyası Sorgulama",
       "hiz": 15
      },
      {
       "k": 91,
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
     "k": 82,
     "e": "⚠️",
     "yazi": "İCRA",
     "rot": 5
    }
   ],
   "adim": 2
  },
  {
   "k": 112,
   "baslik": [
    "3. ADIM",
    "VERGİ, RADAR, KYK"
   ],
   "mimik": [
    [
     112,
     "emin",
     "anlat"
    ],
    [
     121,
     "notr",
     "isaret"
    ],
    [
     132,
     "notr",
     "anlat"
    ],
    [
     134,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 114,
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
         "t": "Vergi Borcu Sorgulama",
         "s": "e-Devlet hizmeti"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 119,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 122,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Vergi Borcu Sorgulama",
       "hiz": 15
      },
      {
       "k": 129,
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
     "k": 115,
     "e": "🧾",
     "yazi": "VERGİ",
     "rot": 5
    }
   ],
   "adim": 3
  },
  {
   "k": 147,
   "baslik": [
    "4. ADIM",
    "ADRESİNİ DOĞRULA"
   ],
   "mimik": [
    [
     147,
     "emin",
     "isaret"
    ],
    [
     153,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 168,
     "ad": "kitap",
     "yazi": "KANUN",
     "rot": 6
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 149,
     "e": "✅",
     "ust": "4. ADIM",
     "yazi": "Yerleşim yeri adresini doğrulamak"
    }
   ],
   "adim": 4
  },
  {
   "k": 176,
   "baslik": [
    "5. ADIM",
    "UETS UYARISI"
   ],
   "mimik": [
    [
     176,
     "emin",
     "anlat"
    ],
    [
     183,
     "emin",
     "anlat"
    ],
    [
     187,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "edevlet",
     "k": 183,
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
      183,
      186
     ],
     "rozetK": [
      187
     ]
    },
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 184,
     "e": "📮",
     "yazi": "PTT",
     "rot": 5
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 189,
     "e": "💵",
     "yazi": "ÜCRET",
     "rot": -4
    }
   ],
   "adim": 5
  },
  {
   "k": 208,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     208,
     "mutlu",
     "yukari"
    ],
    [
     214,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 209,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 214,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    209
   ]
  }
 ],
 "son": {
  "ifade": "mutlu",
  "jest": "selam",
  "uzat": 2.5
 },
 "kapak": [
  {
   "yazi": "HAKKINDA DAVA VAR MI?",
   "vurgu": "DAVA",
   "nesne": "⚖️"
  },
  {
   "yazi": "BLOKE GELMEDEN BAK",
   "vurgu": "BLOKE",
   "nesne": "🏦"
  },
  {
   "yazi": "AYDA 1 KONTROL ET",
   "vurgu": "1",
   "nesne": "📅"
  }
 ]
};
