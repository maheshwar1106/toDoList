const AppReducer = (state, action) => {
  switch (action.type) {
    case "SignUp": {
      console.log(
        "SignUp page",
        action.id,
        action.details.userName,
        action.details.password
      );

      return {
        ...state,
        creds: [
          ...state.creds,
          {
            id: action.id,
            userName: action.details.userName,
            password: action.details.password,
          },
        ],
      };
    }
    case "LogIn": {
      console.log("LogIn page");
      console.log(action.user);
      return {
        ...state,
        currentUser: action.user,
      };
    }
  }
};

export default AppReducer;
