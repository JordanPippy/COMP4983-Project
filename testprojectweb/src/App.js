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
            stats: null,
            shouldClose: false,
            fetched: false,
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
        console.warn("db req abilities: " + this.state.name);
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

    getStats() {
        console.warn("db req stats: " + this.state.name);
        fetch('http://192.168.0.12:3000/Stats/' + this.state.name)
          .then(response => response.json())
          .then(res => {this.setState({
              stats: res[0],
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
            this.state.fetched = false;

            this.state.title = '';
            this.state.p = null;
            this.state.q = null;
            this.state.w = null;
            this.state.e = null;
            this.state.r = null;
            this.state.stats = null;
            this.props.handleModalChange();
        }

        if (this.state.open)
        {
            console.warn("STATE IS OPEN");
            if (this.state.title != '' && this.state.q != null && this.state.stats != null)
            {
                console.warn("SHOULD BE RENDERING");
                return (
                    <>
                    <Modal contentClassName="customModal" dialogClassName="customModal" scrollable={true} isOpen={this.state.open} fade="false"  toggle={() => this.setState({shouldClose: true})} onCloseModal={() => this.setState({shouldClose: true})}>
                    <ModalHeader className="champModal champModalHeader" toggle={() => this.setState({shouldClose: true})}>{this.state.name}<br/>{this.state.title}</ModalHeader>
                        <ModalBody className="champModal champModalBody">
                            <table>
                                <td>
                                    <img src={this.state.image}></img>
                                </td>
                                <td>
                                    <tr>
                                        <th>HP</th>
                                        <th>HPR</th>
                                        <th>MP</th>
                                        <th>MPR</th>
                                        <th>MS</th>
                                        <th>AD</th>
                                        <th>AS</th>
                                        <th>RNG</th>
                                        <th>AR</th>
                                        <th>MR</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>{this.state.stats.HP}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.HPR}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.MP}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.MPR}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.MS}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.AD}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.AS}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.RNG}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.AR}</p>
                                        </td>
                                        <td>
                                            <p>{this.state.stats.MR}</p>
                                        </td>
                                    </tr>
                                </td>
                            </table>


                            <br/><br/>
                            <table>
                                <tr>
                                    <td>
                                        <h1>Passive</h1>
                                    </td>
                                    <td>
                                        <img src={this.state.p.abilityFile}></img>
                                        <p>{this.state.p.ability}</p>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <p>{this.state.p.abilityDescription}</p>
                                            </td>
                                            <td>
                                                <p>{this.state.p.abilityMath}</p>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1>Q</h1>
                                    </td>
                                    <td>
                                        <img src={this.state.q.abilityFile}></img>
                                        <p>{this.state.q.ability}</p>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <p>{this.state.q.abilityDescription}</p>
                                            </td>
                                            <td>
                                                <p>{this.state.q.abilityMath}</p>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1>W</h1>
                                    </td>
                                    <td>
                                        <img src={this.state.w.abilityFile}></img>
                                        <p>{this.state.w.ability}</p>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <p>{this.state.w.abilityDescription}</p>
                                            </td>
                                            <td>
                                                <p>{this.state.w.abilityMath}</p>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1>E</h1>
                                    </td>
                                    <td>
                                        <img src={this.state.e.abilityFile}></img>
                                        <p>{this.state.e.ability}</p>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <p>{this.state.e.abilityDescription}</p>
                                            </td>
                                            <td>
                                                <p>{this.state.e.abilityMath}</p>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1>R</h1>
                                    </td>
                                    <td>
                                        <img src={this.state.r.abilityFile}></img>
                                        <p>{this.state.r.ability}</p>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <p>{this.state.r.abilityDescription}</p>
                                            </td>
                                            <td>
                                                <p>{this.state.r.abilityMath}</p>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>

                            </table>
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
                console.warn("something was null, fetched = " + this.state.fetched);
                if (! this.state.fetched)
                {
                    this.state.fetched = true;
                    if (this.state.title == '')
                        this.getTitle();
                    if (this.state.q == null)
                        this.getAbilities();
                    if (this.state.stats == null)
                        this.getStats();
                }
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
            length: length,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
    }

    handleModalChange() {
        this.setState({showModal: false});
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
            let name1 = this.props.search;
            let name2 = this.state.files[i].fileName.substring(0, this.state.files[i].fileName.length - 6);
            if (name2.indexOf(name1) >= 0) {
                tempItems.push(
                    <Col><center><h2>{this.state.files[i].fileName.substring(0, this.state.files[i].fileName.length - 6)}</h2>{this.renderImage(this.state.files[i].fileName)}</center></Col>
                );
            }

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
                               handleModalChange={this.handleModalChange}
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
            search: '',
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

    searchSpace(event) {
        let keyword = event.target.value;
        this.setState({search: keyword});
    }

    render() {
        if (!(this.state.files.length > 0))
            return null;

        return (
            <div>
                <Container className="themed-container champ" fluid={true}>
                <div>
                <center>
                <input type="text" placeholder="Enter item to be searched" value={this.state.search} onChange={(e)=>this.searchSpace(e)} />
                </center>
                </div>
                <div>
                    <HomepageHandler files={this.state.files}
                                     search={this.state.search}
                    />
                </div>
                </Container>
            </div>
        );
    }
}

export default Home;
