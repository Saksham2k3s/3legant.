import { LiaShippingFastSolid } from "react-icons/lia";
import { CiMoneyBill, CiLock, CiPhone } from "react-icons/ci";
import carouselImage from "../assets/Paste image.png";
import carouselImage2 from "../assets/shop-page-header.png"
export const valueCardData = [
    {
        Icon : <LiaShippingFastSolid size={48} />,
        title : 'Free Shipping',
        subtitle : 'Order above $200'
    },
    {
        Icon : <CiMoneyBill size={48} />,
        title : 'Money-back',
        subtitle : '30 days guarantee'
    },
    {
        Icon : <CiLock size={48} />,
        title : 'Secure Payments',
        subtitle : 'Secure by Stripe'
    },
    {
        Icon : <CiPhone size={48} />,
        title : '24/7 Support',
        subtitle : 'Phone and Email Support'
    },
]

export const carouselImages = [
    {
       url : carouselImage
    },
    {
        url : carouselImage
    }
];