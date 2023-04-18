"use client"

import { signIn, signOut } from 'next-auth/react'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

import styles from './../page.module.css'

enum currentModelType {
  REGISTER,
  LOGIN
}

const UserActions = () => {
  const { data: session } = useSession()

  const [modelIsOpen, modelOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<currentModelType | null>(null)

  const Model = () => {

    const [firstN, setFirstN] = useState('')
    const [lastN, setLastN] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isFnameFocus, setFnameFocus] = useState(false)
    const [isLnameFocus, setLnameFocus] = useState(false)
    const [isEmailFocus, setEmailFocus] = useState(false)
    const [isPasswordFocus, setPasswordFocus] = useState(false)

    const onSubmit = async (e) => {
      e.preventDefault()

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({firstN, lastN, email, password}),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (res.ok) {
          // redirect

        }
      } catch (error: any) {
        console.log({error})
      }
    }

    return (
      <div className={styles.model}>
        <div>
          <header>
            <nav>
              <button className={styles.homeButton} onClick={() => { setCurrentModel(null); modelOpen(false) }}>Home</button>
              {currentModel === currentModelType.LOGIN
                ? (<button className={styles.otherAction} onClick={() => { setCurrentModel(null); modelOpen(false); setCurrentModel(currentModelType.REGISTER); modelOpen(true) }}>Register</button>)
                : (<button className={styles.otherAction} onClick={() => { setCurrentModel(null); modelOpen(false); setCurrentModel(currentModelType.LOGIN); modelOpen(true) }}>Log in</button>)}
            </nav>
            <div>
              <h1>{currentModel === currentModelType.LOGIN ? "Log in" : "Create your account"}</h1>
              {currentModel === currentModelType.REGISTER && (<p>Get started by filling all of these fields.</p>)}
            </div>
          </header>
          {currentModel === currentModelType.LOGIN && (
            <div>
              Log in
            </div>
          )}
          {currentModel === currentModelType.REGISTER && (
            <form onSubmit={onSubmit} className={styles.register}>
              <div className={styles.group}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={isFnameFocus ? styles.labelFocus : ''}>First name</label>
                  <input onChange={(e) => setFirstN(e.target.value)} value={firstN} type="text" id="firstName" onFocus={() => setFnameFocus(true)} onBlur={() => setFnameFocus(false)} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={isLnameFocus ? styles.labelFocus : ''}>Last name</label>
                  <input onChange={(e) => setLastN(e.target.value)} value={lastN} type="text" id="lastName" onFocus={() => setLnameFocus(true)} onBlur={() => setLnameFocus(false)} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={isEmailFocus ? styles.labelFocus : ''}>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={isPasswordFocus ? styles.labelFocus : ''}>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" placeholder="Choose a password (min 4 character)" onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
              </div>
              <button type="submit" className={styles.homeButton}>Register</button>
              <p>By clicking "Register" I agree to Terms of Use, Privacy Policy</p>
            </form>
          )}
        </div>
      </div>
    )
  }


  if (!session?.user) {
    return (
      <div>
        <button onClick={() => { setCurrentModel(currentModelType.REGISTER); modelOpen(true) }}>register</button>
        <button onClick={() => { setCurrentModel(currentModelType.LOGIN); modelOpen(true) }}>Sign in</button>
        {modelIsOpen && <Model />}
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}


export default UserActions;