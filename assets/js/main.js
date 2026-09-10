// Upgrade the email shortcode's span to a mailto link. Runs before the tooltip
// init below, which throws when a site builds without the Bootstrap bundle.
document.querySelectorAll('span[data-email-user][data-email-domain]').forEach((el) => {
  const address = `${el.dataset.emailUser}@${el.dataset.emailDomain}`
  const link = document.createElement('a')
  link.href = `mailto:${address}`
  link.className = el.className
  link.textContent = address
  el.replaceWith(link)
})

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
