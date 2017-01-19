import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, Link, hashHistory, IndexRedirect } from 'react-router'
import OrgvueCanvas from "./orgvueCanvas/component.jsx"

const mountPoint = document.getElementById('app')

render( <OrgvueCanvas /> , mountPoint)