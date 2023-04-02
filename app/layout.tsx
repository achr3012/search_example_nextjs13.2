import './globals.css'
import styles from './page.module.css'
import SearchInput from './components/SearchInput'


export const metadata = {
  title: 'Search example with Next 13.2',
  description: 'Generated by create next app',
}

import { Signika } from 'next/font/google';
import Link from 'next/link';

const signika = Signika({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={signika.className}>
        <div className={styles.container}>
          <header className={styles.mainHeader}>
            <Link href="/">Home</Link>
            <SearchInput />
          </header>
          <div className={styles.mainContainer}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
