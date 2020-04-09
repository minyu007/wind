import React, { PureComponent } from "react";
import {
  Spin,
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
  message,
  Card,
  Col,
  Row
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

let fileList = [];

const props = {
  name: "file",
  multiple: true,
  action: "/wind-server/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
      fileList = info.fileList.map(v => v.name);
      console.log(fileList);
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
      loading: false,
      visible: false,
      pdfs: ""
    };
  }

  componentDidMount() {}

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    const _this = this;
    if (!fileList.length) {
      this.setState({
        visible: false,
        loading: false
      });
      return;
    }
    axios
      .post("/wind-server/compare", { fileList })
      .then(function(response) {
        console.log(response);
        _this.setState({
          visible: false,
          loading: true,
          pdfs: response.data.data.map(v => v.text)
        });
      })
      .catch(function(error) {
        _this.setState({
          visible: false,
          loading: false
        });
      })
      .finally(function() {});
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      loading: false
    });
  };

  render() {
    const { pdfs } = this.state;
    return (
      <Layout>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
            <Divider orientation="left">
              <Title level={3}>
                please upload the PDFs you wanna to compare
              </Title>
            </Divider>
            <Button type="primary" onClick={this.showModal}>
              Upload
            </Button>
            <Modal
              title="PDF Files"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag PDF to this area to upload
                </p>
              </Dragger>
            </Modal>
            <Divider orientation="left">
              <Title level={3}>Results</Title>
            </Divider>
            <div className="site-card-wrapper">
              {this.loading ? (
                <div className="example">
                  <Spin />
                </div>
              ) : (
                <>
                  <Row gutter={16}></Row>
                  <Row gutter={16}>
                    {pdfs &&
                      pdfs.map((v, i) => (
                        <Col span={8}>
                          <Card title={`PDF${i}`} bordered={false}>
                            <div> {v}</div>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </>
              )}
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>PDF Comparison</Footer>
      </Layout>
    );
  }
}

export default App;
