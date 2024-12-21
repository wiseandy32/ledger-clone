import chooseUsImage1 from "@/assets/choose-us-image-1.png";
import chooseUsImage2 from "@/assets/choose-us-image-2.png";
import chooseUsImage3 from "@/assets/choose-us-image-3.png";
import chooseUsImage4 from "@/assets/choose-us-image-4.jpg";
import chooseUsImage5 from "@/assets/choose-us-image-5.webp";
import chooseUsImage6 from "@/assets/choose-us-image-6.jfif";
import btcIcon from "@/assets/btc-logo.png";
import ethIcon from "@/assets/eth-logo.png";
import usdtIcon from "@/assets/usdt-logo.png";
import xlmIcon from "@/assets/xlm-logo.png";
import xrpIcon from "@/assets/xrp-logo.png";
import dogeIcon from "@/assets/doge-logo.png";
import ltcIcon from "@/assets/ltc-logo.png";
import algoIcon from "@/assets/algo-logo.png";
import solIcon from "@/assets/sol-logo.png";
import bnbIcon from "@/assets/bnb-logo.png";
import qtumIcon from "@/assets/qtum-logo.png";
import tezosIcon from "@/assets/tezos-logo.png";
import thetaIcon from "@/assets/theta-logo.png";
import fileCoinIcon from "@/assets/filecoin-logo.png";
import nanoIcon from "@/assets/nano-logo.png";
import shibaIcon from "@/assets/shiba-logo.png";
// import stellarIcon from "@/assets/stellar-logo.jfif";
// import rippleIcon from "@/assets/ripple-logo.png";
// import tetherIcon from "@/assets/tether-logo.png";
// import tronIcon from "@/assets/tron-logo.png";
import bitcoinQRCode from "@/assets/bitcoin-qr.jpg";
import ethQRCode from "@/assets/eth-qr.jpg";
import xrpQRCode from "@/assets/xrp-qr.jpg";
import xlmQRCode from "@/assets/xlm-qr.jpg";
import usdtQRCode from "@/assets/usdt-trc20-qr.jpg";
import dogeQRCode from "@/assets/doge-qr.jpg";
import algoQRCode from "@/assets/algo-qr.jpg";
import solQRCode from "@/assets/sol-qr.jpg";
import { DollarSign } from "lucide-react";

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
    // pattern:
    //   "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
    // title:
    //   "Password must contain at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character",
    title: "Password must contain at least 4 characters",
    min: 6,
  },
  {
    name: "confirmPassword",
    label: "confirm your password",
    placeholder: "Confirm your password",
    type: "password",
    min: 6,
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

export const wallets = [
  { name: "Ledger", icon: DollarSign, balance: 0.0, value: "ledger_balance" },
  { name: "BTC", icon: btcIcon, balance: 0.0, value: "BTC_balance" },
  { name: "ETH", icon: ethIcon, balance: 0.0, value: "ETH_balance" },
  { name: "USDT", icon: usdtIcon, balance: 0.0, value: "USDT_balance" },
  { name: "XLM", icon: xlmIcon, balance: 0.0, value: "XLM_balance" },
  { name: "XRP", icon: xrpIcon, balance: 0.0, value: "XRP_balance" },
  { name: "DOGE", icon: dogeIcon, balance: 0.0, value: "DOGE_balance" },
  { name: "LTC", icon: ltcIcon, balance: 0.0 },
  { name: "ALGO", icon: algoIcon, balance: 0.0, value: "ALGO_balance" },
  { name: "SOL", icon: solIcon, balance: 0.0, value: "SOL_balance" },
  { name: "BNB", icon: bnbIcon, balance: 0.0 },
  { name: "QTUM", icon: qtumIcon, balance: 0.0 },
  { name: "TEZOS", icon: tezosIcon, balance: 0.0 },
  { name: "THETA", icon: thetaIcon, balance: 0.0 },
  { name: "FILECoin", icon: fileCoinIcon, balance: 0.0 },
  { name: "NANO", icon: nanoIcon, balance: 0.0 },
  { name: "SHIBA", icon: shibaIcon, balance: 0.0 },
  {
    name: "Total Withdrawals",
    icon: thetaIcon,
    balance: 0.0,
    value: "withdrawal_balance",
  },
];

export const depositMethods = [
  { name: "Bitcoin", icon: btcIcon, path: "bitcoin" },
  { name: "Ethereum", icon: ethIcon, path: "ethereum" },
  { name: "XRP", icon: xrpIcon, path: "xrp" },
  { name: "XLM", icon: xlmIcon, path: "xlm" },
  { name: "USDT TRC20", icon: usdtIcon, path: "usdt" },
  { name: "DOGEcoin", icon: dogeIcon, path: "dogecoin" },
  { name: "ALGO", icon: algoIcon, path: "algo" },
  { name: "Solana", icon: solIcon, path: "sol" },
];

export const paymentGateways = [
  {
    type: "Bitcoin",
    value: "BTC_balance",
    qrCode: bitcoinQRCode,
    icon: btcIcon,
    walletAddress: "bc1qx4np0tgsl0ys7jcqes4cva9y40wjhf5nfhv066",
  },
  {
    type: "XRP",
    value: "XRP_balance",
    qrCode: xrpQRCode,
    icon: xrpIcon,
    walletAddress: "r9VvmZmL7VASmBb8p3ByjnjxdKJ62BQme1",
  },
  {
    type: "XLM",
    value: "XLM_balance",
    qrCode: xlmQRCode,
    icon: xlmIcon,
    walletAddress: "GDPNUJUQV6KMBEXDEE3M3EHW6IQPFHIF6LWA45IQOG4Q4NIRKSNV2QZ5",
  },
  {
    type: "ethereum",
    value: "ETH_balance",
    qrCode: ethQRCode,
    icon: ethIcon,
    walletAddress: "0xFb23Bf97A6e70A978F8dC518EC7d83E57aad7584",
  },
  {
    type: "USDT",
    value: "USDT_balance",
    extra: "(TRC20)",
    qrCode: usdtQRCode,
    icon: usdtIcon,
    walletAddress: "TRtxynBmL4fyg7Qa7nJvaEFsVobVysk9PB",
  },
  {
    type: "dogecoin",
    value: "DOGE_balance",
    qrCode: dogeQRCode,
    icon: dogeIcon,
    walletAddress: "DLFyTv52jgjptxXxzwaDwUQUYAZ72vZjKE",
  },
  {
    type: "Sol",
    value: "SOL_balance",
    qrCode: solQRCode,
    walletAddress: "BsfZQAEfvbkxfDQFFGqXfQNVV7y8L6rCprs7MY3VykSf",
  },
  {
    type: "Algo",
    value: "ALGO_balance",
    qrCode: algoQRCode,
    walletAddress: "YCAFLK3SGL4EHGKI7FG2NBWP5JWCMNID3PINF5F3QLQXJMOKRC4SDA36TM",
  },
];

export const withdrawalOptions = [
  {
    title: "XLM",
    value: "XLM_balance",
  },
  {
    title: "XRP",
    value: "XRP_balance",
  },
  {
    title: "Bitcoin",
    value: "BTC_balance",
  },
  {
    title: "USDT",
    value: "USDT_balance",
  },
  {
    title: "Ethereum",
    value: "ETH_balance",
  },
  {
    title: "Doge",
    value: "DOGE_balance",
  },
  {
    title: "Litecoin",
    value: "litecoin_balance",
  },
  {
    title: "ALGORAND",
    value: "ALGO_balance",
  },
  {
    title: "SOLANA",
    value: "SOL_balance",
  },
  {
    title: "BNB",
    value: "bnb_balance",
  },
  {
    title: "QTUM",
    value: "qtum_balance",
  },
  {
    title: "TEZOS (XTZ)",
    value: "tezos_balance",
  },
  {
    title: "THETA",
    value: "theta_balance",
  },
  {
    title: "FILECOIN",
    value: "filecoin_balance",
  },
  {
    title: "NANO",
    value: "nano_balance",
  },
  {
    title: "SHIBA",
    value: "shiba_balance",
  },
];
