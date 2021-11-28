import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../Contexts/UserContext'
import { FaSignOutAlt, FaHome } from "react-icons/fa";
import { allPostServices } from "../../Services/Users/Users.services";
import { postServices } from "../../Services/Admin/Admin.services"
import FavoritePost from "../../Components/FavoritePosts/FavoritePost";
import { handleFavorite, handleLike } from "../../Services/Helpers/helper";
import logo from '../../assets/img/Programigos.png'

const Favorites = () => {
    const navigate = useNavigate()
    const { logout } = useUserContext()

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchFavoritePosts = async () => {
            try {
                const response = await allPostServices.getFavorites()
                if (!response.success) {
                    throw new Error('Something was wrong')
                }
                await response.items.map(async post => {
                    const postResponse = await postServices.getPost(post)
                    setPosts(oldPosts => [...oldPosts, postResponse.data])
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchFavoritePosts();
    },[]);

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    const feedPageHandler = () => {
        navigate("/user")
    }

    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-green-100">
            <main className="w-max h-full">
                <div className="w-full h-12 min-h-12 bg-white text-center justify-center p-1 fixed left-0 right-0 flex flex-row shadow-2xl">
                    <div className="w-9/12 md:w-10/12 sm:w-9/12 inline-flex text-center items-center">
                        <img src={logo} alt="<Programigos />" className="w-44 h-10" />
                    </div>
                    <div className="w-3/12 md:w-2/12 inline-flex items-center">
                        <button onClick={feedPageHandler} className="p-3 flex items-center text-green-500 max-w-max shadow-sm hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaHome /></svg>
                        </button>
                        <button onClick={logoutHandler} className="p-3 flex items-center text-green-500 max-w-max shadow-sm hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaSignOutAlt /></svg>
                        </button>
                    </div>
                </div>
                <FavoritePost 
                    posts={posts} 
                    handleLike={handleLike}
                    handleFavorite={handleFavorite}
                />
            </main>
        </div>
    )
}

export default Favorites