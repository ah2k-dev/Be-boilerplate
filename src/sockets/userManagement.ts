
const onlineUsers: Map<string, string> = new Map();

export const addUser = (userId: string, socketId: string) => {
  onlineUsers.set(userId, socketId);
  console.log(`User added: ${userId} with socket ID ${socketId}`);
};

export const removeUserBySocketId = (socketId: string) => {
  for (const [userId, id] of onlineUsers) {
    if (id === socketId) {
      onlineUsers.delete(userId);
      console.log(`User removed: ${userId}`);
      break;
    }
  }
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.entries());
};
