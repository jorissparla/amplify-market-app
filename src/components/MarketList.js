import React from "react";
import { Connect } from "aws-amplify-react";
import { graphqlOperation, API } from "aws-amplify";
import { Loading, Card, Icon, Tag } from "element-react";
import { Link } from "react-router-dom";
import { listMarkets } from "../graphql/queries";

const MarketList = () => {
  const [markets, setMarkets] = React.useState([]);
  const getMarkets = async () => {
    const results = await API.graphql(graphqlOperation(listMarkets));
    setMarkets(results.data.listMarkets.items);
  };
  React.useEffect(() => {
    getMarkets();
  }, []);

  if (markets.length === 0) {
    return <Loading fullscreen={true} />;
  }
  console.log(markets);
  return (
    <div>
      <h2 className="header">
        <img src="https://icon.now.sh/store_mall_directory/527FFF" className="large-icon" alt="store" />
        Markets
      </h2>
      {markets.map(market => (
        <div key={market.id} className="my-2">
          <Card
            bodyStyle={{
              padding: "0.7em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div>
              <span className="flex">
                <Link className="link" to={`/markets/${market.id}`}>
                  {market.name}
                </Link>
                <span style={{ color: "var(--darkAmazonOrange)" }}>
                  {market.products.items ? market.products.items.length : 0}
                </span>
                <img src="https://icon.now.sh/shopping_cart/f60" alt="Shopping Cart" />
              </span>
              <div style={{ color: "var(--darkSquidInk)" }}>{market.owner}</div>
            </div>
            <Tag type="primary">Piop</Tag>
            <div>
              {market.tags &&
                market.tags.map(tag => (
                  <Tag className="mx-1" type="danger">
                    {tag}
                  </Tag>
                ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MarketList;
