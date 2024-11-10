export const registrationFormField = [
  {
    name: "firstName",
    label: "First name",
    placeholder: "Enter your first name",
    type: "text",
    min: 2,
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Enter your last name",
    type: "text",
    min: 2,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "sample@gmail.com",
    type: "email",
    // pattern: "[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-Z]{2,}$",
    title: "Please enter a valid email address (e.g., user@example.com)",
  },
  {
    name: "username",
    label: "username",
    placeholder: "Enter a unique username",
    type: "text",
    min: 4,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter a password",
    type: "password",
    pattern:
      "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
    title:
      "Password must contain at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character",
    min: 8,
  },
  {
    name: "confirmPassword",
    label: "confirm your password",
    placeholder: "Confirm your password",
    type: "password",
    min: 8,
  },
];

export const loginFormFields = [
  {
    name: "username",
    label: "username",
    placeholder: "Enter your username",
    type: "text",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    type: "password",
  },
];
