"use client"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      const session = await supabase.auth.getSession()
      setIsUserLoggedIn(!session)
    }
    fetchSession()
  }, [])

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push('/sign-in')
    } else {
      router.push('/')
    }
  }, [isUserLoggedIn, router])

  return (
    <div className="">
      <Auth  
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={['discord', 'google']}
      />
    </div>
  )
}

export default Login
