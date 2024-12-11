import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="App">
      <header>
        <nav>
          {/* <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul> */}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
