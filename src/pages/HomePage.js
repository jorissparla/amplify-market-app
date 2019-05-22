import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { searchMarkets } from "../graphql/queries";
import NewMarket from "../components/NewMarket";
import MarketList from "../components/MarketList";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearchChange = searchTerm => setSearchTerm(searchTerm);
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };
  const handleSearch = async event => {
    event.preventDefault();
    console.log(searchTerm);
    try {
      setIsSearching(true);
      const result = await API.graphql(
        graphqlOperation(searchMarkets, {
          filter: {
            or: [{ name: { match: searchTerm } }, { owner: { match: searchTerm } }, { tags: { match: searchTerm } }]
          },
          sort: {
            field: "createdAt",
            direction: "asc"
          }
        })
      );
      console.log(result);
      setSearchResults(result.data.searchMarkets.items);
      setIsSearching(false);
    } catch (error) {}
  };
  console.log("searchResults", searchResults);
  return (
    <>
      <NewMarket
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
        handleSearch={handleSearch}
        isSearching={isSearching}
      />
      <MarketList searchResults={searchResults} />
    </>
  );
};

export default HomePage;
