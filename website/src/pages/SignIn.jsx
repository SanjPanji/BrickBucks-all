import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";


function SignIn () {
    return (
        <block>
            <Header hideActions = {true}/>
            <main>
                <LoginForm />
            </main>
            <Footer/>
        </block>
    )
}

export default SignIn;