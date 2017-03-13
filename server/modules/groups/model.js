import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Group name must be 5 characters minimum."]
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Group description must be 10 characters minimum."]
  },
  category: {
    type: String
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
}, { timestamps: true });

// Create a chat and add it to the group's chats array.

GroupSchema.statics.addChat = async function(id, args) {
  const Chat = mongoose.model('Chat');

  // Add the group id to the chat group element.
  // This is the author of the chat.
  const chat = await new Chat({ ...args, group: id });

  // After we find (above) the chat group using the id from req.params,
  // we push the chat id onto the chats element.
  const group = await this.findByIdAndUpdate(id, { $push: { chats: chat.id } });

  return {
    chat: await chat.save(),
    group
  };
};

export default mongoose.model('Group', GroupSchema);
