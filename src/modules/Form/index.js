import { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/input"
import { useNavigate } from "react-router-dom"

const Form = ({
    isSignInPage = true,
}) => {
    const [data, setData] = useState({
        ...(!isSignInPage && {
            name: ''
        }),
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        console.log('data :>>',data);
        e.preventDefault()
        const res = await fetch(`http://localhost:8000/api/${isSignInPage ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(res.status === 400) {
            alert('Invalid Credentials')
        }else {    
            const resData = await res.json()
            console.log('data :>>',resData);
            if(resData.token){
                localStorage.setItem('user:token', resData.token)
                localStorage.setItem('user:detail', JSON.stringify(resData.user))
                navigate('/')
            }
        }
    }
    return (
        <div className="bg-light h-screen flex justify-center items-center">
            <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className="text-4xl font-extrabold">Welcome {isSignInPage && 'Back'}</div>
                <div className="text-xl font-light mb-14">{isSignInPage ? 'Sign in to get started' : 'Sign up to get started'}</div>
                <form className=" w-full flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
                {!isSignInPage && <Input label="Full Name" name="name" placeholder="Enter your name" className="mb-6 w-[50%]" value={data.name} onChange={(e) => setData({...data,name: e.target.value})}/>}
                <Input label="Email" name="email" type="email" placeholder="Enter your email" className="mb-6 w-[50%]" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                <Input label="Password" name="password" type="password" placeholder="Enter your password" className="mb-14 w-[50%]" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                <Button label={isSignInPage ? 'Sign In' : 'Sign Up'} type="submit" className="w-1/2 mb-2"/>
                </form>
                <div>{isSignInPage ? "Don't have an account?" : "Already have an account?"}<span className="text-primary cursor-pointer underline" onClick={() => navigate(isSignInPage ? '/users/sign-up' : '/users/sign-in')}>{isSignInPage ? 'Sign Up' : 'Sign In'}</span></div>
            </div>
        </div>
    )
}

export default Form