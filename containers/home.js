import Link from "next/link";

const HomeContainer = () => (
  <div>
    <ul>
      <li>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <Link href="/notfound">
          <a>NotFound</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
      <li>
        <Link href="/stocks">
          <a>Stocks</a>
        </Link>
      </li>
      <li>
        <Link href="/stocks-market">
          <a>Stocks Market</a>
        </Link>
      </li>
      <li>
        <Link href="/transactions">
          <a>transactions</a>
        </Link>
      </li>
    </ul>
  </div>
);

export default HomeContainer;
