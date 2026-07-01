export const register = (req, res) => {
  res.json({
    success: true,
    message: "Register controller working",
  });
};

export const login = (req, res) => {
  res.json({
    success: true,
    message: "Login controller working",
  });
};

export const logout = (req, res) => {
  res.json({
    success: true,
    message: "Logout controller working",
  });
};

export const getMe = (req, res) => {
  res.json({
    success: true,
    message: "GetMe controller working",
  });
};