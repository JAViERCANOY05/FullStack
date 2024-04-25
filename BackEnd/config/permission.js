// 1. Define Roles and Permissions (can be stored in MongoDB)
const roles = {
    user: {
      Product: ["readSelf", "create", "updateSelf", "deleteSelf"],
    },
    admin: {
      Product: ["manage"],
      User: ["manage"]
    },
  };
  
  module.exports = roles;
  
  