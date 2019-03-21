export default ({ app }) => {
  const backendUrl = process.env.GRAPHQL_URI || 'http://localhost:4000'
  return {
    httpEndpoint: process.server ? backendUrl : '/api',
    httpLinkOptions: {
      credentials: 'same-origin'
    },
    credentials: true,
    tokenName: 'human-connection-token',
    persisting: false,
    websocketsOnly: false
  }
}
