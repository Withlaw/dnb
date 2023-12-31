import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <header>app header</header>
      <aside>app aside</aside>
      <main>
        <p>app main</p>
        <Outlet />
      </main>
      <nav>app nav</nav>
      <footer>app footer</footer>
    </div>
  );
};

export default RootLayout;
