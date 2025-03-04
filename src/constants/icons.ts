import { Bell, Search } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FiPlus, FiUsers } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { TbLogout, TbReportSearch } from "react-icons/tb";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";


export const iconsPath = {
  documentSVG: "/assets/icons/document.svg",
  dashboardSVG: "/assets/icons/dashboard.svg",
  approvalSVG: "/assets/icons/approval.svg",
  invoiceSVG: HiOutlineDocumentCurrencyDollar,
  logoSVG: "/assets/icons/logo.svg",
  messageSVG: "/assets/icons/messages.svg",
  paymentSVG: "/assets/icons/payment.svg",
  postingSVG: "/assets/icons/posting.svg",
  reportSVG: TbReportSearch,
  settingSVG: "/assets/icons/settings.svg",
  supplierSVG: "/assets/icons/supplier.svg",
  teamSVG: FiUsers,
  plusIcon: FiPlus,
  searchIcon: Search,
  bellIcon: Bell,
  leftArrow: FaArrowCircleLeft,
  close: "/assets/icons/close.svg",
  add_invoice: "/assets/icons/add-invoice.svg",
  leftArrowSlider: MdKeyboardArrowLeft,
  rightArrowSlider: MdKeyboardArrowRight,
  loginImage: "/assets/images/login.svg",
  arrowDown: IoIosArrowDown,
  logout: TbLogout
}