import { HeroList } from '../../types/types';
import './postsListItem.css';

export function Post(props: HeroList) {
  return <div className="post">{props.name}</div>;
}
