import sha1 from 'sha1';
import db from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const user = await db.users.find({ email });
    if (user) return res.status(400).send({ error: 'Already exist' });

    const hashedPassword = sha1(password);
    let newUser;
    try {
      newUser = await db.users.insert({ email, password: hashedPassword });
    } catch (error) {
      return res.status(500).send({ error: 'Error creating user' });
    }
    return res.status(201).send({ email: newUser.email, id: newUser._id });
  }
}

export default UsersController;
