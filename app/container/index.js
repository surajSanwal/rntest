import React, {Component} from 'react';
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Grid,
  Col,
  List,
  ListItem,
  Row,
} from 'native-base';
import {Navigation} from 'react-native-navigation';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      countries: [],
    };
  }
  onCountryChange = (country) => {
    this.setState({
      country,
    });
  };

  onSubmit = () => {
    fetch(`https://restcountries.eu/rest/v2/name/${this.state.country}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('response', res);
        this.setState({countries: res});
      })
      .catch((e) => {
        console.warn('error', e);
      });
  };

  getInfo = (item) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Countries',
        passProps: {country: item},
        options: {
          topBar: {
            title: {
              text: item.name,
            },
          },
        },
      },
    });
  };
  render() {
    return (
      <Container>
        <Grid>
          <Row>
            <Col style={{padding: 20, margin: 10}}>
              <Form>
                <Item stackedLabel>
                  <Label>Enter country </Label>
                  <Input
                    value={this.state.country}
                    onChangeText={this.onCountryChange}
                  />
                </Item>
              </Form>
              <Button
                onPress={this.onSubmit}
                disabled={!this.state.country.length}
                primary={this.state.country.length}>
                <Text>Search</Text>
              </Button>
            </Col>
          </Row>
          <Row>
            <List
              dataArray={this.state.countries}
              renderRow={(item) => (
                <ListItem onPress={() => this.getInfo(item)}>
                  <Text>{item.name}</Text>
                </ListItem>
              )}
            />
          </Row>
        </Grid>
        {/* <Grid> */}

        {/* </Grid> */}
      </Container>
    );
  }
}
