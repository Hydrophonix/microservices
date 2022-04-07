export const authAPI = {
    signIn:         jest.fn().mockResolvedValue({ data: "signIn" }),
    signUp:         jest.fn().mockResolvedValue({ data: "signUp" }),
    signOut:        jest.fn().mockResolvedValue({ data: "signOut" }),
    getCurrentUser: jest.fn().mockResolvedValue({ data: "getCurrentUser" }),
};
