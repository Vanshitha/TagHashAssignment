import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';
import { format, parseISO } from 'date-fns'; // Import parseISO and format from date-fns
import Chart from 'chart.js/auto';


function TrendAnalysis() {
  const [votes, setVotes] = useState([]);
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  const [barData, setBarData] = useState({ labels: [], datasets: [] });

  // Fetch data for table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data');
        if (response.data && response.data.data) {
          setVotes(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Line Chart
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const responseTrue = await axios.get('http://localhost:4000/api/counts?voting_choice=true'); // GET 'true' vote count
        const responseFalse = await axios.get('http://localhost:4000/api/counts?voting_choice=false'); // GET 'false' vote count
  
        if (responseTrue.data && responseTrue.data.data && responseFalse.data && responseFalse.data.data) {

          const LabelsTrue = responseTrue.data.data.map((item) => {
            const date = new Date(item.casted_at);
            if (!isNaN(date.getTime())) {
              return format(date, 'yyyy-MM-dd'); // Format as 'YYYY-MM-DD'
            }
            return 'Invalid Date';
          });
  
          const LabelsFalse = responseFalse.data.data.map((item) => {
            const date = new Date(item.casted_at);
            if (!isNaN(date.getTime())) {
              return format(date, 'yyyy-MM-dd'); // Format as 'YYYY-MM-DD'
            }
            return 'Invalid Date';
          });
  
          const Labels = Array.from(new Set([...LabelsTrue, ...LabelsFalse])).sort();
          console.log(Labels)
  
          const datasets = [
            {
              label: 'True',
              data: responseTrue.data.data.map((item) => item.count),
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
            {
              label: 'False',
              data: responseFalse.data.data.map((item) => item.count),
              backgroundColor: 'rgba(255,99,132,0.6)',
            },
          ];
         
  
          setLineData({
            labels: Labels,
            datasets: datasets,
            options: {
              scales: {
                x: {
                  type: 'time',
                },
              },
            },
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchChartData();
  }, []);
  

  // Bar Chart
useEffect(() => {
  const fetchBarData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/results');
      if (response.data && response.data.data) {
        const data = response.data.data[0]; 
        setBarData({
          labels: ['True', 'False'],
          datasets: [
            {
              label: 'Votes',
              data: [data.true_count, data.false_count], // Use true_count and false_count from the response
              backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };
  fetchBarData();
}, []);



  return (
    <div>
      <TableContainer component={Paper} elevation={3} style={{marginBottom: '5vh'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Vote</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votes.map((vote) => (
              <TableRow key={vote.id}>
                <TableCell component="th" scope="row">
                  {vote.name}
                </TableCell>
                <TableCell align="right">{vote.voting_choice.toString()}</TableCell>
                <TableCell align="right">{format(parseISO(vote.casted_at), 'dd-MM-yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper elevation={3}>
      <Line style={{marginBottom: '5vh'}} data={lineData} />
      </Paper>
      <Paper elevation={3}>
      <Bar data={barData} />
      </Paper>
    </div>
  );
}

export default TrendAnalysis;



