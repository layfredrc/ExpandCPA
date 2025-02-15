import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { AboutSection01Container } from './AboutSection01'
import { AboutSection02Wrapper } from './AboutSection02'
import { IconArrowRight } from '@tabler/icons'
import BorderedButton from '../button/BorderedButton'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const AboutSection05 = ({ title, paragraph, btnText, standalone }) => {
    const { t } = useTranslation('common')
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <>
            {standalone ? (
                <AboutSection02Wrapper>
                    <AboutSection05Wrapper>
                        <JoinOurTeamContainer2>
                            <h1>{title}</h1>
                            <h3>{paragraph}</h3>
                            <Link href='/#contact'>
                                <BorderedButton
                                    borderColor='white'
                                    textColor='white'
                                    hoverable={false}
                                    externalUrl={false}
                                    rightIcon={<IconArrowRight size={16} />}
                                    fontSize={16}
                                    type='button'
                                >
                                    {btnText}
                                </BorderedButton>
                            </Link>
                        </JoinOurTeamContainer2>
                        <ImageWrapper />
                    </AboutSection05Wrapper>
                </AboutSection02Wrapper>
            ) : (
                <AboutSection05Container
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: 'easeInOut',
                        when: 'beforeChildren',
                    }}
                    ref={ref}
                >
                    <AboutSection02Wrapper>
                        <AboutSection05Wrapper>
                            <JoinOurTeamContainer>
                                <h1>{title}</h1>
                                <h3>{paragraph}</h3>
                                <a
                                    href='https://www.linkedin.com/company/expand-cpa/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <BorderedButton
                                        borderColor='white'
                                        textColor='white'
                                        hoverable={false}
                                        externalUrl={false}
                                        rightIcon={<IconArrowRight size={16} />}
                                        fontSize={16}
                                        type='button'
                                    >
                                        {btnText}
                                    </BorderedButton>
                                </a>
                            </JoinOurTeamContainer>
                            <ImageWrapper />
                        </AboutSection05Wrapper>
                    </AboutSection02Wrapper>
                </AboutSection05Container>
            )}
        </>
    )
}

const Background = styled.div`
    background: rgba(217, 224, 236, 0.3);
    border-radius: 156px 70px 0px 0px;
`

const AboutSection05Container = styled.div`
    background: linear-gradient(21.66deg, #4364f7 22.39%, #1b1464 95.86%);
    color: white;

    min-height: 55vh;
    position: relative;
`

const JoinOurTeamContainer = styled.div`
    background: linear-gradient(109.75deg, #4364f7 0.82%, #1b1464 100%);
    border-radius: 51px;
    color: white;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    align-content: center;
    justify-content: center;
    height: 50vh;

    h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 36px;
        letter-spacing: 0.327px;
        text-align: left;
        @media screen and (max-width: 768px) {
            font-size: 36px;
        }
        @media screen and (min-width: 1440px) {
            font-size: 32px;
        }
        @media screen and (min-width: 1800px) {
            font-size: 36px;
        }
    }

    h3 {
        font-size: 22px;
        letter-spacing: 0.327px;
        text-align: left;

        @media screen and (max-width: 768px) {
            font-size: 18px;
        }
        @media screen and (max-width: 425px) {
            font-size: 18px;
        }

        @media screen and (min-width: 1440px) {
            font-size: 18px;
        }
        @media screen and (min-width: 1800px) {
            font-size: 22px;
        }
    }

    @media screen and (max-width: 768px) {
        padding: 3rem;
        height: 50vh;
    }

    @media screen and (max-width: 425px) {
        padding: 2rem;
        height: 60vh;
    }
`

const JoinOurTeamContainer2 = styled(JoinOurTeamContainer)`
    h3 {
        font-size: 24px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: 0.327px;
        text-align: left;

        @media screen and (max-width: 768px) {
            font-size: 20px;
        }
        @media screen and (max-width: 425px) {
            font-size: 24px;
        }
    }

    h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 28px;
        letter-spacing: 0.327px;
        text-align: left;
        @media screen and (max-width: 768px) {
            font-size: 36px;
        }

        @media screen and (min-width: 1024px) {
            font-size: 36px;
        }
        @media screen and (min-width: 1440px) {
            font-size: 28px;
        }
    }
`

const AboutSection05Wrapper = styled.div`
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    @media screen and (min-width: 1440px) {
        display: grid;
        grid-gap: 1.5rem;
        grid-template-columns: 1fr 2fr;
    }
`

const ImageWrapper = styled.div`
    background: url('/team.jpg');
    border-radius: 51px;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    height: 50vh;
    width: 100%;

    @media screen and (max-width: 425px) {
        height: 30vh;
    }
`

export default AboutSection05
