# Category Manager 🌟

![Category Tree Manager](/public/screenshot.jpg)

Category Manager is a web application that allows users to manage categories. Users can view, add, delete, and search for categories with a user-friendly interface. 📂🔍

## Features ✨

- View a list of categories 📋
- Add new categories ➕
- Delete categories ❌
- Search for categories by name 🔍
- Reorder categories through drag-and-drop 🔄

## Installation and Setup 🛠️

1. Clone the repository:

   ```shell
   git clone https://github.com/sergio-nezhigay/category-manager
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Start the development server:

   ```shell
   npm run dev
   ```

4. Access the application at [https://category-manager.vercel.app/](https://category-manager.vercel.app/) 🚀

## Built With 🛠️

Certainly! Here's a unified style for the technologies used, along with emojis for added visual appeal:

- [**Next.js**](https://nextjs.org/): 🚀 Next.js is a popular framework for building fast and efficient web applications.
- [**React**](https://reactjs.org/): ⚛️ React is a JavaScript library for building user interfaces.
- [**formik**](https://formik.org/): 📝 Formik is a library for building forms in React with ease.
- **react-spinners**: 🔄 React Spinners provides loading spinners and animations for your web applications.
- **react-confirm-alert**: 🚦 React Confirm Alert is a customizable confirmation dialog library.
- **@hello-pangea/dnd**: 🪄 @hello-pangea/dnd is a drag-and-drop library for creating interactive interfaces.
- [**Tailwind CSS**](https://tailwindcss.com/): 🎨 Tailwind CSS is a utility-first CSS framework for building modern designs with ease.

## Usage 🚀

- Create, edit, and delete categories 📝🗑️
- Reorder categories using drag-and-drop ↕️
- Save changes or cancel modifications 💾❌
- Basic validation ensures that a category cannot be saved with an empty name ⚠️

## Local Data Storage 💾

The application stores data locally in a file, and it's also possible to use runtime storage for faster development. 📂

## API Endpoints 🌐

The project includes CRUD (Create, Read, Update, Delete) endpoints for managing categories. You can customize these endpoints as needed. 🛠️

- **GET** `/api/categories`: Retrieve categories 📖
- **POST** `/api/categories`: Create a new category ➕
- **DELETE** `/api/categories?id={categoryId}`: Delete a category ❌
- **PUT** `/api/categories/reorder`: Drag and drop for reordering categories ↕️
- **PATCH** `/api/categories?id={categoryId}`: Toggle visibility of a category 📝

You can use these endpoints to interact with and manage categories in the application. 🌐

## Feedback 📢

Your feedback and contributions are welcome! Feel free to open issues and pull requests to improve this project. 🙌

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 📜

## Acknowledgments 🙏

- Thanks to the creators of the libraries and tools used in this project. 👏

## Contact Information 📧

- **Author:** Serhii Nezhyhai
- **Email:** [abc1971h@gmail.com](mailto:abc1971h@gmail.com)
- **Portfolio:** [https://serhii.vercel.app/](https://serhii.vercel.app/)
