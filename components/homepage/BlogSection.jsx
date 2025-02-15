import styled from 'styled-components'
import { Tag } from './HomeSection01'

import { HomeSection05Container, HomeSection05Wrapper } from './HomeSection05'

// Animation
import { motion, useInView } from 'framer-motion'
import { titleAnim, fade } from '../../lib/animation'

import { useTranslation } from 'next-i18next'
import { useEffect, useRef } from 'react'
import GradientButton from '../button/GradientButton'

import { Carousel } from '@mantine/carousel'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import { SloganSection06, ButtonContainer, RowWrapper } from './HomeSection06'
import Link from 'next/link'
import { Center } from '@mantine/core'
import { SloganSection01 } from './HomeSection01'
import { HeroContainer, RoundedButton } from './HeroHomePage'

const BlogSection = ({ posts }) => {
    const { t, i18n } = useTranslation('common', {
        bindI18n: 'languageChanged loaded',
    })
    useEffect(() => {
        i18n.reloadResources(i18n.resolvedLanguage, ['common'])
    }, [])

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <HeroContainer
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
            <HomeSection05Wrapper>
                <motion.div
                    className='text-content'
                    variants={titleAnim}
                    initial='hidden'
                    animate='show'
                >
                    <Center mt={150}>
                        <BlogSlogan>{t('blog_section')}</BlogSlogan>
                    </Center>
                </motion.div>
                <CarouselContainer>
                    <Carousel
                        height={600}
                        slideSize='300px'
                        slideGap='md'
                        mt={100}
                        loop
                        nextControlIcon={
                            <IconChevronRight
                                size={24}
                                color='#C6D0EB'
                            />
                        }
                        previousControlIcon={
                            <IconChevronLeft
                                size={24}
                                color='#C6D0EB'
                            />
                        }
                        align='start'
                        styles={{
                            root: {
                                maxWidth: '1200px',

                                '@media screen and (max-width: 1250px)': {
                                    maxWidth: '900px',
                                },

                                '@media screen and (max-width: 960px)': {
                                    maxWidth: '600px',
                                },
                                '@media screen and (max-width: 768px)': {
                                    maxWidth: '300px',
                                },
                            },

                            control: {
                                width: '3rem',
                                height: '3rem',
                                border: '1px solid #C6D0EB',
                                backgroundColor: '#1B1464',

                                '@media screen and (max-width: 768px)': {
                                    width: '2rem',
                                    height: '2rem',
                                },
                            },

                            controls: {
                                top: 'none',
                                bottom: '-8rem',
                                right: '10rem',
                                justifyContent: 'right',
                                gap: '12px',

                                '@media screen and (max-width: 768px)': {
                                    bottom: '0rem',
                                    right: '12rem',
                                },
                            },

                            indicator: {
                                backgroundColor: '#1B1464',
                            },
                        }}
                    >
                        {posts.map((post) => {
                            const date = new Date(
                                post.created_time
                            ).toLocaleString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                            })
                            return (
                                <Carousel.Slide key={post.id}>
                                    <BlogCard
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{
                                            opacity: isInView ? 1 : 0,
                                            scale: isInView ? 1 : 0.5,
                                        }}
                                        transition={{
                                            delay: 1.5,
                                            default: {
                                                duration: 5,
                                                ease: [0, 0.71, 0.2, 1.01],
                                            },
                                            scale: {
                                                type: 'tween',
                                                damping: 10,
                                                stiffness: 100,
                                                restDelta: 0.001,
                                            },
                                        }}
                                        cover={
                                            post?.cover?.external?.url ||
                                            'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1429&q=80'
                                        }
                                    >
                                        <div className='thumbnail'></div>
                                        <span className='category'>
                                            {post?.properties?.Tags?.select
                                                ?.name || 'New'}
                                        </span>
                                        <div className='content'>
                                            <p>{date}</p>
                                            <h1>
                                                {post?.properties?.Titre
                                                    ?.title[0]?.plain_text ||
                                                    'Article'}
                                            </h1>
                                            <Link
                                                href={`/article/${post.id}`}
                                                locale='fr'
                                            >
                                                {t('readNow')} →
                                            </Link>
                                        </div>
                                    </BlogCard>
                                </Carousel.Slide>
                            )
                        })}
                    </Carousel>
                    <SeeAllBtnWrapper>
                        <RoundedButton href='/blog'>
                            {t('seeAll')}
                        </RoundedButton>
                    </SeeAllBtnWrapper>
                </CarouselContainer>
            </HomeSection05Wrapper>
        </HeroContainer>
    )
}

const CarouselContainer = styled.div`
    position: relative;
`

const SeeAllBtnWrapper = styled.div`
    position: absolute;
    width: 157px;
    bottom: 4.5rem;
    right: 0;

    @media screen and (max-width: 768px) {
        right: 2rem;
        bottom: 8.5rem;
    }
`

const BlogSlogan = styled(SloganSection01)`
    text-align: center;
`

const BlogCard = styled(motion.div)`
    width: 286.72px;
    height: 344.74px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #e2e2e2;
    /* shadow box 2 */

    box-shadow: 4px 10px 16px rgba(0, 0, 0, 0.07);
    border-radius: 20px;

    .thumbnail {
        position: relative;
        width: 286.72px;
        height: 144px;
        object-fit: cover;
        border-radius: 20px 20px 0px 0px;
        background: url(${(props) => props.cover});
    }

    .category {
        background: #1b1464;
        width: 286.72px;
        border-radius: 0px 0px 14px 14px;
        padding: 0.5rem 2rem;
        font-family: 'Gilroy';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;

        color: #ffffff;
    }

    .content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        h1 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 17px;
            line-height: 22px;
            /* or 129% */

            color: #1b1464;
        }

        p {
            font-weight: 400;
            font-size: 16px;
            line-height: 29px;
            letter-spacing: 0.327px;

            color: #0657cf;
        }

        a {
            color: #0657cf;
            font-weight: 600;
            font-size: 16px;

            &::after {
                content: '';
                display: block;
                width: 100%;
                height: 2px;
                background: #0657cf;
                margin-top: 2px;
            }
        }
    }
`

export default BlogSection
