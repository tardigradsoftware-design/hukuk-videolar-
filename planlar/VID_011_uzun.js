// VID_011 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "REKLAM SMS'LERİ",
    "NASIL ENGELLENİR"
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
    ],
    [
     23,
     "emin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "edevlet",
     "k": 13,
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
      13,
      16
     ],
     "rozetK": [
      17
     ]
    },
    {
     "x": 1080,
     "y": 360,
     "tip": "nesne",
     "k": 18,
     "ad": "kitap",
     "yazi": "YASA",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 20,
     "e": "🏢",
     "yazi": "ŞİRKET",
     "rot": 5,
     "firlat": "el"
    }
   ]
  },
  {
   "k": 29,
   "baslik": [
    "1. ADIM",
    "İYS'YE GİR"
   ],
   "mimik": [
    [
     29,
     "notr",
     "anlat"
    ],
    [
     35,
     "emin",
     "anlat"
    ],
    [
     53,
     "notr",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 31,
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
         "t": "Ticari Elektronik İleti Yönetim Sistemi",
         "s": "Ticaret Bakanlığı"
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
       "k": 31,
       "yap": "yaz",
       "alan": "tc",
       "yazi": "•••••••••••",
       "hiz": 16
      },
      {
       "k": 33,
       "yap": "url",
       "yazi": "turkiye.gov.tr",
       "hiz": 16
      },
      {
       "k": 34,
       "yap": "yaz",
       "alan": "sifre",
       "yazi": "••••••••",
       "hiz": 16
      },
      {
       "k": 35,
       "yap": "tikla",
       "hedef": "giris",
       "dt": 0.25
      },
      {
       "k": 37,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 40,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Ticari Elektronik İleti Yönetim Sistemi",
       "hiz": 18
      },
      {
       "k": 50,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      },
      {
       "k": 54,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 56,
       "yap": "tikla",
       "hedef": "b0"
      }
     ]
    },
    {
     "tip": "rozet",
     "k": 48,
     "x": 600,
     "y": 775,
     "e": "🏛️",
     "yazi": "Ticaret Bakanlığı",
     "renk": "s",
     "rot": -2
    }
   ],
   "adim": 1
  },
  {
   "k": 63,
   "baslik": [
    "2. ADIM",
    "TÜM İZİNLERİ GÖR"
   ],
   "mimik": [
    [
     63,
     "emin",
     "isaret"
    ],
    [
     72,
     "notr",
     "anlat"
    ],
    [
     86,
     "emin",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 65,
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
       "ust": [
        {
         "id": "b0",
         "t": "İzinleri Yönet"
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
       "k": 69,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 71,
       "yap": "tikla",
       "hedef": "b0"
      }
     ]
    }
   ],
   "adim": 2
  },
  {
   "k": 97,
   "baslik": [
    "3. ADIM",
    "HEPSİNİ RET'E ÇEK"
   ],
   "mimik": [
    [
     97,
     "notr",
     "isaret"
    ],
    [
     103,
     "emin",
     "isaret"
    ],
    [
     123,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 97,
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "kullanici": "Hoş geldiniz",
     "ekranlar": {
      "form": {
       "tur": "form",
       "baslik": "İşlem Ekranı",
       "kutular": [
        "Seçenek 1 (onaylıyorum)",
        "Seçenek 2 (onaylıyorum)"
       ],
       "ust": [
        {
         "id": "b0",
         "t": "Kaydet"
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
       "k": 97,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 98,
       "yap": "tikla",
       "hedef": "b0"
      },
      {
       "k": 111,
       "yap": "vurgula",
       "hedef": "cb0"
      },
      {
       "k": 111,
       "yap": "tikla",
       "hedef": "cb0"
      },
      {
       "k": 112,
       "yap": "vurgula",
       "hedef": "cb1"
      },
      {
       "k": 112,
       "yap": "tikla",
       "hedef": "cb1"
      },
      {
       "k": 118,
       "yap": "tikla",
       "hedef": "kaydet"
      },
      {
       "k": 118,
       "yap": "goster",
       "hedef": "ok",
       "dt": 0.3
      }
     ]
    }
   ],
   "adim": 3
  },
  {
   "k": 140,
   "baslik": [
    "4. ADIM",
    "FİRMAYI ŞİKAYET ET"
   ],
   "mimik": [
    [
     140,
     "emin",
     "anlat"
    ],
    [
     150,
     "notr",
     "isaret"
    ],
    [
     170,
     "notr",
     "anlat"
    ],
    [
     191,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 142,
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
         "t": "Ticari Elektronik İleti Şikayet Sistemi",
         "s": "e-Devlet hizmeti"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 169,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 172,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Ticari Elektronik İleti Şikayet Sistemi",
       "hiz": 18
      },
      {
       "k": 178,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      }
     ]
    }
   ],
   "adim": 4
  },
  {
   "k": 195,
   "baslik": [
    "5. ADIM",
    "BAHİS VE SPAM"
   ],
   "mimik": [
    [
     195,
     "emin",
     "isaret"
    ],
    [
     207,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 1080,
     "y": 360,
     "tip": "nesne",
     "k": 197,
     "ad": "kitap",
     "yazi": "YASA",
     "rot": 6
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 213,
     "e": "📱",
     "yazi": "TELEFON",
     "rot": 5
    },
    {
     "tip": "rozet",
     "k": 219,
     "x": 600,
     "y": 775,
     "e": "📡",
     "yazi": "BTK",
     "renk": "s",
     "rot": -2
    },
    {
     "x": 480,
     "y": 520,
     "tip": "not",
     "k": 197,
     "e": "✅",
     "ust": "5. ADIM",
     "yazi": "Yasa dışı bahis ve yabancı spam mesajlar için…"
    }
   ],
   "adim": 5
  },
  {
   "k": 228,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     228,
     "mutlu",
     "yukari"
    ],
    [
     234,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 229,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 234,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    229
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
   "yazi": "REKLAMLARA SON!",
   "vurgu": "SON",
   "nesne": "📵"
  },
  {
   "yazi": "TEK EKRANDA KAPAT",
   "vurgu": "TEK",
   "nesne": "📱"
  },
  {
   "yazi": "FİRMAYA CEZA KES",
   "vurgu": "CEZA",
   "nesne": "⚖️"
  }
 ]
};
