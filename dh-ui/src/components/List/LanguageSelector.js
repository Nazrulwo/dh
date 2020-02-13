import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div>
      <select  onChange={changeLanguage}> 
        <option value="en" name="language">English</option>
        <option value="sw" name="language">Swedish</option>       
        <option value="de" name="language">Dutch</option>
        <option value="no" name="language">Norska</option>
      </select>
    </div>
  )
}

export default LanguageSelector