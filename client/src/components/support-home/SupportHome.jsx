import "./SupportHome.css";
import EmergencyBanner from "./EmergencyBanner";
import LibrarySection from "./LibrarySection";
import SupportHeader from "./SupportHeader";
import SupportSidebar from "./SupportSidebar";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", active: true },
  { id: "mood", label: "Mood" },
  { id: "journal", label: "Journal" },
  { id: "resources", label: "Resources" },
  { id: "goals", label: "Goals" },
  { id: "insights", label: "Insights" },
  { id: "settings", label: "Settings" },
];

const librarySections = [
  {
    id: "quick",
    title: "Quick Support Library",
    items: [
      { id: 1, title: "Coping with Displacement Shock", time: "6 min read" },
      { id: 2, title: "Fast Grounding Strategies", time: "4 min read" },
      { id: 3, title: "Build a Safe Daily Routine", time: "5 min read" },
    ],
  },
  {
    id: "articles",
    title: "Articles",
    items: [
      { id: 4, title: "Understanding Your Stress Triggers", time: "7 min read" },
      { id: 5, title: "Restoring Safety After Trauma", time: "6 min read" },
      { id: 6, title: "Practical Self-Care Plans", time: "5 min read" },
    ],
  },
  {
    id: "videos",
    title: "Videos",
    items: [
      { id: 7, title: "Breathing Reset in 60 Seconds", time: "3 min watch" },
      { id: 8, title: "Body Scan for Calm", time: "5 min watch" },
      { id: 9, title: "Grounding with 5-4-3-2-1", time: "4 min watch" },
    ],
  },
  {
    id: "breathing",
    title: "Breathing Exercises",
    items: [
      { id: 10, title: "Box Breathing", time: "4 min" },
      { id: 11, title: "4-7-8 Breath", time: "3 min" },
      { id: 12, title: "Calm Wave Breathing", time: "5 min" },
    ],
  },
];

export default function SupportHome() {
  return (
    <div className="support-home-page">
      <div className="support-layout">
        <SupportSidebar items={sidebarItems} />

        <main className="support-main">
          <SupportHeader />
          <EmergencyBanner />
          <div className="library-stack">
            {librarySections.map((section) => (
              <LibrarySection key={section.id} title={section.title} items={section.items} />
            ))}
          </div>
        </main>
      </div>

      <button className="floating-action" type="button">Chat Now</button>
    </div>
  );
}
