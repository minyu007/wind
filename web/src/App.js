import React, { PureComponent } from "react";
import {
  Badge,
  Calendar,
  Divider,
  Typography,
  Layout,
  Icon,
  Button,
  Modal,
  Input,
  Steps,
  Alert,
  Timeline,
  List,
  Table,
  Tag
} from "antd";

// import { , Button } from 'antd';
// import moment from "moment";
import axios from "axios";
import { findIndex } from "lodash";

import "./App.css";

const { Title } = Typography;
const { Content, Footer } = Layout;
const ButtonGroup = Button.Group;
const { TextArea } = Input;
const { Step } = Steps;
const { Text } = Typography;

function onPanelChange(value, mode) {
  console.log(value, mode);
}

// function getMonthData(value) {
//   if (value.month() === 0) {
//     return 1394;
//   }
// }

const columns = [
  {
    title: "File Name",
    dataIndex: "fileName",
    key: "fileName"
  },
  {
    title: "Gender",
    dataIndex: "genderStr",
    key: "genderStr"
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (text, record) =>
      record.status == 2 ? (
        <a
          href={`http://10.169.168.37/urban-outfitters/download-excel-2?fileName=${record.path}`}
          target="_blank"
        >
          DownLoad
        </a>
      ) : (
        <span>Get excel in 1.5 hours...</span>
      )
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: text => <a>{text == 2 ? "done" : "in progress"}</a>
  },
  {
    title: "CreatedOn",
    dataIndex: "day",
    key: "day",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.day - b.day
  }
];

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      months: [],
      iconLoading: false,
      visible: false
    };
  }

  componentDidMount() {
    const _this = this;
    axios
      .get("/urban-outfitters/get-data-2")
      .then(function(response) {
        _this.setState({
          months: response.data.data,
          iconLoading:
            findIndex(response.data.data, { status: "1" }) != -1 ? true : false
        });
      })
      .catch(function(error) {
        _this.setState({
          months: []
        });
      })
      .finally(function() {});
  }

  onSelectMonth = (month, gender) => {
    // const month = value.month();
    window.open(
      `http://10.169.168.37/urban-outfitters/download-excel?month=${month}&gender=${gender}`,
      "_blank"
    );
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    const _this = this;
    axios
      .get("/urban-outfitters/gotoScrape")
      .then(function(response) {
        _this.setState({
          months: response.data.data,
          visible: false,
          iconLoading: true
        });
      })
      .catch(function(error) {
        _this.setState({
          months: [],
          visible: false,
          iconLoading: false
        });
      })
      .finally(function() {});
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      iconLoading: false
    });
  };

  render() {
    const { months } = this.state;
    return (
      <Layout>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
            <Divider orientation="left">
              <Title level={3}>
                Scraping Data and generating Excel by yourself
              </Title>
            </Divider>
            <Alert
              message="If the crawling process has been started it will takes 1.5 hours, please wait patiently and getting files later"
              type="error"
              style={{ margin: "16px 0" }}
            />
            <Button
              type="primary"
              onClick={this.showModal}
              loading={this.state.iconLoading}
            >
              {this.state.iconLoading ? "crawling" : "get started"}
            </Button>
            <Modal
              title="Scraping & Generating"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              keyboard={false}
              maskClosable={false}
              closable={false}
              width={500}
              okText="OK"
            >
              <Title level={3}>Press OK button to start</Title>
              <Alert
                message="If the process has been started 
                The entire crawling process will takes 1.5 hours, please wait patiently and getting files later"
                type="error"
              />
            </Modal>
            <Divider orientation="left">
              <Title level={3}>Excel List</Title>
            </Divider>
            <Table dataSource={months} columns={columns} pagination={false} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Scraping data from{" "}
          <a href="https://www.urbanoutfitters.com/" target="_blank">
            https://www.urbanoutfitters.com/
          </a>
        </Footer>
      </Layout>
    );
  }
}

export default App;
