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
  Tag,
  Upload,
  message
} from "antd";

import axios from "axios";
import { findIndex } from "lodash";
import "./App.css";
import { InboxOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content, Footer } = Layout;
const ButtonGroup = Button.Group;
const { TextArea } = Input;
const { Step } = Steps;
const { Text } = Typography;
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "/wind-server/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      months: [],
      iconLoading: false,
      visible: false
    };
  }

  componentDidMount() {}

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
    // const { months } = this.state;
    return (
      <Layout>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            {/* <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p> */}
          </Dragger>
        </Content>
        <Footer style={{ textAlign: "center" }}>PDF Comparison</Footer>
      </Layout>
    );
  }
}

export default App;
