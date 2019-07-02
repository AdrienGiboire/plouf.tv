import React from "react"
import PropTypes from "prop-types"

class HeroesPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hero: null
    }
  }

  pickRandomHero () {
    const index = Math.floor(Math.random() * this.props.heroes.length) + 1
    this.setState({hero: this.props.heroes[index]})
  }

  render () {
    let randomHero

    if (this.state.hero) {
      randomHero = (
        <div className='random-hero'>
          <div className='icon'>
            <img src={this.state.hero['icon_url']['92x93']} />
          </div>
          <div className='name'>
            <p>{this.state.hero['name']}</p>
          </div>
        </div>
      )
    }

    const heroes = this.props.heroes.map((hero) => {
      return (
        <div className='hero' key={hero['attribute_id']}>
          <div className='icon'>
            <img src={hero['icon_url']['92x93']} />
          </div>
          <div className='name'>
            <p>{hero['name']}</p>
          </div>
        </div>
      )
    })

    return (
      <React.Fragment>
        {randomHero}

        <div className='button-wrapper'>
          <button onClick={this.pickRandomHero.bind(this)}>
            Pick
          </button>
        </div>

        <p className='hint'>
          Les données proviennent de hotsapi.net. C'est un super site mais le développeur traine un peu à corriger le problème des avatars pétés. Je ne peux pas y faire grand chose !
        </p>

        <div className='heroes'>
          {heroes}
        </div>
      </React.Fragment>
    );
  }
}

HeroesPicker.propTypes = {
  heroes: PropTypes.array
};
export default HeroesPicker
