import { HeroList } from '../../types/types';
import './postsListItem.css';

export function Post(props: HeroList) {
  return (
    <div className="post">
      <h2>{props.name}</h2>
    </div>
  );
}
