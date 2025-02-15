import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import HeaderMegaMenu from '../../../components/header/HeaderMegaMenu'
import Footer from '../../../components/footer/Footer'

import styled from 'styled-components'

import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../../lib/animation'
import Head from 'next/head'
import InfiniteSlider from '../../../components/slider/InfiniteSlider'

import DetailServiceBanner from '../../../components/banner/DetailServiceBanner'
import adminServicesDetailBanner from '../../../images/admin_detail_banner.png'
import SocialBanner from '../../../components/banner/SocialBanner'
import JoinOurTeamBanner from '../../../components/banner/JoinOurTeamBanner'
import KeyServicesBanner from '../../../components/banner/KeyServicesBanner'
import admin from '../../../images/papier.svg'
const AdministritiveServices = ({}) => {
    const { t, i18n } = useTranslation(['administrativeServices'], {
        bindI18n: 'languageChanged loaded',
    })

    const router = useRouter()

    useEffect(() => {
        i18n.reloadResources(i18n.resolvedLanguage, [
            'administrativeServices',
            'common',
        ])
    }, [router.locale])

    return (
        <>
            <Head>
                <title>
                    {router.locale === 'fr'
                        ? 'Services administratifs pour une entreprise étrangère implantée en France'
                        : 'International Companies : Administrative Formalities in France' ||
                          'Services administratifs pour une entreprise étrangère implantée en France'}
                </title>
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
                <link
                    rel='manifest'
                    href='/site.webmanifest'
                />
                <link
                    rel='mask-icon'
                    href='/safari-pinned-tab.svg'
                    color='#5bbad5'
                />
                <meta
                    name='msapplication-TileColor'
                    content='#da532c'
                />
                <meta
                    name='theme-color'
                    content='#ffffff'
                />
                <meta
                    property='og:image'
                    content='/api/og'
                />
                <meta
                    name='description'
                    content={
                        router.locale === 'fr'
                            ? 'Toute société étrangère qui s’installe en France doit se conformer aux formalités du pays. Faites-vous aider par un expert-comptable spécialisé'
                            : 'Any international company establishing a business in France must comply with French administrative rules. Get support from a specialized accountant.' ||
                              'Toute société étrangère qui s’installe en France doit se conformer aux formalités du pays. Faites-vous aider par un expert-comptable spécialisé'
                    }
                />
            </Head>
            <motion.div
                variants={pageAnimation}
                initial='hidden'
                animate='show'
                exit='exit'
            >
                <HeaderMegaMenu />
                <DetailServiceBanner
                    title={t('section1_title')}
                    coverImage={adminServicesDetailBanner}
                    coverImageMobile='/adminServices.png'
                    textContent={
                        <>
                            <h3>{t('section1_text1')}</h3>
                            <h3>
                                <b>{t('section1_bold1')}</b>
                            </h3>
                            <h3>{t('section1_text2')}</h3>
                        </>
                    }
                    color='#8306cf'
                />

                <KeyServicesBanner
                    icon={admin}
                    textContent={
                        <>
                            <Heading>{t('feature1')}</Heading>
                            <Heading>{t('feature2')}</Heading>
                            <Heading>{t('feature3')}</Heading>
                            <Heading>{t('feature4')}</Heading>
                            <Heading>{t('feature5')}</Heading>
                            <Heading>{t('feature6')}</Heading>
                            <Heading>{t('feature7')}</Heading>
                        </>
                    }
                />

                <InfiniteSlider />

                <JoinOurTeamBanner />

                <TextContentContainer>
                    <TextContent>
                        <Slogan>{t('section2_title')}</Slogan>
                        <Paragraph>
                            <b>{t('section2_bold1')}</b>
                        </Paragraph>
                        <Paragraph>{t('section2_text1')}</Paragraph>
                    </TextContent>
                </TextContentContainer>

                <TextContentContainer gray>
                    <TextContent>
                        <Slogan>{t('section3_title')}</Slogan>
                        <Paragraph>{t('section3_text1')}</Paragraph>
                        <Paragraph>
                            <b>{t('section3_bold1')}</b>
                        </Paragraph>
                        <Paragraph>{t('section3_text2')}</Paragraph>
                    </TextContent>
                </TextContentContainer>

                <TextContentContainer>
                    <TextContent>
                        <Slogan>{t('section4_title')}</Slogan>
                        <Paragraph>
                            <b>{t('section4_text1')}</b>
                        </Paragraph>

                        <BulletList>
                            <li>
                                <span>
                                    {t('section4_bullet1')}
                                    <b>{t('section4_bold1')}</b>
                                    {t('section4_bullet1_2')}
                                </span>
                            </li>
                            <li>
                                <span>
                                    {t('section4_bullet2')}
                                    <b>{t('section4_bold2')}</b>
                                    {t('section4_bullet2_2')}
                                </span>
                            </li>
                            <li>
                                <span>
                                    {t('section4_bullet3')}
                                    <b>{t('section4_bold3')}</b>
                                    {t('section4_bullet3_2')}
                                </span>
                            </li>
                            <li>
                                <span>
                                    {t('section4_bullet4')}
                                    <b>{t('section4_bold4')}</b>
                                    {t('section4_bullet4_2')}
                                    <b>{t('section4_bold4_2')}</b>
                                    {t('section4_bullet4_3')}
                                </span>
                            </li>
                            <li>
                                <span>
                                    {t('section4_bullet5')}
                                    <b>{t('section4_bold5')}</b>
                                    {t('section4_bullet5_2')}
                                </span>
                            </li>
                            <li>
                                {t('section4_bullet6')}
                                <b>{t('section4_bold6')}</b>
                                {t('section4_bullet6_2')}
                            </li>
                        </BulletList>
                    </TextContent>
                </TextContentContainer>
                <Divider />

                <TextContentContainer>
                    <TextContent>
                        <Slogan>{t('section5_title')}</Slogan>
                        <Paragraph>
                            <b>{t('section5_bold1')}</b>
                        </Paragraph>

                        <Paragraph>{t('section5_text1')}</Paragraph>
                    </TextContent>
                </TextContentContainer>

                <TextContentContainer gray>
                    <TextContent>
                        <Slogan>{t('section6_title')}</Slogan>

                        <Paragraph>
                            {t('section6_text1')}
                            <b>{t('section6_bold1')}</b>
                            {t('section6_text2')}
                        </Paragraph>

                        <BulletList>
                            <li>{t('section6_bullet1')}</li>

                            <li>{t('section6_bullet2')}</li>

                            <li>{t('section6_bullet3')}</li>

                            <li>{t('section6_bullet6')}</li>
                            <li>{t('section6_bullet7')}</li>
                            <li>{t('section6_bullet8')}</li>
                            <li>{t('section6_bullet9')}</li>
                        </BulletList>
                    </TextContent>
                </TextContentContainer>

                <TextContentContainer>
                    <SectionImage>
                        <BackgroundColor color='#1B1464'>
                            <ImageWrapper src={'/adminServices.png'} />
                        </BackgroundColor>
                        <div className='text-content'>
                            <h1>{t('section7_title')}</h1>

                            <p>
                                {t('section7_text1')}
                                <b>{t('section7_bold1')}</b>
                                {t('section7_text2')}
                            </p>
                        </div>
                    </SectionImage>
                </TextContentContainer>
                <Divider />

                <TextContentContainer>
                    <TextContent>
                        <Slogan>{t('section7_subtitle1')}</Slogan>

                        <Paragraph>
                            <b>{t('section7_bold2')}</b>
                            {t('section7_text3')}
                        </Paragraph>
                        <Paragraph>
                            <b>{t('section7_bold3')}</b>
                            {t('section7_text4')}
                        </Paragraph>

                        <BulletList>
                            <li>{t('section7_bullet1')}</li>
                            <li>{t('section7_bullet2')}</li>
                            <li>{t('section7_bullet3')}</li>
                        </BulletList>
                    </TextContent>
                </TextContentContainer>

                <TextContentContainer gray>
                    <TextContent>
                        <Slogan>{t('section8_title')}</Slogan>
                        <Paragraph>
                            <b>{t('section2_bold1')}</b>
                            {t('section8_text1')}
                            {t('section8_text2')}
                        </Paragraph>
                        <BulletList>
                            <li>{t('section8_bullet1')}</li>
                            <li>{t('section8_bullet2')}</li>
                            <li>{t('section8_bullet3')}</li>
                            <li>{t('section8_bullet4')}</li>
                            <li>{t('section8_bullet5')}</li>
                            <li>{t('section8_bullet6')}</li>
                            <li>{t('section8_bullet7')}</li>
                        </BulletList>
                    </TextContent>
                </TextContentContainer>

                <TextContentContainer>
                    <TextContent>
                        <Slogan>{t('section9_title')}</Slogan>
                        <Paragraph>
                            <b>{t('section9_bold1')}</b>
                            {t('section9_text1')}
                        </Paragraph>
                        <Paragraph>
                            {t('section9_text2')}
                            <b>{t('section9_bold2')}</b>
                        </Paragraph>
                        <Paragraph>
                            {t('section9_text3')}
                            <b>{t('section9_bold3')}</b>
                            {t('section9_text4')}
                        </Paragraph>
                    </TextContent>
                </TextContentContainer>
                <Divider />

                <SocialBanner />
                <Footer />
            </motion.div>
        </>
    )
}

const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'administrativeServices',
                'common',
            ])),
        },
        revalidate: 60,
    }
}
export { getStaticProps }

export default AdministritiveServices

export const TextContentContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-top: 85px;
    margin-bottom: 85px;
    padding: ${(props) => (props.gray ? '85px' : '0px 0px 0px 0px')};
    background: ${(props) => (props.gray ? 'rgba(217, 224, 236, 0.15)' : '')};
    border-radius: ${(props) => (props.gray ? '0px 0px 0px 143px' : '')};

    @media screen and (max-width: 1200px) {
        padding: ${(props) => (props.gray ? '8rem 1.5rem' : '0 1.5rem')};
    }
`

export const Divider = styled.div`
    height: 1px;
    border: 2px solid #f0f3f7;
    margin-top: 85px;
    max-width: 1200px;
    width: 100%;

    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 1200px) {
        width: 90%;
    }
`

export const TextContent = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: start;
    align-content: start;
    gap: 18.84px;
    max-width: 1200px;
`

export const Slogan = styled(motion.h1)`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 38px;
    /* or 140% */

    letter-spacing: 0.327px;

    color: #1b1464;

    width: 72%;

    @media screen and (min-width: 768px) {
        font-size: 25px;
        line-height: 38px;
    }
    @media screen and (min-width: 1024px) {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 56px;
        /* or 140% */

        letter-spacing: 0.327px;
    }

    @media screen and (max-width: 767px) {
        font-size: 25px;
        line-height: 38px;
        width: 100%;
    }
`

export const Heading = styled.div`
    font-family: 'Gilroy';
    font-style: normal;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.08em;

    color: #1b1464;
`

export const Paragraph = styled.p`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24.66px;
    /* or 25px */

    color: #1b1464;

    width: 72%;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
`

export const BulletList = styled.ul`
    list-style: none; /* Remove default list style */
    padding-left: 0; /* Remove default padding */

    li {
        font-family: 'Gilroy';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24.66px;
        /* or 25px */
        color: #1b1464;

        margin-left: 10px;
        position: relative;
        padding-left: 1.5em;
        line-height: 1.5;
    }

    li::before {
        content: '•';
        position: absolute;
        left: 0;
        top: 0.15em; /* Adjust top position to better align the bullet with the text */
    }
`

export const ImageWrapper = styled.div`
    background-image: ${(props) => `url(${props.src})`};
    background-position: 50% 0%;
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: 3rem;
    width: 482.79px;
    height: 341px;
    border-radius: 188.375px 0px 188.375px 0px;

    @media screen and (min-width: 1200px) {
        transform: translate(-2.5%, -16%);
    }

    @media screen and (min-width: 1440px) {
        width: 493.79px;
        height: 348.43px;
        background-position: 50% 50%;
    }
    @media screen and (min-width: 2100px) {
        width: 493.79px;
        height: 348.43px;
        background-position: 50% 40%;
    }

    @media screen and (max-width: 1200px) {
        width: 400px;
        height: 300px;
        transform: translate(-2.5%, -18%);
    }

    @media screen and (max-width: 767px) {
        width: 400px;
        height: 300px;
    }

    @media screen and (max-width: 500px) {
        width: 350px;
        height: 250px;
        transform: translate(-2.5%, -22%);
    }
`

export const BackgroundColor = styled.div`
    width: 493.79px;
    height: 348.43px;
    background: ${(props) => props.color};
    border-radius: 188.375px 0px 188.375px 0px;

    @media screen and (max-width: 1200px) {
        width: 400px;
        height: 300px;
    }

    @media screen and (max-width: 767px) {
        width: 400px;
        height: 300px;
    }

    @media screen and (max-width: 500px) {
        width: 350px;
        height: 250px;
    }
`

export const ImageWrapperHorizontal = styled(ImageWrapper)`
    width: 500px;
    height: 400px;

    @media screen and (max-width: 500px) {
        width: 400px;
        height: 300px;
    }
`

export const RowWrapper = styled.div`
    display: flex;
    gap: 2rem;
    line-height: 1.5;
    align-items: center;
`

export const FeaturesContainer = styled.div`
    margin: 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-flow: column;
    justify-content: start;
    gap: 2rem;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`

export const Feature = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: start;
    padding: 1.5rem;
    border: 2px solid #1b1464;
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    p {
        font-size: 20px;
        line-height: 30px;
        color: #352d61;
        font-family: 'Poppins', sans-serif;

        @media screen and (max-width: 465px) {
            font-size: 20px;
        }
    }
`

export const SectionImage = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    max-width: 1440px;

    .text-content {
        display: flex;
        flex-flow: column;
        justify-content: center;
        gap: 2rem;

        h1 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 700;
            font-size: 25px;
            line-height: 38px;
            /* or 140% */

            letter-spacing: 0.327px;

            color: #1b1464;

            @media screen and (min-width: 768px) {
                font-size: 25px;
                line-height: 38px;
            }
            @media screen and (min-width: 1024px) {
                font-size: 36px;
            }
        }

        p {
            font-family: 'Gilroy';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 154.15%;
            /* or 25px */

            color: #1b1464;
        }

        @media screen and (min-width: 1024px) {
            width: 50%;
        }
        @media screen and (min-width: 1200px) {
        }
        @media screen and (min-width: 1440px) {
        }
    }

    @media screen and (max-width: 767px) {
        flex-flow: column;
        gap: 3rem;
    }

    @media screen and (min-width: 768px) {
        gap: 3rem;

        flex-flow: column;
    }
    @media screen and (min-width: 1024px) {
        flex-flow: row;
        gap: 3rem;
    }
    @media screen and (min-width: 1200px) {
        flex-flow: row;
    }
    @media screen and (min-width: 1440px) {
        flex-flow: row;
    }
`
