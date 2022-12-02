import { Component } from "react";
import "./card-list.styles.css";
import "../card/card.component.jsx"
import Card from "../card/card.component.jsx";
class CardList extends Component {
  render() {
    const { monsters } = this.props;
    return (
      <div className="card-list">
        {monsters.map((monster) => {

            // const {name ,email,id}=monster;
          return (
            <Card monster={monster}></Card>
          );
        })}
      </div>
    );
  }
}
export default CardList;
