const addUser = async (user, socket) => {
    const index = global.onlineUsers.findIndex((user2) => {
      return user2.user == user;
    });
    if (index == -1) {
      global.onlineUsers.push({ user, socket, date: Date.now() });
    } else {
      global.onlineUsers[index].socket = socket;
    }
  };
  
  const removeUser = async (socket) => {
    const removedUser = global.onlineUsers.find((user) => {
      return user.socket == socket;
    });
    global.onlineUsers = global.onlineUsers.filter((user) => {
      return user.socket !== socket;
    });
    console.log("removed user", removedUser);
  };

  module.exports = {
    addUser,
    removeUser,
  }