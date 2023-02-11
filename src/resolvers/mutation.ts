export const Mutation = {
  newNote: async (parent: any, args: any, {models}: any) => {
    return await models.Note.create({
      content: args.content,
      author: "You"
    })
  },
  deleteNote: async (parent: any, {id}: any, {models}: any) => {
    try {
      await models.Note.findByIdAndRemove({_id: id})
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
  updateNote: async (parent: any, {content, id}: any, {models}: any) => {
    try {
      return await models.Note.findByIdAndUpdate(
        {_id: id} ,
        {$set: {content: content}},
        {new: true}
      )
    } catch (e) {
      console.error(e)
    }
  },
}
