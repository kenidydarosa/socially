'use server'

import { currentUser } from '@clerk/nextjs/server';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { getUserByClerkId } from '@/actions/user.action';

export const SiderBar = async () => {
	console.log('teste');
	const authUser = await currentUser();
	if (!authUser) return <UnAuthenticatedSidebar />;

	const user = await getUserByClerkId(authUser.id);
    console.log('user:', {user})
	if (!user) return null;

	return <div>SideBAR</div>;
};

export default SiderBar;

const UnAuthenticatedSidebar = () => (
	<div className='sticky top-20'>
		<Card>
			<CardHeader>
				<CardTitle className='text-center text-xl font-semibold'>Bem-vindo de volta!</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-center text-muted-foreground mb-4'>Faça login para acessar seu perfil e se conectar com outras pessoas.</p>
				<SignInButton mode='modal'>
					<Button className='w-full' variant='outline'>
						Login
					</Button>
				</SignInButton>
				<SignUpButton mode='modal'>
					<Button className='w-full mt-2' variant='default'>
						Sign Up
					</Button>
				</SignUpButton>
			</CardContent>
		</Card>
	</div>
);
