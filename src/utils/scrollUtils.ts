export const scrollToSectionWithOffset = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  const header = document.querySelector('.app-header') as HTMLElement | null;

  if (section) {
    if (header) {
      const headerOffset = header.offsetHeight;
      // Calculate position of the section relative to the document
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      // Fallback if header isn't found (e.g., during initial render or if class name changes)
      section.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    console.warn(`Scroll target section with id "${sectionId}" not found.`);
    // Optionally, alert the user or handle this case as per application requirements
    // alert(`Section "${sectionId}" not found.`);
  }
};
