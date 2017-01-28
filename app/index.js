import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRedirect } from 'react-router'
import AnimationCanvas from "./animationCanvas/component.jsx"

const mountPoint = document.getElementById('app')

render( <AnimationCanvas /> , mountPoint)