import { Fragment } from "react"
import PropTypes from "prop-types"
import Link from "@/src/Link"
import { styled } from "@mui/material"
import Image from "next/image"

const LogoArea = styled("div")`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
  }

  h3 {
    color: #000;
    text-transform: capitalize;
    font-size: 60px;
    font-weight: 700;
    margin: 0 0 0 10px;
    @media (max-width: 768px) {
      display: none;
    }
  }
`

const LogoNext = ({ className, withLink, linkTo, title, src }) => {
  return (
    <LogoArea className={className}>
      {withLink ? (
        <Link href={linkTo}>
          <a>
            {src && <Image src={src} alt="BO Office" width={80} height={80} />}
            {title && <h3>{title}</h3>}
          </a>
        </Link>
      ) : (
        <Fragment>
          {src && <Image src={src} alt="BO Office" width={80} height={80} />}
          {title && <h3>{title}</h3>}
        </Fragment>
      )}
    </LogoArea>
  )
}

LogoNext.propTypes = {
  className: PropTypes.string,
  withLink: PropTypes.bool,
  linkTo: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
}

export default LogoNext
