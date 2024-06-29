export const checkUser = (value) => {
  let userType: any = null;
  if (value.email === "admin@mail.com") {
    userType = "admin";
  } else {
    userType = "registrar";
  }
};
