import React, { useState, useEffect } from 'react';
import './App.css';
import NebulaMenu from './parts/NebulaMenu';
import TechChart from './parts/TechChart'

import vtest from './data/tech_test.json';
import v3_3_4 from './data/tech_3-3-4.json';

function App() {
  var [selectedTech, setSelectedTech] = useState(0);
  var [gameVersion, setGameVersion] = useState('v3_3_4');

  const versionData = {
    vtest: vtest,
    v3_3_4: v3_3_4
  };
  const gameVersions = Object.keys(versionData);

  var nodes = Object.entries(versionData[gameVersion]).filter(v => typeof v[1] === "object").map(v => {
    v[1]['id'] = v[0];
    return v[1];
  });
  console.info(nodes);
  if (selectedTech) {
    console.info(selectedTech);
    var newNodes = [];
    var selectedNode = nodes.filter(obj => {
      return obj.id === selectedTech;
    })
    console.info(selectedNode[0]); // Working here!
  }

  var links = [];
  var nodesWithLink = nodes.filter(n => typeof n['prerequisites'] === 'object' && n['prerequisites'].length > 0);
  nodesWithLink.forEach(n => {
    n['prerequisites'].forEach(p => {
      links.push({ source: p, target: n['id'], value: 1 });
    });
  });

  return (
    <div className="App" id="root">
      <NebulaMenu
        techs={nodes}
        setSelectedTech={setSelectedTech}
        gameVersions={gameVersions}
        setGameVersion={setGameVersion}
      />
      <TechChart
        nodes={nodes}
        links={links}
      />
    </div>
  );
}
export default App;