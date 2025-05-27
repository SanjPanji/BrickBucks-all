import Footer from "../components/Footer";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";


function JoinNow () {
    return (
        <block>
            <Header hideActions = {true} />
            <main>
                <RegisterForm />
            </main>
            <Footer />
        </block>
    );
}

export default JoinNow;