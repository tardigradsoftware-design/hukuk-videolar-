// VID_001 uzun video (yatay 1920x1080). k = metindeki kelime sırası (node scripts/video/kelimeler.js VID_001 uzun).
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "E-DEVLET'TE",
    "UNUTULMUŞ PARALAR"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     11,
     "korkmus",
     "eller_yukari"
    ],
    [
     20,
     "emin",
     "anlat"
    ],
    [
     28,
     "mutlu",
     "anlat"
    ],
    [
     40,
     "emin",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "edevlet",
     "k": 0,
     "x": 420,
     "y": 520,
     "satirlar": [
      {
       "t": "Şahıs ödemeleri",
       "sag": "sorgulanıyor…"
      },
      {
       "t": "Adına bekleyen ödeme",
       "rozet": "VAR ✓"
      }
     ],
     "alt": [
      0,
      8
     ],
     "rozetK": [
      9
     ]
    },
    {
     "tip": "damga",
     "k": 15,
     "x": 420,
     "y": 540,
     "yazi": "✗ ZAMANAŞIMI",
     "rot": -8
    },
    {
     "tip": "rozet",
     "k": 20,
     "x": 1000,
     "y": 400,
     "e": "📅",
     "yazi": "YILDA EN AZ 1 KEZ",
     "renk": "y",
     "rot": -3
    },
    {
     "tip": "rozet",
     "k": 40,
     "x": 1000,
     "y": 600,
     "e": "✅",
     "yazi": "5 NET ADIM",
     "renk": "k",
     "rot": 2,
     "firlat": true
    }
   ]
  },
  {
   "k": 44,
   "adim": 1,
   "baslik": [
    "1. ADIM",
    "SGK ŞAHIS ÖDEMELERİ"
   ],
   "mimik": [
    [
     44,
     "emin",
     "isaret"
    ],
    [
     51,
     "notr",
     "anlat"
    ],
    [
     63,
     "notr",
     "isaret"
    ],
    [
     77,
     "saskin",
     "anlat"
    ],
    [
     92,
     "mutlu",
     "anlat"
    ],
    [
     97,
     "emin",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "k": 46,
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
      "ara": {
       "tur": "arama",
       "alan": "ara",
       "sonuclar": [
        {
         "t": "Şahıs Ödemeleri Sorgulama",
         "s": "Sosyal Güvenlik Kurumu"
        },
        {
         "t": "Şahıs Ödemeleri Banka Hesabı Tanımlama",
         "s": "Sosyal Güvenlik Kurumu"
        }
       ]
      },
      "tablo": {
       "tur": "tablo",
       "baslik": "Şahıs Ödemeleri",
       "kolonlar": [
        "Ödeme Türü",
        "Tutar",
        "Tarih",
        "Durum"
       ],
       "durum": true,
       "satirlar": [
        [
         "Rapor parası",
         "₺ •••,••",
         "••.••.20••",
         "Bekliyor"
        ],
        [
         "Emzirme ödeneği",
         "₺ •••,••",
         "••.••.20••",
         "Bekliyor"
        ],
        [
         "Yol gideri",
         "₺ ••,••",
         "••.••.20••",
         "Bekliyor"
        ],
        [
         "Cenaze yardımı",
         "₺ •.•••,••",
         "••.••.20••",
         "Bekliyor"
        ],
        [
         "Fazla prim iadesi",
         "₺ •••,••",
         "••.••.20••",
         "Bekliyor"
        ]
       ]
      }
     },
     "akis": [
      {
       "k": 51,
       "yap": "url",
       "yazi": "turkiye.gov.tr",
       "hiz": 16
      },
      {
       "k": 56,
       "yap": "yaz",
       "alan": "tc",
       "yazi": "•••••••••••",
       "hiz": 16
      },
      {
       "k": 60,
       "yap": "yaz",
       "alan": "sifre",
       "yazi": "••••••••",
       "hiz": 16
      },
      {
       "k": 61,
       "yap": "tikla",
       "hedef": "giris",
       "dt": 0.25
      },
      {
       "k": 63,
       "yap": "ekran",
       "ad": "ara"
      },
      {
       "k": 66,
       "yap": "yaz",
       "alan": "ara",
       "yazi": "Şahıs Ödemeleri Sorgulama",
       "hiz": 15
      },
      {
       "k": 73,
       "yap": "tikla",
       "hedef": "r0"
      },
      {
       "k": 77,
       "yap": "ekran",
       "ad": "tablo"
      },
      {
       "k": 79,
       "yap": "vurgula",
       "hedef": "row0"
      },
      {
       "k": 81,
       "yap": "vurgula",
       "hedef": "row1"
      },
      {
       "k": 83,
       "yap": "vurgula",
       "hedef": "row2"
      },
      {
       "k": 85,
       "yap": "vurgula",
       "hedef": "row3"
      },
      {
       "k": 88,
       "yap": "vurgula",
       "hedef": "row4"
      }
     ]
    },
    {
     "tip": "rozet",
     "k": 97,
     "x": 980,
     "y": 330,
     "e": "₺",
     "yazi": "TUTAR · TARİH · DURUM",
     "renk": "g",
     "rot": 3
    }
   ]
  },
  {
   "k": 104,
   "adim": 2,
   "baslik": [
    "2. ADIM",
    "UNUTULAN BES BİRİKİMİN"
   ],
   "mimik": [
    [
     104,
     "emin",
     "isaret"
    ],
    [
     114,
     "notr",
     "anlat"
    ],
    [
     131,
     "saskin",
     "isaret"
    ],
    [
     134,
     "dusunceli",
     "dusun"
    ],
    [
     149,
     "notr",
     "anlat"
    ],
    [
     160,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "k": 104,
     "kullanici": "Hoş geldiniz",
     "ekranlar": {
      "ara": {
       "tur": "arama",
       "alan": "ara",
       "sonuclar": [
        {
         "t": "BES ve Otomatik Katılım Devlet Katkısı ve Birikim Sorgulama",
         "s": "Takasbank"
        }
       ]
      },
      "tablo": {
       "tur": "tablo",
       "baslik": "Bireysel Emeklilik Birikimleri",
       "kolonlar": [
        "Şirket",
        "Sistem",
        "Birikim",
        "Durum"
       ],
       "durum": true,
       "durumRenk": "g",
       "satirlar": [
        [
         "Eski işveren • A.Ş.",
         "Otomatik Katılım",
         "₺ •.•••,••",
         "Aktif"
        ],
        [
         "Eski işveren • Ltd.",
         "Otomatik Katılım",
         "₺ •••,••",
         "Aktif"
        ]
       ]
      }
     },
     "akis": [
      {
       "k": 114,
       "yap": "ekran",
       "ad": "ara"
      },
      {
       "k": 118,
       "yap": "yaz",
       "alan": "ara",
       "yazi": "Bireysel Emeklilik ve Otomatik Katılım Sistemlerinde Devlet Katkısı ve Birikim Sorgulama",
       "hiz": 30
      },
      {
       "k": 131,
       "yap": "tikla",
       "hedef": "r0"
      },
      {
       "k": 133,
       "yap": "ekran",
       "ad": "tablo",
       "dt": 0.2
      },
      {
       "k": 136,
       "yap": "vurgula",
       "hedef": "row0"
      },
      {
       "k": 142,
       "yap": "vurgula",
       "hedef": "row1"
      }
     ]
    },
    {
     "tip": "rozet",
     "k": 152,
     "x": 980,
     "y": 330,
     "e": "📞",
     "yazi": "ÇIKIŞ / BİRLEŞTİRME",
     "renk": "y",
     "rot": -3
    },
    {
     "tip": "rozet",
     "k": 160,
     "x": 440,
     "y": 840,
     "e": "💳",
     "yazi": "IBAN'INA ÇEK",
     "renk": "g",
     "rot": 2
    }
   ]
  },
  {
   "k": 163,
   "adim": 3,
   "baslik": [
    "3. ADIM",
    "ZAMANAŞIMI HESAPLAR"
   ],
   "mimik": [
    [
     163,
     "emin",
     "isaret"
    ],
    [
     171,
     "notr",
     "anlat"
    ],
    [
     180,
     "dusunceli",
     "dusun"
    ],
    [
     199,
     "korkmus",
     "dur"
    ],
    [
     202,
     "emin",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "k": 163,
     "kullanici": "Hoş geldiniz",
     "ekranlar": {
      "ara": {
       "tur": "arama",
       "alan": "ara",
       "sonuclar": [
        {
         "t": "Mevduat ve Katılım Fonu Zamanaşımı Sorgulama",
         "s": "Zamanaşımı sorgulama hizmeti"
        }
       ]
      },
      "tablo": {
       "tur": "tablo",
       "baslik": "Zamanaşımına Uğrayan Hesaplar",
       "kolonlar": [
        "Banka",
        "Şube",
        "Hesap Türü",
        "Durum"
       ],
       "durum": true,
       "satirlar": [
        [
         "••• Bankası",
         "••• Şubesi",
         "Maaş hesabı",
         "Zamanaşımı"
        ],
        [
         "••• Bankası",
         "••• Şubesi",
         "Öğrenci hesabı",
         "Zamanaşımı"
        ]
       ]
      }
     },
     "akis": [
      {
       "k": 171,
       "yap": "ekran",
       "ad": "ara"
      },
      {
       "k": 173,
       "yap": "yaz",
       "alan": "ara",
       "yazi": "Mevduat ve Katılım Fonu Zamanaşımı Sorgulama",
       "hiz": 22
      },
      {
       "k": 179,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      },
      {
       "k": 180,
       "yap": "ekran",
       "ad": "tablo",
       "dt": 0.3
      },
      {
       "k": 187,
       "yap": "vurgula",
       "hedef": "row0"
      },
      {
       "k": 190,
       "yap": "vurgula",
       "hedef": "row1"
      }
     ]
    },
    {
     "tip": "damga",
     "k": 199,
     "x": 620,
     "y": 660,
     "yazi": "HAZİRAN'DAN ÖNCE!",
     "rot": -7
    },
    {
     "tip": "rozet",
     "k": 202,
     "x": 980,
     "y": 330,
     "e": "🪪",
     "yazi": "KİMLİKLE ŞUBEYE",
     "renk": "g",
     "rot": 3
    },
    {
     "tip": "soru",
     "k": 205,
     "x": 560,
     "y": 845,
     "e": "💬",
     "yazi": "Buraya kadar izlediysen 'TAMAM' yaz",
     "ust": "YORUMLARA YAZ 👇"
    }
   ]
  },
  {
   "k": 209,
   "adim": 4,
   "baslik": [
    "4. ADIM",
    "IBAN TANIMLA"
   ],
   "mimik": [
    [
     209,
     "emin",
     "isaret"
    ],
    [
     218,
     "notr",
     "anlat"
    ],
    [
     226,
     "notr",
     "isaret"
    ],
    [
     240,
     "mutlu",
     "basparmak"
    ],
    [
     244,
     "emin",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "x": 620,
     "y": 590,
     "w": 760,
     "h": 455,
     "k": 209,
     "kullanici": "Hoş geldiniz",
     "ekranlar": {
      "ara": {
       "tur": "arama",
       "alan": "ara",
       "sonuclar": [
        {
         "t": "Şahıs Ödemeleri Banka Hesabı Tanımlama",
         "s": "Sosyal Güvenlik Kurumu"
        }
       ]
      },
      "form": {
       "tur": "form",
       "baslik": "Banka Hesabı Tanımlama",
       "ust": [
        {
         "id": "yeni",
         "t": "+ Yeni Hesap Ekle"
        }
       ],
       "alanlar": [
        {
         "id": "iban",
         "label": "Vadesiz TL IBAN (yalnızca kendi adına)",
         "ph": "TR__ ____ ____ ____ ____ ____ __"
        }
       ],
       "butonlar": [
        {
         "id": "kaydet",
         "t": "Kaydet"
        }
       ],
       "toast": {
        "id": "ok",
        "t": "✓ Hesap bilgileriniz kaydedildi"
       }
      }
     },
     "akis": [
      {
       "k": 218,
       "yap": "ekran",
       "ad": "ara"
      },
      {
       "k": 220,
       "yap": "yaz",
       "alan": "ara",
       "yazi": "Şahıs Ödemeleri Banka Hesabı Tanımlama",
       "hiz": 20
      },
      {
       "k": 225,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      },
      {
       "k": 226,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.3
      },
      {
       "k": 228,
       "yap": "tikla",
       "hedef": "yeni"
      },
      {
       "k": 236,
       "yap": "yaz",
       "alan": "iban",
       "yazi": "TR•• •••• •••• •••• •••• •••• ••",
       "hiz": 18
      },
      {
       "k": 240,
       "yap": "tikla",
       "hedef": "kaydet"
      },
      {
       "k": 240,
       "yap": "goster",
       "hedef": "ok",
       "dt": 0.3
      }
     ]
    },
    {
     "tip": "rozet",
     "k": 242,
     "x": 980,
     "y": 330,
     "e": "🚫",
     "yazi": "PTT SIRASI YOK",
     "renk": "k",
     "rot": -3
    },
    {
     "tip": "rozet",
     "k": 248,
     "x": 440,
     "y": 840,
     "e": "💸",
     "yazi": "DOĞRUDAN HESABINA",
     "renk": "g",
     "rot": 2
    }
   ]
  },
  {
   "k": 252,
   "adim": 5,
   "baslik": [
    "5. ADIM",
    "B PLANI"
   ],
   "mimik": [
    [
     252,
     "dusunceli",
     "dusun"
    ],
    [
     256,
     "notr",
     "anlat"
    ],
    [
     271,
     "notr",
     "isaret"
    ],
    [
     279,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "liste",
     "k": 256,
     "x": 560,
     "y": 420,
     "ogeler": [
      {
       "e": "📮",
       "t": "PTT'ye aktarıldı → kimlikle PTT şubesi"
      },
      {
       "e": "📝",
       "t": "Kuruma döndü → SGK'ya dilekçe"
      }
     ],
     "alt": [
      256,
      271
     ]
    },
    {
     "tip": "ikon",
     "k": 265,
     "x": 300,
     "y": 700,
     "e": "🪪",
     "yazi": "Nüfus cüzdanı"
    },
    {
     "tip": "nesne",
     "k": 276,
     "x": 900,
     "y": 700,
     "ad": "belge",
     "yazi": "DİLEKÇE",
     "rot": 6,
     "firlat": "el"
    },
    {
     "tip": "rozet",
     "k": 279,
     "x": 540,
     "y": 880,
     "e": "✅",
     "yazi": "YENİDEN HESABINA",
     "renk": "g",
     "rot": -2
    }
   ]
  },
  {
   "k": 282,
   "baslik": [
    "HAKLARINI KORU",
    "ABONE OL"
   ],
   "mimik": [
    [
     282,
     "mutlu",
     "selam"
    ]
   ],
   "zipla": [
    287
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 282,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende unutulmuş ödeme çıktı mı? Kaç TL?",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 287,
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
 },
 "kapak": [
  {
   "yazi": "PARAN DEVLETE Mİ GİDİYOR?",
   "vurgu": "DEVLETE",
   "nesne": "💰"
  },
  {
   "yazi": "UNUTULAN PARAN VAR!",
   "vurgu": "PARAN",
   "nesne": "💸"
  },
  {
   "yazi": "5 ADIMDA GERİ AL",
   "vurgu": "5",
   "nesne": "🏦"
  }
 ]
};
