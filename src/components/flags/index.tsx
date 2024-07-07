import Image from 'next/image'
import flagBRPath from '@/assets/svg/FlagBR.svg'
import flagUKPath from '@/assets/svg/FlagUK.svg'

export const FlagBR = () => (
  <Image src={flagBRPath} width={24} height={24} alt="Português - BR" />
)

export const FlagUK = () => (
  <Image src={flagUKPath} width={24} height={24} alt="Português - BR" />
)
