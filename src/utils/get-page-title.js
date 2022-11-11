import defaultSettings from '@/settings'

const title = '夸克应用发布平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
    // return `${pageTitle}`
  }
  return `${title}`
}
