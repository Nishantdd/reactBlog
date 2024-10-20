import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique() ,email, password, name)
            if(userAccount) {
                // call another method
                return this.login(email, password);
            }
            else throw new Error("Something went wrong while registering the user")
        } catch (error) {
            console.error("Appwrite serive :: createAccount :: error : ", error)
            return false
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("Appwrite serive :: login :: error : ", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error : ", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
                .catch(err => {
                    throw new Error(err.message)
                });
            return true;
        } catch (error) {
            console.log("Appwrite serive :: logout :: error : ", error)
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;