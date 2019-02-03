//@flow

// export type ProfileActionType =
//   {
//     type: 'SET_USERNAME',
//     payload: {
//       username: string,
//     },
//   };

export const SET_USERNAME = 'SET_USERNAME';

export const setUsername = (username: string) => ({
  type: 'SET_USERNAME',
  payload: username,
});
