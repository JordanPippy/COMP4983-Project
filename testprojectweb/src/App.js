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


class HomepageHandler extends React.Component {

    constructor(props) {
        super(props);
        let files = this.props.files;
        let index = 0;
        let length = this.props.files.length;
        this.state = {
            files: files,
            //index: index,
            length: length,
        };
    }

    renderImage(file) {
        //console.warn("IN RENDERIMAGE" + file);
        return (
            <img src={file} width="150px" height="150px"></img>
        );
    }


    render() {
        const items = [];
        var i;
        for (i = 0; i < this.state.length; i += 6)
        {
            if (i + 5 < this.state.length - (this.state.length % 6))
            {
                items.push( <Row>
                    <Col>{this.renderImage(this.state.files[i].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[i + 1].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[i + 2].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[i + 3].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[i + 4].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[i + 5].fileName)}</Col>
                </Row> );
            }
            else
            {

                const tempItems = [];
                for (let j = i; j < this.state.length; j++)
                {
                    tempItems.push(
                        <Col>{this.renderImage(this.state.files[j].fileName)}</Col>
                    );
                }
                items.push(<Row>{tempItems}</Row>);
                break;
            }
        }

        return (
            <div>
                {items}
            </div>
        );
    }
}

class HomepageRow extends React.Component {

    constructor(props) {
        super(props);
        let files = this.props.files;
        let index = this.props.index;

        this.state = {
            files: files,
            index: index,
        };
    }
    renderImage(file) {
        console.warn("IN RENDERIMAGE" + file);
        return (
            <img src={file} width="150px" height="150px"></img>
        );
    }

    render() {
        let index = this.state.index;
        return (
            <div>
            <Container className="themed-container" fluid={true}>
                <Row>

                    <Col>{this.renderImage(this.state.files[index].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[index + 1].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[index + 2].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[index + 3].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[index + 4].fileName)}</Col>

                    <Col>{this.renderImage(this.state.files[index + 5].fileName)}</Col>
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
            index: 0,
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
        if (!(this.state.files.length > 0))
            return null;

        return (
            <div>
                <Container className="themed-container" fluid={true}>
                <div>
                    <HomepageHandler files={this.state.files} />
                </div>
                </Container>
            </div>
        );
    }
}

export default Home;
