export const Query = {
  notes: async (parent: any, args: any, {models}: any) => {
    return await models.Note.find();
  },
  note: async (parent: any, args: any, {models}: any) => {
    return await models.Note.findById(args.id);
  },
  user: async (parent: any, {userName}: any, {models}: any) => {
    return await models.User.findOne({userName});
  },
  users: async (parent: any, args: any, {models}: any) => {
    return await models.User.find({});
  },
  me: async (parent: any, args: any, {models, user}: any) => {
    return await models.User.findById(user.id);
  },
}
