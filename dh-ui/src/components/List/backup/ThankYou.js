import React from 'react'
import { withTranslation } from 'react-i18next'

const ThankYou = ({t}) => {
  return (
    <div>
      {t('thankyou')}
    </div>
  )
}

export default withTranslation()(ThankYou)