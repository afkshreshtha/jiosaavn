'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { supabase } from '../utils/supabase'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Login = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // Reload the page and navigate to '/'
        window.location.reload();
        router.push('/');
      }
    });
  }, [router]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await supabase.auth.getSession()
      if (session?.data.session === null) {
        setIsUserLoggedIn(true)
      }
    }
    fetchSession()
  }, [])
 
  useEffect(() => {
    if (isUserLoggedIn) {
      router.push('/sign-in')
    } else {
      router.push('/')
    }
  }, [isUserLoggedIn,router]);
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={['discord']}
      />
    </div>
  );
};

export default Login
