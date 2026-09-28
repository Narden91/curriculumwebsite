import React from 'react';
import { Link } from 'react-router-dom';
import { heroData } from '../../data/heroData';
import { EmailIcon, ScholarIcon, OrcidIcon, GitHubIcon, LinkedInIcon } from '../icons';

const PROFILES = [
  { href: heroData.scholar, label: 'Google Scholar', Icon: ScholarIcon },
  { href: heroData.orcid, label: 'ORCID', Icon: OrcidIcon },
  { href: heroData.github, label: 'GitHub', Icon: GitHubIcon },
  { href: heroData.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
];

interface ProfileLinksProps {
  /** Prepend a link to the contact page. */
  withEmail?: boolean;
  className?: string;
}

/** Icon links to the academic profiles; one list for the hero and the footer. */
const ProfileLinks: React.FC<ProfileLinksProps> = ({ withEmail = false, className }) => (
  <ul className={className ? `profile-links ${className}` : 'profile-links'}>
    {withEmail && (
      <li>
        <Link to="/contact" aria-label="Email contact details" title="Email contact details">
          <EmailIcon />
        </Link>
      </li>
    )}
    {PROFILES.map(({ href, label, Icon }) => (
      <li key={label}>
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
          <Icon />
        </a>
      </li>
    ))}
  </ul>
);

export default ProfileLinks;
