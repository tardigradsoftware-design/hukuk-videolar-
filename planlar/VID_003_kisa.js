// VID_003 kisa — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.
module.exports = {
 "adimSayisi": 0,
 "sahneler": [
  {
   "k": 0,
   "baslik": [
    "KREDİ ÇEKERKEN",
    "SİGORTA ZORUNLU DEĞİL"
   ],
   "mimik": [
    [
     0,
     "saskin",
     "isaret"
    ]
   ],
   "ogeler": [
    {
     "x": 360,
     "y": 425,
     "tip": "nesne",
     "k": 10,
     "ad": "kitap",
     "yazi": "YASA",
     "rot": 6,
     "firlat": "el"
    },
    {
     "x": 540,
     "y": 688,
     "tip": "ikon",
     "k": 0,
     "e": "🏦",
     "yazi": "BANKA",
     "rot": 5,
     "firlat": "el"
    },
    {
     "x": 190,
     "y": 688,
     "tip": "ikon",
     "k": 1,
     "e": "💳",
     "yazi": "KREDİ",
     "rot": -4
    }
   ]
  },
  {
   "k": 14,
   "baslik": [
    "BANKA MECBURİ",
    "GİBİ GÖSTERSE DE"
   ],
   "mimik": [
    [
     14,
     "notr",
     "anlat"
    ],
    [
     25,
     "korkmus",
     "eller_yukari"
    ],
    [
     27,
     "korkmus",
     "eller_yukari"
    ]
   ],
   "ogeler": [
    {
     "x": 360,
     "y": 425,
     "tip": "ikon",
     "k": 14,
     "e": "🏦",
     "yazi": "BANKA",
     "rot": 5
    },
    {
     "x": 540,
     "y": 688,
     "tip": "ikon",
     "k": 20,
     "e": "💳",
     "yazi": "KREDİ",
     "rot": -4
    },
    {
     "tip": "damga",
     "k": 27,
     "x": 360,
     "y": 435,
     "yazi": "✗ İPTAL",
     "rot": -8
    }
   ]
  },
  {
   "k": 34,
   "baslik": [
    "YORUMLARA",
    "\"SİGORTA\" YAZ"
   ],
   "mimik": [
    [
     34,
     "mutlu",
     "yukari"
    ],
    [
     43,
     "mutlu",
     "basparmak"
    ]
   ],
   "ogeler": [
    {
     "x": 360,
     "y": 425,
     "tip": "yorum",
     "k": 34,
     "k1": 45,
     "yazi": "SİGORTA",
     "yazK": 35,
     "hiz": 8
    },
    {
     "tip": "soru",
     "k": 45,
     "firlat": true,
     "x": 360,
     "y": 440,
     "e": "💬",
     "yazi": "'SİGORTA' yaz, rehber gelsin!",
     "ust": "YORUMLARA YAZ 👇"
    }
   ],
   "zipla": [
    35
   ]
  }
 ],
 "son": {
  "ifade": "mutlu",
  "jest": "selam",
  "uzat": 1.3
 }
};
