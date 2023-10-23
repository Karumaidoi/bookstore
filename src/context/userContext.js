/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';
import supabase from '../services/supabase';
import { getUsers } from '../services/apiUsers';

const UserContext = createContext();

const initialState = {
  user: {},
  isLoading: false,
  error: '',
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'user/current':
      return { ...state, user: action.payload, isLoading: false, isAuthenticated: true };
    case 'error':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Something went wrong');
  }
}

function AppProvider({ children }) {
  const [{ user, isLoading }, dispatch] = useReducer(reducer, initialState);

  async function getUser() {
    dispatch({ type: 'loading' });

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return null;

      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw new Error(error.message);
      }

      const users = await getUsers();

      const currentUser = users.find(
        (user) => user?.email.toString().toLowerCase() === data?.user?.email.toLowerCase()
      );

      dispatch({ type: 'user/current', payload: currentUser });

      return currentUser;
    } catch (error) {
      dispatch({ type: 'error', payload: 'Something went wrong' });
      return error;
    }
  }

  return <UserContext.Provider value={{ user, isLoading, getUser, dispatch }}>{children}</UserContext.Provider>;
}

function useAppState() {
  const context = useContext(UserContext);
  console.log(context);

  if (context === undefined) throw new Error('Context used in a wrong Provider');
  return context;
}

export { AppProvider, useAppState };
