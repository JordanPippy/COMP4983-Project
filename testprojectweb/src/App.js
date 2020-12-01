import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { Button } from 'reactstrap';
import { Container, Row, Col, Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

//THIS IS THE CONNECTION FOR THE DATABASE. IT NEEDS TO BE CHANGED WHEN USING ON A DIFFERENT COMPUTER
const dbPath = 'de1tmi3t63foh7fa.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306';

/*
 * IconModal: Handles the onClick functionality of all the characters on screen.
 *            It is responsible for querying the database to get all of the information about the 
 *            clicked character, also for opening and closing itself.
*/
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

    //Below are database queries, they fetch all of the needed data from the back-end.
    getTitle() {
        console.warn("db req name: " + this.state.name);
        fetch(dbPath + '/Title/' + this.state.name)
          .then(response => response.json())
          .then(res => {this.setState({
              title: res[0].title,
          })});
    }

    getAbilities() {
        console.warn("db req abilities: " + this.state.name);
        fetch(dbPath + '/Ability/' + this.state.name)
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
        fetch(dbPath + '/Stats/' + this.state.name)
          .then(response => response.json())
          .then(res => {this.setState({
              stats: res[0],
          })});
    }
    //End Database queries.

    render() {
        this.state.image = this.props.image;
        this.state.name = this.props.name;
        this.state.open = this.props.open;

        //Since closing does a setState, it will re-render itself. That means that it "should" close.
        //This if statement makes the modal null so that it is not sitting on loads of data.
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

        //If modal is open, open the modal. *duh*
        if (this.state.open)
        {
            console.warn("STATE IS OPEN");
            //Checking if we have all the data, else get all the data.
            if (this.state.title != '' && this.state.q != null && this.state.stats != null)
            {
                //Renders the modal, I recommend you do NOT touch this part as it is a pain to get right.
                return (
                    <>
                    <Modal contentClassName="customModal" dialogClassName="customModal" scrollable={true} isOpen={this.state.open} fade="false"  toggle={() => this.setState({shouldClose: true})} onCloseModal={() => this.setState({shouldClose: true})}>
                    <ModalHeader className="champModal champModalHeader" toggle={() => this.setState({shouldClose: true})}>{this.state.name}<br/>{this.state.title}</ModalHeader>
                        <ModalBody className="champModal champModalBody">
                            <table>
                                <td>
                                    <center><img src={this.state.image} className="modalIcon"></img></center>
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
                                            <p>{this.state.stats.attackSpeed}</p>
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
                                        <p>{this.state.p.abilityCooldown}</p>
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
                                        <p>{this.state.q.abilityCooldown}</p>
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
                                        <p>{this.state.w.abilityCooldown}</p>
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
                                        <p>{this.state.e.abilityCooldown}</p>
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
                                        <p>{this.state.r.abilityCooldown}</p>
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
            //Data was missing, lets fetch it.
            else
            {
                //Small optimization here, will only fetch something once, and will not fetch things
                //that are already fetched.
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
                //Don't want to return anything if we are still gathering data. This will make the modal enter
                //"spin" state. It will keep returning null untill we have the data.
                return (
                    null
                );
            }
        }
        //Modal is closed.
        else
        {
            return (
                null
            );
        }
    }
}

/*
 * This handles all of the icons and the search-bar on the main page. 
 * It gets rendered from the "main" class, but this is the big bad boss man.
 */
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

        //method bindings.. Whatever that means.
        this.handleClick = this.handleClick.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
    }
    //This method is passed to IconModal, so it can tell us when it closed.
    handleModalChange() {
        this.setState({showModal: false});
    }

    //Gets the click information ready for the modal to open.
    handleClick(file) {
        this.setState({
            modalFile: file,
            modalName: file.substring(0, file.length - 6),
            showModal: true,
        });
    }

    //Embeds the image into an image tag.
    renderImage(file) {
        return (
            <img src={file} className="homepageIcon" onClick={() => this.handleClick(file)}></img>
        );
    }

    //This gets all of the images and titles into a Row Col setup and renders it.
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
        }
        items.push(<Row xs={3} md={6}>{tempItems}</Row>);

        //Little interesting thing here. The modal gets rendered whether or not it is open.
        //The difference is, the modal will be null. This is a little different than rendering it 
        //if and only if we have data.
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

//Official Main Class. (Unoffical does nothing class.)
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

    //fetch file paths from database on load.
    componentDidMount() {
        fetch(dbPath + '/fileNames')
          .then(response => response.json())
          .then(res => {
              this.setState({files: res});
          });
    }

    //handles updating the searchbar (pretty nifty ;))
    searchSpace(event) {
        let keyword = event.target.value;
        this.setState({search: keyword});
    }

    render() {
        if (!(this.state.files.length > 0))
            return null;

        //In all liklieness the first few times it renders, the HomepageHandler will be null.
        //Thats because it is pulling quite a bit of data from the database. It will display it whenever it
        //actually gets the data.
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

//I guess React needs this line apparently. It probably does something.
export default Home;
