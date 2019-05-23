import React, { useState, useEffect, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getMarket } from "../graphql/queries";
import { Loading, Tabs, Icon } from "element-react";
import { Link } from "react-router-dom";
import NewProduct from "../components/NewProduct";

const MarketPage = props => {
  const [market, setMarket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setisOwner] = useState(false);
  // const { user } = useContext(UserContext);
  const handleGetMarket = async () => {
    const input = {
      id: props.marketId
    };
    const result = await API.graphql(graphqlOperation(getMarket, input));
    setMarket(result.data.getMarket);
    setIsLoading(false);
    setisOwner(props.user.username === result.data.getMarket.owner);
  };
  useEffect(() => {
    handleGetMarket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(isOwner);
  return isLoading ? (
    <Loading fullscreen={true} />
  ) : (
    <>
      <Link className="link" to="/">
        Back to Markets List
      </Link>
      <span className="items-center pt-2">
        <h2 className="mb-mr">{market.name}</h2> - {market.owner}
      </span>
      <div className="items-center pt-2">
        <span style={{ color: "var(--lightSquidInk)", paddingBottom: "1em" }}>
          <Icon className="icon" name="date" />
          {market.createdAt}
        </span>
      </div>
      <Tabs type="border-card" value={isOwner ? "1" : "2"}>
        {isOwner && (
          <Tabs.Pane
            label={
              <>
                <Icon className="icon" name="plus" />
                Add Product
              </>
            }
            name="1"
          >
            <NewProduct />
          </Tabs.Pane>
        )}
        <Tabs.Pane
          label={
            <>
              <Icon className="icon" name="menu" />
              Products ({market.products.items.length})
            </>
          }
          name="2"
        >
          <div className="product-list">
            {market.products.items.map(product => (
              <div>1</div>
            ))}
          </div>
        </Tabs.Pane>
      </Tabs>
    </>
  );
};

export default MarketPage;
