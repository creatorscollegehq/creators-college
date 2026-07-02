export interface VideoItem {
  id: string;
  title: string;
  url: string;
  type: "youtube" | "short" | "instagram" | "news";
  embedId?: string; // only for youtube videos to render iframe player
}

export const VIDEOS_DATA: VideoItem[] = [
  // 1. YouTube Full Videos
  {
    id: "yt-1",
    title: "Why Rolls Royce Car Is So Expensive? | In Telugu | Must Watch | Very Interesting Vide to Watch | CK",
    url: "https://youtu.be/Fm2ADJhwlmI",
    type: "youtube",
    embedId: "Fm2ADJhwlmI"
  },
  {
    id: "yt-2",
    title: "Best Home Interior WPC Wall Panels, PVC False Ceiling and Poly Granite Sheets Supplier in Hyderabad",
    url: "https://youtu.be/msazI7FAIhs",
    type: "youtube",
    embedId: "msazI7FAIhs"
  },
  {
    id: "yt-3",
    title: "ఇక్కడ  ఫ్యాక్టరీ రేటుకే 4999/-TV వస్తుంది ||Cheap and Best low price Smart TV Market||Kusum Ganji",
    url: "https://youtu.be/7ML8-syUcbk",
    type: "youtube",
    embedId: "7ML8-syUcbk"
  },
  {
    id: "yt-4",
    title: "Best Home Interior WPC Wall Panels, PVC False Ceiling and Poly Granite Sheets Supplier in Hyderabad",
    url: "https://youtu.be/vny1VIINYnM",
    type: "youtube",
    embedId: "vny1VIINYnM"
  },
  {
    id: "yt-5",
    title: "The Best Roadside Furniture Market In Miyapur | Cheap and Best | Must Visit Once part-2||Kusum Ganji",
    url: "https://youtu.be/SO2Tz0qsnBE",
    type: "youtube",
    embedId: "SO2Tz0qsnBE"
  },
  {
    id: "yt-6",
    title: "The Best Roadside Furniture Market In Miyapur| Cheap and Best | Must Visit Once Part-1|| Kusum Ganji",
    url: "https://youtu.be/2iNjXqVFQ8E",
    type: "youtube",
    embedId: "2iNjXqVFQ8E"
  },
  {
    id: "yt-7",
    title: "Budget Friendly Cinema Hall Setup at Home | Customized Home Theatre Setup in Telugu | HOME Theatres",
    url: "https://youtu.be/MayVJALkRxY",
    type: "youtube",
    embedId: "MayVJALkRxY"
  },
  {
    id: "yt-8",
    title: "Gas Stove Burners Starting at 2500/-Kitchen Products Online Available|Cookware collections||Ameerpet",
    url: "https://youtu.be/0JgjwQ4CVlk",
    type: "youtube",
    embedId: "0JgjwQ4CVlk"
  },
  {
    id: "yt-9",
    title: "Hyderabad's Largest Shopping Mall || Sarath City Capital Mall || AMB Cinemas || Telugu Tea Talks",
    url: "https://youtu.be/u3Ig2qJx2_Y",
    type: "youtube",
    embedId: "u3Ig2qJx2_Y"
  },
  {
    id: "yt-10",
    title: "AKSHAY GARMENTS | Shirts &Pants Manufacture & Wholesalers in Hyderabad | shirt starting from 180/-",
    url: "https://youtu.be/R54aIMkTv30",
    type: "youtube",
    embedId: "R54aIMkTv30"
  },

  // 2. YouTube Shorts
  {
    id: "sh-1",
    title: "Budget లో Stylish Furniture Combo set | Middle Class Homes Furniture | Telugu Tea Talks",
    url: "https://youtube.com/shorts/GBNC5pIpZ6c?feature=share",
    type: "short"
  },
  {
    id: "sh-2",
    title: "Luxury Steel Doors India | 100 Years Life | పెట్ఫ్ డోర్స్ ఫర్ మోడరన్ హోమ్స్ 🏠 | All India Service",
    url: "https://youtube.com/shorts/o6Hi3cKjXKM?feature=share",
    type: "short"
  },
  {
    id: "sh-3",
    title: "Modern Homes కి Low-Maintenance Iron Interiors | Ironcraft Interiors | Telugu Tea Talks",
    url: "https://youtube.com/shorts/nCJoLy5TIS0?feature=share",
    type: "short"
  },
  {
    id: "sh-4",
    title: "| Ganesh Laundry Equipments, Jeedimetla | 9390970161",
    url: "https://youtube.com/shorts/zeq_1gcYsEs?feature=share",
    type: "short"
  },
  {
    id: "sh-5",
    title: "Best Home Interior UPVC Marble & Granite Wall Sheets, Ceiling Panels, 3D Panels, Wallpapers & More",
    url: "https://youtube.com/shorts/vQ0WDjzdPr0?feature=share",
    type: "short"
  },
  {
    id: "sh-6",
    title: "32 Inches Tv @ just 9500/-Store: Sanyo TV’sContact @ 6303984850 & 7904782736||kusumganji",
    url: "https://youtube.com/shorts/Z0dyifnFJ64?feature=share",
    type: "short"
  },
  {
    id: "sh-7",
    title: "Furniture at Miyapur, Hyderabad #furniture #miyapur #teluguteatalks #hyderabad #telugu ||kusumganji",
    url: "https://youtube.com/shorts/5QZ5QwlYc7g?feature=share",
    type: "short"
  },
  {
    id: "sh-8",
    title: "No more cracks on walls! Get your home ready in 2 weeks with 4 in 1 Gypsum#house",
    url: "https://youtube.com/shorts/215m_SBIQzE?feature=share",
    type: "short"
  },
  {
    id: "sh-9",
    title: "Hyderabad లో Cheapest Pants 🏭 Factory Direct Wholesale | RS Garments Shop Owners Deal",
    url: "https://youtube.com/shorts/StVtu6ID64Y?feature=share",
    type: "short"
  },
  {
    id: "sh-10",
    title: "Laundry Business కి కావాల్సిన Machines & Support – Ganesh Laundry | Telugu Tea Talks",
    url: "https://youtube.com/shorts/z4DejZ5HWPc?feature=share",
    type: "short"
  },
  {
    id: "sh-11",
    title: "50000/- Rupees only Electric bike #teluguteatalks #hyderabad #telug",
    url: "https://youtube.com/shorts/156A-ctWgI0?feature=share",
    type: "short"
  },

  // 3. Instagram Reels
  {
    id: "ig-1",
    title: "Student Review: Scaling to 50K Followers",
    url: "https://www.instagram.com/reel/DMaP10uT4g-/?igsh=MTZ1ZzVjbGtibDE0Nw==",
    type: "instagram"
  },
  {
    id: "ig-2",
    title: "How to Pitch Sponsorship Deals to Local Brands",
    url: "https://www.instagram.com/reel/DMsZddaplU8/?igsh=MWxldGdwc25zcm54Zw==",
    type: "instagram"
  },
  {
    id: "ig-3",
    title: "Behind the Scenes of a Telugu Creator Bootcamp",
    url: "https://www.instagram.com/reel/DNxzYrr5r3n/?igsh=bjFnMWlkNjBybHZ1",
    type: "instagram"
  },
  {
    id: "ig-4",
    title: "The Ultimate Smartphone Camera Settings",
    url: "https://www.instagram.com/reel/DCjYzLSSSDy/?igsh=MXhoazBtOTd0dWcwNw==",
    type: "instagram"
  },
  {
    id: "ig-5",
    title: "Mobile Video Editing Pipeline Demo",
    url: "https://www.instagram.com/reel/C6L9x08xdDC/?igsh=bWZ3ampnbzNkNmRi",
    type: "instagram"
  },
  {
    id: "ig-6",
    title: "Why Hook Casing Matters in Shorts Titles",
    url: "https://www.instagram.com/reel/DKHeUSAxMYM/?igsh=MWx4NDR1dzA2NGJjcQ==",
    type: "instagram"
  },
  {
    id: "ig-7",
    title: "Client Case Study: Real Estate Reel Editing",
    url: "https://www.instagram.com/reel/DTnKJQ-ErEU/?igsh=dHRzOWVmaXo3Y2d6",
    type: "instagram"
  },
  {
    id: "ig-8",
    title: "Audience Retention Blueprint analysis",
    url: "https://www.instagram.com/reel/DTklU0mEv0M/?igsh=ZG83anZvejM4eWdx",
    type: "instagram"
  },
  {
    id: "ig-9",
    title: "Student Showcase: Viral Lifestyle Reel",
    url: "https://www.instagram.com/reel/DQ1fX48jzBf/?igsh=YXZ6bjV4Z2Vucnhv",
    type: "instagram"
  },
  {
    id: "ig-10",
    title: "Closing 3 Freelance Clients in 10 Days",
    url: "https://www.instagram.com/reel/DXJwJIazP2x/?igsh=cmUzOTViMDU4Yms2",
    type: "instagram"
  },
  {
    id: "ig-11",
    title: "CapCut Speed Ramping Tutorials",
    url: "https://www.instagram.com/reel/DWbZxaeTwuO/?igsh=MXRyY25meGR0bmpyaQ==",
    type: "instagram"
  },
  {
    id: "ig-12",
    title: "Sound Effects Placement Guidelines",
    url: "https://www.instagram.com/reel/DWY0_-HTnOZ/?igsh=MWRndTJzcHg3OGc3NQ==",
    type: "instagram"
  },

  // 4. News Reels & Campus Workshops
  {
    id: "ns-1",
    title: "Press Coverage: Creators College Hyderabad Launch",
    url: "https://www.instagram.com/reel/DX3V55TvmIb/?igsh=MWJwMHBlaGt0MHczOQ==",
    type: "news"
  },
  {
    id: "ns-2",
    title: "Media Workshop Coverage at KPHB Campus",
    url: "https://www.instagram.com/reel/DUIiKyfj65v/?igsh=cmo4a3A5dWU3cjU=",
    type: "news"
  },
  {
    id: "ns-3",
    title: "TV Interview: The Future of Telugu Content Creation",
    url: "https://www.instagram.com/reel/DUK0wEqj0ZZ/?igsh=a3JzcHg4Z2U1emNo",
    type: "news"
  },
  {
    id: "ns-4",
    title: "Workshop Highlights at JNTU Hyderabad Campus",
    url: "https://www.instagram.com/reel/DUniSLFD0XA/?igsh=MXI0d2pvOTZycWFvag==",
    type: "news"
  },
  {
    id: "ns-5",
    title: "Youth Summit: Empowering Students via Personal Brand",
    url: "https://www.instagram.com/reel/DU0pOOgj1EV/?igsh=cHp3NGcwb3FjbTdq",
    type: "news"
  },
  {
    id: "ns-6",
    title: "Interactive Classroom Bootcamps Snippet",
    url: "https://www.instagram.com/reel/DU22dWYj_jX/?igsh=MTFicGVjczBxZ3Buaw==",
    type: "news"
  },
  {
    id: "ns-7",
    title: "Student Interview: Landing Jobs in Advertising Studios",
    url: "https://www.instagram.com/reel/DVc8o-jEx55/?igsh=MXd2YXQ1emFybjNtdQ==",
    type: "news"
  },
  {
    id: "ns-8",
    title: "Panel Discussion: Smartphone Content Opportunities",
    url: "https://www.instagram.com/reel/DUQM5SaDzXy/?igsh=YWtydG9rMnUxeGRq",
    type: "news"
  },
  {
    id: "ns-9",
    title: "Special Guests at Creators College Academy",
    url: "https://www.instagram.com/reel/DXEufx-z8of/?igsh=c2pyZTFrNXc3c3Jv",
    type: "news"
  },
  {
    id: "ns-10",
    title: "Highlight Reel: 1,200 Alumni Milestone Event",
    url: "https://www.instagram.com/reel/DXwVxDxPl7c/?igsh=MTc2c3BxdDdwMTZnYg==",
    type: "news"
  },
  {
    id: "ns-11",
    title: "Press Feature: Skill Development Bootcamps",
    url: "https://www.instagram.com/reel/DUIIwyaj3TY/?igsh=czhqN3Rmc2hieTQ2",
    type: "news"
  }
];
