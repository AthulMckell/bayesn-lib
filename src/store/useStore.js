import { create } from 'zustand';

const useStore = create(( set, get ) => ({
    isLoggedIn: false,
    userEmail: null,
    selectedCategory:null,
    selectedBooks: [],
    login: (email) => set({ isLoggedIn: true, userEmail:email }),
    logout: () =>set({ isLoggedIn:false, userEmail: null, selectedCategory: null, selectedBooks: [], }),
    setCategory: (category) => set({ selectedCategory: category }),
    addBook: (book) => {
        const selected = get().selectedBooks;
        const category = get().selectedCategory;

        if (selected.some((b) => b.id === book.id)) return;

        if(selected.length >= 5){
            alert('You can only checkout up to 5 books.');
            return;
        } 

        const sameCategoryCount = selected.filter((b) =>
            b.subjects?.includes(category)).length;
        if(book.subjects?.includes(category) && sameCategoryCount >=3){
            alert(`You can only select up to 3 books from "${category}"`);
            return;
        }

        set({selectedBooks: [...selected, book]});

    },
    removeBook: (bookId) =>
    set({
      selectedBooks: get().selectedBooks.filter((b) => b.id !== bookId),
}),
}));

export default useStore;