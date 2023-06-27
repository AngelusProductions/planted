require('dotenv').config();
const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const fs = require('fs');
const resolvers = require('../resolvers');
const jwt = require('jsonwebtoken');
const btoa = require("btoa");

const schema = fs.readFileSync('./config/schema.graphql');
const typeDefs = gql`
  ${schema}
`;

const token = jwt.sign({}, process.env.SECRET_KEY, { algorithm: 'HS256' });

const context = ({ req, res }) => {
  const currentUser = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    const whitelist = ['authGoogle', 'IntrospectionQuery', 'plantTypes', 'plantType'];  
    let isWhitelisted = req.body.query === '';
    if (!isWhitelisted) {
      for (let i in whitelist) {
        isWhitelisted = req.body.query.includes(whitelist[i]);
        if (isWhitelisted) break;
      }
    }
    if (err && !isWhitelisted) {
      throw new AuthenticationError('Unauthorized');
    }
    return decoded;
  });
  return { req, res, currentUser };
};

const onConnect = async connectionParams => true;

const isIntrospectionOn =
  process.env.NODE_ENV !== 'production' ||
  (process.env.NODE_ENV === 'production' && process.env.IS_INTROSPECTION_ON === 'true');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: isIntrospectionOn,
  playground: isIntrospectionOn,
  subscriptions: { onConnect },
});

module.exports = server;
