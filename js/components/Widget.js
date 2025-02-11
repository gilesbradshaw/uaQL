// @flow

'use strict';

import React from 'react';
import Relay from 'react-relay';
import LocalizedText from './LocalizedText';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import Pipe from './Pipe';
import Valve from './svg/Valve';
import Pump from './svg/Pump';
import Mixer from './svg/Mixer';
import FlowMeter from './svg/FlowMeter';
import Tank from './svg/Tank';
import NewValve from './svg/NewValve';
import Temperature from './svg/Temperature';

import Level from './svg/Level';

import Component from './Component';
import Components from './Components';

import {Grid, Row, Col} from 'react-flexbox-grid/lib';


const MyComponents = Components(Component);




const sideStyle= {float:'left'};


const Widget = compose(

  createContainer(
    {
      fragments: {
        root: ()=> Relay.QL`
          fragment on UANode {
            serverNamespaces: browsePath(paths:["Objects", "Server", "NamespaceArray"]) {
              dataValue { 
                ... on UaStringArray {value}
              }
            } 
          }
        `,
        widgetviewer: () => Relay.QL`
          fragment on UANode {
            displayName {
              text
            }
            ${MyComponents.getFragment('viewer')}
          }
        `
      }
    }
  )

)(({widgetviewer, root})=>





      <svg  viewBox="0 0 600 400">

        <MyComponents viewer={widgetviewer}/>
      </svg>
      
        
);


/*

<svg viewBox="0 0 700 600"  width='600px'>
        <g stroke="#CCCCCC">
          <Tank/>
        </g>
        <g transform="translate(10,50), scale(1.5)">
          <Valve/>
        </g>

        <g transform="translate(520,360)">
          <Pump/>
        </g>

        <g transform="translate(200,30), scale(3)">
          <Mixer />
        </g>

        <g transform="translate(520,450), scale(.6)">
          <FlowMeter/>
        </g>

         <g transform="translate(250,200), scale(1.4)">
          <Temperature/>
        </g>
        <g transform="translate(150,200), scale(1.4)">
          <Level/>
        </g>


        <g transform="translate(440,350), scale(.7)">
          <NewValve/>
        </g>
    </svg>

*/

export default Widget;
