import Group from './model';
import { Chat } from '../chats';

export const createGroup = async (req, res) => {
  const {
    name,
    description,
    category
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: "Name must be provided." });
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: true, message: "Name must be of type string." });
  } else if (name.length < 5) {
    return res.status(400).json({ error: true, message: "Name must be at least 5 characters." })
  }

  if (!description) {
    return res.status(400).json({ error: true, message: "Description must be provided." });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: "Description must be of type string." });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "Description must be at least 10 characters."
    });
  }

  const group = new Group({ name, description });

  try {
    return res.status(201).json({ error: false, group: await group.save() });
  } catch(e) {
    return res.status(400).json({ error: true, message: 'Error when creating group.' });
  }
};

export const createGroupChat = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
    return res.status(400).json({ error: true, message: "A title must be provided." });
  } else if (typeof title !== 'string') {
    return res.status(400).json({ error: true, message: "Title must be of type string." });
  } else if (title.length < 5) {
    return res.status(400).json({
      error: true,
      message: "Title must be at least 5 characters."
    })
  }

  if (!description) {
    return res.status(400).json({ error: true, message: "A description must be provided." });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: "Description must be of type string." });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "Description must be at least 10 characters."
    })
  }

  if (!groupId) {
    return res.status(400).json({ error: true, message: "A Group ID must be provided." });
  }

  try {
    const { chat, group } = await Group.addChat(groupId, { title, description });
    return res.status(201).json({ error: false, chat, group });
  } catch(e) {
    return res.status(400).json({ error: true, message: 'Chat could not be created.' });
  }
}

export const getGroupChats = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'You must provide a group id.' });
  }

  try {
    return res.status(200).json({
      error: false,
      chats: await Chat.find({ group: groupId }).populate('group', 'name')
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Cannot find any chat(s).'})
  }
}
