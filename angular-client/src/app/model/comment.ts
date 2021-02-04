import { User } from './user';
import { Todo } from './todo';

export interface Comment {
    commentId: number;
    content: string;
    commentDate: Date;
    isEdit: Boolean;
    todo: Todo;
    user: User;
}
