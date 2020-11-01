import React, { useState, useEffect} from 'react';
//importing daily data from api folder
import { fetchDailyData } from '../../api/api';

//importing css
import styles from './charts.module.css'

//import charts
import { Line, Bar, Pie} from 'react-chartjs-2';
const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState({});
  
    useEffect(() => {
      const fetchMyAPI = async () => {
        const initialDailyData = await fetchDailyData();
  
        setDailyData(initialDailyData);
      };
  
      fetchMyAPI();
    }, []);

    const lineChart = (
        dailyData.length
        ? (
            <Line 
            data={{
                labels: dailyData.map(({date})=>date),
                datasets: [{
                    data: dailyData.map(({ confirmed })=>confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,

                }, {
                    data: dailyData.map(({ deaths })=>deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,

                }],
            }}
        />):null

    );
    const barChart = (
        confirmed
        ? (
            <Bar 
                data ={{
                    labels: ["Infected", "Recovered", "Deaths"],
                    datasets: [{
                        label: 'People',
                        backgroundColor:[ 
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]

                }}
                options={{
                    legend: {display:false},
                    title:{ display:true, text:`Current Pandemic situation in ${country}`},
                }}
            
            />
        ) : null
    );

    const pieChart = (
        confirmed
        ? (
            <Pie 
                data ={{
                    labels: ["Infected", "Deaths", "Recoverd"],
                    datasets: [{
                        label: 'People',
                        backgroundColor:[ 
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                        ],
                        data:[confirmed.value, deaths.value, recovered.value]
                    }]

                }}
                options={{
                    legend: {display:false},
                    title:{ display:true, text:`Current Pandemic situation in ${country}`},
                }}
            
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
            {pieChart}
        </div>
    );
};
export default Charts;