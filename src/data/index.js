import chooseUsImage1 from "@/assets/choose-us-image-1.png";
import chooseUsImage2 from "@/assets/choose-us-image-2.png";
import chooseUsImage3 from "@/assets/choose-us-image-3.png";
import chooseUsImage4 from "@/assets/choose-us-image-4.jpg";
import chooseUsImage5 from "@/assets/choose-us-image-5.webp";
import chooseUsImage6 from "@/assets/choose-us-image-6.jfif";

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
    name: "email",
    label: "email",
    placeholder: "Enter your email address",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    type: "password",
  },
];

export const chooseUsCardInfo = [
  {
    title: "Digital Adaptation",
    subtext:
      "The Quantum Financial System (QFS) is indeed a real concept and a subject of ongoing research and development but has yet to be fully implemented globally.",
    start: 1,
    image: chooseUsImage1,
  },
  {
    title: "Quantum Financial System",
    subtext:
      "The Quantum Financial System (QFS) originally began as a concept that was then developed by various researchers, scientists, and experts in the fields of finance, physics, and computer science over a period of time. There is no single person or entity that created the quantum financial system (QFS).",
    image: chooseUsImage2,
  },
  {
    title: "How it Works",
    subtext:
      "One of the key features of the new quantum financial system is its use of quantum computing technology. Quantum computing is a form of computing that uses quantum-mechanical phenomena, such as superposition and entanglement, to perform operations on data.",
    image: chooseUsImage3,
  },
  {
    title: "Near Instantaneous Transaction",
    subtext:
      "One of the more exciting aspects of the new quantum financial system is its potential for near-instantaneous financial transactions. With the use of quantum computing and blockchain technology, it will become possible to conduct financial transactions in real-time and without the need for intermediaries (like banks).",
    image: chooseUsImage4,
  },
  {
    title: "Increased Security",
    subtext:
      "Increased Security Another benefit of the new quantum financial system is increased (transactional) security. With the use of quantum computing and blockchain technology, it will be much more difficult for hackers to steal financial information or conduct fraudulent transactions. This will increase the security of financial transactions, making it safer for businesses and individuals to conduct financial transactions.",
    image: chooseUsImage5,
  },
  {
    title: "Blockchain Utilization",
    subtext:
      "A key component of the quantum financial system is its utilization of blockchain technology (a decentralized digital ledger that records transactions across a network of computers). In this new quantum financial system, blockchain technology will be used to assist in the creation of a secure and transparent financial system.",
    image: chooseUsImage6,
  },
];
