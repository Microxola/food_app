import { create } from 'zustand';
import { getCurrentUser } from "@/library/appwrite";
import { User } from "@/type";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    fetchAuthenticatedUser: () => Promise<void>;
    clearError: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setIsLoading: (value) => set({ isLoading: value }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    fetchAuthenticatedUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const user = await getCurrentUser();

            // if (user) {
            //     // Verify the user has account scope
            //     if (user.$permissions?.includes('account')) {
            //         const userWithType = user as unknown as User;
            //         set({ isAuthenticated: true, user: userWithType });
            //     } else {
            //         set({
            //             isAuthenticated: false,
            //             user: null,
            //             error: 'Missing account permissions'
            //         });
            //     }
            // }
            if (user) set({ isAuthenticated: true, user: user as User });
            else set({ isAuthenticated: false, user: null });
        } catch (e: any) {
            console.error('fetchAuthenticatedUser error', e);
            const errorMessage = e.message.includes('missing scope')
                ? 'Please login to access this feature'
                : 'Failed to fetch user data';
            set({
                isAuthenticated: false,
                user: null,
                error: errorMessage
            });
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useAuthStore;

// import { create } from 'zustand'
// import {getCurrentUser} from "@/library/appwrite";
// import { User } from "@/type";
//
//
// type AuthState = {
//     isAuthenticated: boolean;
//     user: User | null;
//     isLoading: boolean;
//
//
//     setIsAuthenticated: (value: boolean) => void;
//     setUser: (user: User | null) => void;
//     setIsLoading: (loading: boolean) => void;
//
//     fetchAuthenticatedUser: () => Promise<void>
// }
//
// // const useAuthStore = create<AuthState>((set) => ({
// //
// //
// // }))
// const useAuthStore = create<AuthState>( (set) => ({
//     isAuthenticated: false,
//     user: null,
//     isLoading: true,
//
//
//     setIsAuthenticated: (value) => set({isAuthenticated: value}),
//     setUser: (user) => set({user}),
//     setIsLoading: (value) => set({isLoading: value}),
//
//     fetchAuthenticatedUser: async () => {
//         set({isLoading: true})
//         try {
//             const user = await getCurrentUser();
//
//             if (user) {
//                 // First convert to unknown, then to User (TypeScript recommended pattern)
//                 const userWithType = user as unknown as User;
//
//                 // Verify required fields exist
//                 if (userWithType.name && userWithType.email && userWithType.avatar) {
//                     set({isAuthenticated: true, user: userWithType});
//                 } else {
//                     console.warn('User object missing required fields');
//                     set({isAuthenticated: false, user: null});
//                 }
//             } else {
//                 set({isAuthenticated: false, user: null});
//             }
//         } catch (e) {
//             console.log('fetchAuthenticatedUser error', e)
//             set({isAuthenticated: false, user: null});
//         }finally {
//             set({isLoading: false});
//         }
//     }
// }))
// export default useAuthStore;
