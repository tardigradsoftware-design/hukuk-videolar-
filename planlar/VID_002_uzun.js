// VID_002 uzun — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 5,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "ADINA ŞİRKET",
    "AÇILMASINI ENGELLE"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ],
    [
     26,
     "notr",
     "anlat"
    ],
    [
     26,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 520,
     "y": 560,
     "tip": "edevlet",
     "k": 29,
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
      29,
      32
     ],
     "rozetK": [
      33
     ]
    },
    {
     "x": 980,
     "y": 360,
     "tip": "ikon",
     "k": 0,
     "e": "🪪",
     "yazi": "KİMLİK",
     "rot": 5,
     "firlat": "el"
    },
    {
     "x": 980,
     "y": 700,
     "tip": "ikon",
     "k": 15,
     "e": "🏢",
     "yazi": "ŞİRKET",
     "rot": -4
    }
   ]
  },
  {
   "k": 43,
   "baslik": [
    "1. ADIM",
    "E-DEVLET'E GİRİŞ"
   ],
   "mimik": [
    [
     43,
     "notr",
     "anlat"
    ],
    [
     49,
     "emin",
     "anlat"
    ],
    [
     50,
     "notr",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 43,
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
      }
     },
     "akis": [
      {
       "k": 43,
       "yap": "yaz",
       "alan": "tc",
       "yazi": "•••••••••••",
       "hiz": 16
      },
      {
       "k": 44,
       "yap": "yaz",
       "alan": "sifre",
       "yazi": "••••••••",
       "hiz": 16
      },
      {
       "k": 45,
       "yap": "url",
       "yazi": "turkiye.gov.tr",
       "hiz": 16
      },
      {
       "k": 45,
       "yap": "tikla",
       "hedef": "giris",
       "dt": 0.25
      }
     ]
    },
    {
     "x": 980,
     "y": 330,
     "tip": "ikon",
     "k": 50,
     "e": "🪪",
     "yazi": "KİMLİK",
     "rot": 5
    }
   ],
   "adim": 1
  },
  {
   "k": 61,
   "baslik": [
    "2. ADIM",
    "MERSİS KISITLAMA"
   ],
   "mimik": [
    [
     61,
     "emin",
     "isaret"
    ],
    [
     67,
     "notr",
     "anlat"
    ],
    [
     75,
     "emin",
     "anlat"
    ],
    [
     91,
     "notr",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 63,
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
         "t": "Ortak Yetkili Kısıtlama",
         "s": "Ticaret Bakanlığı"
        }
       ]
      }
     },
     "akis": [
      {
       "k": 67,
       "yap": "ekran",
       "ad": "ara0"
      },
      {
       "k": 70,
       "yap": "yaz",
       "alan": "ara0",
       "yazi": "Ortak Yetkili Kısıtlama",
       "hiz": 15
      },
      {
       "k": 87,
       "yap": "tikla",
       "hedef": "r0",
       "dt": 0.2
      }
     ]
    }
   ],
   "adim": 2
  },
  {
   "k": 101,
   "baslik": [
    "3. ADIM",
    "İKİ KUTUCUĞU İŞARETLE"
   ],
   "mimik": [
    [
     101,
     "emin",
     "isaret"
    ],
    [
     107,
     "notr",
     "anlat"
    ],
    [
     114,
     "emin",
     "anlat"
    ],
    [
     126,
     "notr",
     "isaret"
    ],
    [
     141,
     "emin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 101,
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
         "t": "Yeni Başvuru"
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
       "k": 101,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 102,
       "yap": "vurgula",
       "hedef": "cb0"
      },
      {
       "k": 102,
       "yap": "tikla",
       "hedef": "cb0"
      },
      {
       "k": 103,
       "yap": "tikla",
       "hedef": "b0"
      },
      {
       "k": 103,
       "yap": "vurgula",
       "hedef": "cb1"
      },
      {
       "k": 103,
       "yap": "tikla",
       "hedef": "cb1"
      }
     ]
    },
    {
     "x": 980,
     "y": 330,
     "tip": "nesne",
     "k": 111,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6,
     "firlat": "el"
    }
   ],
   "adim": 3
  },
  {
   "k": 159,
   "baslik": [
    "4. ADIM",
    "ONAYLA VE KİLİTLE"
   ],
   "mimik": [
    [
     159,
     "notr",
     "anlat"
    ],
    [
     166,
     "emin",
     "anlat"
    ],
    [
     180,
     "notr",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 159,
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
         "t": "Başvuruyu Tamamla"
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
       "k": 159,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 160,
       "yap": "tikla",
       "hedef": "kaydet"
      },
      {
       "k": 160,
       "yap": "goster",
       "hedef": "ok",
       "dt": 0.3
      },
      {
       "k": 161,
       "yap": "tikla",
       "hedef": "b0"
      },
      {
       "k": 172,
       "yap": "vurgula",
       "hedef": "cb0"
      },
      {
       "k": 172,
       "yap": "tikla",
       "hedef": "cb0"
      },
      {
       "k": 173,
       "yap": "vurgula",
       "hedef": "cb1"
      },
      {
       "k": 173,
       "yap": "tikla",
       "hedef": "cb1"
      }
     ]
    },
    {
     "x": 980,
     "y": 330,
     "tip": "nesne",
     "k": 176,
     "ad": "belge",
     "yazi": "BAŞVURU",
     "rot": 6
    }
   ],
   "adim": 4
  },
  {
   "k": 203,
   "baslik": [
    "5. ADIM",
    "KENDİ ŞİRKETİNİ KURARKEN"
   ],
   "mimik": [
    [
     203,
     "dusunceli",
     "dusun"
    ],
    [
     217,
     "emin",
     "isaret"
    ],
    [
     232,
     "notr",
     "anlat"
    ]
   ],
   "ogeler": [
    {
     "tip": "portal",
     "k": 205,
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
         "t": "Kısıtlamayı Kaldır"
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
       "k": 224,
       "yap": "ekran",
       "ad": "form",
       "dt": 0.2
      },
      {
       "k": 226,
       "yap": "tikla",
       "hedef": "b0"
      }
     ]
    },
    {
     "x": 980,
     "y": 330,
     "tip": "ikon",
     "k": 207,
     "e": "🏢",
     "yazi": "ŞİRKET",
     "rot": 5
    }
   ],
   "adim": 5
  },
  {
   "k": 255,
   "baslik": [
    "HAKLARINI KORU",
    "TAKİPTE KAL"
   ],
   "mimik": [
    [
     255,
     "mutlu",
     "yukari"
    ],
    [
     260,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "tip": "soru",
     "k": 256,
     "firlat": true,
     "x": 560,
     "y": 450,
     "e": "💬",
     "yazi": "Sende de oldu mu? Yorumlara yaz",
     "ust": "YORUMLARA YAZ 👇"
    },
    {
     "tip": "rozet",
     "k": 260,
     "x": 560,
     "y": 650,
     "e": "🔔",
     "yazi": "ABONE OL",
     "renk": "k",
     "rot": -3
    }
   ],
   "zipla": [
    256
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
   "yazi": "ADINA ŞİRKET AÇILMIŞ!",
   "vurgu": "ŞİRKET",
   "nesne": "🏢"
  },
  {
   "yazi": "HACİZ GELMEDEN KİLİTLE",
   "vurgu": "KİLİTLE",
   "nesne": "🔒"
  },
  {
   "yazi": "TEK AYARLA KORUN",
   "vurgu": "KORUN",
   "nesne": "🪪"
  }
 ]
};
