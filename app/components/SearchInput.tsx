"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'


function SearchInput() {

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();


  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encoderSearchTerm = encodeURI(searchTerm.trim());

    if (encoderSearchTerm) {
      router.push(`/search?q=${encoderSearchTerm}`);
    }

  }

  return (
    <form onSubmit={onSearch} className={styles.searchBox}>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={styles.searchInput}
        placeholder="Search whatever you want" />
    </form>
  )
}

export default SearchInput;