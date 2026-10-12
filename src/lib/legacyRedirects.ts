// ---------------------------------------------------------------------------
// Legacy WordPress URLs -> closest page on the current site (301).
//
// Applied in middleware (not next.config redirects) so that host, trailing
// slash and legacy mapping resolve in ONE hop. Previously
// https://mindwhiz.com/careers-at-mindwhiz/ took four hops:
//   non-www -> strip slash -> legacy -> final.
// Keys are lowercase, without a trailing slash.
// ---------------------------------------------------------------------------

export const legacyRedirects: Record<string, string> = {
  "/hr": "/services/hr-services",
  "/finance": "/services/finance-accounting",
  "/service": "/services/digital-marketing",
  "/construction-estimation": "/services/construction-estimation",
  "/it": "/services/it-helpdesk-24-7",
  "/construction": "/services/construction-estimation",
  "/construction-augmentation": "/services/construction-estimation",
  "/financial-services": "/services/finance-accounting",
  "/accounting-staff-augmentation-services": "/services/accounting-staff-augmentation",
  "/accounting-staff-augmentation": "/services/accounting-staff-augmentation",
  "/employee-lifecycle-management": "/services/hr-services",
  "/payroll-and-benefits-administration": "/services/hr-services",
  "/outsourced-hr-services-in-the-us": "/services/hr-services",
  "/cyber-security-staff-augmentation-services": "/services/cybersecurity-staff-augmentation",
  "/security-analyst": "/services/cybersecurity-staff-augmentation",
  "/cybersecurity-consultant": "/services/cybersecurity-monitoring",
  "/cyber-security-staff-augmentation-mindwhiz": "/services/cybersecurity-staff-augmentation",
  "/cybersecurity-talent-for-msps": "/services/cybersecurity-staff-augmentation",
  "/top-cloud-security-consulting": "/services/cloud-security-consulting",
  "/right-hr-outsourcing-partner-in-the-u-s": "/services/hr-services",
  "/vella-tech": "/samples/clients",
  "/inovatiqa-corporation": "/case-studies/inovatiqa",
  "/who-we-are": "/about",
  "/bpo-solutions-by-mindwhiz": "/web-services",
  "/contact-us": "/contact",
  "/careers-at-mindwhiz": "/careers",
  "/construction-estimation-services-in-the-usa": "/services/construction-estimation",
  "/it-consulting-firms": "/services/it-helpdesk-24-7",
  "/the-roi-of-staff-augmentation": "/blog/staff-augmentation-pros-and-cons",
  "/it-infrastructure-and-digital-marketing-growth": "/web-services",
  "/top-penetration-testing-providers-for-cybersecurity": "/blog",
  "/privacy-policy": "/privacy",
  "/best-cybersecurity-expert-company-mindwhiz": "/blog",
  "/cyber-security-staff-augmentation-2025": "/services/cybersecurity-staff-augmentation",
  "/how-cyber-security-staff-augmentation": "/services/cybersecurity-staff-augmentation",
  "/mindwhiz-makes-accounting-staff-augmentation": "/services/accounting-staff-augmentation",
  "/global-delivery-models-help-businesses": "/services/offshore-staff-augmentation",
};
