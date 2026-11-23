// VID_005 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "CAYMA BEDELİ",
    "ÖDEMEDEN İPTAL"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     13,
     "notr",
     "anlat"
    ],
    [
     23,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 22,
     "ad": "kitap",
     "yazi": "KANUN",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 0,
     "e": "🌐",
     "yazi": "İNTERNET",
     "rot": 5,
     "firlat": "el"
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 0,
     "e": "📱",
     "ust": "BİLMEN GEREKEN",
     "yazi": "İnternet veya telefon aboneliğini kapatırken…"
    }
   ]
  },
  {
   "k": 33,
   "baslik": [
    "1. ADIM",
    "3 YASAL GEREKÇE"
   ],
   "mimik": [
    [
     33,
     "notr",
     "anlat"
    ],
    [
     33,
     "korkmus",
     "eller_yukari"
    ],
    [
     45,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 40,
     "ad": "kitap",
     "yazi": "YASA",
     "rot": 6
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 35,
     "e": "🚨",
     "yazi": "CEZA",
     "rot": 5
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 35,
     "e": "🚨",
     "ust": "1. ADIM",
     "yazi": "Cezasız çıkış hakkı veren üç yasal gerekçeden…"
    }
   ],
   "adim": 1
  },
  {
   "k": 76,
   "baslik": [
    "2. ADIM",
    "KANIT DOSYAN"
   ],
   "mimik": [
    [
     76,
     "emin",
     "anlat"
    ],
    [
     82,
     "notr",
     "isaret"
    ],
    [
     84,
     "korkmus",
     "eller_yukari"
    ],
    [
     85,
     "emin",
     "isaret"
    ],
    [
     102,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "edevlet",
     "k": 86,
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
      86,
      89
     ],
     "rozetK": [
      90
     ]
    },
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 83,
     "e": "📢",
     "yazi": "ŞİKAYET",
     "rot": 5
    },
    {
     "tip": "damga",
     "k": 84,
     "x": 480,
     "y": 620,
     "yazi": "✗ GEÇERSİZ",
     "rot": -8
    }
   ],
   "adim": 2
  },
  {
   "k": 127,
   "baslik": [
    "3. ADIM",
    "E-DEVLET'TEN FESİH"
   ],
   "mimik": [
    [
     127,
     "emin",
     "anlat"
    ],
    [
     136,
     "notr",
     "isaret"
    ],
    [
     148,
     "emin",
     "isaret"
    ],
    [
     165,
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
     "tip": "portal",
     "k": 129,
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
         "t": "Abonelik Fesih Başvurusu",
         "s": "e-Devlet hizmeti"
        }
       ]
      },
      "tablo": {
       "tur": "tablo",
       "baslik": "Sonuçlar",
       "kolonlar": [
        "Kalem",
        "Tutar",
        "Durum"
       ],
       "durum": true,
       "satirlar": [
        [
         "Listeden internet",
         "₺ •••,••",
         "Bekliyor"
        ],
        [
         "GSM operatörünü seç",
         "₺ •••,••",
         "Bekliyor"
        ],
        [
         "Gerekçeni seçip onayla",
         "₺ •••,••",
         "Bekliyor"
        ]
       ]
      },
      "form": {
       "tur": "form",
       "baslik": "İşlem Ekranı",
       "kutular": [],
       "ust": [
        {
         "id": "b0",
         "t": "Fesih Başvurusu Yap"
        }
       ],
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
       "k": 133,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 135,
       "yap": "tikla",
       "hedef": "b0"
      },
      {
       "k": 136,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 139,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Abonelik Fesih Başvurusu",
       "hiz": 15
      },
      {
       "k": 145,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      },
      {
       "k": 148,
       "yap": "ekran",
       "ad": "tablo"
      },
      {
       "k": 148,
       "yap": "vurgula",
       "hedef": "row0"
      },
      {
       "k": 151,
       "yap": "vurgula",
       "hedef": "row1"
      },
      {
       "k": 162,
       "yap": "vurgula",
       "hedef": "row2"
      },
      {
       "k": 162,
       "yap": "tikla",
       "hedef": "kaydet"
      },
      {
       "k": 162,
       "yap": "goster",
       "hedef": "ok",
       "dt": 0.3
      }
     ]
    },
    {
     "x": 980,
     "y": 330,
     "tip": "nesne",
     "k": 142,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    },
    {
     "tip": "rozet",
     "k": 145,
     "x": 600,
     "y": 745,
     "e": "📡",
     "yazi": "BTK",
     "renk": "s",
     "rot": -2
    }
   ],
   "adim": 3
  },
  {
   "k": 181,
   "baslik": [
    "4. ADIM",
    "MODEM TUZAĞI"
   ],
   "mimik": [
    [
     181,
     "emin",
     "anlat"
    ],
    [
     182,
     "mutlu",
     "basparmak"
    ],
    [
     187,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 184,
     "e": "↩️",
     "yazi": "İADE",
     "rot": 5
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 187,
     "e": "🏠",
     "yazi": "KİRA",
     "rot": -4
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 183,
     "e": "↩️",
     "ust": "4. ADIM",
     "yazi": "Modem iadesi tuzağını engellemek"
    }
   ],
   "adim": 4
  },
  {
   "k": 219,
   "baslik": [
    "5. ADIM",
    "B PLANI"
   ],
   "mimik": [
    [
     219,
     "emin",
     "anlat"
    ],
    [
     230,
     "notr",
     "anlat"
    ],
    [
     249,
     "korkmus",
     "eller_yukari"
    ],
    [
     250,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "edevlet",
     "k": 236,
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
      236,
      239
     ],
     "rozetK": [
      240
     ]
    },
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 240,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 222,
     "e": "🧾",
     "yazi": "FATURA",
     "rot": 5
    },
    {
     "tip": "damga",
     "k": 249,
     "x": 480,
     "y": 620,
     "yazi": "✗ HAKSIZ",
     "rot": -8
    },
    {
     "tip": "rozet",
     "k": 237,
     "x": 600,
     "y": 745,
     "e": "⚖️",
     "yazi": "Tüketici Hakem Heyeti",
     "renk": "s",
     "rot": -2
    }
   ],
   "adim": 5
  },
  {
   "k": 261,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     261,
     "mutlu",
     "yukari"
    ],
    [
     266,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 262,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 266,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    262
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
   "yazi": "CAYMA BEDELİ ÖDEME!",
   "vurgu": "ÖDEME",
   "nesne": "📶"
  },
  {
   "yazi": "CEZASIZ ÇIKIŞ YOLU",
   "vurgu": "CEZASIZ",
   "nesne": "🚪"
  },
  {
   "yazi": "OPERATÖR SÖYLEMEZ",
   "vurgu": "SÖYLEMEZ",
   "nesne": "📞"
  }
 ]
};
