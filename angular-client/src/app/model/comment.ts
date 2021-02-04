import { User } from './user';
import { Todo } from './todo';

export interface Comment {
    id: number;
    content: string;
    commentDate: Date;
    isEdit: Boolean;
    todo: Todo;
    user: User;
}
