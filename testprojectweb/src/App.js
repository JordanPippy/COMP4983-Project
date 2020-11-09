import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

/*
<div>
<Container>
    <Row>
        <Col>1</Col>
        <Col>2/Col>
        <Col>3/Col>
        <Col>4/Col>
        <Col>5/Col>
        <Col>6/Col>
        <Col>7/Col>
        <Col>8/Col>
        <Col>9/Col>
        <Col>10/Col>
    </Row>
    <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
    </Row>
</Container>
</div>
*/

function runQuery(query, props) {
    console.warn("using database <client side>");
    fetch('http://192.168.0.12:3000/CharactersID')
      .then(response => response.fileName)
      .then(CharactersID => this.setState({
          filenames: CharactersID,
      }))
}

//    <Col><img src="pic_trulli.jpg" alt="{this.props.}"></img></Col>

class HomepageRow extends React.Component {
    render() {
        return (
            <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
            </div>
        );
    }
}


class Home extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            files: [],
            index: 1,
        };
        //runQuery('CharactersID', props)
    }

    componentDidMount() {
        console.warn("mount?")
        fetch('http://192.168.0.12:3000/fileNames')
          .then(response => response.json())
          .then(res => {
              this.setState({files: res});
          });
    }

    render() {
        for (let i = 0; i < this.state.files.length; i++)
        {
            console.warn(this.state.files[i].fileName);
        }

        return (
            <div>
                <div>
                    <HomepageRow />
                </div>
                <div>
                    <h1>hello</h1>
                </div>
                <div>
                {this.state.filenames}
                </div>
            </div>
        );
    }
}

export default Home;
