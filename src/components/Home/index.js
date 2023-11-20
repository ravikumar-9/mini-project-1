import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import Footer from '../Footer'

import CarouselImages from '../CarouselImages'

import Counter from '../Counter'

import './home.css'

const loaderApiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

class Home extends Component {
  state = {
    loaderApiStatus: loaderApiConstants.initial,
    offersList: [],
    activePageNumber: 1,
  }

  componentDidMount() {
    this.getOffersList()
  }

  getOffersList = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({loaderApiStatus: loaderApiConstants.inProgress})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Barer ${jwtToken}`,
      },
    }

    const offersResponse = await fetch(url, options)

    if (offersResponse.ok === true) {
      const offersResponseData = await offersResponse.json()

      const updatedOffersList = offersResponseData.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      // console.log(offersResponseData)
      this.setState({
        offersList: updatedOffersList,
        loaderApiStatus: loaderApiConstants.success,
      })
    }
  }

  onIncreasePageNumber = () => {
    const {activePageNumber} = this.state
    if (activePageNumber < 4) {
      this.setState(prevState => ({
        activePageNumber: prevState.activePageNumber + 1,
      }))
    }
  }

  onDecreasePageNumber = () => {
    const {activePageNumber} = this.state
    if (activePageNumber > 1) {
      this.setState(prev => ({
        activePageNumber: prev.activePageNumber - 1,
      }))
    }
  }

  renderOffersLoader = () => (
    <div className="offers-loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderOffersCarousel = () => {
    const {offersList} = this.state
    console.log(offersList)
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(eachCarousel => (
            <CarouselImages
              carouselDetails={eachCarousel}
              key={eachCarousel.id}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderOffersList = () => {
    const {loaderApiStatus} = this.state

    switch (loaderApiStatus) {
      case loaderApiConstants.inProgress:
        return this.renderOffersLoader()

      case loaderApiConstants.success:
        return this.renderOffersCarousel()

      default:
        return null
    }
  }

  render() {
    const {activePageNumber} = this.state
    return (
      <div>
        <Header />
        <div className="carousel-container">{this.renderOffersList()}</div>
        <div className="restaurant-list-container">
          <Counter
            activePageNumber={activePageNumber}
            onIncreasePageNumber={this.onIncreasePageNumber}
            onDecreasePageNumber={this.onDecreasePageNumber}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
