import './Main.css';

export default function Main({ columns, children }) {
  return (
    <main className={`main${columns ? ' main--columns' : ''}`}>
      {children}
    </main>
  )
}
