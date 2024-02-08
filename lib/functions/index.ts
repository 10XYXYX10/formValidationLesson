//「<,>,',",&」や「;」といった特別な役割を果たす単語を無害化
export const validationForWord = (str:string,limit:number=20): [boolean, string] => {
    // 長さ制限
    if (str.length === 0 || str.length > limit) return [false, `1～${limit}字以内の文字列を入力して下さい`];
	//htmlエンティティ
	const pattern = /[<>%"`';]/;
	if(pattern.test(str))return [false, '「<>%"\'`;」これらの文字列は使用不可です'];
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