import React from 'react';
import { useEffect, useState } from "react";
import { postServices} from '../../Services/Admin/Admin.services';
import { useParams } from 'react-router';

export default function Post() {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [completed, setComplete] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await postServices.getPost(id);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setImage(response.data.image);
                if(!response.success){
                throw new Error('Something was wrong')
                }

            } catch (error) {
                console.error(error);
            }
        };
        getPost();
    }, [id]);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        if(id == null) create(); else update();
    }

    async function update() {
        try {
            const response = await postServices.updatePost(id, title, description, image);
            if(!response.success){
                throw new Error('Something was wrong')
            }
            setComplete(true);
            console.log("Se modifico correctamente");
        } catch (error) {
            console.error(error);
        }
    }

    async function create() {
        try {
            const response = await postServices.createPost(title, description, image);
            if(!response.success){
                throw new Error('Something was wrong')
            }
            setComplete(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex flex-col space-y-10 justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                {id != null && <img className="w-full" src={image} alt="Sunset in the mountains"/> }
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text" 
                    placeholder=""
                    onChange={(e) => onChange(e, setTitle)}
                    value={title}
                    />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text" 
                    placeholder=""
                    onChange={(e) => onChange(e, setDescription)}
                    value={description}
                    />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text" 
                    placeholder=""
                    onChange={(e) => onChange(e, setImage)}
                    value={image}
                    />
                </div>
                <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    { id == null ? `Create` : `Update` }
                </button>
                </div>
                {completed && 
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                  <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">
                        { id == null ? `Agregado correctamente` : `Modificado correctamente` }
                    </p>
                  </div>
                </div>
              </div>
            }
            </form>
        </div>
    )
}