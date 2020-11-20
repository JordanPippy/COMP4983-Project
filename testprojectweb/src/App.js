import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { Button } from 'reactstrap';
import { Container, Row, Col, Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


class IconModal extends React.Component {
    constructor(props) {
        super(props);
        console.warn("modal");
        this.state = {
            image: this.props.image,
            name: this.props.name,
            open: this.props.open,
            title: '',
            p: null,
            q: null,
            w: null,
            e: null,
            r: null,
            shouldClose: false,
        };
    }

    getTitle() {
        console.warn("db req name: " + this.state.name);
        fetch('http://192.168.0.12:3000/Title/' + this.state.name)
          .then(response => response.json())
          .then(res => {this.setState({
              title: res[0].title,
          })});
    }

    getAbilities() {
        fetch('http://192.168.0.12:3000/Ability/' + this.state.name)
          .then(response => response.json())
          .then(res => {this.setState({
              p: res[1],
              q: res[2],
              w: res[4],
              e: res[0],
              r: res[3],
          })});
    }


    render() {
        this.state.image = this.props.image;
        this.state.name = this.props.name;
        this.state.open = this.props.open;

        if (this.state.shouldClose)
        {
            this.state.open = false;
            this.state.shouldClose = false;
        }

        if (this.state.open)
        {
            if (this.state.title != '' && this.state.q != null)
            {
                console.warn("open: " + this.state.open);
                console.warn("my image is: " + this.state.image + "\nmy name is: " + this.state.name);
                console.warn("Title: " + this.state.title);
                return (
                    <>
                    <Modal scrollable={true} isOpen={this.state.open} fade="false"  toggle={() => this.setState({shouldClose: true})} onCloseModal={() => this.setState({shouldClose: true})}>
                    <ModalHeader className="champModal champModalHeader" toggle={() => this.setState({shouldClose: true})}>{this.state.name}<br/>{this.state.title}</ModalHeader>
                        <ModalBody className="champModal champModalBody">
                            <img src={this.state.image}></img>
                            <img src={this.state.p.abilityFile}></img>
                            <p>{this.state.p.ability}</p>
                            <p>ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                        </ModalBody>
                    <ModalFooter className="champModal champModalFooter">

                        <Button color="success" onClick={() => this.setState({shouldClose: true})}>Close</Button>
                    </ModalFooter>
                    </Modal>
                    </>
                );
            }
            else
            {
                this.getTitle();
                this.getAbilities();
                return (
                    null
                );
            }
        }
        else
        {
            this.state.title = '';
            return (
                null
            );
        }
    }
}


class HomepageHandler extends React.Component {

    constructor(props) {
        super(props);
        let files = this.props.files;
        let index = 0;
        let length = this.props.files.length;
        this.state = {
            files: files,
            modalFile: null,
            modalName: null,
            showModal: false,
            //index: index,
            length: length,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(file) {
        this.setState({
            modalFile: file,
            modalName: file.substring(0, file.length - 6),
            showModal: true,
        });
    }

    renderImage(file) {
        return (
            <img src={file} className="homepageIcon" onClick={() => this.handleClick(file)}></img>
        );
    }


    render() {
        const items = [];
        var tempItems = [];
        var i;
        for (i = 0; i < this.state.length; i++)
        {
            tempItems.push(
                <Col><center><h2>{this.state.files[i].fileName.substring(0, this.state.files[i].fileName.length - 6)}</h2></center>{this.renderImage(this.state.files[i].fileName)}</Col>
            );

            if (((i + 1) % 6 == 0 || i == this.state.length - 1) && i != 0)
            {
                items.push(<Row>{tempItems}</Row>);
                tempItems = [];
            }
        }

        return (
            <div>
                <div>
                    <IconModal image={this.state.modalFile}
                               name={this.state.modalName}
                               open={this.state.showModal}
                    />
                </div>

                <div>
                    {items}
                </div>
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
                <Container className="themed-container champ" fluid={true}>
                <div>
                    <HomepageHandler files={this.state.files} />
                </div>
                </Container>
            </div>
        );
    }
}

export default Home;
