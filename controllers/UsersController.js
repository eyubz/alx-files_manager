import sha1 from 'sha1';
import db from '../utils/db';

class UsersController {
  static postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const user = db.users.find({ email });
    if (user) return res.status(400).send({ error: 'Already exist' });

    const hashedPassword = sha1(password);
    const newUser = db.users.insert({ email, password: hashedPassword });
    return res.status(201).send({ email: newUser.email, id: newUser._id });
  }
}

export default UsersController;
