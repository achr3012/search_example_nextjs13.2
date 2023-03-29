'use client'; // Error components must be Client components

import styles from './page.module.css'

export default function Error({ error }: { error: Error }) {
  return (
    <div className={styles.errorBox}>
      <h2>Oops, Something went wrong!  ):</h2>
      <p className={styles.errorMsg}>{error.message}</p>
      or
      <a className={styles.secondBtn} href="/">Refresh & Go home</a>
    </div>
  );
}