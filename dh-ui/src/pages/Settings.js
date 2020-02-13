// @flow
import React, { Component, Link } from 'react';
import Username from '../components/Username/Username';
import SettingsList from '../components/List/SettingsList';

export const Settings = () => (
  <div className="settings react-grid-layout ">
    <Username />       
    <SettingsList />
</div>      
)
