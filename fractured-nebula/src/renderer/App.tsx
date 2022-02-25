import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import { TextField } from '@mui/material';
import { TechScreen } from './screens/TechScreen';

// const Hello = () => {
//   return (
//     <div>
//       <TextField
//         id="stellarisPath"
//         label="Path to stellaris folder"
//         variant="standard"
//         defaultValue="C:\Program Files (x86)\Steam\steamapps\common\Stellaris"
//       />
//     </div>
//   );
// };

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TechScreen dataPath="C:\Program Files (x86)\Steam\steamapps\common\Stellaris" />} />
      </Routes>
    </Router>
  );
}
