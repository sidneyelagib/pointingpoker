import React from 'react';
import { InputGroup, FormControl, Alert, Table, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const baseUrl = "http://www.amock.io/api/jraserver";
const pokerPoints = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100'];

class JIRASvc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            json: { fields: {}},
            jiraObj: {}    
        };
    }

    componentDidMount() {
        this.getReq();
        this.createJIRAObj();
    }

    render() {
        const {jiraObj} = this.state || "";
        const points = pokerPoints.map((item, idx) => 
            <ToggleButton value={item} variant="primary" key={idx} className="pokerBtn">{item}</ToggleButton>);
        return (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                        https://jira.atlassian.com/browse/
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue={jiraObj.number} />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                        Estimation
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue={jiraObj.estimation} />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                        Summary
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue={jiraObj.summary} />
                </InputGroup>
                <Alert variant="info"><b>{jiraObj.description}</b></Alert>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Estimation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sid</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </Table>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    username
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="username" aria-describedby="basic-addon3" defaultValue="Sid" />
                        </InputGroup>
                    </Form.Group>
                </Form>
                <ToggleButtonGroup type="radio" className="mb-2" name="pokerpoint">
                {points}
                </ToggleButtonGroup>
            </div>
        );
    }

    getReq = () => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        json: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }
 
    createJIRAObj = () => {
        const { json } = this.state;

        if (json === null) { return }
        const obj = {
            summary: json.fields.summary,
            description: json.fields.description,
            estimation: 5,
            number: json.key
        };

        this.setState({jiraObj: obj});
    };
}

export default JIRASvc;