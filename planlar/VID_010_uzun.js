// VID_010 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "TAPU KİLİDİ",
    "NASIL KONULUR"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     25,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "liste",
     "k": 0,
     "ogeler": [
      {
       "e": "•",
       "t": "Adına kayıtlı bir ev"
      },
      {
       "e": "•",
       "t": "Arsa"
      },
      {
       "e": "•",
       "t": "Tarla varsa"
      }
     ],
     "alt": [
      0,
      4,
      6
     ]
    },
    {
     "x": 1080,
     "y": 360,
     "tip": "ikon",
     "k": 9,
     "e": "🪪",
     "yazi": "KİMLİK",
     "rot": 5,
     "firlat": "el"
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 19,
     "e": "📜",
     "yazi": "TAPU",
     "rot": -4
    }
   ]
  },
  {
   "k": 36,
   "baslik": [
    "1. ADIM",
    "WEB TAPU GİRİŞİ"
   ],
   "mimik": [
    [
     36,
     "emin",
     "anlat"
    ],
    [
     43,
     "notr",
     "isaret"
    ],
    [
     47,
     "emin",
     "isaret"
    ],
    [
     60,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 36,
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
      "form": {
       "tur": "form",
       "baslik": "İşlem Ekranı",
       "kutular": [],
       "ust": [
        {
         "id": "b0",
         "t": "Giriş"
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
       "k": 36,
       "yap": "yaz",
       "alan": "tc",
       "yazi": "•••••••••••",
       "hiz": 16
      },
      {
       "k": 38,
       "yap": "yaz",
       "alan": "sifre",
       "yazi": "••••••••",
       "hiz": 16
      },
      {
       "k": 39,
       "yap": "tikla",
       "hedef": "giris",
       "dt": 0.25
      },
      {
       "k": 40,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 42,
       "yap": "tikla",
       "hedef": "b0"
      },
      {
       "k": 54,
       "yap": "url",
       "yazi": "turkiye.gov.tr",
       "hiz": 16
      }
     ]
    }
   ],
   "adim": 1
  },
  {
   "k": 67,
   "baslik": [
    "2. ADIM",
    "BEYAN İŞLEMLERİ"
   ],
   "mimik": [
    [
     67,
     "emin",
     "anlat"
    ],
    [
     73,
     "notr",
     "isaret"
    ],
    [
     86,
     "emin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 69,
     "e": "✅",
     "ust": "2. ADIM",
     "yazi": "Beyan İşlemleri menüsünü bulmak"
    }
   ],
   "adim": 2
  },
  {
   "k": 95,
   "baslik": [
    "3. ADIM",
    "TAŞINMAZI SEÇ"
   ],
   "mimik": [
    [
     95,
     "notr",
     "anlat"
    ],
    [
     102,
     "emin",
     "anlat"
    ],
    [
     116,
     "notr",
     "isaret"
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
         "t": "Beyan Koy"
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
       "k": 117,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 118,
       "yap": "vurgula",
       "hedef": "cb0"
      },
      {
       "k": 118,
       "yap": "tikla",
       "hedef": "cb0"
      },
      {
       "k": 119,
       "yap": "tikla",
       "hedef": "b0"
      },
      {
       "k": 119,
       "yap": "vurgula",
       "hedef": "cb1"
      },
      {
       "k": 119,
       "yap": "tikla",
       "hedef": "cb1"
      }
     ]
    }
   ],
   "adim": 3
  },
  {
   "k": 136,
   "baslik": [
    "4. ADIM",
    "SMS İLE MÜHÜRLE"
   ],
   "mimik": [
    [
     136,
     "emin",
     "isaret"
    ],
    [
     142,
     "notr",
     "anlat"
    ],
    [
     159,
     "emin",
     "anlat"
    ],
    [
     165,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 138,
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
         "t": "Onayla"
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
       "k": 153,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 154,
       "yap": "tikla",
       "hedef": "kaydet"
      },
      {
       "k": 154,
       "yap": "goster",
       "hedef": "ok",
       "dt": 0.3
      },
      {
       "k": 155,
       "yap": "tikla",
       "hedef": "b0"
      }
     ]
    }
   ],
   "adim": 4
  },
  {
   "k": 169,
   "baslik": [
    "5. ADIM",
    "KİLİT NASIL KALKAR"
   ],
   "mimik": [
    [
     169,
     "emin",
     "anlat"
    ],
    [
     179,
     "notr",
     "isaret"
    ],
    [
     194,
     "emin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 1080,
     "y": 360,
     "tip": "ikon",
     "k": 181,
     "e": "✒️",
     "yazi": "NOTER",
     "rot": 5
    },
    {
     "x": 1080,
     "y": 700,
     "tip": "ikon",
     "k": 198,
     "e": "📈",
     "yazi": "ZAM",
     "rot": -4
    },
    {
     "tip": "rozet",
     "k": 181,
     "x": 600,
     "y": 775,
     "e": "✒️",
     "yazi": "Noter",
     "renk": "s",
     "rot": -2
    },
    {
     "x": 480,
     "y": 520,
     "tip": "not",
     "k": 171,
     "e": "✅",
     "ust": "5. ADIM",
     "yazi": "Bu kilidin nasıl çalıştığını ve nasıl…"
    }
   ],
   "adim": 5
  },
  {
   "k": 214,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     214,
     "mutlu",
     "yukari"
    ],
    [
     219,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 215,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 219,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    215
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
   "yazi": "TAPUNU KİLİTLE!",
   "vurgu": "KİLİTLE",
   "nesne": "🏠"
  },
  {
   "yazi": "SAHTE SATIŞA SON",
   "vurgu": "SON",
   "nesne": "🔒"
  },
  {
   "yazi": "1 DAKİKALIK KORUMA",
   "vurgu": "1",
   "nesne": "📜"
  }
 ]
};
