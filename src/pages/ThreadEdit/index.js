import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { async } from "q";
import { Params, useParams } from "react-router";

export function ThreadEdit(){

    const arrTags = ["Sports", "Nature", "Tec", "Tv & Movies", "Music",
    "Food", "Business", "Health", "Travel"]; // pegar direto do BD??

    const navigate = useNavigate();
    const params = useParams();
 
    useEffect(() => {
        async function getThreadData(){
            try {
                const data = await api.get(`/thread/single/${params.id}`);
                setForm(data.data);
                console.log(form);
            } catch (err) {
                console.log(err);
            }
        }
 
        getThreadData();
    }, []);

  

    const [form, setForm] = useState({
        title: "",
        text: "",
        tags: []
    });
 
    const [checkedState, setCheckedState] = useState(
        new Array(arrTags.length).fill(false)
    );

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function handleCheckbox(position) {
        const updatedCheckedState = checkedState.map((element, i) =>
          i === position ? !element : element
        );
        setCheckedState(updatedCheckedState);
    };

    useEffect(() => {
        const arrTagsSelected = [];

        for (let i = 0; i < checkedState.length; i++) {
            const element = checkedState[i];
            if(element === true){
                arrTagsSelected.push(arrTags[i])
            }
        }

        setForm({...form, tags: [...arrTagsSelected]});

    }, checkedState)

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await api.post("thread/create", form)
            navigate("/");
        }
        catch (err){
            console.log(err);
        }
    }

    const [editorState, onEditorStateChange] = useState()

    return (
        <form>
            <label htmlFor="inputTitle">Title: </label>
            <input
                id="inputTitle"
                type="text"
                name="title"
                onChange={handleChange}
                value={form.title}
                required
            />
            <div>
            <label htmlFor="inputText">Text: </label>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
            
            {/* <input
                id="inputText"
                type="text"
                name="text"
                onChange={handleChange}
                value={form.text}
                required
            /> */}

            {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
            </div>

            <label htmlFor="inputTags">Tags: </label>

            <div>
                Select your tags:
            {arrTags.map(function(element, index){
                return (
                    <div>
                     <input type="checkbox" 
                           id={element} 
                           name={element}
                           value={element}
                           checked={checkedState[index]}
                           onChange={() => handleCheckbox(index)} 
                           />
                      <label htmlFor={element}>{element}</label>       
                    </div>
                )
            })}
            </div>
            <button onClick={handleSubmit}>Create</button>





            {/* <select
                id="inputTags"
                name="tags"
                onChange={handleChange}
                //defaultValue={}
            >
            <option value="Sports">Sports</option>
            <option value="Nature">Nature</option>
            <option value="Tec">Tec</option>
            <option value="Tv & Movies">Tv & Movies</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            </select> */}
        </form>
    )
};
