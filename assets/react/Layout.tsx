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
        <div className="bg-gray-400 rounded-lg p-5 ml-10 mr-10 mt-5 mb-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
