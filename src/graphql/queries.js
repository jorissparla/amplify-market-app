// eslint-disable
// this is an auto generated file. This will be overwritten

export const getMarket = `query GetMarket($id: ID!) {
  getMarket(id: $id) {
    id
    name
    products {
      items {
        id
        description
        price
        shipped
        owner
        createdAt
      }
      nextToken
    }
    tags
    owner
    createdAt
  }
}
`;
export const listMarkets = `query ListMarkets(
  $filter: ModelMarketFilterInput
  $limit: Int
  $nextToken: String
) {
  listMarkets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      products {
        nextToken
      }
      tags
      owner
      createdAt
    }
    nextToken
  }
}
`;
export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    description
    file {
      bucket
      region
      key
    }
    market {
      id
      name
      products {
        nextToken
      }
      tags
      owner
      createdAt
    }
    price
    shipped
    owner
    createdAt
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      file {
        bucket
        region
        key
      }
      market {
        id
        name
        tags
        owner
        createdAt
      }
      price
      shipped
      owner
      createdAt
    }
    nextToken
  }
}
`;
export const getuser = `query Getuser($id: ID!) {
  getuser(id: $id) {
    id
    username
    email
    registered
    orders {
      items {
        id
        createdAt
      }
      nextToken
    }
  }
}
`;
export const searchMarkets = `query SearchMarkets(
  $filter: SearchableMarketFilterInput
  $sort: SearchableMarketSortInput
  $limit: Int
  $nextToken: Int
) {
  searchMarkets(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      products {
        nextToken
      }
      tags
      owner
      createdAt
    }
    nextToken
  }
}
`;
