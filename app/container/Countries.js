import React, {Component} from 'react';
import {
  Container,
  ListItem,
  Text,
  Left,
  Thumbnail,
  Body,
  Button,
} from 'native-base';
import {StyleSheet} from 'react-native';
export default class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWether: false,
      wether: {},
    };
  }

  onCapitalWeather = () => {
    this.setState({currentWether: true}, () => {
      fetch(
        `http://api.weatherstack.com/current?access_key=ea09a4dc259a8a2d3a5bf56fb1da2432&query=${this.props.country.capital}`,
      )
        .then((res) => res.json())
        .then((res) => {
          console.log('response', res);
          this.setState({wether: res});
        })
        .catch((e) => {
          console.warn('error', e);
        });
    });
  };
  render() {
    let {country} = this.props;
    let {wether} = this.state;
    return (
      <Container>
        <ListItem>
          <Text style={styles.header}>Capital</Text>
        </ListItem>
        <ListItem last>
          <Text>{country.capital}</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.header}>Population</Text>
        </ListItem>
        <ListItem last>
          <Text>{country.population}</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.header}>Lat Lng</Text>
        </ListItem>
        <ListItem last>
          {country.latlng &&
            country.latlng.map((i) => <Text style={styles.latlng}>{i}</Text>)}
        </ListItem>
        <ListItem thumbnail>
          <Left>
            <Thumbnail circular source={{uri: country.flag}} />
          </Left>
          <Body>
            <Text>{country.name}</Text>
          </Body>
        </ListItem>
        <ListItem>
          {this.state.currentWether ? (
            <Text style={styles.header}>Current Weather</Text>
          ) : (
            <Button onPress={this.onCapitalWeather} primary>
              <Text>Capital Weather</Text>
            </Button>
          )}
        </ListItem>
        {this.state.currentWether ? (
          <>
            <ListItem>
              <Text style={styles.header}>Temperature</Text>
            </ListItem>
            <ListItem>
              <Text>{wether.current && wether.current.temperature}</Text>
            </ListItem>
            <ListItem>
              <Text style={styles.header}>Weather Icons </Text>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                  circular
                  source={{
                    uri:
                      wether.current &&
                      wether.current.weather_icons &&
                      wether.current.weather_icons[0],
                  }}
                />
              </Left>
              <Body>
                <Text>
                  {wether.current &&
                    wether.current.weather_descriptions &&
                    wether.current.weather_descriptions[0]}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Text style={styles.header}>Wind Speed</Text>
            </ListItem>
            <ListItem>
              <Text>{wether.current && wether.current.wind_speed}</Text>
            </ListItem>
            <ListItem>
              <Text style={styles.header}>Precip</Text>
            </ListItem>
            <ListItem>
              <Text>{wether.current && wether.current.precip}</Text>
            </ListItem>
          </>
        ) : null}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
  },
  latlng: {
    marginHorizontal: 10,
  },
});
