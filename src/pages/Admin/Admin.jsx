import { useState, useEffect } from "react";
import { useUserContext } from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { postServices } from '../../Services/Admin/Admin.services'
import Post from '../../Components/Post/Posts';
import Pagination from '../../Components/Pagination/Pagination';

const getUsername = () => localStorage.getItem("username");

export default function Admin() {

    const navigate = useNavigate();
    const { logout } = useUserContext();

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);
    const [recharge, setRecharge] = useState(false);
    const [query, setQuery] = useState('owned');

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                const filters = { limit: 8, page: page, query: query };
                const response = await postServices.getPosts(filters);

                setIsNextPageAvailable(response.isNextPageAvailable);
                if(!response.success){
                throw new Error('Something was wrong')
                }
                setPosts(response.items);
                setRecharge(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, [page, recharge, query]);

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    async function changeVisibility(id) {
      try {
          const response = await postServices.stateVisibilityPost(id);
          if(!response.success){
              throw new Error('Something was wrong')
          }
          setRecharge(true);
      } catch (error) {
          console.error(error);
      }
  }

  const changeAllPosts = (type) => {
      setQuery(type)
      setPage(0)
  }

    const createPost = () => {
      navigate("/post")
    }

    const navigateToPost = (id, active, username) => {
      if(active && username === getUsername()) navigate('/post/' + id)
    }

    const next = () => {
      if(isNextPageAvailable){
        setPage(page + 1);
      }
    }
    
    const prev = () => {
      if (page > 0){ 
        setPage(page - 1);
      }
    }

    return (
        <div className="w-full min-h-fullscreen flex flex-col bg-black">
        <nav className="pt-7 w-full h-16 text-3xl bg-black sticky top-0 left-0 flex justify-center items-center text-white font-oswald z-10"> 
            Users Posts
        </nav>
        
        <main className=" p-8 flex flex-col justify-center gap-8">
          
        <div className=" flex justify-center items-center bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">          
          <button onClick={logoutHandler} className="xl:mr-4 border-b-4 transition rounded border border-blue-500 duration-300 ease-in-out text-lg text-extrabold uppercase bg-blue-700 hover:bg-blue-900 py-2 px-4 text-gray-100">
              Log out
          </button>
          <button onClick={createPost} className="xl:mr-4 border-b-4 transition rounded border border-blue-500 duration-300 ease-in-out text-lg text-extrabold uppercase bg-blue-700 hover:bg-blue-900 py-2 px-4 text-gray-100">
              Create Post
          </button>
          <button onClick={()=> changeAllPosts('owned')} className="xl:mr-4 border-b-4 transition rounded border border-blue-500 duration-300 ease-in-out text-lg text-extrabold uppercase bg-blue-700 hover:bg-blue-900 py-2 px-4 text-gray-100">
              Admin Posts
          </button>
          <button onClick={()=> changeAllPosts('all')} className="xl:mr-4 border-b-4 transition rounded border border-blue-500 duration-300 ease-in-out text-lg text-extrabold uppercase bg-blue-700 hover:bg-blue-900 py-2 px-4 text-gray-100">
              All Posts
          </button>  
                       
        </div>
        <Pagination next={next} prev={prev}/> 
        <Post posts={posts} navigate={navigateToPost} changeVisibility={changeVisibility} />
        
        </main>      
        </div>

        
    )
}

