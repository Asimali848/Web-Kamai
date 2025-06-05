import CAAA from "@/assets/img/H_M_W/caaa.svg";
import PLJ from "@/assets/img/H_M_W/plj.svg";
import SOA from "@/assets/img/H_M_W/soa.svg";
import TPI from "@/assets/img/H_M_W/tpi.svg";
import Boy1 from "@/assets/img/Testemonial/boy1.svg";
import Boy2 from "@/assets/img/Testemonial/boy2.svg";
import CEO from "@/assets/img/Testemonial/ceo.svg";

export const features = [
  {
    id: 1,
    feature: "AI Personalization",
    mathology: "Yes",
    khan_academy: "No",
    mathletics: "Partial",
    white_rose_math: "No",
  },
  {
    id: 2,
    feature: "Step-By-Step Feedback",
    mathology: "Yes",
    khan_academy: "No",
    mathletics: "Limited",
    white_rose_math: "No",
  },
  {
    id: 3,
    feature: "Gamification & Rewards",
    mathology: "Yes",
    khan_academy: "No",
    mathletics: "Yes",
    white_rose_math: "No",
  },
  {
    id: 4,
    feature: "VR/AR Integration",
    mathology: "Yes",
    khan_academy: "No",
    mathletics: "No",
    white_rose_math: "No",
  },
  {
    id: 5,
    feature: "Teacher Support Dashboard",
    mathology: "Yes",
    khan_academy: "Yes",
    mathletics: "No",
    white_rose_math: "Yes",
  },
  {
    id: 6,
    feature: "Global Curriculum Alignment",
    mathology: "Yes",
    khan_academy: "No",
    mathletics: "Partial",
    white_rose_math: "Yes",
  },
];

export const faqlist = [
  {
    id: 1,
    title: "What is Mathology?",
    description:
      "Mathology is an AI-powered EdTech platform designed to personalize math learning for K-12 students. It combines adaptive learning, gamification, and real-world applications to bridge knowledge gaps.",
  },
  {
    id: 2,
    title: "How does Mathology personalize learning?",
    description:
      "Our AI analyzes each student's performance in real-time, adjusting the difficulty and content to match their unique strengths and weaknesses. This ensures a tailored learning path that evolves with their progress",
  },
  {
    id: 3,
    title: "What age or grade levels does Mathology support?",
    description:
      "Mathology is designed for K-12 students, covering all grade levels from kindergarten through 12th grade. The content adapts to suit varying developmental stages and academic requirements.",
  },
  {
    id: 4,
    title: "How does gamification enhance the learning experience?",
    description:
      "Gamification elements like rewards, badges, and interactive challenges make learning engaging and fun. These features motivate students to practice consistently and celebrate their progress.",
  },
  {
    id: 5,
    title: "Is Mathology aligned with school curricula?",
    description:
      "Yes! Mathology's content is crafted to align with global K-12 curricula, ensuring it complements classroom learning and prepares students for standardized tests and academic success.",
  },
  {
    id: 6,
    title: "Can Mathology help students struggling with math?",
    description:
      "Absolutely. By identifying learning gaps and offering targeted practice, real-world examples, and adaptive challenges, Mathology builds foundational skills and boosts confidence in struggling learners.",
  },
];

export const mathologycards = [
  {
    img: SOA,
    step: "Step 01",
    title: "Student Onboarding & Assessment",
    desc: "Students take an initial diagnostic test to determine their current math proficiency.",
    direction: "up",
  },
  {
    img: PLJ,
    step: "Step 02",
    title: "Personalized Learning Journey",
    desc: "Based on assessment results, students receive interactive lessons tailored to their skill level.",
    direction: "down",
  },
  {
    img: CAAA,
    step: "Step 03",
    title: "Continuous Assessment & AI Adaptation",
    desc: "The system tracks student progress in real-time and adjusts content accordingly.",
    direction: "up",
  },
  {
    img: TPI,
    step: "Step 04",
    title: "Teacher & Parent Involvement",
    desc: "Teachers can access detailed reports and insights into student learning trends.",
    direction: "down",
  },
];

export const testimonials = [
  {
    text: "Mathology turned my daughter's math anxiety into excitement! She now loves practicing with fun challenges.",
    name: "Leslie Johnson",
    role: "Parent",
    image: CEO,
  },
  {
    text: "I used to hate math, but Mathology makes it feel like a game. Now, I enjoy solving real-world problems!",
    name: "Alex Carter",
    role: "Student",
    image: Boy1,
  },
  {
    text: "As a teacher, I love how it aligns with our curriculum while adapting to each student's learning pace.",
    name: "Maria Thompson",
    role: "Teacher",
    image: Boy2,
  },
  {
    text: "Mathology transformed tutoring for me. It helps target problem areas and celebrate student progress.",
    name: "James Miller",
    role: "Tutor",
    image: Boy1,
  },
  {
    text: "Mathology makes learning fun! It turns tricky math problems into exciting challenges I love solving.",
    name: "Sophia Lee",
    role: "Student",
    image: CEO,
  },
];

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  notifications: number;
};

export const dummyUsers: UserProfile[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    notifications: 3,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    notifications: 7,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    notifications: 2,
  },
  {
    id: "4",
    name: "Diana Ross",
    email: "diana@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    notifications: 9,
  },
  {
    id: "5",
    name: "Ethan Wright",
    email: "ethan@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    notifications: 5,
  },
];

export const createdProfiles: UserProfile[] = [
  {
    id: "101",
    name: "Frank Miller",
    email: "frank@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=6",
    notifications: 1,
  },
  {
    id: "102",
    name: "Grace Hopper",
    email: "grace@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=7",
    notifications: 4,
  },
  {
    id: "103",
    name: "Henry Ford",
    email: "henry@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=8",
    notifications: 8,
  },
  {
    id: "104",
    name: "Isla Fisher",
    email: "isla@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=9",
    notifications: 0,
  },
  {
    id: "105",
    name: "Jack Daniels",
    email: "jack@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=10",
    notifications: 6,
  },
];
