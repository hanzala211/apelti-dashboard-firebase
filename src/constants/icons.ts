import { Bell, Menu, Search } from "lucide-react";
import { FaArrowCircleLeft, FaUserEdit } from "react-icons/fa";
import { FiPlus, FiUsers } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { TbLogout, TbReportSearch } from "react-icons/tb";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";


export const ICONS = {
  documentSVG: CgFileDocument,
  dashboardSVG: "/assets/icons/dashboard.svg",
  approvalSVG: "/assets/icons/approval.svg",
  invoiceSVG: HiOutlineDocumentCurrencyDollar,
  logoSVG: "/assets/icons/logo.svg",
  messageSVG: "/assets/icons/messages.svg",
  paymentSVG: "/assets/icons/payment.svg",
  postingSVG: "/assets/icons/posting.svg",
  reportSVG: TbReportSearch,
  settingSVG: IoSettingsOutline,
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
  logout: TbLogout,
  delete: MdDeleteOutline,
  userEdit: FaUserEdit,
  menu: Menu,
  edit: RiEditLine
}