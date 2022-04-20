import React, { useState, useEffect } from 'react';
import './App.css';
import NebulaMenu from './parts/NebulaMenu';
import TechChart from './parts/TechChart'

import vtest from './data/tech_test.json';
import v3_3_4 from './data/tech_3-3-4.json';

function App() {
  var [selectedTech, setSelectedTech] = useState(null);
  var [gameVersion, setGameVersion] = useState('v3_3_4');

  const versionData = {
    vtest: vtest,
    v3_3_4: v3_3_4
  };
  const gameVersions = Object.keys(versionData);

  // Filter random weird stellaris shizzle from the nodes
  var nodes = Object.entries(versionData[gameVersion]).filter(v => typeof v[1] === "object").map(v => {
    v[1]['id'] = v[0];
    return v[1];
  });

  // Filter and select the node tree if a Tech is selected
  var nodeSelection = nodes;
  if (selectedTech) nodeSelection = walkPrereqs(findTech(selectedTech, nodes));

  var links = [];
  var nodesWithLink = nodeSelection.filter(n => typeof n['prerequisites'] === 'object' && n['prerequisites'].length > 0);
  nodesWithLink.forEach(n => {
    n['prerequisites'].forEach(p => {
      links.push({ source: p, target: n['id'], value: 1 });
    });
  });

  function walkPrereqs(t, r = []) {
    r.push(t);
    if (Array.isArray(t.prerequisites)) {
      t.prerequisites.forEach(pid => {
        var p = findTech(pid);
        walkPrereqs(p, r);
      });
    }
    return r;
  }

  function findTech(n, h = nodes) {
    return h.find(obj => {
      return obj.id === n;
    });
  }

  return (
    <div className="App" id="root">
      <NebulaMenu
        techs={nodes}
        setSelectedTech={setSelectedTech}
        selectedTech={selectedTech}
        gameVersions={gameVersions}
        setGameVersion={setGameVersion}
      />
      <TechChart
        nodes={nodeSelection}
        links={links}
        setSelectedTech={setSelectedTech}
      />
    </div>
  );
}
export default App;