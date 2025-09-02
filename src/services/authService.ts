import { User } from '@/src/models/User';
import axios from 'axios';

const API_URL = 'https://680298a40a99cb7408ea079c.mockapi.io/api/v1';

export async function serviceStatus() {
  console.log('HTTP HEALTH SERVICE STATUS');
  const response = await axios.get(`${API_URL}/status`);
  return response.data;
};

export async function register (registerData: User) {
  console.log('REGISTER USER');
  console.log('Email: ' + registerData.email);
  console.log('Password: ' + registerData.password);
  const response = await axios.post(`${API_URL}/users`, 
    { email: registerData.email, 
      password: registerData.password, 
      token: "1234abcd" 
    });
  return response.data;
};

export async function login (email: string, password: string) {
  console.log('USER LOGIN');
  console.log('Email: ' + email);
  console.log('Password: ' + password);
  //Fazer validação de token e guardar no context e no storage
  const response = await axios.get(`${API_URL}/users?id=1`);
  return response.data;
};


/*

export const login = async (email: string, password: string) => {
  try {
    const result = await axios.post(`${API_URL}/auth`, { email, password });

    console.log("~ file: AuthContext.tsx:41 ~ login ~ result:", result)

    setAuthState({
      token: result.data.token,
      authenticated: true
    }) 
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };



// course example
import axios from 'axios';

const API_KEY = 'AIzaSyDCYasArcOwcALFhIj2szug5aD2PgUQu1E';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);




export async function login(email: string, password: string): Promise<any> {
  
  console.log('HTTP LOGIN SERVICE');
  console.log('email: ' + email + ', password: ' + password);
  const success = true;
  if (success) {
    // Simulate a successful login response
    return {
      token: 'fake-jwt-token'
    };
  } else {
    console.error('Login error:');
    throw new Error("Login failed");
  } 
}
} */


