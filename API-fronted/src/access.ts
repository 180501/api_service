import  API  from './services/API-backend';
import InitialState = API.InitialState;

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState:InitialState | undefined) {
  const {loginUser} = initialState?? {};
  return {
    canUser: loginUser,
    canAdmin: loginUser && loginUser.userRole === 'admin',
  };
}
