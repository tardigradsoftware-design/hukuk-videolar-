// VID_006 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "KART AİDATINI",
    "NAKİT GERİ AL"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     12,
     "emin",
     "anlat"
    ],
    [
     23,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "x": 1080,
     "y": 360,
     "tip": "ikon",
     "k": 0,
     "e": "💳",
     "yazi": "KREDİ",
     "rot": 5,
     "firlat": "el"
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 1,
     "e": "💳",
     "yazi": "KART",
     "rot": -4
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 0,
     "e": "💵",
     "ust": "BİLMEN GEREKEN",
     "yazi": "Kredi kartından her yıl kesilen yüksek üyelik…"
    }
   ]
  },
  {
   "k": 31,
   "baslik": [
    "1. ADIM",
    "KESİNTİYİ BELGELE"
   ],
   "mimik": [
    [
     31,
     "notr",
     "anlat"
    ],
    [
     35,
     "emin",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "liste",
     "k": 35,
     "ogeler": [
      {
       "e": "🏦",
       "t": "Mobil bankacılık"
      },
      {
       "e": "🐷",
       "t": "İnternet şubesine gir"
      },
      {
       "e": "💳",
       "t": "Kartlarım"
      }
     ],
     "alt": [
      35,
      38,
      41
     ]
    },
    {
     "x": 1080,
     "y": 360,
     "tip": "ikon",
     "k": 36,
     "e": "🏦",
     "yazi": "BANKA",
     "rot": 5
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 38,
     "e": "🌐",
     "yazi": "İNTERNET",
     "rot": -4
    }
   ],
   "adim": 1
  },
  {
   "k": 55,
   "baslik": [
    "2. ADIM",
    "BANKAYA YAZILI TALEP"
   ],
   "mimik": [
    [
     55,
     "emin",
     "anlat"
    ],
    [
     58,
     "mutlu",
     "basparmak"
    ],
    [
     63,
     "notr",
     "isaret"
    ],
    [
     75,
     "emin",
     "anlat"
    ],
    [
     96,
     "mutlu",
     "basparmak"
    ],
    [
     102,
     "emin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 1080,
     "y": 360,
     "tip": "nesne",
     "k": 78,
     "ad": "kitap",
     "yazi": "KANUN",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 57,
     "e": "🏦",
     "yazi": "BANKA",
     "rot": 5
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 57,
     "e": "🏦",
     "ust": "2. ADIM",
     "yazi": "Bankaya yazılı nakit iade talebi açmak"
    }
   ],
   "adim": 2
  },
  {
   "k": 113,
   "baslik": [
    "3. ADIM",
    "HAKEM HEYETİ"
   ],
   "mimik": [
    [
     113,
     "notr",
     "anlat"
    ],
    [
     121,
     "emin",
     "anlat"
    ],
    [
     134,
     "notr",
     "isaret"
    ],
    [
     140,
     "emin",
     "anlat"
    ],
    [
     157,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 115,
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
         "t": "Tüketici Hakem Heyetlerine Başvuru",
         "s": "e-Devlet hizmeti"
        }
       ]
      },
      "form": {
       "tur": "form",
       "baslik": "İşlem Ekranı",
       "kutular": [],
       "ust": [
        {
         "id": "b0",
         "t": "Uygulamaya Git"
        }
       ],
       "alanlar": [],
       "butonlar": [
        {
         "id": "kaydet",
         "t": "Kaydet"
        }
       ],
       "toast": {
        "id": "ok",
        "t": "✓ İşleminiz tamamlandı"
       }
      }
     },
     "akis": [
      {
       "k": 120,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 123,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Tüketici Hakem Heyetlerine Başvuru",
       "hiz": 15
      },
      {
       "k": 129,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 131,
       "yap": "tikla",
       "hedef": "b0"
      },
      {
       "k": 137,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      }
     ]
    },
    {
     "tip": "rozet",
     "k": 117,
     "x": 600,
     "y": 775,
     "e": "⚖️",
     "yazi": "Tüketici Hakem Heyeti",
     "renk": "s",
     "rot": -2
    }
   ],
   "adim": 3
  },
  {
   "k": 167,
   "baslik": [
    "4. ADIM",
    "METNİ YAZ, YÜKLE"
   ],
   "mimik": [
    [
     167,
     "emin",
     "isaret"
    ],
    [
     174,
     "emin",
     "anlat"
    ],
    [
     181,
     "mutlu",
     "basparmak"
    ],
    [
     186,
     "korkmus",
     "eller_yukari"
    ],
    [
     193,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 169,
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "kullanici": "Hoş geldiniz",
     "ekranlar": {
      "form": {
       "tur": "form",
       "baslik": "İşlem Ekranı",
       "kutular": [],
       "ust": [],
       "alanlar": [],
       "butonlar": [
        {
         "id": "kaydet",
         "t": "Onayla"
        }
       ],
       "toast": {
        "id": "ok",
        "t": "✓ İşleminiz tamamlandı"
       }
      }
     },
     "akis": [
      {
       "k": 199,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 200,
       "yap": "tikla",
       "hedef": "kaydet"
      },
      {
       "k": 200,
       "yap": "goster",
       "hedef": "ok",
       "dt": 0.3
      }
     ]
    },
    {
     "tip": "damga",
     "k": 186,
     "x": 620,
     "y": 650,
     "yazi": "✗ HAKSIZ",
     "rot": -8
    }
   ],
   "adim": 4
  },
  {
   "k": 203,
   "baslik": [
    "5. ADIM",
    "10 YILLIK AİDAT"
   ],
   "mimik": [
    [
     203,
     "emin",
     "anlat"
    ],
    [
     210,
     "emin",
     "anlat"
    ],
    [
     226,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "x": 1080,
     "y": 360,
     "tip": "nesne",
     "k": 227,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 208,
     "e": "🏢",
     "yazi": "AİDAT",
     "rot": 5
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 205,
     "e": "🏢",
     "ust": "5. ADIM",
     "yazi": "Geçmiş 10 yıllık aidatlarını unutma"
    }
   ],
   "adim": 5
  },
  {
   "k": 233,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     233,
     "mutlu",
     "yukari"
    ],
    [
     238,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 234,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 238,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    234
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
   "yazi": "AİDATIN GERİ GELİR!",
   "vurgu": "AİDATIN",
   "nesne": "💳"
  },
  {
   "yazi": "10 YILLIK İADE",
   "vurgu": "10",
   "nesne": "💰"
  },
  {
   "yazi": "PUAN DEĞİL NAKİT",
   "vurgu": "NAKİT",
   "nesne": "🏦"
  }
 ]
};
