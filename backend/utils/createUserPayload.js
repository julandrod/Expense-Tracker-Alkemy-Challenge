const createUserPayload = (user) => {
  return { userId: user.id, name: user.name, email: user.email };
};

export default createUserPayload;
