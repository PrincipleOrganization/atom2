import React from 'react';
import { Card, CardHeader} from 'material-ui/Card';

import { API } from '../constants';

class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '',
      configuration: '',
      configurationVersion: ''
    }
  }

  componentDidMount() {
    let atomVersion = '';

    let self = this;
    API.getInfo()
      .then((response) => {
        atomVersion = response.data.version;

        return API.getPlatformInfo();
      })
      .then((response) => {
        self.setState({
          version: atomVersion,
          configuration: response.data.configuration,
          configurationVersion: response.data.configurationVersion
        });
      })
      .catch((error) => {
        self.setState({
          configuration: 'no information',
          configurationVersion: 'no information'
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <Card>
            <div className="card-body">
              <CardHeader
                title="information"
              />
              <br />


              <div>
                <h3>
                  Configuration
                </h3>

                <div>
                  <div className="information-table-col information-table-col1">
                    <p>
                      Name:
                    </p>
                    <p>
                      Version:
                    </p>
                  </div>

                  <div className="information-table-col information-table-col3">
                    <p>
                      {this.state.configuration}
                    </p>
                    <p>
                      {this.state.configurationVersion}
                    </p>
                  </div>
                </div>

                <h3>
                  Atom
                </h3>

                <div>
                  <div className="information-table-col information-table-col1">
                    <p>
                      Version:
                    </p>
                  </div>

                  <div className="information-table-col information-table-col3">
                    <p>
                      {this.state.version}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Info;
