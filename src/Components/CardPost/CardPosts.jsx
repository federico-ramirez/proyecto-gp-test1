const getUsername = () => localStorage.getItem("username");

const Card = ({ post, onClick, visibility }) => {
    // validar nulo 
    const src = post?.image;

    return (
        <div className="xl:w-1/5 xl:h-96 bg-white rounded shadow-lg relative">
            <div onClick={() => onClick(post._id, post.active, post.user.username)}>

                <div className="xl:ml-10 w-72 h-40 rounded-t flex justify-center items-center" style={{backgroundColor: "#F6F6F6"}}>
                    <img src={src} className="p-1 w-40 h-40" alt={`post ${post.title}`}/>
                </div>
                <div className="px-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2">
                        Estado: {post.active ? `Activo` : `Inactivo`}
                    </label>
                    <div className="flex justify-between items-center py-1.5">
                        <h2 className="font-roboto text-2xl capitalize" style={{color: "#454545"}}>{post.title}</h2>
                        <p className="font-roboto text-xl" style={{color: "#6D6D6D"}}>Nº {post.id}</p>
                    </div>
                </div>
            </div>
            { post.user.username === getUsername() && <button className="xl:ml-20 mt-10 transition rounded border border-green-500 duration-300 ease-in-out text-extrabold uppercase bg-green-500 hover:bg-green-700 py-2 px-4 text-gray-100" onClick={() => visibility(post._id)}>
                Cambiar Visibilidad
            </button> }
        </div>
    );  
};

export default Card;