'use client'
import { useState,ChangeEvent, MouseEvent, useRef } from 'react'
import AlertError from './AlertError'
import { validationForWord } from '@/lib/functions'

type CreateUserForm = {
    title:[string,string] //[入力文字列,エラーの際の文字列]
}

const SampleForm = () => {
    const myForm = useRef<HTMLFormElement>(null);
    const [error, setError] = useState('')
    const [formData,setFormData] = useState<CreateUserForm>({
        title:['',''],
    });

    const handleSubmit = async (e:MouseEvent<HTMLButtonElement>) => {
        try {
            if(error)setError('');
            const {title} = formData;
            if(!title[0])return alert('入力欄を埋めて下さい');
            //////////
            //◆【バリデーション】
            let alertFlag = false;
            //title
            let result = validationForWord(title[0],100);
            if( !result[0] ){
                title[1]=result[1];
                alertFlag = true;
            }
            //最終バリデーション
            setFormData({title});
            if(alertFlag){
                setError(`入力内容に問題があります`);
                return alert('入力内容に問題があります');
            }

            //////////
            //◆【通信】
            // const {data} = await axios.post(`-任意のURL-`, {
            //     title:title[0],
            //     familyName:familyName[0],
            //     firstName:firstName[0],
            //     email:email[0],
            //     phoneNumber:phoneNumber[0],
            //     password:password[0],
            //     genruList:genruList[0]
            // });
            alert('success');
        }catch (e: any){
            let message = e.response?.data.message ? e.response.data.message : e.message;
            if(!message)message = 'エラー';
            alert(message);
            setError(message);
        }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const inputName = e.target.name;
        setFormData({...formData,[inputName]:[inputVal,'']})
    }

    return (<>
        <div style={{border:'1px dotted silver',borderRadius:'5px'}}>
            {error && <AlertError errMessage={error}/>}
            <form onSubmit={(e) => e.preventDefault()} className="border-white" id='myForm' ref={myForm}>
                <div className="formElement borderSilverDotto borderRadius">
                    <label className='meinLabel'>タイトル<em>*</em></label>
                    <span className='formDescription'>100字以内のタイトル</span>
                    <input
                        name='title'
                        type='text'
                        required={true}
                        placeholder="タイトル"
                        className={formData.title[1] ? 'errorRed' : '' }
                        onChange={(e)=>handleChange(e)}
                    />
                    {formData.title[1] && <span className='formError'>{formData.title[1]}</span>}
                </div>
                <div id='myFormExcutionBt'>
                    <button className='shadowBt' onClick={(e)=>handleSubmit(e)}>送信</button>
                </div>
            </form>
        </div>
    </>)
}
export default SampleForm;