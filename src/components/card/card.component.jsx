import { Component } from "react";
import "./card.styles.css"


class Card extends Component{

    render(){
        const {name ,id ,email}=this.props.monster;

      return  <div className="card-container" key={id}>
        {/* <h1 key={monster.id}>{monster.name}</h1> */}

        <img
          alt={`monster ${name}`}
          src={`https://robohash.org/${id}?set=set${id}&size=180x180`}
        ></img>
        <h1>{name}</h1>
        <h3>{email}</h3>
      </div>


    }
}
export default Card;