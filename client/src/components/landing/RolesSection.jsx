import { t } from '../refugee-dashboard/translations';
import RoleCard from './RoleCard';

const roles = [
  {
    cardClass: 'refugee-card',
    circleClass: '',
    iconClass: 'fa-person-walking-luggage',
    title: 'Refugee / Asylum Seeker',
    description:
      'Find verified shelters, access digital ID, request aid, and reconnect with family members securely.',
    primaryAction: 'Create Account',
    primaryClass: 'blue-btn',
    type:"refugee"
  },
  {
    cardClass: 'ngo-card',
    circleClass: 'accent-circle',
    iconClass: 'fa-tent',
    title: 'NGO / Field Team',
    description:
      'Manage shelter capacity, coordinate aid logistics, verify identities, and track distribution metrics.',
    primaryAction: 'Register Organization',
    primaryClass: 'accent-btn',
    type:"ngo"
  },
  {
    cardClass: 'donor-card',
    circleClass: 'green-circle',
    iconClass: 'fa-hand-holding-heart',
    title: 'Donor / Sponsor',
    description:
      'Fund specific aid packages, track donation impact transparently, and support critical logistics.',
    primaryAction: 'Start Giving',
    primaryClass: 'green-btn',
    type:"donor"
  },
];

function RolesSection() {
  return (
    <section id="role_selection_grid" className="roles-section">
      <div className="section-header">
        <h2>Select your role to begin</h2>
        <p>Choose how you want to interact with the platform</p>
      </div>

      <div className="roles-grid">
        {roles.map((role) => (
          <RoleCard key={role.title} role={role}  />
        ))}
      </div>
    </section>
  );
}

export default RolesSection;
