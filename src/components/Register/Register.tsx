import { Button, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import authApi from 'src/apis/auth.api'
import { User, userSchema } from 'src/types/user.type'
import { ErrorResponse } from 'src/types/utils.type'
import { encodeBase64, isAxiosInternalServerError } from 'src/utils/utils'
import { toast } from 'react-toastify'
import { useState } from 'react'
import CustomInput from '../CustomInput'
import { useNavigate } from 'react-router-dom'

interface Props {
  setIsLoginTab: React.Dispatch<React.SetStateAction<boolean>>
}

export const Register = ({ setIsLoginTab }: Props) => {
  const navigate = useNavigate()
  const [openPopoverFirstName, setOpenPopoverFirstName] = useState<boolean>(false)
  const [openPopoverLastName, setOpenPopoverLastName] = useState<boolean>(false)
  const [openPopoverEmail, setOpenPopoverEmail] = useState<boolean>(false)
  const [openPopoverPassword, setOpenPopoverPassword] = useState<boolean>(false)
  const [openPopoverConfirmPassword, setOpenPopoverCofirmPassword] = useState<boolean>(false)
  const [openPopoverPhone, setOpenPopoverPhone] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const signupMutation = useMutation({
    mutationFn: (body: Pick<User, 'email' | 'password' | 'lastName' | 'firstName' | 'confirmPassword' | 'phone'>) =>
      authApi.signUp(body),
    onSuccess: (res, vars) => {
      toast.success(res.data.message, { autoClose: 2000 })
      navigate('/confirm/' + encodeBase64(vars.email))
      setIsLoginTab(true)
    },
    onError: (error) => {
      if (isAxiosInternalServerError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          toast.error(formError.message, { autoClose: 2000 })
        }
      }
    }
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    initialTouched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      phone: false,
      confirmPassword: false
    },
    validationSchema: userSchema,
    onSubmit: async (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await signupMutation.mutate(data)
    }
  })

  return (
    <div>
      <CardHeader
        floated={false}
        shadow={false}
        color='transparent'
        className='mb-4 flex flex-col justify-center items-center gap-2 place-items-center mt-4'
      >
        <Typography variant='h4' className='text-[#0c2964]'>
          WELLCOME
        </Typography>
        <span className='text-[#0c2964]'>Register new account!</span>
      </CardHeader>
      <CardBody className='mb-6'>
        <form id='form-register' onSubmit={formik.handleSubmit} className='flex flex-col gap-4 '>
          {/* email */}
          <CustomInput
            type='text'
            openPopoverError={openPopoverEmail}
            setOpenPopoverError={setOpenPopoverEmail}
            formik={formik}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            label='Email'
            id='my-email'
            name='email'
          />
          {/* first name */}
          <CustomInput
            type='text'
            openPopoverError={openPopoverFirstName}
            setOpenPopoverError={setOpenPopoverFirstName}
            formik={formik}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            label='First Name'
            id='firstName'
            name='firstName'
          />
          {/* last name */}
          <CustomInput
            type='text'
            openPopoverError={openPopoverLastName}
            setOpenPopoverError={setOpenPopoverLastName}
            formik={formik}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            label='Last Name'
            id='lastName'
            name='lastName'
          />
          {/* Phone */}
          <CustomInput
            type='text'
            openPopoverError={openPopoverPhone}
            setOpenPopoverError={setOpenPopoverPhone}
            formik={formik}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            label='Phone'
            id='my-phone'
            name='phone'
          />
          {/* password */}
          <CustomInput
            type='password'
            openPopoverError={openPopoverPassword}
            setOpenPopoverError={setOpenPopoverPassword}
            formik={formik}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            label='Password'
            id='my-password'
            name='password'
          />
          {/* password */}
          <CustomInput
            type='password'
            openPopoverError={openPopoverConfirmPassword}
            setOpenPopoverError={setOpenPopoverCofirmPassword}
            formik={formik}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            label='Confirm password'
            id='my-confirm-password'
            name='confirmPassword'
          />
        </form>
      </CardBody>
      <CardFooter className='pt-0'>
        <Button
          type='submit'
          form='form-register'
          variant='gradient'
          color='blue'
          className='text-lg leading-5'
          fullWidth
        >
          Sign up
        </Button>
      </CardFooter>
    </div>
  )
}

export default Register
