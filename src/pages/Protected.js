/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { useCurrentUser } from '../hooks/useCurrentUser';

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenitcated user
  const { isLoading, data, isAuthenticated } = useCurrentUser();

  // 2.If there is no authenticated user redirect to '/login'

  useEffect(() => {
    if (data?.role === false && !isLoading) navigate('/login');
  }, [data, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <Fullpage>
        <Spin />
      </Fullpage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
