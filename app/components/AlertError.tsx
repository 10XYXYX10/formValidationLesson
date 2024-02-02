'use client'
export default function AlertError({
    errMessage,
}:{
    errMessage:string
}){
    return(<>
        <div className='alertWrapper'>
            <div className='alertBox'>
                ⚠　{errMessage}
            </div>
        </div>
        <style>{`
        .alertWrapper{
            border:2px dotted red;
            border-radius: 5px;
            padding: 0 5px;
        }
        .alertBox{
            border: 1px solid red;
            border-radius: 5px;
            color: #fff;
            background-color: #FF69A3;
            padding:15px;
            margin:10px 0px;
        }
        `}</style>
    </>)
}