// VID_003 uzun — elle zenginleştirilmiş plan (detaylar ekranda).
module.exports = {
 "adimSayisi": 5,
 "kapak": [
  {
   "yazi": "BANKA BUNU SÖYLEMEZ!",
   "vurgu": "SÖYLEMEZ",
   "nesne": "🏦"
  },
  {
   "yazi": "SİGORTA ZORUNLU DEĞİL",
   "vurgu": "DEĞİL",
   "nesne": "🛡️"
  },
  {
   "yazi": "PARANI GERİ AL",
   "vurgu": "GERİ",
   "nesne": "💸"
  }
 ],
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
     "emin",
     "anlat"
    ],
    [
     23,
     "mutlu",
     "basparmak"
    ],
    [
     35,
     "emin",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "liste",
     "k": 1,
     "x": 360,
     "y": 530,
     "ogeler": [
      {
       "e": "🛒",
       "t": "İhtiyaç kredisi"
      },
      {
       "e": "🚗",
       "t": "Taşıt kredisi"
      },
      {
       "e": "🏠",
       "t": "Konut kredisi"
      }
     ],
     "alt": [
      1,
      2,
      4
     ]
    },
    {
     "tip": "rozet",
     "k": 23,
     "x": 1000,
     "y": 290,
     "e": "📜",
     "yazi": "YASAL OLARAK ZORUNLU DEĞİL",
     "renk": "y",
     "rot": -3
    },
    {
     "tip": "rozet",
     "k": 28,
     "x": 1000,
     "y": 800,
     "e": "✅",
     "yazi": "ŞUBEYE GİTMEDEN İADE",
     "renk": "g",
     "rot": 2
    },
    {
     "tip": "rozet",
     "k": 38,
     "x": 360,
     "y": 830,
     "e": "🧭",
     "yazi": "5 NET ADIM",
     "renk": "k",
     "rot": -2,
     "firlat": true
    }
   ]
  },
  {
   "k": 43,
   "adim": 1,
   "baslik": [
    "1. ADIM",
    "30 GÜN CAYMA HAKKI"
   ],
   "mimik": [
    [
     43,
     "emin",
     "isaret"
    ],
    [
     65,
     "mutlu",
     "basparmak"
    ],
    [
     77,
     "dusunceli",
     "dusun"
    ],
    [
     81,
     "emin",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "karsilastir",
     "k": 51,
     "x": 600,
     "y": 520,
     "sutunlar": [
      {
       "baslik": "İLK 30 GÜN",
       "renk": "g",
       "satirlar": [
        "Tek kuruş kesinti yok",
        "Primin %100’ü iade"
       ]
      },
      {
       "baslik": "30 GÜNDEN SONRA",
       "renk": "y",
       "satirlar": [
        "Vazgeçme!",
        "Kalan günler kadar iade"
       ]
      }
     ],
     "alt": [
      58,
      77
     ]
    },
    {
     "tip": "rozet",
     "k": 54,
     "x": 600,
     "y": 830,
     "e": "📅",
     "yazi": "POLİÇENİN KESİLDİĞİ GÜNDEN İTİBAREN",
     "renk": "b"
    }
   ]
  },
  {
   "k": 93,
   "adim": 2,
   "baslik": [
    "2. ADIM",
    "POLİÇENİ VE ŞİRKETİ BUL"
   ],
   "mimik": [
    [
     93,
     "emin",
     "isaret"
    ],
    [
     101,
     "notr",
     "anlat"
    ],
    [
     118,
     "notr",
     "isaret"
    ],
    [
     122,
     "emin",
     "anlat"
    ],
    [
     131,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 95,
     "k1": 122,
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "kullanici": "Hoş geldiniz",
     "ekranlar": {
      "ara": {
       "tur": "arama",
       "alan": "ara",
       "sonuclar": [
        {
         "t": "Hayat Sigortası Poliçe Sorgulama",
         "s": "Sigorta Bilgi ve Gözetim Merkezi"
        }
       ]
      },
      "tablo": {
       "tur": "tablo",
       "baslik": "Aktif Hayat Sigortası Poliçeleriniz",
       "kolonlar": [
        "Poliçe No",
        "Başlangıç",
        "Sigorta Şirketi",
        "Durum"
       ],
       "durum": true,
       "durumRenk": "g",
       "satirlar": [
        [
         "••••••••",
         "••.••.20••",
         "••• Sigorta A.Ş.",
         "Aktif"
        ]
       ]
      }
     },
     "akis": [
      {
       "k": 101,
       "yap": "ekran",
       "ad": "ara"
      },
      {
       "k": 103,
       "yap": "yaz",
       "alan": "ara",
       "yazi": "Hayat Sigortası Poliçe Sorgulama"
      },
      {
       "k": 111,
       "yap": "tikla",
       "hedef": "r0"
      },
      {
       "k": 117,
       "yap": "ekran",
       "ad": "tablo",
       "dt": 0.2
      },
      {
       "k": 119,
       "yap": "vurgula",
       "hedef": "row0"
      },
      {
       "k": 120,
       "yap": "tikla",
       "hedef": "row0"
      }
     ]
    },
    {
     "tip": "kontrol",
     "k": 122,
     "x": 600,
     "y": 560,
     "baslik": "NOT AL",
     "maddeler": [
      "Poliçe numarası",
      "Başlangıç tarihi",
      "Sigorta şirketinin tam adı"
     ],
     "alt": [
      123,
      124,
      128
     ]
    }
   ]
  },
  {
   "k": 133,
   "adim": 3,
   "baslik": [
    "3. ADIM",
    "YAZILI İPTAL TALEBİ"
   ],
   "mimik": [
    [
     133,
     "emin",
     "isaret"
    ],
    [
     141,
     "kizgin",
     "dur"
    ],
    [
     147,
     "emin",
     "anlat"
    ],
    [
     165,
     "notr",
     "isaret"
    ],
    [
     193,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "damga",
     "k": 141,
     "k1": 147,
     "x": 600,
     "y": 520,
     "yazi": "✗ TELEFONDA İKNA YOK",
     "rot": -6
    },
    {
     "tip": "portal",
     "cihaz": "telefon",
     "uygulama": "Sigorta Şirketi",
     "k": 147,
     "k1": 164,
     "x": 430,
     "y": 590,
     "w": 340,
     "h": 480,
     "ekranlar": {
      "menu": {
       "tur": "menu",
       "baslik": "Menü",
       "satirlar": [
        "Poliçelerim",
        "Poliçe İşlemleri",
        "Hasar Bildirimi",
        "İletişim"
       ]
      }
     },
     "akis": [
      {
       "k": 149,
       "yap": "ekran",
       "ad": "menu"
      },
      {
       "k": 153,
       "yap": "tikla",
       "hedef": "m1"
      }
     ]
    },
    {
     "tip": "rozet",
     "k": 157,
     "k1": 164,
     "x": 900,
     "y": 560,
     "e": "✉️",
     "yazi": "VEYA RESMİ E-POSTA",
     "renk": "b",
     "rot": 2
    },
    {
     "tip": "eposta",
     "k": 165,
     "x": 600,
     "y": 560,
     "baslik": "Poliçe iptali ve prim iadesi talebi",
     "alanlar": [
      {
       "etiket": "Kime",
       "deger": "Sigorta şirketi müşteri hizmetleri"
      },
      {
       "etiket": "T.C. No",
       "deger": "•••••••••••"
      },
      {
       "etiket": "Poliçe No",
       "deger": "••••••••"
      },
      {
       "etiket": "Talep",
       "deger": "Cayma / erken iptal hakkım kapsamında poliçe iptali"
      },
      {
       "etiket": "İade",
       "deger": "Prim bedeli → kendi adıma kayıtlı IBAN"
      }
     ],
     "alt": [
      165,
      166,
      169,
      171,
      183
     ]
    }
   ]
  },
  {
   "k": 195,
   "adim": 4,
   "baslik": [
    "4. ADIM",
    "FAİZ BLÖFÜNE DİKKAT"
   ],
   "mimik": [
    [
     195,
     "emin",
     "isaret"
    ],
    [
     204,
     "dusunceli",
     "dusun"
    ],
    [
     219,
     "mutlu",
     "basparmak"
    ],
    [
     223,
     "emin",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "nesne",
     "k": 211,
     "x": 1090,
     "y": 300,
     "ad": "belge",
     "yazi": "KREDİ SÖZLEŞMESİ",
     "rot": 6,
     "firlat": "el"
    },
    {
     "tip": "karsilastir",
     "k": 215,
     "x": 600,
     "y": 660,
     "sutunlar": [
      {
       "baslik": "FARK YAZMIYORSA",
       "renk": "g",
       "satirlar": [
        "Faizi değiştiremezler"
       ]
      },
      {
       "baslik": "FARK YAZIYORSA",
       "renk": "y",
       "satirlar": [
        "Dışarıdan ucuz poliçe yaptır",
        "Dain-i mürtehin şerhiyle bankaya sun"
       ]
      }
     ],
     "alt": [
      219,
      223
     ]
    }
   ]
  },
  {
   "k": 248,
   "adim": 5,
   "baslik": [
    "5. ADIM",
    "B PLANI"
   ],
   "mimik": [
    [
     248,
     "dusunceli",
     "dusun"
    ],
    [
     252,
     "notr",
     "anlat"
    ],
    [
     269,
     "emin",
     "isaret"
    ],
    [
     281,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "rozet",
     "k": 256,
     "x": 600,
     "y": 330,
     "e": "⏳",
     "yazi": "15 İŞ GÜNÜ İÇİNDE İADE YOKSA",
     "renk": "y",
     "rot": -2
    },
    {
     "tip": "kontrol",
     "k": 263,
     "x": 420,
     "y": 540,
     "baslik": "BAŞVURU DOSYAN",
     "maddeler": [
      "Yazılı iptal talebin",
      "Poliçe çıktın"
     ],
     "alt": [
      263,
      267
     ]
    },
    {
     "tip": "rozet",
     "k": 269,
     "x": 600,
     "y": 745,
     "e": "🏛️",
     "yazi": "e-Devlet → BDDK e-Şikayet",
     "renk": "s"
    },
    {
     "tip": "rozet",
     "k": 275,
     "x": 600,
     "y": 855,
     "e": "⚖️",
     "yazi": "sigortatahkim.org → Tahkim Komisyonu",
     "renk": "b"
    }
   ]
  },
  {
   "k": 285,
   "baslik": [
    "HAKLARINI KORU",
    "ABONE OL"
   ],
   "mimik": [
    [
     285,
     "mutlu",
     "selam"
    ]
   ],
   "zipla": [
    290
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 286,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sigorta paranı geri aldın mı? Yorumlara yaz",
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
   ]
  }
 ],
 "son": {
  "ifade": "mutlu",
  "jest": "selam",
  "uzat": 2.5
 }
};
