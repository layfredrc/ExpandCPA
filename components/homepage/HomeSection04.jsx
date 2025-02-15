import styled from 'styled-components'
import {
    HomeSection01Container,
    HomeSection01Wrapper,
    SloganSection01,
    Tag,
    HeadingSection01,
} from './HomeSection01'
// Animation
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef } from 'react'
import expertiseRH from '../../images/expertise_RH.png'
import Image from 'next/image'
import { RoundedButton } from './HeroHomePage'
import { BackgroundBlur } from './HomeSection01'
const HomeSection04 = () => {
    const { t, i18n } = useTranslation('common', {
        bindI18n: 'languageChanged loaded',
    })

    useEffect(() => {
        i18n.reloadResources(i18n.resolvedLanguage, ['common'])
    }, [])

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <HomeSection01Container
            initial={{ opacity: 0 }}
            animate={{
                opacity: isInView ? 1 : 0,
            }}
            transition={{
                duration: 1,
                delay: 0.5,
                ease: 'easeInOut',
                when: 'afterChildren',
            }}
            ref={ref}
        >
            <HomeSection04Wrapper>
                <motion.div className='text-content'>
                    <Tag>
                        <span>{t('payrollServicesTag')}</span>
                    </Tag>
                    <SloganSection01>{t('section04_title')}</SloganSection01>
                    <HeadingSection01>
                        <h2>
                            {t('section04_heading_pt1')}
                            <b>{t('section04_bold1')}</b>
                            {t('section04_heading_pt2')}
                            <b>{t('section04_bold2')}</b>
                            {t('section04_heading_pt3')}
                            <b>{t('section04_bold3')}</b>
                            {t('section04_heading_pt4')}
                        </h2>
                    </HeadingSection01>
                    <HeadingSection01>
                        <div style={{ width: '158px' }}>
                            <RoundedButton href='/services/payroll-services'>
                                {t('readMore')}
                            </RoundedButton>
                        </div>
                    </HeadingSection01>
                </motion.div>
                <ImageWrapper>
                    <BackgroundBlur />

                    <Image
                        src={expertiseRH}
                        fill
                        alt='expertiseRH'
                    />
                </ImageWrapper>
            </HomeSection04Wrapper>
        </HomeSection01Container>
    )
}

const HomeSection04Wrapper = styled(HomeSection01Wrapper)`
    @media screen and (min-width: 1024px) {
        flex-flow: row;
        justify-content: space-between;
        gap: 2rem;
    }
`

const ImageWrapper = styled(motion.div)`
    position: relative;
    z-index: 1;
    width: 500px;
    height: 500px;
    margin-top: 2rem;
    justify-self: center;

    @media screen and (max-width: 600px) {
        width: 300px;
        height: 300px;
    }
`

export default HomeSection04
