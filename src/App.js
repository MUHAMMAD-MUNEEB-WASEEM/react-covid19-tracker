import React from 'react';

//importing components

import Cards from './components/Cards/cards';
import Charts from './components/Charts/charts';
import CountryPicker from './components/CountryPicker/countryPicker';

//importing css
import styles from './App.module.css';

import { fetchData } from './api/api';

//importing image
import covidImage from './images/covid.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
    console.log("country1 = ", data);
    console.log("country2 = ", country)
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={covidImage} alt="Covid-19 Pandemic"/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} /> 
      </div>
    );
  }
}

export default App;