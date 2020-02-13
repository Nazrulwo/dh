import React from 'react'
import { withTranslation } from 'react-i18next'

const Text = ({t}) => {
  return (
    <div>
      {t('text')}
    </div>
  )
}

export default withTranslation()(Text)
