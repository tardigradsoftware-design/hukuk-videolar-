// VID_004 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "ACİL ÜCRETİNİ",
    "GERİ AL"
   ],
   "mimik": [
    [
     0,
     "emin",
     "anlat"
    ],
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     21,
     "emin",
     "isaret"
    ],
    [
     43,
     "emin",
     "anlat"
    ],
    [
     49,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 1,
     "e": "🏥",
     "yazi": "HASTANE",
     "rot": 5,
     "firlat": "el"
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 13,
     "e": "💵",
     "yazi": "ÜCRET",
     "rot": -4
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 0,
     "e": "💰",
     "ust": "BİLMEN GEREKEN",
     "yazi": "Özel hastanenin acil servisine başvurduğunda…"
    }
   ]
  },
  {
   "k": 56,
   "baslik": [
    "1. ADIM",
    "3 BELGEYİ AL"
   ],
   "mimik": [
    [
     56,
     "notr",
     "anlat"
    ],
    [
     64,
     "emin",
     "anlat"
    ],
    [
     77,
     "notr",
     "isaret"
    ],
    [
     104,
     "emin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 115,
     "ad": "kitap",
     "yazi": "YASA",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 58,
     "e": "🏥",
     "yazi": "HASTANE",
     "rot": 5
    },
    {
     "tip": "karsilastir",
     "k": 70,
     "sutunlar": [
      {
       "baslik": "KARTLA ÖDEME YAPTIYSAN",
       "renk": "g",
       "satirlar": [
        "Asla sadece POS slibiyle çıkma"
       ]
      },
      {
       "baslik": "EPİKRİZ VERMEKTEN KAÇINIRLARSA",
       "renk": "y",
       "satirlar": [
        "Hasta Hakları Yönetmeliği gereği tıbbi kayıt"
       ]
      }
     ],
     "alt": [
      70,
      106
     ],
     "x": 600,
     "y": 560
    }
   ],
   "adim": 1
  },
  {
   "k": 119,
   "baslik": [
    "2. ADIM",
    "YEŞİL ALAN TUZAĞI"
   ],
   "mimik": [
    [
     119,
     "notr",
     "anlat"
    ],
    [
     128,
     "emin",
     "anlat"
    ],
    [
     145,
     "notr",
     "isaret"
    ],
    [
     156,
     "emin",
     "isaret"
    ],
    [
     177,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 129,
     "e": "🏥",
     "yazi": "HASTANE",
     "rot": 5
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 130,
     "e": "💵",
     "yazi": "ÜCRET",
     "rot": -4
    },
    {
     "tip": "damga",
     "k": 177,
     "x": 480,
     "y": 620,
     "yazi": "✗ USULSÜZ",
     "rot": -8
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 121,
     "e": "✅",
     "ust": "2. ADIM",
     "yazi": "Yeşil alan ve poliklinik tuzağını e-Nabızdan…"
    }
   ],
   "adim": 2
  },
  {
   "k": 180,
   "baslik": [
    "3. ADIM",
    "SGK ŞİKAYETİ"
   ],
   "mimik": [
    [
     180,
     "notr",
     "anlat"
    ],
    [
     187,
     "emin",
     "anlat"
    ],
    [
     197,
     "emin",
     "anlat"
    ],
    [
     213,
     "korkmus",
     "eller_yukari"
    ],
    [
     219,
     "mutlu",
     "basparmak"
    ],
    [
     229,
     "notr",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 192,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 184,
     "e": "🏥",
     "yazi": "SGK",
     "rot": 5
    },
    {
     "tip": "damga",
     "k": 213,
     "x": 480,
     "y": 620,
     "yazi": "✗ HAKSIZ",
     "rot": -8
    },
    {
     "tip": "rozet",
     "k": 188,
     "x": 600,
     "y": 745,
     "e": "📨",
     "yazi": "CİMER",
     "renk": "s",
     "rot": -2
    },
    {
     "tip": "kontrol",
     "k": 229,
     "baslik": "HAZIRLA",
     "maddeler": [
      "Dosya Ekle bölümünden fatura",
      "Dekont",
      "Epikriz"
     ],
     "alt": [
      229,
      233,
      234
     ],
     "x": 520,
     "y": 520,
     "k1": 229
    },
    {
     "x": 520,
     "y": 520,
     "tip": "liste",
     "k": 229,
     "ogeler": [
      {
       "e": "🧾",
       "t": "Dosya Ekle bölümünden fatura"
      },
      {
       "e": "•",
       "t": "Dekont"
      },
      {
       "e": "•",
       "t": "Epikriz"
      }
     ],
     "alt": [
      229,
      233,
      234
     ]
    }
   ],
   "adim": 3
  },
  {
   "k": 246,
   "baslik": [
    "4. ADIM",
    "184 SABİM KAYDI"
   ],
   "mimik": [
    [
     246,
     "emin",
     "isaret"
    ],
    [
     253,
     "emin",
     "anlat"
    ],
    [
     263,
     "korkmus",
     "eller_yukari"
    ],
    [
     273,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "x": 1030,
     "y": 360,
     "tip": "ikon",
     "k": 250,
     "e": "💰",
     "yazi": "PARA",
     "rot": 5
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 256,
     "e": "🏥",
     "yazi": "SAĞLIK",
     "rot": -4
    },
    {
     "x": 480,
     "y": 560,
     "tip": "not",
     "k": 248,
     "e": "💰",
     "ust": "4. ADIM",
     "yazi": "184 SABİM paralel kaydı açmak"
    }
   ],
   "adim": 4
  },
  {
   "k": 277,
   "baslik": [
    "5. ADIM",
    "B PLANI"
   ],
   "mimik": [
    [
     277,
     "notr",
     "anlat"
    ],
    [
     281,
     "notr",
     "anlat"
    ],
    [
     303,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 480,
     "y": 560,
     "tip": "edevlet",
     "k": 286,
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
      286,
      289
     ],
     "rozetK": [
      290
     ]
    },
    {
     "x": 1030,
     "y": 360,
     "tip": "nesne",
     "k": 290,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    },
    {
     "x": 1030,
     "y": 700,
     "tip": "ikon",
     "k": 281,
     "e": "↩️",
     "yazi": "İADE",
     "rot": 5
    },
    {
     "tip": "rozet",
     "k": 287,
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
   "k": 307,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     307,
     "mutlu",
     "yukari"
    ],
    [
     312,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 308,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 312,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    308
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
   "yazi": "ACİLDE PARA ALINMAZ!",
   "vurgu": "PARA",
   "nesne": "🏥"
  },
  {
   "yazi": "ÖDEDİYSEN GERİ AL",
   "vurgu": "GERİ",
   "nesne": "💸"
  },
  {
   "yazi": "HASTANE BUNU SÖYLEMEZ",
   "vurgu": "SÖYLEMEZ",
   "nesne": "🧾"
  }
 ]
};
