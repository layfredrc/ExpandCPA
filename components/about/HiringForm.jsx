import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import GradientButton from '../button/GradientButton'

import { useState, useRef } from 'react'
import {
    TextInput,
    Modal,
    Group,
    Textarea,
    Flex,
    Loader,
    Center,
} from '@mantine/core'

import { IconCircleCheck, IconCircleX } from '@tabler/icons'

import { Text, Button, createStyles } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons'

import { motion, useInView } from 'framer-motion'

import { useForm } from '@mantine/form'

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: 30,
        width: '300px',
        '@media screen and (min-width: 600px)': {
            width: '400px',
        },

        '@media screen and (min-width: 1600px)': {
            transform: 'translateX(-30%)',
        },
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
        color: '#1B1464',
    },

    icon: {
        color: '#2457F5',
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
        background: '#0657CF',
    },
}))

const HiringForm = () => {
    const { t } = useTranslation('common')
    const { classes, theme } = useStyles()
    const [opened, setOpened] = useState(false)
    const [openedError, setOpenedError] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const openRef = useRef(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const onDrop = (acceptedFiles) => {
        // Update the selectedFile state with the accepted file
        setSelectedFile(acceptedFiles[0])
    }

    // Define your validation functions
    const validateEmail = (value) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        return emailRegex.test(value)
            ? null
            : 'Please enter a valid email address'
    }

    const validateRequired = (value) => {
        if (value === undefined) return 'This field is required'
        return value.trim() !== '' ? null : 'This field is required'
    }

    const validatePhone = (value) => {
        const phoneRegex = /^\d{1,4}\s?\d{1,4}\s?\d{1,4}$/
        return phoneRegex.test(value)
            ? null
            : 'Please enter a valid phone number'
    }

    const form = useForm({
        initialValues: {
            lastName: '',
            firstName: '',
            email: '',
            phone: '',
            message:
                "Bonjour, \nJe souhaiterais postuler au sein de votre cabinet et m'entretenir avec la Direction. \nJe vous remercie par avance de bien vouloir me recontacter",
        },

        validate: {
            lastName: (value) => validateRequired(value),
            firstName: (value) => validateRequired(value),
            email: (value) => validateEmail(value),
            phone: (value) => validatePhone(value),
            message: (value) => validateRequired(value),
        },

        validateInputOnBlur: true,
    })

    async function handleOnSubmit(e) {
        e.preventDefault()

        // Check for file selection
        if (!selectedFile) {
            setOpenedError(true)
            return
        }

        // Validate the form
        form.validate()
        if (Object.keys(form.errors).length !== 0) {
            console.error('Validation errors:', form.errors)
            return // Exit early if there are validation errors
        }

        setIsLoading(true)

        try {
            const formData = constructFormData(e)

            const res = await fetch('/api/hiring/', {
                method: 'POST',
                body: formData,
            })

            const resBody = await res.json()
            console.log(resBody)

            if (res.status === 200 && resBody.status === 'success') {
                handleSuccess()
            } else {
                handleError(res)
            }
        } catch (error) {
            console.error('Error during form submission:', error)
            setIsLoading(false)
        }
    }

    function constructFormData(e) {
        const formData = new FormData()

        formData.append('file', selectedFile)
        formData.append('firstName', e.currentTarget.elements.firstName.value)
        formData.append('lastName', e.currentTarget.elements.lastName.value)
        formData.append('phone', e.currentTarget.elements.phone.value)
        formData.append('email', e.currentTarget.elements.email.value)
        formData.append('message', e.currentTarget.elements.message.value)

        return formData
    }

    async function submitForm(formData) {
        const response = await fetch('/api/hiring/', {
            method: 'POST',
            body: formData,
        })

        return response
    }

    function handleSuccess() {
        console.log('Form submitted successfully')
        form.reset()
        setSelectedFile(null) // Reset file
        setIsLoading(false)
        setOpened(true)
    }

    function handleError(response) {
        console.error('Failed to submit the form', response.statusText)
        setIsLoading(false)
        setOpenedError(true)
    }

    return (
        <ContactFormContainer
            id='contact'
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
            <Form
                method='post'
                onSubmit={handleOnSubmit}
            >
                <FormLayout>
                    <TextContentContainer>
                        <h1>{t('joinUsText')}</h1>

                        <FormColumn>
                            <Group
                                position='left'
                                spacing='xl'
                            >
                                <TextInput
                                    label={t('lastName')}
                                    placeholder={t('lastName')}
                                    type='text'
                                    radius='lg'
                                    size='lg'
                                    name='lastName'
                                    {...form.getInputProps('lastName', {
                                        onBlur: () => form.validate('lastName'),
                                    })}
                                    error={form.errors.lastName}
                                    styles={{
                                        defaultVariant: {
                                            borderColor: '#2457F5',
                                            '&:focus': {
                                                borderColor: '#2457F5',
                                            },
                                        },

                                        label: {
                                            marginBottom: 6,
                                            fontFamily: 'Gilroy',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            /* identical to box height, or 143% */

                                            /* Gray/700 */

                                            color: '#344054',
                                        },
                                    }}
                                />
                                <TextInput
                                    label={t('firstName')}
                                    placeholder={t('firstName')}
                                    type='text'
                                    radius='lg'
                                    size='lg'
                                    name='firstName'
                                    {...form.getInputProps('firstName', {
                                        onBlur: () =>
                                            form.validate('firstName'),
                                    })}
                                    error={form.errors.firstName}
                                    styles={{
                                        defaultVariant: {
                                            borderColor: '#2457F5',
                                            '&:focus': {
                                                borderColor: '#2457F5',
                                            },
                                        },
                                        label: {
                                            marginBottom: 6,
                                            fontFamily: 'Gilroy',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            /* identical to box height, or 143% */

                                            /* Gray/700 */

                                            color: '#344054',
                                        },
                                    }}
                                />
                            </Group>

                            <TextInput
                                label='Email'
                                placeholder='jean.dupont@votre-entreprise.com'
                                type='email'
                                radius='lg'
                                size='lg'
                                name='email'
                                {...form.getInputProps('email', {
                                    onBlur: () => form.validate('email'),
                                })}
                                error={form.errors.email}
                                styles={{
                                    defaultVariant: {
                                        borderColor: '#2457F5',
                                        '&:focus': {
                                            borderColor: '#2457F5',
                                        },
                                    },

                                    label: {
                                        marginBottom: 6,
                                        fontFamily: 'Gilroy',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        /* identical to box height, or 143% */

                                        /* Gray/700 */

                                        color: '#344054',
                                    },
                                }}
                            />

                            <TextInput
                                label={t('phone')}
                                placeholder='01 23 45 67 89'
                                type='tel'
                                radius='lg'
                                size='lg'
                                name='phone'
                                {...form.getInputProps('phone', {
                                    onBlur: () => form.validate('phone'),
                                })}
                                error={form.errors.phone}
                                styles={{
                                    defaultVariant: {
                                        borderColor: '#2457F5',
                                        '&:focus': {
                                            borderColor: '#2457F5',
                                        },
                                    },
                                    label: {
                                        marginBottom: 6,
                                        fontFamily: 'Gilroy',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        /* identical to box height, or 143% */

                                        /* Gray/700 */

                                        color: '#344054',
                                    },
                                }}
                            />
                            <Textarea
                                placeholder={t('your_message')}
                                label={t('Message')}
                                name='message'
                                {...form.getInputProps('message', {
                                    onBlur: () => form.validate('message'),
                                })}
                                radius='lg'
                                styles={{
                                    defaultVariant: {
                                        borderColor: '#2457F5',
                                        '&:focus': {
                                            borderColor: '#2457F5',
                                        },
                                    },
                                    label: {
                                        marginBottom: 6,
                                        fontFamily: 'Gilroy',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        /* identical to box height, or 143% */

                                        /* Gray/700 */

                                        color: '#344054',
                                    },
                                }}
                            />
                            <Modal
                                opened={opened}
                                onClose={() => {
                                    setOpened(false)
                                }}
                                overlayColor={
                                    theme.colorScheme === 'dark'
                                        ? theme.colors.dark[9]
                                        : theme.colors.gray[2]
                                }
                                overlayOpacity={0.55}
                                overlayBlur={3}
                                transitionDuration={400}
                                centered
                                radius='md'
                                padding='xl'
                                size='lg'
                            >
                                <Group position='center'>
                                    <Flex
                                        direction='column'
                                        align='center'
                                        justify='center'
                                        gap={30}
                                    >
                                        <TextContentContentModal>
                                            <h1>{t('form_success_title')}</h1>
                                            <p>{t('form_success_subtitle')}</p>
                                        </TextContentContentModal>
                                        <IconCircleCheck
                                            size={60}
                                            color='#4364F7'
                                        />
                                    </Flex>
                                </Group>
                            </Modal>

                            <Modal
                                opened={openedError}
                                onClose={() => {
                                    setOpenedError(false)
                                }}
                                overlayColor={
                                    theme.colorScheme === 'dark'
                                        ? theme.colors.dark[9]
                                        : theme.colors.gray[2]
                                }
                                overlayOpacity={0.55}
                                overlayBlur={3}
                                transitionDuration={400}
                                centered
                                radius='md'
                                padding='xl'
                                size='lg'
                            >
                                <Group position='center'>
                                    <Flex
                                        direction='column'
                                        align='center'
                                        justify='center'
                                        gap={30}
                                    >
                                        <TextContentContentModal>
                                            <h1>File is required</h1>
                                            <p>Please upload your resume</p>
                                        </TextContentContentModal>
                                        <IconCircleX
                                            size={60}
                                            color='#4364F7'
                                        />
                                    </Flex>
                                </Group>
                            </Modal>
                        </FormColumn>
                    </TextContentContainer>
                    <InputFileColumn>
                        <div className={classes.wrapper}>
                            <Dropzone
                                openRef={openRef}
                                onDrop={onDrop}
                                onReject={(files) =>
                                    console.log('rejected files', files)
                                }
                                className={classes.dropzone}
                                radius='md'
                                name='file'
                                multiple={false}
                                accept={[MIME_TYPES.pdf]}
                            >
                                <div style={{ pointerEvents: 'none' }}>
                                    <Group position='center'>
                                        <Dropzone.Accept>
                                            <IconDownload
                                                size={50}
                                                color='#4364F7'
                                                stroke={1.5}
                                            />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <IconX
                                                size={50}
                                                color={theme.colors.red[6]}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            <IconCloudUpload
                                                size={50}
                                                color='#4364F7'
                                                stroke={1.5}
                                            />
                                        </Dropzone.Idle>
                                    </Group>

                                    <Text
                                        align='center'
                                        weight={700}
                                        size='lg'
                                        mt='xl'
                                    >
                                        <Dropzone.Accept>
                                            Drop files here
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            Pdf file less than 30mb
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            Upload resume
                                        </Dropzone.Idle>
                                    </Text>

                                    {selectedFile ? (
                                        <Text
                                            align='center'
                                            size='sm'
                                            mt='xs'
                                            color='dimmed'
                                        >
                                            {selectedFile.name}
                                        </Text>
                                    ) : (
                                        <Text
                                            align='center'
                                            size='sm'
                                            mt='xs'
                                            color='dimmed'
                                        >
                                            Drag n Drop your file here
                                        </Text>
                                    )}
                                </div>
                            </Dropzone>

                            <Button
                                className={classes.control}
                                size='md'
                                radius='xl'
                                onClick={() => openRef.current?.()}
                            >
                                Select files
                            </Button>
                        </div>
                    </InputFileColumn>
                </FormLayout>
                {isLoading ? (
                    <Loader
                        variant='dots'
                        color='#0657CF'
                    />
                ) : (
                    <GradientButton
                        type='submit'
                        size='md'
                        width='300px'
                        weight='400'
                        radius='xl'
                        gradientColor='#0657CF'
                    >
                        {t('contactFormBtnLabel')}
                    </GradientButton>
                )}
            </Form>
        </ContactFormContainer>
    )
}

export default HiringForm

const ContactFormContainer = styled(motion.div)`
    background: linear-gradient(
        360deg,
        rgba(217, 224, 236, 0.25) 0%,
        rgba(217, 224, 236, 0) 119.76%
    );

    min-height: 100vh;

    @media screen and (min-width: 768px) {
        padding: 5rem;
    }
    @media screen and (min-width: 1024px) {
        padding: 5rem 10%;
        flex-flow: row;
    }

    @media screen and (min-width: 1440px) {
        padding: 5rem 14%;
    }
    @media screen and (min-width: 1800px) {
        padding: 5rem 18%;
    }

    @media screen and (min-width: 2100px) {
        padding: 5rem 22%;
    }
    @media screen and (min-width: 2500px) {
        padding: 5rem 25%;
    }
`

const Form = styled.form`
    display: flex;
    flex-flow: column;
    gap: 2rem;
    padding: 2rem;
    margin-top: 2rem;
`

const FormLayout = styled.div`
    display: flex;
    justify-content: space-between;
    flex-flow: column;
    gap: 2rem;
    @media screen and (min-width: 1200px) and (max-width: 1250px) {
        flex-flow: row;
        justify-content: space-around;
    }

    @media screen and (min-width: 1250px) {
        flex-flow: row;
    }
`

const TextContentContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
    color: #1b1464;

    h1 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 44px;
        /* or 122% */

        letter-spacing: -0.02em;

        color: #1b1464;

        @media screen and (min-width: 768px) {
            width: 448px;
            height: 88px;
        }
    }
`

const TextContent = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    align-content: center;
    @media screen and (max-width: 1024px) {
        margin-bottom: 3rem;
    }
    @media screen and (min-width: 1024px) {
        align-items: start;
        margin-bottom: 0rem;
    }
    h1 {
        font-family: 'Poppins', sans-serif;
        @media screen and (max-width: 1024px) {
            font-size: 25px;
            line-height: 38px;
            text-align: center;
        }

        @media screen and (min-width: 1024px) {
            font-size: 42px;
            margin-bottom: 1rem;
            line-height: 44px;
            text-align: start;
        }
        @media screen and (min-width: 1440px) {
            font-size: 46px;
            margin-bottom: 1rem;
            line-height: 55px;
            text-align: start;
        }
    }

    p {
        line-height: 24px;
        margin: 1rem 0rem;

        @media screen and (max-width: 1024px) {
            font-size: 18px;
            text-align: center;
            padding: 0rem 1rem;
        }
        @media screen and (min-width: 768px) {
            padding: 0rem 5rem;
        }
        @media screen and (min-width: 1024px) {
            text-align: start;
            font-size: 20px;
            padding: 0rem 0rem;
            width: 80%;
        }
        @media screen and (min-width: 1440px) {
        }
    }
`

const FormColumn = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
`

const InputFileColumn = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
`

const TextContentContentModal = styled.div`
    text-align: center;
    color: #352d61;

    h1 {
        margin-bottom: 1rem;
        font-size: 32px;
        font-weight: 600;
    }

    p {
        font-size: 16px;
    }

    @media screen and (max-width: 768px) {
        padding: 0 2rem;
    }
`
