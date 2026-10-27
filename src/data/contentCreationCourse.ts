export interface CoursePreviewVideo {
  id: string;
  title: string;
  duration: string;
}

export interface RoadmapStep {
  num: string;
  title: string;
  description: string;
  icon: "book" | "search" | "script" | "mic" | "live" | "camera" | "edit" | "accounts" | "upload" | "analytics";
  video?: CoursePreviewVideo;
}

export interface CourseModule {
  number: string;
  title: string;
  lessons: string[];
  preview?: CoursePreviewVideo;
}

export const CONTENT_CREATION_COURSE = {
  name: "Complete Telugu Content Creation Course",
  shortName: "Content Creation Course",
  price: 5000,
  originalPrice: 30000,
  duration: "20 Days",
  language: "Telugu",
  mode: "Live Online + Recordings",
  totalModules: 11,
  totalLessons: 73,
};

export const contentCreationRoadmap: RoadmapStep[] = [
  {
    num: "01",
    title: "Fundamentals",
    description: "Understand content creation, platforms, niches and the complete workflow.",
    icon: "book",
    video: {
      id: "MIKU_dgWis8",
      title: "Content Creation Fundamentals",
      duration: "0:28",
    },
  },
  {
    num: "02",
    title: "Research",
    description: "Find topics, customer problems, competitors and trending content ideas.",
    icon: "search",
    video: {
      id: "s5YqrafCRRU",
      title: "Data Collection and Research",
      duration: "0:51",
    },
  },
  {
    num: "03",
    title: "Scripting",
    description: "Write powerful hooks, main content and calls to action that retain viewers.",
    icon: "script",
    video: {
      id: "0yX2-Jc6V2w",
      title: "Video Script Writing for Beginners",
      duration: "0:44",
    },
  },
  {
    num: "04",
    title: "Voice Over",
    description: "Record clear, confident voice overs for reels and long videos.",
    icon: "mic",
    video: {
      id: "SXKPfrJsEac",
      title: "Content Creation Voice Over",
      duration: "0:30",
    },
  },
  {
    num: "05",
    title: "Live Talking",
    description: "Present naturally on camera, speak with confidence and hold attention.",
    icon: "live",
    video: {
      id: "Vyd0uVddGdM",
      title: "Live Talking in Content Creation",
      duration: "0:27",
    },
  },
  {
    num: "06",
    title: "Shooting",
    description: "Mobile camera settings, lighting, framing, angles and cinematic shots.",
    icon: "camera",
    video: {
      id: "FV9xMIHFe34",
      title: "Content Creation Mobile Shooting",
      duration: "0:28",
    },
  },
  {
    num: "07",
    title: "Editing",
    description: "Edit reels and long videos in CapCut with cuts, captions, music and effects.",
    icon: "edit",
    video: {
      id: "fFWOW038J10",
      title: "Video Editing for Beginners",
      duration: "0:32",
    },
  },
  {
    num: "08",
    title: "Account Creations",
    description: "Set up Instagram, Facebook and YouTube accounts professionally.",
    icon: "accounts",
    video: {
      id: "vw7d4tH_dvE",
      title: "Account Creation Guide for Content Creators",
      duration: "0:32",
    },
  },
  {
    num: "09",
    title: "Uploads",
    description: "Publish with the right titles, captions, hashtags, covers and schedule.",
    icon: "upload",
  },
  {
    num: "10",
    title: "Analytics",
    description: "Read Instagram analytics and improve reach, retention and performance.",
    icon: "analytics",
  },
];

export const contentCreationModules: CourseModule[] = [
  {
    number: "00",
    title: "Introduction to Content Creation",
    lessons: ["Introduction to Content Creation Course"],
  },
  {
    number: "01",
    title: "Content Creation Fundamentals",
    lessons: [
      "Lesson 1: What is Content Creation",
      "Lesson 2: Types of Content and Social Media Platforms",
      "Lesson 3: Choosing a Niche and Target Audience",
      "Lesson 4: The Complete Content Creation Workflow",
    ],
    preview: {
      id: "MIKU_dgWis8",
      title: "Content Creation Fundamentals",
      duration: "0:28",
    },
  },
  {
    number: "02",
    title: "Data Collection and Research",
    lessons: [
      "Lesson 1: Understanding the Business or Topic",
      "Lesson 2: Collecting Product and Service Details",
      "Lesson 3: Finding Customer Problems and Needs",
      "Lesson 4: Researching Competitors and Trending Content",
    ],
    preview: {
      id: "s5YqrafCRRU",
      title: "Data Collection and Research",
      duration: "0:51",
    },
  },
  {
    number: "03",
    title: "Scripting and Hook Writing",
    lessons: [
      "Lesson 1: Understanding the Purpose of a Video Script",
      "Lesson 2: Writing Powerful Hooks for the First Few Seconds",
      "Lesson 3: Identifying and Writing the Main Content",
      "Lesson 4: Adding Calls to Action (CTA)",
      "Lesson 5: Complete Script Writing: Hook, Main Content and CTA",
      "Lesson 6: Watching the Final Reel Output",
      "Lesson 7: AI Scripting",
      "Lesson 8: AI Hook Lines",
      "Lesson 9: AI Script Research",
    ],
    preview: {
      id: "0yX2-Jc6V2w",
      title: "Video Script Writing for Beginners",
      duration: "0:44",
    },
  },
  {
    number: "04",
    title: "Voice Over",
    lessons: [
      "Lesson 1: Voice Over Basics",
      "Lesson 2: Mic Setup and Recording",
      "Lesson 3: Voice Modulation and Tone",
      "Lesson 4: Recording a Reel Voice Over",
    ],
    preview: {
      id: "SXKPfrJsEac",
      title: "Content Creation Voice Over",
      duration: "0:30",
    },
  },
  {
    number: "05",
    title: "Live Talking and Presentation",
    lessons: ["Lesson 1: Live Talking"],
    preview: {
      id: "Vyd0uVddGdM",
      title: "Live Talking in Content Creation",
      duration: "0:27",
    },
  },
  {
    number: "06",
    title: "Mobile Shooting",
    lessons: [
      "Lesson 1: Camera Lenses and Holding the Phone",
      "Lesson 2: Camera Modes: Photo and Video",
      "Lesson 3: Grid Lines",
      "Lesson 4: Resolution",
      "Lesson 5: Frame Rate (FPS)",
      "Lesson 6: Focus",
      "Lesson 7: Exposure",
      "Lesson 8: Zoom Settings",
      "Lesson 9: Stand and Position",
      "Lesson 10: Using a Prompter",
      "Lesson 11: Understanding Lights",
      "Lesson 12: Green Screen Setup",
      "Lesson 13: Table Setup",
      "Lesson 14: Seating Position",
      "Lesson 15: Live Shoot",
      "Lesson 16: Introduction: Mobile Shoot Introduction",
      "Lesson 17: Front Moving Shot",
      "Lesson 18: Left-to-Right and Right-to-Left Shots",
      "Lesson 19: Moving Up and Down Shots",
      "Lesson 20: Reveal Shot",
      "Lesson 21: Pan Shots",
    ],
    preview: {
      id: "FV9xMIHFe34",
      title: "Content Creation Mobile Shooting",
      duration: "0:28",
    },
  },
  {
    number: "07",
    title: "Mobile Video Editing - CapCut",
    lessons: [
      "Lesson 1: CapCut Interface and Project Setup",
      "Lesson 2: Cutting, Timing and Speed",
      "Lesson 3: Text, Captions and Overlays",
      "Lesson 4: Music, Sound Effects and Mixing",
      "Lesson 5: Export Settings for Reels and YouTube",
    ],
    preview: {
      id: "fFWOW038J10",
      title: "Video Editing for Beginners",
      duration: "0:32",
    },
  },
  {
    number: "08",
    title: "Instagram, Facebook and YouTube Account Creation",
    lessons: [
      "Lesson 1: Instagram Account Creation",
      "Lesson 2: Understanding Professional Social Media Accounts",
      "Lesson 3: Creating an Instagram Profile Picture Using ChatGPT AI",
      "Lesson 4: Creating a Social Media Profile Picture",
      "Lesson 5: Writing an Instagram Bio",
      "Lesson 6: Choosing an Instagram Username",
      "Lesson 7: Switching to an Instagram Professional Account",
      "Lesson 8: Understanding the Instagram Dashboard",
      "Lesson 9: Creating a Facebook Account and Page",
      "Lesson 10: Switching Between Facebook Profile and Page",
      "Lesson 11: Introduction to Meta Business Suite",
      "Lesson 12: Connecting Facebook and Instagram to Meta Business Suite",
      "Lesson 13: Understanding Meta Business Suite Analytics",
      "Lesson 14: Creating a YouTube Channel",
      "Lesson 15: Writing a YouTube Channel Description",
    ],
    preview: {
      id: "vw7d4tH_dvE",
      title: "Account Creation Guide for Content Creators",
      duration: "0:32",
    },
  },
  {
    number: "09",
    title: "Uploading, Publishing and Managing Social Media Content",
    lessons: [
      "Lesson 1: How to Upload Videos on Social Media",
      "Lesson 2: Uploading Videos on Instagram",
      "Lesson 3: Writing Reel Titles, Captions and Hashtags",
      "Lesson 4: Creating and Adding a Reel Cover Photo",
      "Lesson 5: Using the Also Share On Option",
      "Lesson 6: How to Create Instagram Reel Collaborations",
      "Lesson 7: Scheduling Instagram Reels",
      "Lesson 8: Uploading Reels as YouTube Shorts",
      "Lesson 9: Managing Comments and Engagement",
    ],
  },
  {
    number: "10",
    title: "Analytics",
    lessons: ["Lesson 1: Understanding Instagram Reel Analytics"],
  },
];
