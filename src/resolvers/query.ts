export const Query = {
  notes: async (parent: any, args: any, {models}: any) => {
    return await models.Note.find();
  },
  note: async (parent: any, args: any, {models}: any) => {
    return await models.Note.findById(args.id);
  }
}
