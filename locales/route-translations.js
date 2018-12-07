const slug = require('slug')
const get = require('lodash/get')

module.exports = function() {
  const languages = {}
  const langKeys = ['en', 'de']

  langKeys.forEach(lang => {
    languages[lang] = require(`./${lang}.json`)
  })

  // console.log('languages', languages)

  /**
   * get and sluggify translation string for use in routing
   * @param {string} path
   */
  function translate(path) {
    return slug(get(languages, path).toLowerCase())
  }

  /**
   * build all path translations by template
   */
  // function buildTranslations(template) {
  //    const output = {}
  //    Object.keys(languages).forEach(l => {
  //
  //    })
  // }

  const routes = {
    'post/_slug/index': {
      en: `/${translate('en.post.name')}/:slug`,
      de: `/${translate('de.post.name')}/:slug`
    },
    'post/_slug/more-info': {
      en: `/${translate('en.post.name')}/:slug/${translate(
        'en.post.moreInfo.name'
      )}`,
      de: `/${translate('de.post.name')}/:slug/${translate(
        'de.post.moreInfo.name'
      )}`
    },
    'post/_slug/take-action': {
      en: `/${translate('en.post.name')}/:slug/${translate(
        'en.post.takeAction.name'
      )}`,
      de: `/${translate('de.post.name')}/:slug/${translate(
        'de.post.takeAction.name'
      )}`
    } /* ,
    'settings/_slug/index': {
      en: `/${translate('en.settings.name')}/:slug?`,
      de: `/${translate('de.settings.name')}/:slug?`
    } */ /*,
    'admin': {
      en: '/admin',
      de: '/systemverwaltung'
    },
    'admin*': {
      en: '/admin/:slug?',
      de: '/systemverwaltung/:slug?'
    } */
  }

  console.log(routes)

  return routes
}
