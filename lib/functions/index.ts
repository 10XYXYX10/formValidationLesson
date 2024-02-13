//「「<>%"\'`;?&=」といった特別な役割を果たす単語を無害化
export const validationForWord = (str:string,limit:number=20): [boolean, string] => {
    // 長さ制限
    if (str.length === 0 || str.length > limit)return [false,`1～${limit}字以内の文字列を入力して下さい`];
	//htmlエンティティ
	const pattern = /[<>%"`';?&=]/;
	if(pattern.test(str))return [false, '「<>%"\'`;?&=」これらの文字列は使用不可です'];
    // 成功!!
    return [true, ''];
}

//ひらがな,漢字,カタカナ以外の文字列が含まれていればfalseを返す関数
function japaneseValidation(str:string) {
    const pattern = /[^\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
    console.log(`${str}:${pattern.test(str)}`)
    return !pattern.test(str);
}
//名前のバリデーション
export const validationForName = (str:string):[boolean,string] => {
    //長さ1～20の範囲
    if(str.length===0 || str.length>20)return [false,'1～20字以内の文字列を入力して下さい'];
    //ひらがな,漢字,カタカナONLY
    const result = japaneseValidation(str);
    if(!result)return [false,'漢字,ひらがな,カタカナ以外の文字列を入力しないで下さい'];
    //成功!!
    return [true,''];
}

//メールアドレスのバリデーション
export const validationForMail = (str:string):[boolean,string] => {
    //長さ1～50の範囲
    if(str.length===0 || str.length>50)return [false,'1～50字以内のメールアドレを入力して下さい'];
    //email形式
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const result = emailRegex.test(str);
    if(!result)return [false,'有効なメールアドレスの形式でありません'];
    return [true,'']
}

//「070,080,090 + 8桁の」日本の携帯電話番号
export const validationForPhoneNumber = (str:string):[boolean,string] => {
    //11桁
    if(str.length!==11)return [false,'11桁の半角数字を入力して下さい'];
    //半角数字
    const japanesePhoneNumberRegex = /^0[7-9]0\d{8}$/;
    const result = japanesePhoneNumberRegex.test(str);
    if(!result)return [false,'070,080,090のいずれかで始まる11桁の半角数字を入力して下さい'];
    return [true,'']
}

//パスワードのバリデーション
export const validationForPassword = (str:string):[boolean,string] => {
    //長さ5～50の範囲
    if(str.length<4 || str.length>51)return [false,'5～50字以内の半角or全角の英数字を入力して下さい'];
    //email形式
    const passwordRegex = /^[A-Za-z0-9ａ-ｚＡ-Ｚ０-９]+$/;
    const result = passwordRegex.test(str);
    if(!result)return [false,'半角or全角の英数字で入力して下さい'];
    return [true,'']
}



