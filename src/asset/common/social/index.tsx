import { ReactComponent as GoogleIcon } from './google.icon.svg';
import { ReactComponent as FacebookIcon } from './facebook.icon.svg';
import { ReactComponent as TwitterIcon } from './twitter.icon.svg';
import { ReactComponent as GithubIcon } from './github.icon.svg';
import { ReactComponent as MicrosoftIcon } from './microsoft.icon.svg';
import { providersType } from '../../../components/auth/extensions/providers';
interface ISocialIcon {
    Google: JSX.Element
}

export const socialIcon: {[key in providersType]: JSX.Element} = {
    Google: <GoogleIcon name='google' className='cursor-pointer'/>,
    Facebook: <FacebookIcon name='facebook' className='cursor-pointer'/>,
    Twitter: <TwitterIcon name='twitter' className='cursor-pointer'/>,
    Github: <GithubIcon name='github' className='cursor-pointer'/>,
    Microsoft: <MicrosoftIcon name='microsoft' className='cursor-pointer'/>
}