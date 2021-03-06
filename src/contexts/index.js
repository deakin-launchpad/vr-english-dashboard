import React from 'react';
import PropTypes from 'prop-types';
import { LoginContext, LoginProvider } from './common/LoginContext';
import { LayoutContext, LayoutProvider } from './common/LayoutContext';

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider
};

export const ContextManager = (props) => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        {children}
      </LoginProvider>
    </LayoutProvider>
  );
};

ContextManager.propTypes = {
  children: PropTypes.node.isRequired
};
