import React from 'react';
import PropTypes from 'prop-types';

export const LayoutContext = React.createContext({
  loading: false,
  overlay: false,
  setLoading: () => {},
  setOverlay: () => {},
  setLoadingLayout: () => {},
});

export class LayoutProvider extends React.Component {
  state = {
    loading: false,
    overlay: false,
  };

  handleOverlayChange({ overlay }) {
    this.setState({ overlay });
  }

  handleLoadingChange(loading) {
    this.setState({ loading });
  }

  handleLoadingLayout(loading) {
    this.setState({ loading, overlay: loading });
  }

  render() {
    const { children } = this.props;
    return (
      <LayoutContext.Provider
        value={{
          overlay: this.state.overlay,
          loading: this.state.loading,
          setOverlay: (loading) => this.handleOverlayChange(loading),
          setLoading: (loading) => this.handleLoadingChange(loading),
          setLoadingLayout: (loading) => this.handleLoadingLayout(loading),
        }}
      >
        {children}
      </LayoutContext.Provider>
    );
  }
}

LayoutProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
