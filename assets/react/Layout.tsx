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
        <div className="bg-gray-400 rounded-lg p-10 ml-20 mr-20 mt-10 mb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
