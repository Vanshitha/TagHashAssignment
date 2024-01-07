import React, { useState } from 'react';
import PollStation from './components/PollStation';
import TrendAnalysis from './components/TrendAnalysis';
import Button  from '@mui/material/Button';

function App() {
  const [isPollStationOpen, setIsPollStationOpen] = useState(false);

  const openPollStation = () => {
    setIsPollStationOpen(true);
  };

  const closePollStation = () => {
    setIsPollStationOpen(false);
  };

  return (
    <div className="App">
      <Button style = {{marginBottom: '2vh'}} variant="contained" onClick={openPollStation}>Add Poll</Button>
      <PollStation open={isPollStationOpen} onClose={closePollStation} />
      <TrendAnalysis />
    </div>
  );
}

export default App;
