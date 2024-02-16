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
