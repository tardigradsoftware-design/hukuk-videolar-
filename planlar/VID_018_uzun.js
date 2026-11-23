// VID_018 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "ADINA KAYITLI",
    "HATLARI SORGULA"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     13,
     "korkmus",
     "eller_yukari"
    ],
    [
     25,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 16,
     "ad": "kitap",
     "yazi": "YASA",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 0,
     "e": "🪪",
     "yazi": "KİMLİK",
     "rot": 5,
     "firlat": "el"
    },
    {
     "tip": "damga",
     "k": 13,
     "x": 480,
     "y": 620,
     "yazi": "✗ DOLANDIRICILIK",
     "rot": -8
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 0,
     "e": "📱",
     "ust": "BİLMEN GEREKEN",
     "yazi": "Kimlik fotokopin veya sızdırılan bilgilerin…"
    }
   ]
  },
  {
   "k": 37,
   "baslik": [
    "1. ADIM",
    "MOBİL HATLARI LİSTELE"
   ],
   "mimik": [
    [
     37,
     "emin",
     "anlat"
    ],
    [
     44,
     "notr",
     "isaret"
    ],
    [
     63,
     "emin",
     "isaret"
    ],
    [
     68,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 39,
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "kullanici": "",
     "ekranlar": {
      "giris": {
       "tur": "giris",
       "baslik": "e-Devlet ile Giriş",
       "alanlar": [
        {
         "id": "tc",
         "label": "T.C. Kimlik No",
         "ph": "11 haneli kimlik numaranız"
        },
        {
         "id": "sifre",
         "label": "e-Devlet Şifresi",
         "ph": "Şifreniz"
        }
       ],
       "buton": {
        "id": "giris",
        "t": "Giriş Yap"
       }
      },
      "ara0": {
       "tur": "arama",
       "alan": "ara0",
       "sonuclar": [
        {
         "t": "Mobil Hat Sorgulama",
         "s": "e-Devlet hizmeti"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 39,
       "yap": "url",
       "yazi": "turkiye.gov.tr",
       "hiz": 16
      },
      {
       "k": 39,
       "yap": "yaz",
       "alan": "tc",
       "yazi": "•••••••••••",
       "hiz": 16
      },
      {
       "k": 42,
       "yap": "yaz",
       "alan": "sifre",
       "yazi": "••••••••",
       "hiz": 16
      },
      {
       "k": 43,
       "yap": "tikla",
       "hedef": "giris",
       "dt": 0.25
      },
      {
       "k": 45,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 48,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Mobil Hat Sorgulama",
       "hiz": 15
      },
      {
       "k": 60,
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
     "k": 68,
     "e": "🪪",
     "yazi": "KİMLİK",
     "rot": 5
    },
    {
     "tip": "rozet",
     "k": 60,
     "x": 600,
     "y": 745,
     "e": "📡",
     "yazi": "BTK",
     "renk": "s",
     "rot": -2
    }
   ],
   "adim": 1
  },
  {
   "k": 79,
   "baslik": [
    "2. ADIM",
    "SABİT HAT VE İNTERNET"
   ],
   "mimik": [
    [
     79,
     "emin",
     "anlat"
    ],
    [
     89,
     "notr",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 81,
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
         "t": "Sabit Hat Sorgulama",
         "s": "e-Devlet hizmeti"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 87,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 90,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Sabit Hat Sorgulama",
       "hiz": 15
      },
      {
       "k": 94,
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
     "k": 84,
     "e": "🌐",
     "yazi": "İNTERNET",
     "rot": 5
    }
   ],
   "adim": 2
  },
  {
   "k": 107,
   "baslik": [
    "3. ADIM",
    "AYNI GÜN KAPATTIR"
   ],
   "mimik": [
    [
     107,
     "emin",
     "isaret"
    ],
    [
     117,
     "notr",
     "anlat"
    ],
    [
     129,
     "notr",
     "anlat"
    ],
    [
     143,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 131,
     "e": "🪪",
     "yazi": "KİMLİK",
     "rot": 5
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 152,
     "e": "✍️",
     "yazi": "İMZA",
     "rot": -4
    },
    {
     "tip": "karsilastir",
     "k": 111,
     "sutunlar": [
      {
       "baslik": "TANIMADIĞIN HAT VARSA",
       "renk": "g",
       "satirlar": [
        "Aynı gün bayiye gidip kapattırmak"
       ]
      },
      {
       "baslik": "BİR NUMARA ÇIKARSA",
       "renk": "y",
       "satirlar": [
        "Hemen ekran görüntüsünü al"
       ]
      }
     ],
     "alt": [
      111,
      124
     ],
     "x": 600,
     "y": 560
    }
   ],
   "adim": 3
  },
  {
   "k": 159,
   "baslik": [
    "4. ADIM",
    "BTK ŞİKAYETİ"
   ],
   "mimik": [
    [
     159,
     "emin",
     "anlat"
    ],
    [
     166,
     "notr",
     "anlat"
    ],
    [
     186,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "edevlet",
     "k": 166,
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
      166,
      169
     ],
     "rozetK": [
      170
     ]
    },
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 163,
     "e": "📢",
     "yazi": "ŞİKAYET",
     "rot": 5
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 174,
     "e": "🏖️",
     "yazi": "İZİN",
     "rot": -4
    },
    {
     "tip": "rozet",
     "k": 161,
     "x": 600,
     "y": 745,
     "e": "📡",
     "yazi": "BTK",
     "renk": "s",
     "rot": -2
    }
   ],
   "adim": 4
  },
  {
   "k": 193,
   "baslik": [
    "5. ADIM",
    "SAVCILIK BİLDİRİMİ"
   ],
   "mimik": [
    [
     193,
     "notr",
     "isaret"
    ],
    [
     201,
     "emin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 220,
     "e": "✍️",
     "yazi": "İMZA",
     "rot": 5
    },
    {
     "tip": "rozet",
     "k": 199,
     "x": 600,
     "y": 745,
     "e": "⚖️",
     "yazi": "Savcılık",
     "renk": "s",
     "rot": -2
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 195,
     "e": "✅",
     "ust": "5. ADIM",
     "yazi": "Kendini suçlamalardan aklamak için savcılık…"
    }
   ],
   "adim": 5
  },
  {
   "k": 231,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     231,
     "mutlu",
     "yukari"
    ],
    [
     237,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 232,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 237,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    232
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
   "yazi": "ADINA HAT AÇILMIŞ!",
   "vurgu": "HAT",
   "nesne": "📱"
  },
  {
   "yazi": "HEMEN SORGULA",
   "vurgu": "SORGULA",
   "nesne": "🔍"
  },
  {
   "yazi": "SUÇ SANA KALMASIN",
   "vurgu": "SANA",
   "nesne": "⚖️"
  }
 ]
};
