import "./HappeningNow.css";

const cards = [
  {
    title: "Free Researcher-Led Workshops",
    description:
      "Learn directly from the people advancing science. Free workshops held once or twice a month, where researchers and professionals mentor students in their fields, share practical skills, and offer insights into real-world research and career pathways.",
    action: "Join a workshop",
    className: "for-you-card--brands",
  },
  {
    title: "Interschool Fests",
    description:
      "Bringing young minds together to make a difference. We're creating opportunities for students across schools to connect, collaborate, and engage with cancer science, healthcare, and socially relevant challenges through interactive events and shared learning.",
    action: "Learn More",
    className: "for-you-card--institutions",
  },
  {
    title: "Live Expert Conversations",
    description:
      "The people shaping healthcare. The conversations that matter. We're bringing researchers, clinicians, and industry professionals together for live virtual seminars, webinars, and panel discussions exploring cancer care, scientific innovation, and the future of healthcare.",
    action: "Book a workshop",
    className: "for-you-card--teams",
  },
  {
    title: "Veterinary Care Packages",
    description:
      "Because compassion extends to every patient. We're working towards delivering thoughtfully curated care packages to pet families navigating veterinary cancer care, helping them access useful information and feel supported throughout their journey.",
    action: "Explore packages",
    className: "for-you-card--creatives",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function HappeningNowCard({
  card,
  index,
}: {
  card: (typeof cards)[number];
  index: number;
}) {
  return (
    <article
      className={`for-you-card ${card.className}`}
      style={{ zIndex: index + 1 }}
    >
      <div className="for-you-copy">
        <h2>{card.title}</h2>

        <p>{card.description}</p>
      </div>

      <div className="for-you-portrait">
        <a href={`#${card.title.toLowerCase().replaceAll(" ", "-")}`}>
          <span>{card.action}</span>

          <i>
            <Arrow />
          </i>
        </a>
      </div>
    </article>
  );
}

interface HappeningNowProps {
  isLightMode?: boolean;
}

export default function HappeningNow({ isLightMode = false }: HappeningNowProps) {
  return (
    <section
      className={`for-you ${isLightMode ? "light-mode" : ""}`}
      aria-labelledby="happening-now-title"
    >
      <h1 id="happening-now-title">Happening Now</h1>

      <div className="for-you-list">
        {cards.map((card, index) => (
          <HappeningNowCard
            card={card}
            index={index}
            key={card.title}
          />
        ))}

        <div className="for-you-spacer" aria-hidden="true" />
      </div>
    </section>
  );
}