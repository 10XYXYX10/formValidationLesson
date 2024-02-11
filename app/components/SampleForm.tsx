'use client'
import { useState,ChangeEvent, MouseEvent, useRef } from 'react'
import AlertError from './AlertError'
import { validationForName, validationForWord, validationForMail,validationForPhoneNumber,validationForPassword } from '@/lib/functions'

type CreateUserForm = {
    title:[string,string]
    familyName:[string,string]
    firstName:[string,string]
    email:[string,string]
    phoneNumber:[string,string]
    password:[string,string]
}

const SampleForm = () => {
    const myForm = useRef<HTMLFormElement>(null);
    const [error, setError] = useState('')
    const [formData,setFormData] = useState<CreateUserForm>({
        title:['',''],
        familyName:['',''],
        firstName:['',''],
        email:['',''],
        phoneNumber:['',''],
        password:['',''],
    });

    const handleSubmit = async (e:MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            if(error)setError('');
            const {title,familyName,firstName,email,phoneNumber,password} = formData;
            if(!title[0] || !familyName[0] || !firstName[0] || !email[0] || !phoneNumber[0] || !password[0])return alert('入力欄を埋めて下さい');
            //////////
            //◆【バリデーション】
            let alertFlag = false;
            //title
            let result = validationForWord(title[0],100);
            if( !result[0] ){
                title[1]=result[1];
                alertFlag = true;
            }
            //familyName
            result = validationForName(familyName[0]);
            if( !result[0] ){
                familyName[1]=result[1];
                alertFlag = true;
            }
            //firstName
            result = validationForName(firstName[0]);
            if( !result[0] ){
                firstName[1]=result[1];
                alertFlag = true;
            }
            //email
            result = validationForMail(email[0]);
            if( !result[0] ){
                email[1]=result[1];
                alertFlag = true;
            }
            //phoneNumber
            result = validationForPhoneNumber(phoneNumber[0]);
            if( !result[0] ){
                phoneNumber[1]=result[1];
                alertFlag = true;
            }
            //password
            result = validationForPassword(password[0]);
            if( !result[0] ){
                password[1]=result[1];
                alertFlag = true;
            }
            //最終バリデーション
            setFormData({title,familyName,firstName,email,phoneNumber,password});
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
        const inputVal = e.target.value.trim();
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
                <div className="formElement">
                    <label>姓<em>*</em></label>
                    <span className='formDescription'>漢字,ひらがな,カタカナ以外の文字列は使用できません</span>
                    <input
                        name='familyName'
                        type='text'
                        defaultValue={formData.familyName[0]}
                        required={true}
                        placeholder="名字"
                        className={formData.familyName[1] ? 'errorRed' : '' }
                        onChange={(e)=>handleChange(e)}
                    />
                    {formData.familyName[1] && <span className='formError'>{formData.familyName[1]}</span>}
                </div>
                <div className="formElement">
                    <label>名<em>*</em></label>
                    <span className='formDescription'>漢字,ひらがな,カタカナ以外の文字列は使用できません</span>
                    <input
                        name='firstName'
                        type='text'
                        defaultValue={formData.firstName[0]}
                        required={true}
                        placeholder="名前"
                        className={formData.firstName[1] ? 'errorRed' : '' }
                        onChange={(e)=>handleChange(e)}
                    />
                    {formData.firstName[1] && <span className='formError'>{formData.firstName[1]}</span>}
                </div>
                <div className="formElement">
                    <label>メールアドレス<em>*</em></label>
                    <span className='formDescription'>メールアドレスを入力して下さい</span>
                    <input
                        name='email'
                        type='text'
                        defaultValue={formData.email[0]}
                        required={true}
                        placeholder="メールアドレス"
                        className={formData.email[1] ? 'errorRed' : '' }
                        onChange={(e)=>handleChange(e)}
                    />
                    {formData.email[1] && <span className='formError'>{formData.email[1]}</span>}
                </div>
                <div className="formElement">
                    <label>日本の携帯電話番号<em>*</em></label>
                    <span className='formDescription'>070,080,090のいずれかで始まる日本の携帯番号</span>
                    <input
                        name='phoneNumber'
                        type='text'
                        defaultValue={formData.phoneNumber[0]}
                        required={true}
                        placeholder="日本の携帯電話番号"
                        className={formData.phoneNumber[1] ? 'errorRed' : '' }
                        onChange={(e)=>handleChange(e)}
                    />
                    {formData.phoneNumber[1] && <span className='formError'>{formData.phoneNumber[1]}</span>}
                </div>
                <div className="formElement">
                    <label>パスワード<em>*</em></label>
                    <span className='formDescription'>5文字以上の半角or全角の英数字を入力して下さい</span>
                    <input
                        name='password'
                        type='password'
                        defaultValue={formData.password[0]}
                        required={true}
                        placeholder="パスワード"
                        className={formData.password[1] ? 'errorRed' : '' }
                        onChange={(e)=>handleChange(e)}
                    />
                    {formData.password[1] && <span className='formError'>{formData.password[1]}</span>}
                </div> 

                <div id='myFormExcutionBt'>
                    <button className='shadowBt' onClick={(e)=>handleSubmit(e)}>送信</button>
                </div>
            </form>
        </div>
    </>)
}
export default SampleForm;