import { Redirect } from 'expo-router';

const isLoggedin: boolean = false;

const Index = () => {
    console.log('Auth Index');
    console.log('isLoggedin:', isLoggedin);
    return (
        <Redirect href={isLoggedin ? ("/client/home" as const) : ("/login" as const)} />
    );
}

export default Index;