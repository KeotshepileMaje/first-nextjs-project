import classes from './comment-list.module.css';

function CommentList(props) {
  const {items} =props

  if (!items) {
    return <div>Loading...</div>
  }

  return (
    <ul className={classes.comments}>
      {items.map(
        (item)=> <li key={item.id}>{item.text}</li>
      )}
    </ul>
  );
}

export default CommentList;
