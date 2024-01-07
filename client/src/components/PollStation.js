import React from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, Box, InputLabel, FormControl} from '@mui/material'

import axios from 'axios';

function PollStation({ open, onClose }) {
  const [name, setName] = React.useState('');
  const [vote, setVote] = React.useState(''); // Initialize vote state
  const [date, setDate] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/api/vote', {
        name,
        voting_choice: vote,
        casted_at: date,
      });
  
      console.log(response.data);
      onClose(); // Close the dialog after submission
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cast Your Vote</DialogTitle>
      <DialogContent style={{height: '23vh', width: '28vw'}}>
        <form onSubmit={handleSubmit}>
          <TextField required style={{ margin: '5px'}} label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FormControl required style={{ margin: '5px', width: '10vw'}}>
          <InputLabel id = 'vote-select'>Vote</InputLabel>
          <Select 
            id = 'vote-select'
            label= 'Vote'
            value={vote}
            onChange={(e) => setVote(e.target.value)}
          >
            <MenuItem value="True">True</MenuItem>
            <MenuItem value="False">False</MenuItem>  
          </Select>
          </FormControl>
          <Box>
          <TextField required style ={{margin: '5px', marginBottom: '10px'}} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Box>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PollStation;
