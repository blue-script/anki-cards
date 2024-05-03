import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgStar = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'17'}
    ref={ref}
    viewBox={'0 0 16 17'}
    width={'16'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#clip0_72724_227)'}>
      <path
        d={
          'M11.7067 14.5C11.6 14.5004 11.4949 14.4753 11.4 14.4266L7.99999 12.6466L4.59999 14.4266C4.48959 14.4847 4.36511 14.5106 4.24071 14.5014C4.11631 14.4923 3.99698 14.4484 3.89628 14.3748C3.79558 14.3012 3.71755 14.2008 3.67107 14.085C3.62459 13.9693 3.61151 13.8428 3.63333 13.72L4.29999 9.96664L1.55333 7.29997C1.46763 7.21446 1.40684 7.10722 1.37748 6.98977C1.34812 6.87232 1.35129 6.74909 1.38666 6.63331C1.4253 6.51482 1.49638 6.40954 1.59183 6.32941C1.68728 6.24928 1.80328 6.19751 1.92666 6.17997L5.72666 5.62664L7.39999 2.20664C7.45458 2.09393 7.53982 1.99887 7.64594 1.93236C7.75205 1.86584 7.87476 1.83057 7.99999 1.83057C8.12523 1.83057 8.24794 1.86584 8.35405 1.93236C8.46017 1.99887 8.5454 2.09393 8.59999 2.20664L10.2933 5.61997L14.0933 6.17331C14.2167 6.19084 14.3327 6.24262 14.4282 6.32275C14.5236 6.40288 14.5947 6.50816 14.6333 6.62664C14.6687 6.74242 14.6719 6.86565 14.6425 6.9831C14.6131 7.10055 14.5524 7.20779 14.4667 7.29331L11.72 9.95997L12.3867 13.7133C12.4105 13.8383 12.398 13.9675 12.3507 14.0856C12.3035 14.2037 12.2234 14.3059 12.12 14.38C11.9993 14.4646 11.8539 14.5068 11.7067 14.5Z'
        }
        fill={props.color}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
      />
    </g>
    <defs>
      <clipPath id={'clip0_72724_227'}>
        <rect fill={'white'} height={'16'} transform={'translate(0 0.5)'} width={'16'} />
      </clipPath>
    </defs>
  </svg>

  // <svg
  //   fill={'none'}
  //   height={24}
  //   ref={ref}
  //   width={24}
  //   xmlns={'http://www.w3.org/2000/svg'}
  //   {...props}
  // >
  //   <g clipPath={'url(#star_svg__a)'}>
  //     <path
  //       d={
  //         'M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18'
  //       }
  //       fill={props.color}
  //       stroke={props.stroke}
  //       strokeWidth={props.strokeWidth}
  //     />
  //   </g>
  //   <defs>
  //     <clipPath id={'star_svg__a'}>
  //       <path d={'M0 0h24v24H0z'} fill={'#fff'} />
  //     </clipPath>
  //   </defs>
  // </svg>
)
const ForwardRef = forwardRef(SvgStar)
const Memo = memo(ForwardRef)

export default Memo
