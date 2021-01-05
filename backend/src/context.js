import jwt from 'jsonwebtoken';
import driver from './driver';

export default function context({ req }) {
    let token = req.headers.authorization || '';
    token = token.replace('Bearer ', '');
    const jwtSign = payload => jwt.sign(payload, process.env.JWT_SECRET);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { ...decoded, jwtSign, driver, auth: true };
    } catch (e) {
        return { jwtSign, driver,  auth: false };
    }
}
