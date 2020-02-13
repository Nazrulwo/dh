import React from 'react'
import { useTranslation } from 'react-i18next'
import i18n from "./i18n";

export function translateCell(cell) {
  return (i18n.t(cell));
}
const Trans = (props) => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      {t(props.word)}
    </React.Fragment>
  )
}

export default Trans