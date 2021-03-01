import React from 'react'
import { useIdentityContext } from 'react-netlify-identity-widget'

const Profile: React.FC = () => { 
	const { user } = useIdentityContext()

	return (
		<>
			<h1>Hi {user?.user_metadata?.full_name}!</h1>
		</>
	)
}

export default Profile
