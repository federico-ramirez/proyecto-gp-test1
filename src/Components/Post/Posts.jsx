import Card from "../CardPost/CardPosts";

const Posts = ({ posts=[], navigate, changeVisibility }) => { 
  return (
    <div className=" w-full flex justify-center items-center gap-8 flex-wrap">
      {
        posts.map( post => {
          return <Card
            key={post._id}
            post={post}
            onClick={navigate}
            visibility={changeVisibility}
            />
        })
      }
    </div>  
  );
}

export default Posts;