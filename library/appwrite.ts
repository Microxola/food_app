import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import {CreateUserPrams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.REACT_APPWRITE_ENDPOINT! || 'https://fra.cloud.appwrite.io/v1',
    projectId: process.env.REACT_APPWRITE_PROJECT_ID! || '688d00280006120b3fce',
    platform: 'com.foodapp',
    databaseId:  '688d03b0001f86420245',
    userCollectionId: '688d0412002d9eb766e0'
}

export const client = new Client();

client
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setPlatform(appwriteConfig.platform)

export const database = new Databases(client);
export const account = new Account(client);
export const avatar = new Avatars(client);


export const createUser = async ({name, email, password} : CreateUserPrams): Promise<void> => {
        try {
            const newAccount = await account.create(ID.unique(), email, password);

            if (!newAccount) throw Error

            await signIn({email, password});
            const avatarsUrl = avatar.getInitialsURL(name);

              await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                         {
                            email, name, accountId: newAccount.$id, avatar: avatarsUrl
                     }
            )
        }catch (error) {
            throw new Error(error as string);
        }
}
export const signIn = async ({email, password} : SignInParams): Promise<void> => {
        try {
            const session = await account.createEmailPasswordSession(email, password);
        }catch (error) {
            throw new Error(error as string);
        }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error(`Account does not exist`);

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    }catch (error) {
        throw new Error(error as string);
    }
}