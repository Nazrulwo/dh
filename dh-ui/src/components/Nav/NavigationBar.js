import React, {Component, Suspense} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import LanguageSelector from '../List/LanguageSelector'
import Trans from '../List/Trans'

export const NavigationBar = () => (
    <div style={{visibility:"hidden"}}>
        <Navbar expand="lg" className="nav-bar">  
        <div className="language">
             <LanguageSelector />
     
        </div>
                <Nav.Item><Nav.Link className="dash" href="/Dashboard"><Trans word={'myaccount'}/></Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link className="settings" href="/Settings"><Trans word={'settings'}/></Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link className="support" href="/Support"><Trans word={'support'}/></Nav.Link></Nav.Item>
        </Navbar> 
    </div>
)