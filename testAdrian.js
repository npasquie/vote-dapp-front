import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {

    state = {
        listes: [

        ],

        nouvelleListe: '',

        nomElection:''
    };
    handleSubmit = (event) => {
        event.preventDefault(); //Ne rafraichi pas la page
        const id= new Date().getTime();
        const  nom = this.state.nouvelleListe;

        const listes = this.state.listes.slice();

        listes.push({id, nom});

        this.setState({listes: listes, nouvelleListe:''});
    };

    handleName = (event)=> {
        event.preventDefault();
        const name= this.state.nomElection;
        const nomElection= this.state.nomElection.slice();

        nomElection.push({name});
        this.setState({nomElection:''});


    }

    handleDelete = id => {
        const listes = this.state.listes.slice();
        const index = listes.findIndex(function(listes) {
            return listes.id == id;
        });
        listes.splice(index, 1);
        this.setState({ listes: listes });
    }

    handleChange = (event) =>{
        const value = event.currentTarget.value;
        this.setState({nouvelleListe: value})
        console.log(event.currentTarget.value);
    }
    handleChangeName = (event)=>{
        const value= event.currentTarget.value;
        this.setState({nomElection: value})
    }

    render() {
        const title = "ISEP VOTE";
        const subtitle ="Powered by Blockchain";

        return (
            <div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <h3>{this.state.nomElection}</h3>
                <ul>
                    {this.state.listes.map(listes => (
                        <li>
                            {listes.nom}{" "}
                            <button onClick={() => this.handleDelete(listes.id)}>X</button>
                        </li>
                    ))}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.nouvelleListe} onChange={this.handleChange} type="text" placeholder="Nom du BDE" />
                    <button>Confirmer</button>
                </form>

                <form onSubmit={this.handleName}>
                    <input value={this.state.nomElection} onChange={this.handleChangeName} type="text" placeholder="Nom de l'éléction" />
                    <button>Confirmer</button>
                </form>
            </div>
        );
    }
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
