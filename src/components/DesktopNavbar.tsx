import { BellIcon, HomeIcon, UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { SignInButton, UserButton } from '@clerk/nextjs';
import ModeToggle from './ModelToggle';
import { currentUser } from '@clerk/nextjs/server';

const DesktopNavbar = async () => {
  const user = await currentUser();
  return (
    <div className='hidden md:flex items-center space-x-4'>
      <ModeToggle />

      <Button variant='ghost' className='flex items-center gap-2' asChild>
        <Link href='/'>
          <HomeIcon className='w-4 h-4' />
          <span className='hidden lg:inline'>Início</span>
        </Link>
      </Button>
      {user ? (
        <>
          <Button variant='ghost' className='flex items-center gap-2' asChild>
            <Link href='/notifications'>
              <BellIcon className='w-4 h-4' />
              <span className='hidden lg:inline'>Notificações</span>
            </Link>
          </Button>
          <Button variant='ghost' className='flex items-center gap-2' asChild>
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split('@')[0]
              }`}
            >
              <UserIcon className='w-4 h-4' />
              <span className='hidden lg:inline'>Perfil</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode='modal'>
          <Button variant='default'>SignIn</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default DesktopNavbar;
