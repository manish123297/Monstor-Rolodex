import { Component } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
// --------------------------Shallow Merge (section1 start)----------------------------------
class App1 extends Component {
  constructor() {
    super();
    this.state = {
      name: { firstname: "Travor", lastname: "Noah" }, //------------line1
      company: "ZTM",
    };
  }

  render() {
    return (
      <div className="App">
        <h1>
          Hii i am {this.state.name.firstname} {this.state.name.lastname} ,i
          works in {this.state.company}
        </h1>
        <button
          // method-1 of shallow merge
          onClick={() => {
            this.setState({ name: { firstname: "Kelly ", lastname: "jener" } }); //------line2

            // Note:In line1 and line2 Type of the "name" should be same .
            // In line1 type is obj hence in line2 type of name also should be obj only for
            // correct rendering this is  also called ""Shallow Merge""
            console.log(this.state);
          }}

          // method-2 of shallow merge
          // this.setState(()=>{
          // return{ name: { firstname: "Kelly ", lastname: "jener" }
          // },
          // ()=>{ Optional-> here we write the code that we want to run once the 1st callback run succefully})
        >
          Change name
        </button>
      </div>
    );
  }
}
// --------------------------Shallow Merge (section1 end)----------------------------------

// ------------------------monster Rolodex in Single component App2(section 2 start)------------
class App2 extends Component {
  constructor() {
    super();
    // this.state = {
    //   monster1: {
    //     name: "Linda",
    //   },
    //   monster2: {
    //     name: "Frank",
    //   },
    //   monster3: {
    //     name: "Jacky",
    //   },
    // };

    this.state = {
      monsters: [],
      searchFiels: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // console.log(response.json());
        return response.json();
      })
      .then((users) => {
        // console.log(users);
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            // console.log(this.state.monsters);
          }
        );
      });
  }

  OnSearchChange = (event) => {
    console.log(event.target.value);
    const searchString = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchFiels: searchString };
    });
  };
  render() {
    const { monsters, searchFiels } = this.state;
    const filteredmonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchFiels);
    });
    const { OnSearchChange } = this;
    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="Search monsters"
          onChange={OnSearchChange}
        ></input>
        {filteredmonsters.map((monster) => {
          return <h1 key={monster.id}>{monster.name}</h1>;
        })}
      </div>
    );
  }
}

// ------------------------monster Rolodex in Single component App2(section 2 end)------------

// -monster Rolodex in multiple component(eg card-list,search-box)(section 3 start)------------
class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchFiels: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // console.log(response.json());
        return response.json();
      })
      .then((users) => {
        // console.log(users);
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            // console.log(this.state.monsters);
          }
        );
      });
  }
  OnSearchChange = (event) => {
    console.log(event.target.value);
    const searchString = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchFiels: searchString };
    });
  };

  render() {
    const { monsters, searchFiels } = this.state;
    const filteredmonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchFiels);
    });
    const { OnSearchChange } = this;
    return (
      <div className="App">
        <SearchBox
          OnChangeHandler={OnSearchChange}
          placeholder="search monster"
          className="search-box"
        ></SearchBox>
        <CardList monsters={filteredmonsters}></CardList>
      </div>
    );
  }
}

// --monster Rolodex in multiple component(eg card-list,search-box)(section 3 end)------------
export default App;

// Important remarks:
// 1.Order of methods Run==>constructor-render(initialStatemount)-componentDidMount
// 2.whenever there will be any change in the state component will rerender
// 3.Components get rerendered whenever there will be any change in "props" of that component
