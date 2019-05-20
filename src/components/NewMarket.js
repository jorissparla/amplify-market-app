import React from "react";
import { API, graphqlOperation } from "aws-amplify";

// prettier-ignore
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'
import { createMarket } from "../graphql/mutations";
import { UserContext } from "../App";

const NewMarket = () => {
  const tagsList = ["Arts", "Technology", "Crafts", "Sports", "Entertainment"];
  const [addMarketPlaceVisible, setVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const ctx = React.useContext(UserContext);

  async function handleAdd() {
    console.log(name);
    setVisible(false);
    const input = { name, owner: ctx.user.username, tags };
    try {
      const result = await API.graphql(graphqlOperation(createMarket, { input }));
      console.log(result);
    } catch (err) {
      Notification.error({
        title: "Error",
        message: `${err.message || " Error adding Market"}`
      });
    }
    setName("");
  }

  const handleFilterTags = query => {
    const options = tagsList
      .map(tag => ({ value: tag, label: tag }))
      .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()));
    console.log(options);
    setOptions(options);
  };
  return (
    <>
      <div className="market-header">
        <h1 className="market-tile">
          Create your Market place
          <Button type="text" icon="edit" className="market-title-button" onClick={() => setVisible(true)} />
        </h1>
      </div>
      <Dialog
        title="Create new Market"
        visible={addMarketPlaceVisible}
        onCancel={() => setVisible(false)}
        size="large"
        customClass="dialog"
      >
        <Dialog.Body>
          <Form labelPosition="top">
            <Form.Item label="Add Market Name">
              <Input placeholder="Market Name" trim={true} onChange={name => setName(name)} value={name} />
            </Form.Item>
            <Form.Item label="select Tags">
              <Select
                multiple={true}
                filterable={true}
                placeholder="Market Tags"
                onChange={selectedTags => setTags(selectedTags)}
                remoteMethod={handleFilterTags}
                remote={true}
              >
                {options.map(o => {
                  console.log(o);
                  return <Select.Option key={o.value} label={o.label} value={o.value} />;
                })}
              </Select>
            </Form.Item>
          </Form>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => setVisible(false)}>Cancel</Button>
          <Button onClick={handleAdd} type="primary">
            Save
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export default NewMarket;
