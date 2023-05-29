import { Form, Input, Button, Checkbox, Typography, Space, Segmented, Card } from 'antd';
import { FormInstance } from 'antd/lib/form';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';

const { Title, Text } = Typography;

enum FormType {
  Register = 'register',
  SignIn = 'signIn',
}

const MyForm: React.FC = () => {
  const formRef = React.createRef<FormInstance>();
  const [formType, setFormType] = React.useState<FormType>(FormType.Register);

  const onFinish = (values: any) => {
    if(formType === FormType.Register) {

        const firstName = values.firstName;
        const lastName = values.lastName;
        const email = values.email;
        const password = values.password;

        createUserWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
            if(userCredential.user) {
                const user = userCredential.user;
                console.log(user);
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode} - ${errorMessage}`);
        });

        // axios.post('http://localhost:5000/users', values)
    } else {
        console.log('sign in')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
  };

  const validateMessages = {
    required: '${label} is required',
    types: {
      email: 'Invalid ${label}',
    },
    pattern: {
      mismatch: '${label} is invalid',
    },
  };

  const passwordRules = [
    {
      required: true,
      message: 'Please enter a password',
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters long',
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    },
  ];

  const confirmPasswordRules = [
    {
      required: true,
      message: 'Please confirm your password',
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Passwords do not match'));
      },
    }),
  ];

  const termsAndConditionsRules = [
    {
      validator(_, value) {
        if (value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('You must accept the terms and conditions'));
      },
    },
  ];

  const handleFormTypeChange = (value: FormType) => {
    setFormType(value);
  };

  const getFormTitle = () => {
    if (formType === FormType.Register) {
      return 'Register';
    } else {
      return 'Sign In';
    }
  };

  const getFormSubtitle = () => {
    if (formType === FormType.Register) {
      return 'Welcome!';
    } else {
      return 'Welcome back!';
    }
  };

  const getFormButtonText = () => {
    if (formType === FormType.Register) {
      return 'Already have an account?';
    } else {
      return 'Need an account?';
    }
  };

  return (
    <Card style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90%', maxWidth: '500px', margin: '2rem 0', textAlign: 'center'}}>
      <Title level={2}>Connect today!</Title>
      <Text style={{display: 'block'}}>{getFormSubtitle()}</Text>
      <Segmented
        options={[
          { label: 'Register', value: FormType.Register },
          { label: 'Sign In', value: FormType.SignIn },
        ]}
        value={formType}
        onChange={handleFormTypeChange}
        style={{
            margin: '2rem auto',
        }}
      />
      <Form
        name="auth-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        ref={formRef}
      >
        {formType === FormType.Register && (
          <>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  min: 2,
                  message: 'First Name must be at least 2 characters long',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  min: 2,
                  message: 'Last Name must be at least 2 characters long',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={passwordRules}
        >
          <Input.Password />
        </Form.Item>
        {formType === FormType.Register && (
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={confirmPasswordRules}
          >
            <Input.Password />
          </Form.Item>
        )}
        {formType === FormType.Register && (
          <Form.Item
            name="termsAndConditions"
            valuePropName="checked"
            rules={termsAndConditionsRules}
          >
            <Checkbox>
              I accept the terms and conditions and privacy policy
            </Checkbox>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {getFormTitle()}
          </Button>
        </Form.Item>
        <Text>
          {getFormButtonText()}
          <Button type="link" onClick={() => handleFormTypeChange(formType === FormType.Register ? FormType.SignIn : FormType.Register)}>
            {formType === FormType.Register ? 'Sign In' : 'Register'}
          </Button>
        </Text>
      </Form>
    </Card>
  );
};

export default MyForm;
