import type { TeamMember } from "@/types";

export const teamData: TeamMember[] = [
  {
    name: "Rajannya Das",
    role: "Founder & CEO",
    image: "/ceo.jpeg",
    mask: "/masks/shape-2.png", // Figure-8 organic squircle (Tile 1)
    color: "#3B22F2",
    imagePosition: "object-top",
  },
  {
    name: "Soushree Chakraborty",
    role: "Chief Research Officer",
    image: "/cro.jpeg",
    mask: "/masks/shape-2.png", // Arch dome (Tile 2)
    color: "#F59458",
    imagePosition: "object-top",
  },
  {
    name: "Aayush Singh",
    role: "Chief Operating Officer",
    image: "/aayush_singh.jpeg",
    mask: "/masks/shape-2.png", // Oval / Egg (Tile 3)
    color: "#F2E066",
    imagePosition: "object-center",
    imageScale: 1.65,
    transformOrigin: "72% 67%",
  },
  {
    name: "Sambit Bhattacharjee",
    role: "Researcher",
    image: "/sambit_bhattacharjee.jpeg",
    mask: "/masks/shape-2.png", // 3-lobed cloud wave (Tile 4)
    color: "#1FB1F8",
    imagePosition: "object-top",
  },
  {
    name: "Shreya Anand",
    role: "PR Manager",
    image: "/pr.jpeg",
    mask: "/masks/shape-2.png", // 4-petal blossom / organic clover (Tile 5)
    color: "#EC4899",
    imagePosition: "object-[50%_25%]",
  },
  {
    name: "Sourav Panja",
    role: "Video Editor",
    image: "/sourav_panja.jpg",
    mask: "/masks/shape-2.png",
    color: "#39C69C",
    imagePosition: "object-top",
  },
  {
    name: "Poushali Ray",
    role: "Marketer",
    image: "/poushali_ray.jpg",
    mask: "/masks/shape-2.png",
    color: "#A855F7",
    imagePosition: "object-center",
  },
  {
    name: "Ariona Talukdar",
    role: "Marketer",
    image: "/ariona_talukdar.jpg",
    mask: "/masks/shape-2.png",
    color: "#F43F5E",
    imagePosition: "object-center",
  },
];
