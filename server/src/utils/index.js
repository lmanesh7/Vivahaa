export const generateTokenPayload = (user) => {
  const roles = user.roles.filter(role => !!role)
  return { UserInfo: { id: user._id , email: user.email, roles } }
}
