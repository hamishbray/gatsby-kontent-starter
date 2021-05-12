import React from 'react'
import { useIdentityContext } from 'react-netlify-identity-widget'

const Login: React.FC<any> = () => {
	const { isLoggedIn } = useIdentityContext()
	
	return (
		<>
			{isLoggedIn ? <span>Welcome!</span> : <span>you need to log in...</span>}
		</>
	)
}

export default Login
