import { v4 as uuidv4 } from 'uuid';
import { ulid } from 'ulid';

export const UUIDGenerator = () => {
    const uuid = uuidv4();
    const ulidString = ulid(); // Use ulid directly for new ULID
    return ulidString;
};

