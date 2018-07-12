'use strict';

import 'react';
import 'react-dom';

import { bake } from './shake';

import 'purecss';

import './main.scss';


import component from './component';

bake();

document.body.append(component());

