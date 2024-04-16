const PrivateRoute = ({ Component }: { Component: React.LazyExoticComponent<() => JSX.Element> }) => {
  return <Component />
}

export default PrivateRoute
