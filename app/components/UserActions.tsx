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
  const [currentModel, setCurrentModel] = useState<currentModelType | null>(null);

  const Model = () => {
    return (
      <div className={styles.model}>
        <div>
          <header>
            <button className={styles.homeButton} onClick={() => { setCurrentModel(null); modelOpen(false) }}>Home</button>
            {currentModel === currentModelType.LOGIN && (<button className={styles.otherAction} onClick={() => { setCurrentModel(null); modelOpen(false); setCurrentModel(currentModelType.REGISTER); modelOpen(true) }}>Register</button>)}
            {currentModel === currentModelType.REGISTER && (<button className={styles.otherAction} onClick={() => { setCurrentModel(null); modelOpen(false); setCurrentModel(currentModelType.LOGIN); modelOpen(true) }}>login</button>)}
          </header>
          {currentModel === currentModelType.LOGIN && (
            <div>
              <h1>Login model</h1>
            </div>
          )}
          {currentModel === currentModelType.REGISTER && (
            <div>

              <h1>Register model</h1>
            </div>
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