/* ==========================================
   RESUME INSTANT VIEWER & PDF DOWNLOAD MODAL
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.trigger-resume-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  const downloadBtn = document.getElementById('resume-download-btn');

  if (!modal) return;

  function openResume() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  window.openResumeModal = openResume;

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openResume();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResume();
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Simulate Resume PDF Download
      const content = `
HARSH TIWARI - AI-Powered Growth Marketing Manager & SEO Specialist
Email: harshtiwari163@gmail.com | Phone: +91 8840180847 | Location: Ghaziabad, India
LinkedIn: linkedin.com/in/er-harsh-tiwari

==================================================
PROFESSIONAL SUMMARY
==================================================
Performance-driven Search Engine Optimization Specialist with 6+ years of hands-on expertise scaling organic and inorganic performance across high-volume SaaS, B2B technology products, and complex multi-vertical content ecosystems. Proven track record of managing a $100k marketing budget to lead end-to-end technical SEO governance, AI-assisted automated workflows (n8n), and modern search strategies (GEO, AEO, AI Overviews).

==================================================
KEY HIGHLIGHTS & IMPACT
==================================================
• $2.1M Organic Qualified Pipeline across 2 Business Units at HyTech Professionals
• 67% YoY Organic Traffic Growth & 53% Organic Lead Contribution Share
• 12 New Software Products Launched with Immediate Indexation & Ranking
• Restructured 25 Landing Pages into High-Intent Benefit Modules (+310s Dwell Time)
• Honored with prestigious Individual Excellence Award (2025-2026)

==================================================
WORK EXPERIENCE
==================================================
1. SEO Specialist / Growth Lead | HyTech Professionals India Pvt. Ltd. (Apr 2023 – May 2026)
• Engineered B2B organic search strategy driving $2.1M pipeline.
• Scaled organic traffic by 67% and managed $100K marketing budget.
• Integrated Salesforce Agentforce, n8n AI workflows, Apollo, and ZoomInfo intent sequences.

2. SEO Specialist | IziDigi Pvt. Ltd. (Nov 2020 – Apr 2023)
• Directed 6 concurrent multi-service client projects with 18 Digital Marketing Executives and 3 Team Leads.
• Achieved 50% YoY surge in organic traffic, leads, and conversions.

3. Digital Marketing Trainee | TechStack Pvt. Ltd. (Feb 2020 – Oct 2020)
• Formulated data tracking matrices via GA4 and GTM; executed multi-channel social campaigns.

==================================================
EDUCATION & CERTIFICATIONS
==================================================
• MBA (Marketing Major, Minor in HR) - PSIT Kanpur (2017 - 2019)
• B.Tech (Electrical & Electronics Engineering) - KIT Kanpur (2012 - 2016)
• Certifications: Semrush Management, Google Ads Certified, GA4 Certified, HubSpot Inbound Marketing.
      `.trim();

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Harsh_Tiwari_Resume.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.showToast) window.showToast('Downloaded Harsh Tiwari\'s Official Resume!');
    });
  }
});
