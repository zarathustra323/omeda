module.exports = async (promise) => {
  const results = await promise;
  return {
    ...results,
    edges: () => results.edges.map((edge) => ({ node: edge.node.data })),
  };
};
